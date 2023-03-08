import { getDB } from "../lib/mongodb";
import { AudioBook } from "../../common/AudioBook";
import { LibraryNode } from "../../common/LibraryNode";

const getParentElement = (childId: string, allNodes: LibraryNode[]): LibraryNode | null => {
  const parent = allNodes.find((node) => node.childIds.includes(childId));
  return parent || null;
};

const cache: Map<string, AudioBook[]> = new Map();

export const getAudioBooks = async (lang: string): Promise<AudioBook[]> => {
  const cacheKey = `${lang}`;
  const cacheObject = cache.get(cacheKey);
  if (cacheObject) {
    console.log("Return from cache audios");
    return cacheObject;
  }
  console.log("New request for audios", lang);

  const db = await getDB();
  const collectionName = `library_${lang}_notes`;
  const collection = db.collection<LibraryNode>(collectionName);

  const audioBooksNodes = await collection.find().toArray();

  const audios: AudioBook[] = audioBooksNodes
    .filter((node) => node.audioUrl)
    .map((node) => {
      const id = `${node._id}`;
      const parent = getParentElement(id, audioBooksNodes);
      return {
        _id: id,
        title: node.title,
        audioUrl: node.audioUrl,
        duration: node.audioDuration,
        coverImgUrl: node.imageUrl,
        category: parent?.title || "",
        author: "Roman Volkov",
        language: lang,
      };
    });
  cache.set(cacheKey, audios);
  return audios;
};
