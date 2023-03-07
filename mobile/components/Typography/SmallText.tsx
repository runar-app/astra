import { Text } from "react-native";
import { Colors, FontSizes } from "../../commonStyle";
import React from "react";

interface SmallTextProps {
  children: React.ReactNode;
  color?: string;
  center?: boolean;
}

export const SmallText = ({ children, color, center }: SmallTextProps) => {
  return (
    <Text
      style={{
        fontSize: FontSizes.smallText,
        color: color || Colors.smallTextColor,
        textAlign: center ? "center" : "left",
      }}
    >
      {children}
    </Text>
  );
};
