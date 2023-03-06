import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import TrackPlayer, {
  Capability,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
  Event,
  State,
} from "react-native-track-player";
import Slider from "@react-native-community/slider";
import { Background } from "../Background/Background";
import AudioControlButton from "../Button/AudioControlButton";
import { BaseText } from "../Typography/BaseText";
import { AudioBook } from "../../../common/AudioBook";
import { getListOfAudios } from "../../services/audios";
import { SmallLoaderPage } from "../Loader/SmallLoaderPage";

interface MusicPlayerProps {
  audios: AudioBook[];
}

function MusicPlayer({ audios }: MusicPlayerProps) {
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackTitle, setTrackTitle] = useState("");
  const [trackArtist, setTrackArtist] = useState("");
  const [trackArtwork, setTrackArtwork] = useState("");

  const progress = useProgress();
  const playBackState = usePlaybackState();
  const isPlating = playBackState === State.Playing;

  const [loading, setLoading] = React.useState<boolean>(true);
  const audiosDataForPlayer = audios.map((audio) => {
    return {
      id: audio._id,
      url: audio.audioUrl,
      title: audio.title || "Audio Book",
      artist: audio.category || "Runar",
      artwork: audio.coverImgUrl || "",
    };
  });

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SeekTo,
            Capability.Stop,
            Capability.SkipToPrevious,
          ],
        });
        await TrackPlayer.add(audiosDataForPlayer);
      } catch (error) {
        console.log("!!! Error - setupPlayer");
        console.log(error);
      }

      try {
        await syncTrackData();
      } catch (error) {
        console.log("!!! Error - add");
      }

      setLoading(false);
    })();
  }, [audios]);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      if (!track) {
        return;
      }

      const { title, artwork, artist } = track;
      setTrackIndex(event.nextTrack);
      setTrackTitle(title || "");
      setTrackArtist(artist || "");
      setTrackArtwork(`${artwork}` || "");
    }
  });

  const syncTrackData = async () => {
    let trackIndex = await TrackPlayer.getCurrentTrack();

    if (trackIndex === null) {
      return;
    }

    let trackObject = await TrackPlayer.getTrack(trackIndex);
    if (!trackObject) {
      return;
    }

    setTrackTitle(trackObject?.title || "");
    setTrackArtist(trackObject?.artist || "");
    setTrackArtwork(`${trackObject?.artwork || ""}`);
  };

  const nextTrack = async () => {
    if (trackIndex < audios.length - 1) {
      await TrackPlayer.skipToNext();
      syncTrackData();
    }
  };

  const previousTrack = async () => {
    if (trackIndex > 0) {
      await TrackPlayer.skipToPrevious();
      syncTrackData();
    }
  };

  const togglePlayBack = async (playBackState: State) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack != null) {
      if (playBackState == State.Paused || playBackState == State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
      syncTrackData();
    }
  };

  if (loading) {
    return <SmallLoaderPage loadingTextMessage="Loading audio..." />;
  }

  return (
    <Background>
      <View style={styles.mainContainer}>
        <View style={styles.coverContainer}>
          {trackArtwork && (
            <Image
              style={styles.imageCover}
              source={{
                uri: trackArtwork,
              }}
            />
          )}
        </View>

        <View style={styles.playControlContainer}>
          <AudioControlButton
            text="prev"
            onPress={async () => {
              await previousTrack();
            }}
          />

          <AudioControlButton
            text={isPlating ? "Pause" : "Play"}
            onPress={async () => {
              await togglePlayBack(playBackState);
            }}
          />
          <AudioControlButton
            text="next"
            onPress={async () => {
              await nextTrack();
            }}
          />
        </View>

        <View style={styles.progressContainer}>
          <BaseText>Current Title: {trackTitle}</BaseText>
          <BaseText>Current Artist: {trackArtist}</BaseText>

          <BaseText>
            Current time: {new Date(progress.position * 1000).toLocaleTimeString().substring(3)}
          </BaseText>

          <BaseText>
            Full time:
            {new Date((progress.duration - progress.position) * 1000)
              .toLocaleTimeString()
              .substring(3)}
          </BaseText>
          <Slider
            style={styles.progressBar}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor="#FFD369"
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#fff"
            onSlidingComplete={async (value) => await TrackPlayer.seekTo(value)}
          />
        </View>
      </View>
    </Background>
  );
}

export default MusicPlayer;

const styles = StyleSheet.create({
  progressContainer: {
    width: "100%",
    padding: 10,
  },
  progressBar: {
    alignSelf: "stretch",
    marginTop: 0,
  },
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    flexDirection: "column",
  },
  coverContainer: {
    display: "flex",
    padding: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6))",
    borderRadius: 30,
    width: "70%",
    height: 200,
  },
  imageCover: {
    width: "100%",
    height: "100%",
  },
  playControlContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
});
