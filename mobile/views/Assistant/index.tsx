import * as React from "react";
import { StyleSheet, StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WebView } from "react-native-webview";
import { UIMessage } from "../../data/messages";
import { vikingAssistantUrl } from "../../data/url";
import { getListOfAudios } from "../../services/audios";
import { SmallLoaderPage } from "../../components/Loader/SmallLoaderPage";
import { AudioBook } from "../../../common/AudioBook";
import NetInfo from "@react-native-community/netinfo";

const styles = StyleSheet.create({
  webView: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    height: "101%",
    backgroundColor: "#000000",
  },
});

function AssistantScreen() {
  const [audios, setAudios] = React.useState<AudioBook[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [isOnline, setIsOnline] = React.useState<boolean>(false);

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
      const audios = await getListOfAudios({ lang: "ru" });
      setAudios(audios);
      setLoading(false);
    })();
  }, [isOnline]);

  if (!isOnline) {
    return <SmallLoaderPage loadingTextMessage="Waiting for internet connection..." />;
  }

  if (loading) {
    return <SmallLoaderPage loadingTextMessage="Loading data..." />;
  }

  return <WebView textZoom={100} source={{ uri: vikingAssistantUrl }} style={styles.webView} />;
}

const AssistantStack = createNativeStackNavigator();

export function AssistantStackScreen() {
  return (
    <AssistantStack.Navigator>
      <AssistantStack.Screen
        name="Viking Assistant"
        options={{
          title: UIMessage.assistantPageTitle,
        }}
        component={AssistantScreen}
      />
    </AssistantStack.Navigator>
  );
}
