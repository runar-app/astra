import * as React from "react";
import { Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function GeneratorScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Generator</Text>
    </View>
  );
}

const GeneratorStack = createNativeStackNavigator();

export function GeneratorStackScreen() {
  return (
    <GeneratorStack.Navigator>
      <GeneratorStack.Screen name="Generator" component={GeneratorScreen} />
    </GeneratorStack.Navigator>
  );
}
