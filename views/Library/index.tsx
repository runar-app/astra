import * as React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AudioBook } from "../../types/audios";
import { getListOfAudios } from "../../services/audios";
import { BaseText } from "../../components/Typography/BaseText";
import { Colors } from "../../commonStyle";
import { SmallLoaderPage } from "../../components/Loader/SmallLoaderPage";
import { AudioListElement } from "../../components/AudioListElement/AudioListElement";

function LibraryScreen() {
  const [audios, setAudios] = React.useState<AudioBook[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    console.log("Run request");
    (async () => {
      const audios = await getListOfAudios({ lang: "ru" });
      setAudios(audios);
      setLoading(false);
    })();
  }, []);
  console.log("A", audios.length, new Date());

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

const LibraryStack = createNativeStackNavigator();

export function LibraryStackScreen() {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen name="Library" component={LibraryScreen} />
    </LibraryStack.Navigator>
  );
}
