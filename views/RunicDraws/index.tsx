import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import HomeIcon from "../../icons/HomeIcon";

function RunicDrawsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Runic Draws !!!!</Text>
    </View>
  );
}

const RunicDrawsStack = createNativeStackNavigator();

export function RunicDrawsStackScreen() {
  return (
    <RunicDrawsStack.Navigator>
      <RunicDrawsStack.Screen name="Runic" component={RunicDrawsScreen} />
    </RunicDrawsStack.Navigator>
  );
}
