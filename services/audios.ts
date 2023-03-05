import { getAudioListUrl } from "../data/url";
import { AudioBook } from "../types/Audio";
import { SupportedLanguage } from "../types/Lang2";

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
