import * as React from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const styles = StyleSheet.create({
  aboutText: {
    fontSize: 15,
    color: "#ffffff",
    width: "90%",
    padding: 6,
  },
});

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
    <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", paddingTop: 15 }}>
      <Text style={styles.aboutText}>Версия приложения 1.0</Text>
      <Text style={styles.aboutText}>
        Runar — это приложение для гадания на скандинавских рунах и изучения скандинавской мифологии
        и сказок. Содержит 8 видов рунных раскладов, толкования рун. В разделе Библиотека вы можете
        почитать скандинавские саги и сказки.
      </Text>
      <Text style={styles.aboutText}>
        С разрешения правообладателей, в приложении использованы следующие музыкальные композиции: -
        Лёдъ (использованы композиции - «Черная Ладья», «Мать моя сказала»),
        https://lyod1.bandcamp.com/releases - Danheim (использованы композиции - «Runar», «Kala»),
        https://danheimmusic.com/
      </Text>
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
