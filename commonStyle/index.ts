import { DarkTheme } from "@react-navigation/native";

const FontSizesGradation = {
  base: 14,
};

export const FontSizes = {
  baseText: FontSizesGradation.base,
};

const ColorPalette = {
  primary: "#EFCD93",
};

export const Colors = {
  baseTextColor: "#ffffff",
  loadingText: ColorPalette.primary,
};

export const RunarTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: ColorPalette.primary,
  },
};
