import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import React from "react";
import { BaseText } from "../Typography/BaseText";
import { AudioBook } from "../../../common/AudioBook";
import { Colors } from "../../commonStyle";
import { SmallText } from "../Typography/SmallText";

interface AudioListElementProps {
  audioData: AudioBook;
  color?: string;
  onPress?: () => void;
}

export const AudioListElement = ({ audioData, onPress }: AudioListElementProps) => {
  return (
    <TouchableHighlight onPress={onPress} underlayColor="rgba(0,0,0,0.3)">
      <View style={styles.listItem}>
        <Image style={styles.cover} source={{ uri: audioData.coverImgUrl }} />
        <View>
          <BaseText>{audioData.title}</BaseText>
          <SmallText>{audioData.category}</SmallText>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  title: {},
  subTitle: {},
  cover: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderColor: Colors.audioCoverListBorder,
    borderWidth: 1,
  },
  listItem: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    display: "flex",
    flexDirection: "row",
    gap: 20,
    width: "80%",
    alignItems: "center",
  },
});
