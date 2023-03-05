import * as React from "react";
import { Button, Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { Background } from "../../components/Background/Background";
import MenuButton from "../../components/Button/MenuButton";

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

export function MenuScreen({ navigation }: any) {
  return (
    <Background>
      <View style={styles.mainContainer}>
        <Image style={styles.image} source={require("../../assets/illusttrations/boat.png")} />
        <View style={styles.menuContainer}>
          <MenuButton title="Settings" onPress={() => navigation.navigate("Settings")} />
          <MenuButton title="Favorite" onPress={() => navigation.navigate("Favorite")} />
          <MenuButton title="About" onPress={() => navigation.navigate("About")} />
        </View>
      </View>
    </Background>
  );
}
