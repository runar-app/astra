import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: "#ffffff",
  },
});

function RunicDrawsScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.text}>Hello</Text>
    </View>
  );
}

const RunicDrawsStack = createNativeStackNavigator();

export function RunicDrawsStackScreen() {
  return (
    <RunicDrawsStack.Navigator>
      <RunicDrawsStack.Screen name="RunicMain" component={RunicDrawsScreen} />
    </RunicDrawsStack.Navigator>
  );
}
