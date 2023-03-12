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
  error: "#ef9393",
};

export const Colors = {
  ...ColorPalette,
  baseTextColor: ColorPalette.mainTextContent,
  smallTextColor: ColorPalette.subTextContent,
  loadingText: ColorPalette.primary,
  audioControlButtonColor: ColorPalette.primary,
  audioCoverImageLoadingIcon: "rgba(255, 255, 255, 0.05)",
  audioCoverListBorder: "rgba(255, 255, 255, 0.1)",
  audioCoverListBorderActive: "rgba(0, 0, 0, 0.6)",
  tagsBorder: "#c2c2c2",
  buttonColor: "rgba(0, 0, 0, 0.6)",
};

export const RunarTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: ColorPalette.primary,
  },
};
