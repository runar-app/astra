import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import React from "react";
import { BaseText } from "../Typography/BaseText";
import { LibraryNode } from "../../../common/LibraryNode";
import { SmallText } from "../Typography/SmallText";
import { Colors } from "../../commonStyle";

interface LibraryListElementProps {
  nodeData: LibraryNode;
  onPress?: () => void;
}

export const RuneLibraryListElement = ({ nodeData, onPress }: LibraryListElementProps) => {
  const tags = nodeData.tags || [];

  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.textMenuItem}>
        {nodeData.imageUrl && (
          <Image
            style={styles.image}
            source={{
              uri: nodeData.imageUrl,
            }}
          />
        )}
        <View style={styles.content}>
          <BaseText>{nodeData.title}</BaseText>

          {tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {tags.map((tag) => (
                <View style={styles.tag} key={tag}>
                  <SmallText>{tag}</SmallText>
                </View>
              ))}
            </View>
          )}

          {nodeData.content && <BaseText>{nodeData.content}</BaseText>}
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
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    paddingTop: 0,
    paddingBottom: 5,
    paddingLeft: 0,
    paddingRight: 0,
    width: "100%",
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 22,
    marginBottom: 22,
  },

  tag: {
    borderColor: Colors.tagsBorder,
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    gap: 22,
    paddingBottom: 32,
  },
  tagsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
});
