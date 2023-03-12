import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../commonStyle";

interface AlertButtonProps {
  onPress: () => void;
  title?: string;
}

export default function AlertButton(props: AlertButtonProps) {
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
    textAlign: "center",
    borderColor: Colors.error,
    borderWidth: 1,
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.error,
  },
});
