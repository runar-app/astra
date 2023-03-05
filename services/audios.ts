import { getAudioListUrl } from "../data/url";
import { AudioBook } from "../types/audios";
import { SupportedLanguage } from "../types/lang";

interface GetListOfAudiosProps {
  lang?: SupportedLanguage;
  devMode?: boolean;
}

export const getListOfAudios = async ({ lang, devMode }: GetListOfAudiosProps = {}): Promise<
  AudioBook[]
> => {
  const url = getAudioListUrl({ lang: lang || "en", devMode });

  try {
    let response = await fetch(url);

    let responseJson = (await response.json()) as AudioBook[];
    if (Array.isArray(responseJson)) {
      return responseJson;
    }
    return [];
  } catch (error) {
    console.log("Error fetching audios - getListOfAudios");
    console.error(error);
    return [];
  }
};
