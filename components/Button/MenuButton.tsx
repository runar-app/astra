import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../commonStyle";
import RightArrowIcon from "../../icons/Arrow";

interface MenuButtonProps {
  onPress: () => void;
  title?: string;
}

export default function MenuButton(props: MenuButtonProps) {
  const { onPress, title = "Save" } = props;

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
      <RightArrowIcon />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    elevation: 3,
    width: "100%",
    backgroundColor: "transparent",
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
    borderBottomWidth: 1,
    textAlign: "left",
  },
  text: {
    textAlign: "left",
    color: Colors.baseTextColor,
  },
});
