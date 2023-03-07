import * as React from "react";
import { FlatList, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AudioBook } from "../../../common/AudioBook";
import { getListOfAudios } from "../../services/audios";
import { SmallLoaderPage } from "../../components/Loader/SmallLoaderPage";
import { AudioListElement } from "../../components/AudioListElement/AudioListElement";
import { Background } from "../../components/Background/Background";
import { UIMessage } from "../../data/messages";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";

function AudioScreen({ navigation }: any) {
  const [audios, setAudios] = React.useState<AudioBook[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setLoading(true);
    (async () => {
      const audios = await getListOfAudios({ lang: "ru" });
      setAudios(audios);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <SmallLoaderPage loadingTextMessage="Loading data..." />;
  }

  const categoriesAudios = audios.reduce((acc, audio) => {
    if (!acc[audio.category]) {
      acc[audio.category] = [];
    }
    acc[audio.category].push(audio);
    return acc;
  }, {} as { [key: string]: AudioBook[] });

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
        <FlatList
          data={audios}
          renderItem={({ item }) => {
            const onPressHandler = () => {
              navigation.push("AudioDetail");
            };
            return <AudioListElement audioData={item} onPress={onPressHandler} />;
          }}
          keyExtractor={(item) => item._id}
          style={{ width: "100%" }}
        />
      </Background>
    </View>
  );
}

function MediaPlayerScreen() {
  const [audios, setAudios] = React.useState<AudioBook[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setLoading(true);
    (async () => {
      const audios = await getListOfAudios({ lang: "ru" });

      setAudios(audios);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <SmallLoaderPage loadingTextMessage="Loading data..." />;
  }

  return <MusicPlayer audios={audios} />;
}

const AudioStack = createNativeStackNavigator();

export function AudioStackScreen() {
  return (
    <AudioStack.Navigator>
      <AudioStack.Screen
        name="Audio"
        options={{
          title: UIMessage.audioPageTitle,
        }}
        component={AudioScreen}
      />

      <AudioStack.Screen name="MediaScreen" component={MediaPlayerScreen} />
    </AudioStack.Navigator>
  );
}
