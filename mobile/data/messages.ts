import { SupportedLanguage } from "../types/Lang";
import { currentLanguage } from "./lang";

interface UIMessages {
  libraryPageTitle: string;
  libraryMainMenuTitle: string;

  assistantPageTitle: string;
  assistantMainMenuTitle: string;

  menuPageTitle: string;
  menuMainMenuTitle: string;

  audioPageTitle: string;
  audioMainMenuTitle: string;
}

const en: UIMessages = {
  libraryPageTitle: "Библиотека",
  libraryMainMenuTitle: "Библиотека",

  assistantPageTitle: "Викинг",
  assistantMainMenuTitle: "Ассистент",

  menuPageTitle: "Меню",
  menuMainMenuTitle: "Меню",

  audioPageTitle: "Аудио",
  audioMainMenuTitle: "Аудио",
};

const ru: UIMessages = {
  libraryPageTitle: "Библиотека",
  libraryMainMenuTitle: "Библиотека",

  assistantPageTitle: "Викинг",
  assistantMainMenuTitle: "Ассистент",

  menuPageTitle: "Меню",
  menuMainMenuTitle: "Меню",

  audioPageTitle: "Аудио",
  audioMainMenuTitle: "Аудио",
};

const messages: Record<SupportedLanguage, UIMessages> = {
  ru,
  en,
};

export const UIMessage = messages[currentLanguage];
