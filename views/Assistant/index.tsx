import * as React from "react";
import { StyleSheet, StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WebView } from "react-native-webview";

const vikingUrl = "https://viking-ai.vercel.app/";

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
  return <WebView textZoom={100} source={{ uri: vikingUrl }} style={styles.webView} />;
}

const AssistantStack = createNativeStackNavigator();

export function AssistantStackScreen() {
  return (
    <AssistantStack.Navigator>
      <AssistantStack.Screen name="Viking Assistant" component={AssistantScreen} />
    </AssistantStack.Navigator>
  );
}
