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

  aboutPageTitle: string;
  aboutMainMenuTitle: string;

  aboutLine1: string;
  aboutLine2: string;
  aboutLine3: string;
  aboutLine4: string;

  waitingForInternet: string;
  loadingDataProgress: string;

  noAudiosFound: string;

  appSettings: string;
}

const en: UIMessages = {
  libraryPageTitle: "Library",
  libraryMainMenuTitle: "Library",

  assistantPageTitle: "Viking",
  assistantMainMenuTitle: "Viking",

  menuPageTitle: "Menu",
  menuMainMenuTitle: "Menu",

  audioPageTitle: "Audio",
  audioMainMenuTitle: "Audio",

  aboutPageTitle: "About",
  aboutMainMenuTitle: "About",

  aboutLine1: "Application Version 1.0",
  aboutLine2:
    "Runar Astra is an application with a Viking assistant chatbot that can answer any questions about Scandinavian mythology.",
  aboutLine3: "The assistant has vast knowledge about the gods, heroes, and legends.",
  aboutLine4:
    "The app also contains audio stories about battles of the gods and Viking adventures.",

  waitingForInternet: "Waiting for internet connection...",
  loadingDataProgress: "Loading data...",

  noAudiosFound: "No audios found",

  appSettings: "App settings",
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

  aboutPageTitle: "О приложении",
  aboutMainMenuTitle: "О приложении",
  aboutLine1: "Версия приложения 1.0",
  aboutLine2: `Runar Astra — это приложение с викинг-помощником, чат-ботом ассистентом, который может ответить на любой вопрос о скандинавской мифологии.`,
  aboutLine3: "Помощник обладает огромным знанием о богах, героях и сказаниях.",
  aboutLine4: "Приложение также содержит аудиосказки о битвах богов и приключениях викингов.",

  waitingForInternet: "Ожидаю интернет..",

  loadingDataProgress: "Загружаю данные...",
  noAudiosFound: "Аудио не найдено",

  appSettings: "Настройки приложения",
};

const messages: Record<SupportedLanguage, UIMessages> = {
  ru,
  en,
};

export const UIMessage = messages[currentLanguage];
