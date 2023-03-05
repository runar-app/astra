import * as React from "react";
import { FlatList, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LibraryNode } from "../../types/Library";
import { getRootLibraryNodes } from "../../services/library";
import { SmallLoaderPage } from "../../components/Loader/SmallLoaderPage";
import { LibraryListElement } from "../../components/LibraryListElement/LibraryListElement";

function LibraryScreen() {
  const [nodes, setNodes] = React.useState<LibraryNode[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setLoading(true);
    (async () => {
      const nodes = await getRootLibraryNodes({ lang: "ru" });
      setNodes(nodes);
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
        data={nodes}
        renderItem={({ item }) => <LibraryListElement nodeData={item} />}
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
