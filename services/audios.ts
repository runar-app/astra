import { getAudioListUrl } from "../data/url";
import { AudioBook } from "../types/Audio";
import { SupportedLanguage } from "../types/Lang";

interface GetListOfAudiosProps {
  lang?: SupportedLanguage;
}

export const getListOfAudios = async ({ lang }: GetListOfAudiosProps = {}): Promise<
  AudioBook[]
> => {
  const url = getAudioListUrl({ lang: lang || "en" });

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
