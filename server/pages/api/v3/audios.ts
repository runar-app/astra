import { NextApiRequest, NextApiResponse } from "next";
import { getAudioBooks } from "../../../repository/audioBooks";
import { AudioBook } from "@/../common/AudioBook";

export default async function handler(req: NextApiRequest, res: NextApiResponse<AudioBook[]>) {
  try {
    const lang = `${req.query.lang}` || "en";
    const audios = await getAudioBooks(lang);
    res.json(audios);
  } catch (e) {
    console.error(e);
  }
}
