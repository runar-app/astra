import { SupportedLanguage } from "../types/lang";

interface GetUrlProps {
  lang?: SupportedLanguage;
  devMode?: boolean;
}

export const getAudioListUrl = ({ lang, devMode }: GetUrlProps): string => {
  const baseUrl = devMode ? "https://localhost:3000/" : "https://astra-backend.vercel.app/";
  const fullUrl = `${baseUrl}api/v3/audios?lang=${lang}`;
  return fullUrl;
};
