import * as React from "react";
import { FlatList, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AudioBook } from "../../types/audios";
import { getListOfAudios } from "../../services/audios";
import { SmallLoaderPage } from "../../components/Loader/SmallLoaderPage";
import { AudioListElement } from "../../components/AudioListElement/AudioListElement";

function AudioScreen() {
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

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 0,
        alignItems: "center",
      }}
    >
      <FlatList
        data={audios}
        renderItem={({ item }) => <AudioListElement audioData={item} />}
        keyExtractor={(item) => item._id}
        style={{ width: "100%" }}
      />
    </View>
  );
}

const AudioStack = createNativeStackNavigator();

export function AudioStackScreen() {
  return (
    <AudioStack.Navigator>
      <AudioStack.Screen name="Audio" component={AudioScreen} />
    </AudioStack.Navigator>
  );
}
