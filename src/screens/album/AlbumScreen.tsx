import { FlatList, View } from "react-native";

import { AppText, Screen } from "@/components";
import type { AlbumMedia } from "@/store";
import { useTheme } from "@/theme";

import { _styles, GRID_COLUMNS } from "./Album.styles";
import { AlbumTile } from "./AlbumTile";
import { useAlbum } from "./container/useAlbum";

export const AlbumScreen = () => {
  const { styles } = useTheme(_styles);
  const { eventName, media, totalLabel, myCountLabel, handleOpenMedia } = useAlbum();

  return (
    <Screen edges={["top", "left", "right"]} style={styles.content}>
      <View style={styles.header}>
        <View style={styles.appBar}>
          <AppText style={styles.title}>album.title</AppText>
          <AppText style={styles.eventName}>{eventName}</AppText>
        </View>

        <View style={styles.counts}>
          <AppText style={styles.totalCount}>{totalLabel}</AppText>
          <AppText style={styles.myCount}>{myCountLabel}</AppText>
        </View>
      </View>

      <FlatList
        data={media}
        keyExtractor={(item: AlbumMedia) => item.id}
        renderItem={({ item }) => <AlbumTile item={item} onPress={handleOpenMedia} />}
        numColumns={GRID_COLUMNS}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.grid}
        ListEmptyComponent={<AppText style={styles.empty}>album.empty</AppText>}
      />
    </Screen>
  );
};
