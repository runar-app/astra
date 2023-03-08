import * as React from "react";
import { View, StyleSheet, Image, Linking, Platform } from "react-native";
import { Background } from "../../components/Background/Background";
import MenuButton from "../../components/Button/MenuButton";
import { UIMessage } from "../../data/messages";

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    gap: 40,
    padding: 10,
    alignItems: "center",
  },
  menuContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    gap: 0,
    width: "100%",
    padding: 10,
    alignItems: "center",
  },
  image: {
    width: 140,
    height: 140,
  },
});
const handleOpenSettings = () => {
  console.log("handleOpenSettings");

  if (Platform.OS === "ios") {
    Linking.openURL("app-settings:");
  } else {
    Linking.openSettings();
  }
};
export function MenuScreen({ navigation }: any) {
  return (
    <Background>
      <View style={styles.mainContainer}>
        <Image style={styles.image} source={require("../../assets/illustrations/boat.png")} />
        <View style={styles.menuContainer}>
          <MenuButton
            title={UIMessage.aboutMainMenuTitle}
            onPress={() => navigation.navigate("About")}
          />

          <MenuButton title={UIMessage.appSettings} onPress={() => handleOpenSettings()} />
        </View>
      </View>
    </Background>
  );
}
