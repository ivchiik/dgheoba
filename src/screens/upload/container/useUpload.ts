import { useState } from "react";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import { ROUTES } from "@/navigation";
import { storage, STORAGE_KEYS } from "@/storage";
import { formatShortName } from "@/utils";

export const useUpload = () => {
  const guestName = formatShortName(storage.getStringValue(STORAGE_KEYS.guestName) ?? "");

  const [pickedMedia, setPickedMedia] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [isPicking, setIsPicking] = useState(false);

  const handleAddMedia = async () => {
    if (isPicking) return;
    setIsPicking(true);

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        allowsMultipleSelection: true,
        allowsEditing: false,
        quality: 1,
      });

      if (result.canceled) return;

      // TODO: upload result.assets to the backend; until then they are only counted.
      setPickedMedia((current) => [...current, ...result.assets]);
    } catch (cause) {
      console.warn("[upload] picking media failed", cause);
    } finally {
      setIsPicking(false);
    }
  };

  const handleViewAlbum = () => router.navigate(ROUTES.ALBUM);

  return {
    guestName,
    uploadedCount: pickedMedia.length,
    isPicking,
    handleAddMedia,
    handleViewAlbum,
  };
};
