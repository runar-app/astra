import { View, StyleSheet } from "react-native";
import React from "react";
import { BaseText } from "../Typography/BaseText";
import { LibraryNode } from "../../types/Library";

interface LibraryListElementProps {
  nodeData: LibraryNode;
  color?: string;
}

export const LibraryListElement = ({ nodeData }: LibraryListElementProps) => {
  return (
    <View style={styles.listItem}>
      <BaseText>{nodeData.title}</BaseText>
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
