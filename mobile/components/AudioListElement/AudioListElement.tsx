import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import React from "react";
import { BaseText } from "../Typography/BaseText";
import { AudioBook } from "../../../common/AudioBook";
import { Colors } from "../../commonStyle";
import { SmallText } from "../Typography/SmallText";
import AudioPlayIcon from "../../icons/AudioPlayIcon";

interface AudioListElementProps {
  audioData: AudioBook;
  active?: boolean;
  onPress?: () => void;
}

export const AudioListElement = ({ audioData, onPress, active }: AudioListElementProps) => {
  return (
    <TouchableHighlight onPress={onPress} style={{ width: "100%" }} underlayColor="rgba(0,0,0,0.3)">
      <View
        style={{
          ...styles.listItem,
          backgroundColor: active ? Colors.audioCoverListBorderActive : "rgba(0, 0, 0, 0)",
        }}
      >
        {active && <AudioPlayIcon color={Colors.audioControlButtonColor} size={50} />}

        {!active && (
          <Image
            style={{
              ...styles.cover,
              borderColor: active ? Colors.audioCoverListBorderActive : "rgba(0, 0, 0, 0)",
            }}
            source={{ uri: audioData.coverImgUrl }}
          />
        )}

        <View style={{ width: "70%" }}>
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
    borderRadius: 3,
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
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.2)",
    gap: 20,
    width: "100%",
    alignItems: "center",
  },
});
