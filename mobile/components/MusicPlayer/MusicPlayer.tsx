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
import { SmallLoaderPage } from "../Loader/SmallLoaderPage";
import { Colors } from "../../commonStyle";
import AudioPlayIcon from "../../icons/AudioPlayIcon";
import AudioPauseIcon from "../../icons/AudioPauseIcon";
import AudioNextIcon from "../../icons/AudioNextIcon";
import AudioPrevIcon from "../../icons/AudioPrevIcon";
import { SmallText } from "../Typography/SmallText";

interface MusicPlayerProps {
  audios: AudioBook[];
  newAudioId?: string;
}

function MusicPlayer({ audios, newAudioId }: MusicPlayerProps) {
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackTitle, setTrackTitle] = useState("");
  const [trackArtist, setTrackArtist] = useState("");
  const [trackArtwork, setTrackArtwork] = useState("");

  const progress = useProgress();
  const playBackState = usePlaybackState();
  const isPlay = playBackState === State.Playing;

  const audiosDataForPlayer = audios.map((audio) => {
    return {
      id: audio._id,
      url: audio.audioUrl,
      title: audio.title,
      artist: audio.category,
      artwork: audio.coverImgUrl,
    };
  });

  useEffect(() => {
    (async () => {
      try {
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
            icon={<AudioPrevIcon color={Colors.audioControlButtonColor} />}
            onPress={async () => {
              await previousTrack();
            }}
          />

          <AudioControlButton
            icon={
              isPlay ? (
                <AudioPauseIcon color={Colors.audioControlButtonColor} />
              ) : (
                <AudioPlayIcon color={Colors.audioControlButtonColor} />
              )
            }
            onPress={async () => {
              await togglePlayBack(playBackState);
            }}
          />
          <AudioControlButton
            icon={<AudioNextIcon color={Colors.audioControlButtonColor} />}
            color="next"
            onPress={async () => {
              await nextTrack();
            }}
          />
        </View>

        <View style={styles.progressContainer}>
          <SmallText>
            {new Date(progress.position * 1000)
              .toLocaleTimeString()
              .substring(3)
              .replace("AM", "")
              .trim()}
          </SmallText>

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
          <SmallText>
            {new Date((progress.duration - progress.position) * 1000)
              .toLocaleTimeString()
              .substring(3)
              .replace("AM", "")
              .trim()}
          </SmallText>
        </View>
        <View style={styles.infoContainer}>
          <BaseText>{trackTitle}</BaseText>
          <SmallText>{trackArtist}</SmallText>
        </View>
      </View>
    </Background>
  );
}

export default MusicPlayer;

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: "rgba(30, 30, 30, 0.75)",
    borderRadius: 30,
    width: "93%",
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 20,
    paddingRight: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  progressContainer: {
    width: "100%",
    padding: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  progressBar: {
    display: "flex",
    width: "70%",
    alignSelf: "stretch",
    marginTop: 0,
  },
  mainContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    paddingTop: "10%",
    paddingBottom: "10%",
    gap: 10,
    flexDirection: "column",
  },
  coverContainer: {
    display: "flex",
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 15,
    width: "90%",
    height: "70%",
    borderWidth: 3,
    borderColor: "rgba(0, 0, 0, 0.4)",
  },
  imageCover: {
    borderRadius: 15,
    width: "100%",
    height: "100%",
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  playControlContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
});
