import { memo } from "react";
import { Image, Pressable } from "react-native";
import { SymbolView } from "expo-symbols";

import type { AlbumMedia } from "@/store";
import { useTheme } from "@/theme";

import { _styles } from "./Album.styles";

interface AlbumTileProps {
  item: AlbumMedia;
  onPress: (id: string) => void;
}

const VIDEO_GLYPH_SIZE = 28;

const AlbumTileComponent = ({ item, onPress }: AlbumTileProps) => {
  const { styles, theme } = useTheme(_styles);

  return (
    <Pressable
      onPress={() => onPress(item.id)}
      accessibilityRole="button"
      style={({ pressed }) => [styles.tile, pressed && styles.tilePressed]}
    >
      {item.kind === "video" ? (
        <SymbolView
          name={{ ios: "play.circle.fill", android: "play_circle" }}
          tintColor={theme.color.textSecondary}
          size={VIDEO_GLYPH_SIZE}
        />
      ) : (
        <Image source={{ uri: item.uri }} style={styles.tileImage} resizeMode="cover" />
      )}
    </Pressable>
  );
};

export const AlbumTile = memo(
  AlbumTileComponent,
  (previous, next) =>
    previous.item.id === next.item.id &&
    previous.item.uri === next.item.uri &&
    previous.onPress === next.onPress
);
