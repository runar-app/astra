import { getLibraryUrl } from "../data/url";
import { SupportedLanguage } from "../types/Lang";
import { LibraryNode } from "../types/Library";

interface GetRootLibraryNodesProps {
  lang?: SupportedLanguage;
  id?: string;
}

export const getLibraryNodes = async ({ lang, id }: GetRootLibraryNodesProps = {}): Promise<
  LibraryNode[]
> => {
  const url = getLibraryUrl({ lang: lang || "en", id });

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
