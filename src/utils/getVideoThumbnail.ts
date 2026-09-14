import * as VideoThumbnails from "expo-video-thumbnails";

const FRAME_TIME_MS = 100;
const QUALITY = 0.7;

export const getVideoThumbnail = async (videoUri: string): Promise<string | null> => {
  try {
    const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
      time: FRAME_TIME_MS,
      quality: QUALITY,
    });

    return uri;
  } catch (cause) {
    console.warn("[getVideoThumbnail] could not extract a frame", cause);
    return null;
  }
};
