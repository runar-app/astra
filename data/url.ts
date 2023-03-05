import { SupportedLanguage } from "../types/Lang";

const LOCALHOST_DEBUG = false;

interface GetUrlProps {
  lang?: SupportedLanguage;
}

export const getAudioListUrl = ({ lang }: GetUrlProps): string => {
  const baseUrl = LOCALHOST_DEBUG ? "http://localhost:3000/" : "https://astra-backend.vercel.app/";
  const fullUrl = `${baseUrl}api/v3/audios?lang=${lang}`;
  console.log(fullUrl);

  return fullUrl;
};

export const getRootLibraryUrl = ({}: GetUrlProps): string => {
  const baseUrl = LOCALHOST_DEBUG
    ? "http://localhost:3000/"
    : "https://runar-java-back.herokuapp.com/";
  const fullUrl = `${baseUrl}api/v2/`;
  console.log(fullUrl);

  return fullUrl;
};
