import { Text, View, StyleSheet } from "react-native";
import { Colors, FontSizes } from "../../commonStyle";
import React from "react";
import { BaseText } from "../Typography/BaseText";
import { AudioBook } from "../../types/Audio";

interface AudioListElementProps {
  audioData: AudioBook;
  color?: string;
}

export const AudioListElement = ({ audioData }: AudioListElementProps) => {
  return (
    <View style={styles.listItem}>
      <BaseText>{audioData.title}</BaseText>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
});
