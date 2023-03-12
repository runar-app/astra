import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../commonStyle";

interface PrimaryButtonProps {
  onPress: () => void;
  title?: string;
}

export default function PrimaryButton(props: PrimaryButtonProps) {
  const { onPress, title = "Save" } = props;

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    elevation: 3,
    width: "100%",
    backgroundColor: Colors.primary,
    textAlign: "center",
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.buttonColor,
  },
});
