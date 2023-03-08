import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import TrackPlayer, {
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
import { Colors } from "../../commonStyle";
import AudioPlayIcon from "../../icons/AudioPlayIcon";
import AudioPauseIcon from "../../icons/AudioPauseIcon";
import AudioNextIcon from "../../icons/AudioNextIcon";
import AudioPrevIcon from "../../icons/AudioPrevIcon";
import { SmallText } from "../Typography/SmallText";
import {
  getCurrentPlayedAudio,
  playNextTrack,
  playPauseToggler,
  playPrevTrack,
} from "../../services/audios";
import { SmallLoaderPage } from "../Loader/SmallLoaderPage";

function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState<AudioBook>();
  const [loading, setLoading] = useState(true);

  const progress = useProgress();
  const playBackState = usePlaybackState();
  const isPlay = playBackState === State.Playing;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, [loading]);

  useEffect(() => {
    (async () => {
      const currentTrack = await getCurrentPlayedAudio();
      setCurrentTrack(currentTrack);
    })();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.type !== Event.PlaybackTrackChanged || event.nextTrack === null) {
      return;
    }
    const currentTrack = await getCurrentPlayedAudio();
    setCurrentTrack(currentTrack);
  });

  const togglePlayBack = async (playBackState: State) => {
    await playPauseToggler(playBackState == State.Paused || playBackState == State.Ready);
  };

  if (loading) {
    return <SmallLoaderPage loadingTextMessage="Loading data..." />;
  }

  return (
    <Background>
      <View style={styles.mainContainer}>
        <View style={styles.coverContainer}>
          {currentTrack?.coverImgUrl && (
            <Image
              style={styles.imageCover}
              source={{
                uri: currentTrack.coverImgUrl,
              }}
            />
          )}
        </View>

        <View style={styles.playControlContainer}>
          <AudioControlButton
            icon={<AudioPrevIcon color={Colors.audioControlButtonColor} size={30} />}
            onPress={async () => {
              setLoading(true);
              await playPrevTrack();
            }}
          />

          <AudioControlButton
            icon={
              isPlay ? (
                <AudioPauseIcon color={Colors.audioControlButtonColor} size={70} />
              ) : (
                <AudioPlayIcon color={Colors.audioControlButtonColor} size={70} />
              )
            }
            onPress={async () => {
              await togglePlayBack(playBackState);
            }}
          />
          <AudioControlButton
            icon={<AudioNextIcon color={Colors.audioControlButtonColor} size={30} />}
            onPress={async () => {
              setLoading(true);
              await playNextTrack();
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
          <BaseText center>{currentTrack?.title}</BaseText>
          <SmallText center>{currentTrack?.category}</SmallText>
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
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingTop: 0,
    paddingBottom: 0,
    gap: 20,
    flexDirection: "column",
  },
  coverContainer: {
    display: "flex",
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 15,
    width: "80%",
    height: "50%",
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
    gap: 30,
  },
});
