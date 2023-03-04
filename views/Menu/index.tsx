import * as React from "react";
import { Button, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hi it is Settings!</Text>
    </View>
  );
}

function FavoriteScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hi it is Favorite!</Text>
    </View>
  );
}

function AboutScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hi it is About!</Text>
    </View>
  );
}

function MenuScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Settings" onPress={() => navigation.navigate("Settings")} />
      <Button title="Favorite" onPress={() => navigation.navigate("Favorite")} />
      <Button title="About" onPress={() => navigation.navigate("About")} />
    </View>
  );
}

const MenuStack = createNativeStackNavigator();

export function MenuStackScreen() {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen name="Menu" component={MenuScreen} />
      <MenuStack.Screen name="Settings" component={SettingsScreen} />
      <MenuStack.Screen name="Favorite" component={FavoriteScreen} />
      <MenuStack.Screen name="About" component={AboutScreen} />
    </MenuStack.Navigator>
  );
}
