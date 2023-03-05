import { SupportedLanguage, supportedLanguages } from "../types/Lang";
import { NativeModules, Platform } from "react-native";

let deviceLanguage: string =
  Platform.OS === "ios"
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
    : NativeModules.I18nManager.localeIdentifier;
deviceLanguage = deviceLanguage.split("_")[0].toLowerCase();

export const currentLanguage: SupportedLanguage =
  supportedLanguages.find((lang) => lang === deviceLanguage) || "en";
