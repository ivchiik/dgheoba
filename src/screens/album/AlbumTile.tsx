import { memo } from "react";
import { Image, Pressable, View } from "react-native";
import { SymbolView } from "expo-symbols";

import type { AlbumMedia } from "@/store";
import { useTheme } from "@/theme";

import { _styles } from "./Album.styles";

interface AlbumTileProps {
  item: AlbumMedia;
  onPress: (id: string) => void;
}

const BADGE_GLYPH_SIZE = 12;
const PENDING_GLYPH_SIZE = 28;

const AlbumTileComponent = ({ item, onPress }: AlbumTileProps) => {
  const { styles, theme } = useTheme(_styles);

  const isVideo = item.kind === "video";
  const previewUri = isVideo ? item.thumbnailUri : item.uri;

  return (
    <Pressable
      onPress={() => onPress(item.id)}
      accessibilityRole="button"
      style={({ pressed }) => [styles.tile, pressed && styles.tilePressed]}
    >
      {previewUri ? (
        <Image source={{ uri: previewUri }} style={styles.tileImage} resizeMode="cover" />
      ) : (
        <SymbolView
          name={{ ios: "play.circle.fill", android: "play_circle" }}
          tintColor={theme.color.textSecondary}
          size={PENDING_GLYPH_SIZE}
        />
      )}

      {isVideo && !!previewUri && (
        <View style={styles.videoBadge}>
          <SymbolView
            name={{ ios: "play.fill", android: "play_arrow" }}
            tintColor={theme.color.white}
            size={BADGE_GLYPH_SIZE}
          />
        </View>
      )}
    </Pressable>
  );
};

export const AlbumTile = memo(
  AlbumTileComponent,
  (previous, next) =>
    previous.item.id === next.item.id &&
    previous.item.uri === next.item.uri &&
    previous.item.thumbnailUri === next.item.thumbnailUri &&
    previous.onPress === next.onPress
);
