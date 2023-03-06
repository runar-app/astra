import { currentLanguage } from "../data/lang";
import { getAudioListUrl } from "../data/url";
import { AudioBook } from "../../common/AudioBook";
import { SupportedLanguage } from "../types/Lang";

interface GetListOfAudiosProps {
  lang?: SupportedLanguage;
}

/*
https://runar-viking.vercel.app/api/v3/audios?lang=ru

https://runar-viking.vercel.app/api/v3/audios?lang=en
*/
const cache: Record<string, AudioBook[]> = {};
export const getListOfAudios = async ({ lang }: GetListOfAudiosProps = {}): Promise<
  AudioBook[]
> => {
  const cacheKey = `${lang || currentLanguage}${"root"}`;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  const url = getAudioListUrl({ lang: lang || currentLanguage });

  try {
    let response = await fetch(url);

    let responseJson = (await response.json()) as AudioBook[];
    if (Array.isArray(responseJson)) {
      cache[cacheKey] = responseJson;
      return responseJson;
    }
    return [];
  } catch (error) {
    console.log("Error fetching audios - getListOfAudios");
    console.error(error);
    return [];
  }
};
