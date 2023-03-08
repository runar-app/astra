import { getDB } from "../lib/mongodb";
import { LibraryNode } from "../../common/LibraryNode";
import { ObjectId } from "mongodb";

const cache: Map<string, LibraryNode[]> = new Map();

export const getRootLibraryNodes = async (lang: string): Promise<LibraryNode[]> => {
  const cacheKey = `${lang}`;
  const cacheObject = cache.get(cacheKey);
  if (cacheObject) {
    console.log("Return from cache getRootLibraryNodes");
    return cacheObject;
  }
  console.log("New request for getRootLibraryNodes", lang);

  const db = await getDB();
  const collectionName = `library_${lang}_notes`;
  const collection = db.collection<LibraryNode>(collectionName);
  const nodes = await collection.find({ type: "root" }).toArray();
  return nodes;
};

export const getChildLibraryNodes = async (
  lang: string,
  parentId: string
): Promise<LibraryNode[]> => {
  const cacheKey = `${lang}${parentId}`;
  const cacheObject = cache.get(cacheKey);
  if (cacheObject) {
    console.log("Return from cache getChildLibraryNodes");
    return cacheObject;
  }
  console.log("New request for getChildLibraryNodes", lang, parentId);
  const db = await getDB();
  const collectionName = `library_${lang}_notes`;
  const collection = db.collection<LibraryNode>(collectionName);

  const searchCriteria = { _id: new ObjectId(parentId) } as unknown as LibraryNode;
  const parentNode = await collection.findOne(searchCriteria);

  if (!parentNode) {
    return [];
  }

  const childRequest = parentNode.childIds.map(async (id) => {
    const searchCriteria = { _id: new ObjectId(id) } as unknown as LibraryNode;
    const childNode = await collection.findOne(searchCriteria);
    return childNode;
  });

  const childNodes = await Promise.all(childRequest);
  const childNodesClear: LibraryNode[] = [];
  childNodes.forEach((node) => {
    if (!node) {
      return;
    }
    childNodesClear.push(node);
  });
  cache.set(cacheKey, childNodesClear);
  return childNodesClear;
};
