import { View, StyleSheet, TouchableHighlight } from "react-native";
import React from "react";
import { BaseText } from "../Typography/BaseText";
import { AudioBook } from "../../../common/AudioBook";

interface AudioListElementProps {
  audioData: AudioBook;
  color?: string;
  onPress?: () => void;
}

export const AudioListElement = ({ audioData, onPress }: AudioListElementProps) => {
  return (
    <TouchableHighlight onPress={onPress} underlayColor="rgba(0,0,0,0.3)">
      <View style={styles.listItem}>
        <BaseText>{audioData.title}</BaseText>
      </View>
    </TouchableHighlight>
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
