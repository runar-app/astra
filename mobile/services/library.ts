import { currentLanguage } from "../data/lang";
import { getLibraryUrl } from "../data/url";
import { SupportedLanguage } from "../types/Lang";
import { LibraryNode } from "../../common/LibraryNode";

interface GetRootLibraryNodesProps {
  lang?: SupportedLanguage;
  id?: string;
}

const cache: Record<string, LibraryNode[]> = {};

/*
https://runar-java-back.herokuapp.com/api/v2/

https://runar-java-back.herokuapp.com/api/v2/6063944687bafbb125aefdeb
*/
export const getLibraryNodes = async ({ lang, id }: GetRootLibraryNodesProps = {}): Promise<
  LibraryNode[]
> => {
  const cacheKey = `${lang || currentLanguage}${id || "root"}`;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  const url = getLibraryUrl({ lang: lang || currentLanguage, id });

  try {
    let response = await fetch(url);

    let responseJson = (await response.json()) as LibraryNode[];
    if (Array.isArray(responseJson)) {
      cache[cacheKey] = responseJson;
      return responseJson;
    }
    return [];
  } catch (error) {
    console.log("Error fetching audios - getRootLibraryNodes");
    console.error(error);
    return [];
  }
};
