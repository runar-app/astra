import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { Colors } from "../../commonStyle";

interface AudioControlButtonProps {
  onPress: () => void;
  color?: string;
  icon: JSX.Element;
}

export default function AudioControlButton(props: AudioControlButtonProps) {
  const { onPress, icon } = props;

  return (
    <Pressable style={styles.button} onPress={onPress}>
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    textAlign: "center",
    borderRadius: 30,
  },
  text: {
    textAlign: "center",
    color: Colors.baseTextColor,
  },
});
