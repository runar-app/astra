import { getRootLibraryUrl } from "../data/url";
import { AudioBook } from "../types/Audio";
import { SupportedLanguage } from "../types/Lang";
import { LibraryNode } from "../types/Library";

interface GetRootLibraryNodesProps {
  lang?: SupportedLanguage;
}

export const getRootLibraryNodes = async ({ lang }: GetRootLibraryNodesProps = {}): Promise<
  LibraryNode[]
> => {
  const url = getRootLibraryUrl({ lang: lang || "en" });

  try {
    let response = await fetch(url);

    let responseJson = (await response.json()) as LibraryNode[];
    if (Array.isArray(responseJson)) {
      return responseJson;
    }
    return [];
  } catch (error) {
    console.log("Error fetching audios - getRootLibraryNodes");
    console.error(error);
    return [];
  }
};
