import * as React from "react";
import { FlatList, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LibraryNode } from "../../../common/LibraryNode";
import { getLibraryNodes } from "../../services/library";
import { SmallLoaderPage } from "../../components/Loader/SmallLoaderPage";
import { LibraryListElement } from "../../components/LibraryListElement/LibraryListElement";
import { Background } from "../../components/Background/Background";
import { UIMessage } from "../../data/messages";

interface LibraryNavigationProps {
  id?: string;
  pageLabel?: string;
}

function LibraryDetails({ navigation, route }: any) {
  const id = route?.params?.id || "";

  const [nodes, setNodes] = React.useState<LibraryNode[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setLoading(true);
    (async () => {
      const nodes = await getLibraryNodes({ id });
      setNodes(nodes);
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return <SmallLoaderPage loadingTextMessage="Loading data..." />;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        paddingTop: 0,
        alignItems: "center",
      }}
    >
      <Background>
        <FlatList
          data={nodes}
          renderItem={({ item }) => {
            const child = item.childIds && item.childIds.length > 0;
            const onPressHandler = () => {
              const props: LibraryNavigationProps = { id: item._id, pageLabel: item.title };
              navigation.push("LibraryDetails", props);
            };

            return (
              <LibraryListElement nodeData={item} onPress={child ? onPressHandler : undefined} />
            );
          }}
          keyExtractor={(item) => item._id}
          style={{ width: "100%" }}
        />
      </Background>
    </View>
  );
}

const LibraryStack = createNativeStackNavigator();

export function LibraryStackScreen() {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen
        name="Library"
        options={{
          title: UIMessage.libraryPageTitle,
        }}
        component={LibraryDetails}
      />
      <LibraryStack.Screen
        name="LibraryDetails"
        component={LibraryDetails}
        options={({ route }) => {
          const pageProps = (route?.params as LibraryNavigationProps) || {};
          const pageLabel = pageProps.pageLabel || UIMessage.libraryPageTitle;

          return {
            title: pageLabel,
          };
        }}
      />
    </LibraryStack.Navigator>
  );
}
