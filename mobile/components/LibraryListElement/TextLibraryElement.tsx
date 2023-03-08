import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import React from "react";
import { BaseText } from "../Typography/BaseText";
import { LibraryNode } from "../../../common/LibraryNode";
import { SmallText } from "../Typography/SmallText";

interface TextLibraryElementProps {
  nodeData: LibraryNode;
  onPress?: () => void;
}

export const TextLibraryElement = ({ nodeData, onPress }: TextLibraryElementProps) => {
  return (
    <TouchableHighlight onPress={onPress} underlayColor="rgba(0,0,0,0.3)">
      <View style={styles.nodeContainer}>
        {nodeData.imageUrl && (
          <Image
            style={styles.rootImage}
            source={{
              uri: nodeData.imageUrl,
            }}
          />
        )}
        <View style={styles.nodeContainer}>
          {nodeData.title && <BaseText>{nodeData.title}</BaseText>}
          {nodeData.content && <BaseText>{nodeData.content}</BaseText>}
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  nodeContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    width: "100%",
    textAlign: "left",
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
