import * as React from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar, ScrollView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WebView } from "react-native-webview";

const styles = StyleSheet.create({
  webView: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    height: "100%",
    backgroundColor: "red",
  },
  scrollView: {
    backgroundColor: "pink",
    height: "100%",
  },
  view: {
    height: "100%",
  },
});

function AssistantScreen() {
  return (
    <WebView
      scrollEnabled={false}
      textZoom={100}
      source={{ uri: "https://chat-run.vercel.app/" }}
      style={styles.webView}
    />
  );
}

const AssistantStack = createNativeStackNavigator();

export function AssistantStackScreen() {
  return (
    <AssistantStack.Navigator>
      <AssistantStack.Screen name="Viking Assistant" component={AssistantScreen} />
    </AssistantStack.Navigator>
  );
}
