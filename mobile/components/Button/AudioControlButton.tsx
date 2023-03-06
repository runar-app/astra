import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../commonStyle";
import RightArrowIcon from "../../icons/Arrow";

interface AudioControlButtonProps {
  onPress: () => void;
  text?: string;
}

export default function AudioControlButton(props: AudioControlButtonProps) {
  const { onPress, text = "Play" } = props;

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    elevation: 3,
    backgroundColor: "rgba(255, 40, 40, 0.4)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    textAlign: "left",
    borderRadius: 30,
  },
  text: {
    textAlign: "center",
    color: Colors.baseTextColor,
  },
});
