import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import React from "react";
import { BaseText } from "../Typography/BaseText";
import { LibraryNode } from "../../../common/LibraryNode";
import { SmallText } from "../Typography/SmallText";
import { RuneLibraryListElement } from "./RuneLibraryListElement";

interface TextLibraryElementProps {
  nodeData: LibraryNode;
  onPress?: () => void;
}

export const TextLibraryElement = ({ nodeData, onPress }: TextLibraryElementProps) => {
  const type = nodeData.type;
  const textNode = ["plainText", "poem", "rune"].includes(type);
  const containerStyle = textNode ? styles.textMenuItem : styles.listMenuItem;

  return (
    <TouchableHighlight onPress={onPress} underlayColor="rgba(0,0,0,0.3)">
      <View style={containerStyle}>
        {nodeData.imageUrl && (
          <Image
            style={styles.rootImage}
            source={{
              uri: nodeData.imageUrl,
            }}
          />
        )}
        <View style={styles.menuContent}>
          <BaseText>{nodeData.title}</BaseText>
          {nodeData.content && <SmallText>{nodeData.content}</SmallText>}
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  listMenuItem: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
    width: "100%",
  },
  textMenuItem: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 5,
    paddingLeft: 0,
    paddingRight: 0,
    width: "100%",
  },
  rootImage: {
    width: 50,
    height: 50,
  },
  menuContent: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    gap: 3,
  },
});
