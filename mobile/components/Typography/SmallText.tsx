import { Text } from "react-native";
import { Colors, FontSizes } from "../../commonStyle";
import React from "react";

interface SmallTextProps {
  children: React.ReactNode;
  color?: string;
}

export const SmallText = ({ children, color }: SmallTextProps) => {
  return (
    <Text style={{ fontSize: FontSizes.smallText, color: color || Colors.smallTextColor }}>
      {children}
    </Text>
  );
};
