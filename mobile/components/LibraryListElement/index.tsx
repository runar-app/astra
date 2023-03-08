import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import React from "react";
import { BaseText } from "../Typography/BaseText";
import { LibraryNode } from "../../../common/LibraryNode";
import { SmallText } from "../Typography/SmallText";
import { RuneLibraryListElement } from "./RuneLibraryListElement";
import { TextLibraryElement } from "./TextLibraryElement";

interface LibraryListElementProps {
  nodeData: LibraryNode;
  color?: string;
  onPress?: () => void;
}

export const LibraryListElement = ({ nodeData, onPress }: LibraryListElementProps) => {
  const type = nodeData.type;
  const textNode = ["plainText", "poem", "rune"].includes(type);

  if (type === "rune") {
    return <RuneLibraryListElement nodeData={nodeData} onPress={onPress} />;
  }

  if (textNode) {
    return <TextLibraryElement nodeData={nodeData} onPress={onPress} />;
  }

  return (
    <TouchableHighlight onPress={onPress} underlayColor="rgba(0,0,0,0.3)">
      <View style={styles.listMenuItem}>
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
  rootImage: {
    width: 50,
    height: 50,
    borderRadius: 3,
  },
  menuContent: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    gap: 3,
  },
});
