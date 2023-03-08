import { ImageBackground, StyleSheet } from "react-native";

import React from "react";

interface BackgroundProps {
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});

const source = require("../../assets/bg/bg.jpg");

export const Background = ({ children }: BackgroundProps) => {
  return (
    <ImageBackground source={source} resizeMode="cover" style={styles.bgImage}>
      {children}
    </ImageBackground>
  );
};
