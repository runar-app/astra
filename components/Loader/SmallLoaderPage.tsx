import { ActivityIndicator, Text, View } from "react-native";
import { Colors, FontSizes } from "../../commonStyle";
import React from "react";
import { BaseText } from "../Typography/BaseText";

interface SmallLoaderPageProps {
  color?: string;
  loadingTextMessage?: string;
}
const defaultLoadingTextMessage = `Loading...`;

export const SmallLoaderPage = ({ color, loadingTextMessage }: SmallLoaderPageProps = {}) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", gap: 15, alignItems: "center" }}>
      <ActivityIndicator color={color || Colors.loadingText} />
      <BaseText color={color || Colors.loadingText}>
        {loadingTextMessage || defaultLoadingTextMessage}
      </BaseText>
    </View>
  );
};
