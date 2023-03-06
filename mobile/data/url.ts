import { SupportedLanguage } from "../types/Lang";

const LOCALHOST_DEBUG = false;

interface GetUrlProps {
  lang?: SupportedLanguage;
}

export const vikingAssistantUrl = "https://runar-viking.vercel.app/";

export const getAudioListUrl = ({ lang }: GetUrlProps): string => {
  const baseUrl = LOCALHOST_DEBUG ? "http://localhost:3000/" : "https://runar-viking.vercel.app/";
  const fullUrl = `${baseUrl}api/v3/audios?lang=${lang}`;
  return fullUrl;
};

interface GetLibraryUrlProps extends GetUrlProps {
  id?: string;
}
export const getLibraryUrl = ({ id }: GetLibraryUrlProps): string => {
  const baseUrl = LOCALHOST_DEBUG
    ? "http://localhost:3000/"
    : "https://runar-java-back.herokuapp.com/";

  const urlPars = [baseUrl, "api/v2/"];
  if (id) {
    urlPars.push(id);
  }
  const fullUrl = urlPars.join("");
  return fullUrl;
};
