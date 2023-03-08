import { currentLanguage } from "../data/lang";
import { getLibraryUrl } from "../data/url";
import { SupportedLanguage } from "../types/Lang";
import { LibraryNode } from "../../common/LibraryNode";

interface GetRootLibraryNodesProps {
  lang?: SupportedLanguage;
  id?: string;
}

const cache: Map<string, Promise<LibraryNode[]>> = new Map();
/*
https://runar-java-back.herokuapp.com/api/v2/

https://runar-java-back.herokuapp.com/api/v2/6063944687bafbb125aefdeb
*/

export const getLibraryNodes = async ({ lang, id }: GetRootLibraryNodesProps = {}): Promise<
  LibraryNode[]
> => {
  const cacheKey = `${lang || currentLanguage}${id || "root"}`;
  const cacheObject = cache.get(cacheKey);
  if (cacheObject) {
    return cacheObject;
  }

  const url = getLibraryUrl({ lang: lang || currentLanguage, id });

  try {
    let response = await fetch(url);

    let responseJson = response.json();
    cache.set(cacheKey, responseJson);

    return responseJson;
  } catch (error) {
    console.log("Error fetching audios - getRootLibraryNodes");
    console.error(error);
    return [];
  }
};
