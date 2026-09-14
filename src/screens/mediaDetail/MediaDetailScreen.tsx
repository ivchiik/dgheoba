import { Image, Pressable, View } from "react-native";
import { SymbolView } from "expo-symbols";

import { AppButton, AppText, Screen } from "@/components";
import { useTheme } from "@/theme";

import { _styles } from "./MediaDetail.styles";
import { VideoStage } from "./VideoStage";
import { useMediaDetail } from "./container/useMediaDetail";

const ICON_SIZE = 22;

export const MediaDetailScreen = () => {
  const { styles, theme } = useTheme(_styles);
  const {
    item,
    positionLabel,
    uploaderLabel,
    detailsLabel,
    handleClose,
    handleDownload,
    handleDelete,
  } = useMediaDetail();

  const renderAppBar = () => (
    <View style={styles.appBar}>
      <Pressable onPress={handleClose} style={styles.backArea} accessibilityRole="button">
        <SymbolView
          name={{ ios: "chevron.left", android: "arrow_back" }}
          tintColor={theme.color.textPrimary}
          size={ICON_SIZE}
        />
        <AppText style={styles.title}>album.title</AppText>
      </Pressable>

      <AppText style={styles.position}>{positionLabel}</AppText>
    </View>
  );

  if (!item) {
    return (
      <Screen style={styles.content}>
        {renderAppBar()}
        <View style={styles.missing}>
          <AppText style={styles.missingText}>media.missing</AppText>
        </View>
      </Screen>
    );
  }

  return (
    <Screen style={styles.content}>
      {renderAppBar()}

      <View style={styles.stage}>
        {item.kind === "video" ? (
          <VideoStage uri={item.uri} />
        ) : (
          <Image source={{ uri: item.uri }} style={styles.stageImage} resizeMode="contain" />
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.meta}>
          <AppText style={styles.metaText}>{uploaderLabel}</AppText>
          <AppText style={styles.metaText}>{detailsLabel}</AppText>
        </View>

        <View style={styles.actions}>
          <AppButton title="media.download" onPress={handleDownload} style={styles.action} />

          {item.isMine && (
            <AppButton
              title="media.delete"
              variant="outline"
              onPress={handleDelete}
              style={styles.action}
            />
          )}
        </View>
      </View>
    </Screen>
  );
};
