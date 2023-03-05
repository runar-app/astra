import { SupportedLanguage } from "../types/Lang";
import { currentLanguage } from "./lang";

interface UIMessages {
  libraryPageTitle: string;
  libraryMainMenuTitle: string;

  assistantPageTitle: string;
  assistantMainMenuTitle: string;

  menuPageTitle: string;
  menuMainMenuTitle: string;
}

const en: UIMessages = {
  libraryPageTitle: "Библиотека",
  libraryMainMenuTitle: "Библиотека",

  assistantPageTitle: "Викинг",
  assistantMainMenuTitle: "Ассистент",

  menuPageTitle: "Меню",
  menuMainMenuTitle: "Меню",
};

const ru: UIMessages = {
  libraryPageTitle: "Библиотека",
  libraryMainMenuTitle: "Библиотека",

  assistantPageTitle: "Викинг",
  assistantMainMenuTitle: "Ассистент",

  menuPageTitle: "Меню",
  menuMainMenuTitle: "Меню",
};

const messages: Record<SupportedLanguage, UIMessages> = {
  ru,
  en,
};

export const UIMessage = messages[currentLanguage];
