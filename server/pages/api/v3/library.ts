import { NextApiRequest, NextApiResponse } from "next";
import { getChildLibraryNodes, getRootLibraryNodes } from "@/repository/libraryNodes";
import { LibraryNode } from "@/../common/LibraryNode";

export default async function handler(req: NextApiRequest, res: NextApiResponse<LibraryNode[]>) {
  try {
    const lang = `${req.query.lang || ""}` || "en";
    const id = `${req.query.id || ""}`;
    let nodes: LibraryNode[] = [];

    if (id) {
      nodes = await getChildLibraryNodes(lang, id);
    } else {
      nodes = await getRootLibraryNodes(lang);
    }
    res.json(nodes);
  } catch (e) {
    console.error(e);
  }
}
