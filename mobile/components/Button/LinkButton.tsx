import React from "react";
import { Text, StyleSheet, Pressable, Linking, Alert } from "react-native";
import { Colors } from "../../commonStyle";

interface LinkButtonProps {
  title?: string;
  href?: string;
}

export default function LinkButton(props: LinkButtonProps) {
  const { title = "Save", href } = props;

  const onPress = async () => {
    if (!href) {
      return;
    }

    const supported = await Linking.canOpenURL(href);

    if (supported) {
      await Linking.openURL(href);
    } else {
      Alert.alert(`Don't know how to open this URL: ${href}`);
    }
  };

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
    backgroundColor: "transparent",
    textAlign: "center",
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.primary,
  },
});
