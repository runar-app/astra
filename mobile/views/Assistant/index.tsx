import * as React from "react";
import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WebView } from "react-native-webview";
import { UIMessage } from "../../data/messages";
import { vikingAssistantUrl } from "../../data/url";
import { SmallLoaderPage } from "../../components/Loader/SmallLoaderPage";
import NetInfo from "@react-native-community/netinfo";

const styles = StyleSheet.create({
  webView: {
    marginTop: 0,
    marginBottom: 0,
    width: "100%",
    height: "101%",
    backgroundColor: "#000000",
  },
  hidden: {
    display: "none",
    position: "absolute",
  },
});

function AssistantScreen() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [isOnline, setIsOnline] = React.useState<boolean>(false);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(!!state.isConnected);
    });

    setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => {
      unsubscribe();
    };
  }, []);

  if (!isOnline) {
    return <SmallLoaderPage loadingTextMessage={UIMessage.waitingForInternet} />;
  }

  let webViewStyle = {
    ...styles.webView,
  };

  if (loading) {
    webViewStyle = {
      ...webViewStyle,
      ...styles.hidden,
    };
  }

  return (
    <>
      {loading && (
        <View style={{ height: "100%" }}>
          <SmallLoaderPage loadingTextMessage={UIMessage.loadingDataProgress} />
        </View>
      )}
      <WebView textZoom={100} source={{ uri: vikingAssistantUrl }} style={webViewStyle} />
    </>
  );
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
