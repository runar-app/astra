import { ActivityIndicator, Text, View } from "react-native";
import { Colors, FontSizes } from "../../commonStyle";
import React from "react";
import { BaseText } from "../Typography/BaseText";
import { Background } from "../Background/Background";

interface SmallLoaderPageProps {
  color?: string;
  loadingTextMessage?: string;
}
const defaultLoadingTextMessage = `Loading...`;

export const SmallLoaderPage = ({ color, loadingTextMessage }: SmallLoaderPageProps = {}) => {
  return (
    <Background>
      <View style={{ flex: 1, justifyContent: "center", gap: 15, alignItems: "center" }}>
        <ActivityIndicator color={color || Colors.loadingText} />
        <BaseText color={color || Colors.loadingText}>
          {loadingTextMessage || defaultLoadingTextMessage}
        </BaseText>
      </View>
    </Background>
  );
};
