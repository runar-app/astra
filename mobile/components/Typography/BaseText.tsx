import { Text, StyleSheet } from "react-native";
import { Colors, FontSizes } from "../../commonStyle";
import React from "react";

interface BaseTextProps {
  children: React.ReactNode;
  color?: string;
}

export const BaseText = ({ children, color }: BaseTextProps) => {
  return <Text style={{ ...styles.text, color: color || Colors.baseTextColor }}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: FontSizes.baseText,
  },
});
