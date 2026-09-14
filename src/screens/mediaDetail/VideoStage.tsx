import { useEffect } from "react";
import { useIsFocused } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";

import { useTheme } from "@/theme";

import { _styles } from "./MediaDetail.styles";

interface VideoStageProps {
  uri: string;
}

export const VideoStage = ({ uri }: VideoStageProps) => {
  const { styles } = useTheme(_styles);
  const isFocused = useIsFocused();

  const player = useVideoPlayer(uri, (instance) => {
    instance.loop = false;
  });

  useEffect(() => {
    if (!isFocused) player.pause();
  }, [isFocused, player]);

  return (
    <VideoView
      style={styles.stageVideo}
      player={player}
      nativeControls
      contentFit="contain"
      fullscreenOptions={{ enable: true }}
    />
  );
};
