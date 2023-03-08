import { currentLanguage } from "../data/lang";
import { getAudioListUrl } from "../data/url";
import { AudioBook } from "../../common/AudioBook";
import { SupportedLanguage } from "../types/Lang";
import TrackPlayer, { Capability, Track } from "react-native-track-player";
import { repeatedFetcher } from "./repeatedFetcher";

interface GetListOfAudiosProps {
  lang?: SupportedLanguage;
}

/*
https://runar-viking.vercel.app/api/v3/audios?lang=ru

https://runar-viking.vercel.app/api/v3/audios?lang=en
*/
const cache: Map<string, Promise<AudioBook[]>> = new Map();
export const getListOfAudios = async ({ lang }: GetListOfAudiosProps = {}): Promise<
  AudioBook[]
> => {
  const cacheKey = `${lang || currentLanguage}${"root"}`;

  const cacheObject = cache.get(cacheKey);
  if (cacheObject) {
    return cacheObject;
  }

  const url = getAudioListUrl({ lang: lang || currentLanguage });

  try {
    const responseJson = repeatedFetcher(url);

    cache.set(cacheKey, responseJson);
    return responseJson;
  } catch (error) {
    console.log("Error fetching audios - getListOfAudios");
    console.error(error);
    return [];
  }
};

export const getCurrentPlayedAudio = async () => {
  const audios = await getListOfAudios();

  let trackIndex = await TrackPlayer.getCurrentTrack();
  if (trackIndex === null) {
    return;
  }

  let trackObject = await TrackPlayer.getTrack(trackIndex);
  if (!trackObject) {
    return;
  }

  return audios.find((audio) => audio.audioUrl === trackObject?.url);
};

const setNewAudioList = async (audioTracks: Track[]) => {
  await TrackPlayer.reset();
  await TrackPlayer.add(audioTracks);
};

const convertAudioSourceToTrack = (audioSource: AudioBook): Track => {
  return {
    id: audioSource._id,
    url: audioSource.audioUrl,
    title: audioSource.title,
    artist: audioSource.category,
    artwork: audioSource.coverImgUrl,
  };
};

export const playTrack = async (audioSourceId: string) => {
  const audioSources = await getListOfAudios();
  const sourceAudioIndex = audioSources.findIndex(
    (audioSource) => audioSource._id === audioSourceId
  );
  const audioSource = audioSources.find((audioSource) => audioSource._id === audioSourceId);

  if (!audioSource) {
    return;
  }

  const audioTrack = convertAudioSourceToTrack(audioSource);

  const otherAudioTracksAfter = audioSources
    .filter((audioSource, index) => audioSource._id !== audioSourceId && index > sourceAudioIndex)
    .map((audioSource) => convertAudioSourceToTrack(audioSource));

  const otherAudioTracksBefore = audioSources
    .filter((audioSource, index) => audioSource._id !== audioSourceId && index < sourceAudioIndex)
    .map((audioSource) => convertAudioSourceToTrack(audioSource));

  const audioTracks = [audioTrack, ...otherAudioTracksAfter, ...otherAudioTracksBefore];
  await setNewAudioList(audioTracks);
  await TrackPlayer.play();
};

export const playNextTrack = async () => {
  const audioSources = await getListOfAudios();
  const currentTrack = await getCurrentPlayedAudio();
  if (!currentTrack) {
    return;
  }

  const nextAudioSourceId =
    audioSources.find((_, index) => {
      if (audioSources[index - 1]?._id === currentTrack._id) {
        return audioSources[index];
      }
    })?._id || audioSources[0]._id;

  await playTrack(nextAudioSourceId);
};

export const playPrevTrack = async () => {
  const audioSources = await getListOfAudios();
  const currentTrack = await getCurrentPlayedAudio();
  if (!currentTrack) {
    return;
  }

  const prevAudioSourceId =
    audioSources.find((_, index) => {
      if (audioSources[index + 1]?._id === currentTrack._id) {
        return audioSources[index];
      }
    })?._id || audioSources[audioSources.length - 1]._id;

  await playTrack(prevAudioSourceId);
};

export const playPauseToggler = async (isPlay: boolean) => {
  if (isPlay) {
    await TrackPlayer.play();
  } else {
    await TrackPlayer.pause();
  }
};
