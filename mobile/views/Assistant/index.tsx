import * as React from "react";
import { StyleSheet, StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WebView } from "react-native-webview";
import { UIMessage } from "../../data/messages";
import { vikingAssistantUrl } from "../../data/url";

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
  console.log("vikingAssistantUrl", vikingAssistantUrl);

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
