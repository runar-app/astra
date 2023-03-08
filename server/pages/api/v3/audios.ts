import { NextApiRequest, NextApiResponse } from "next";
import { getAudioBooks } from "../../../repository/audioBooks";
import { AudioBook } from "@/../common/AudioBook";

export default async function handler(req: NextApiRequest, res: NextApiResponse<AudioBook[]>) {
  try {
    const lang = `${req.query.lang}` || "en";
    const audiosRu = await getAudioBooks("ru");
    const audiosEn = await getAudioBooks("en");
    let constFullAudiosList: AudioBook[] = [];

    if (lang === "ru") {
      constFullAudiosList = [...audiosRu, ...audiosEn];
    } else {
      constFullAudiosList = [...audiosEn, ...audiosRu];
    }

    res.json(constFullAudiosList);
  } catch (e) {
    console.error(e);
  }
}
