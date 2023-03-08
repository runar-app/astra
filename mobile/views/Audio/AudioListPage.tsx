import * as React from "react";
import { FlatList, View } from "react-native";
import { AudioBook } from "../../../common/AudioBook";
import { getCurrentPlayedAudio, getListOfAudios, playTrack } from "../../services/audios";
import { SmallLoaderPage } from "../../components/Loader/SmallLoaderPage";
import { AudioListElement } from "../../components/AudioListElement/AudioListElement";
import { Background } from "../../components/Background/Background";
import { UIMessage } from "../../data/messages";
import NetInfo from "@react-native-community/netinfo";
import { useTrackPlayerEvents, Event } from "react-native-track-player";
import { BaseText } from "../../components/Typography/BaseText";

export function AudioListPage({ navigation }: any) {
  const [audios, setAudios] = React.useState<AudioBook[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [isOnline, setIsOnline] = React.useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = React.useState<AudioBook>();

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.type !== Event.PlaybackTrackChanged || event.nextTrack === null) {
      return;
    }
    const currentTrack = await getCurrentPlayedAudio();
    setCurrentTrack(currentTrack);
  });

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(!!state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    if (!isOnline) {
      return;
    }
    setLoading(true);
    (async () => {
      const audios = await getListOfAudios();
      setAudios(audios);
      setLoading(false);
    })();
  }, [isOnline]);

  if (!isOnline) {
    return <SmallLoaderPage loadingTextMessage={UIMessage.waitingForInternet} />;
  }

  if (loading) {
    return <SmallLoaderPage loadingTextMessage={UIMessage.loadingDataProgress} />;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 0,
        alignItems: "center",
      }}
    >
      <Background>
        {audios.length === 0 && <BaseText>{UIMessage.noAudiosFound}</BaseText>}
        <FlatList
          data={audios}
          renderItem={({ item }) => {
            const isPlaying = currentTrack?._id === item._id;
            const onPressHandler = async () => {
              if (!isPlaying) {
                await playTrack(item._id);
              }
              navigation.push("MediaPlayerScreen");
            };

            return (
              <AudioListElement
                active={isPlaying}
                key={item._id}
                audioData={item}
                onPress={onPressHandler}
              />
            );
          }}
          keyExtractor={(item) => item._id}
          style={{ width: "100%" }}
        />
      </Background>
    </View>
  );
}
