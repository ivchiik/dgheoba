import { Pressable, View } from "react-native";
import { SymbolView } from "expo-symbols";

import { AppLoader, AppText, Screen } from "@/components";
import { useTheme } from "@/theme";

import { _styles } from "./Upload.styles";
import { useUpload } from "./container/useUpload";

const PLUS_SIZE = 32;

export const UploadScreen = () => {
  const { styles, theme } = useTheme(_styles);
  const { guestName, uploadedCount, isPicking, handleAddMedia, handleViewAlbum } = useUpload();

  return (
    <Screen edges={["top", "left", "right"]} style={styles.content}>
      <View style={styles.appBar}>
        <AppText style={styles.eventLabel}>upload.eventLabel</AppText>
        <AppText style={styles.guestName}>{guestName}</AppText>
      </View>

      <Pressable
        onPress={handleAddMedia}
        disabled={isPicking}
        accessibilityRole="button"
        style={({ pressed }) => [styles.dropzone, pressed && styles.dropzonePressed]}
      >
        {isPicking ? (
          <AppLoader />
        ) : (
          <>
            <SymbolView
              name={{ ios: "plus", android: "add" }}
              tintColor={theme.color.textPrimary}
              size={PLUS_SIZE}
            />
            <AppText style={styles.dropzoneTitle}>upload.addMedia</AppText>
            <AppText style={styles.dropzoneHint}>upload.addMediaHint</AppText>
          </>
        )}
      </Pressable>

      <View style={styles.countCard}>
        <View>
          <AppText style={styles.countValue}>{String(uploadedCount)}</AppText>
          <AppText style={styles.countLabel}>upload.uploadedCount</AppText>
        </View>

        <Pressable onPress={handleViewAlbum} accessibilityRole="button">
          <AppText style={styles.viewAlbum}>upload.viewAlbum</AppText>
        </Pressable>
      </View>
    </Screen>
  );
};
