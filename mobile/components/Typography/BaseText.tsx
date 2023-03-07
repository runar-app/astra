import { Text, StyleSheet } from "react-native";
import { Colors, FontSizes } from "../../commonStyle";
import React from "react";

interface BaseTextProps {
  children: React.ReactNode;
  color?: string;
  center?: boolean;
}

export const BaseText = ({ children, color, center }: BaseTextProps) => {
  return (
    <Text
      style={{
        ...styles.text,
        color: color || Colors.baseTextColor,
        textAlign: center ? "center" : "left",
      }}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: FontSizes.baseText,
  },
});
