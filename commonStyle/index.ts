import { DarkTheme } from "@react-navigation/native";

const FontSizesGradation = {
  base: 14,
  small: 11,
};

export const FontSizes = {
  baseText: FontSizesGradation.base,
  smallText: FontSizesGradation.small,
};

const ColorPalette = {
  primary: "#EFCD93",
  mainTextContent: "#ffffff",
  subTextContent: "#cccccc",
};

export const Colors = {
  baseTextColor: ColorPalette.mainTextContent,
  smallTextColor: ColorPalette.subTextContent,
  loadingText: ColorPalette.primary,
};

export const RunarTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: ColorPalette.primary,
  },
};
