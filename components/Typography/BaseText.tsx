import { Text } from "react-native";
import { Colors, FontSizes } from "../../commonStyle";
import React from "react";

interface BaseTextProps {
  children: React.ReactNode;
  color?: string;
}

export const BaseText = ({ children, color }: BaseTextProps) => {
  return (
    <Text style={{ fontSize: FontSizes.baseText, color: color || Colors.baseTextColor }}>
      {children}
    </Text>
  );
};
