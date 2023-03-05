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
  console.log(fullUrl);

  return fullUrl;
};
