import { View, StyleSheet, Image } from "react-native";
import React from "react";
import { BaseText } from "../Typography/BaseText";
import { LibraryNode } from "../../types/Library";
import { SmallText } from "../Typography/SmallText";

interface LibraryListElementProps {
  nodeData: LibraryNode;
  color?: string;
}

export const LibraryListElement = ({ nodeData }: LibraryListElementProps) => {
  return (
    <View style={styles.listItem}>
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
        <SmallText>{nodeData.content}</SmallText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
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
  },
  menuContent: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    gap: 3,
  },
});
