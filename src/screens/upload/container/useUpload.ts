import { useRef, useState } from "react";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import { ROUTES } from "@/navigation";
import { storage, STORAGE_KEYS } from "@/storage";
import { addPickedMedia, useMedia } from "@/store";
import { formatShortName } from "@/utils";

export const useUpload = () => {
  const guestName = formatShortName(storage.getStringValue(STORAGE_KEYS.guestName) ?? "");

  const media = useMedia();
  const [isPicking, setIsPicking] = useState(false);
  const isPickingRef = useRef(false);

  const handleAddMedia = async () => {
    if (isPickingRef.current) return;
    isPickingRef.current = true;
    setIsPicking(true);

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        allowsMultipleSelection: true,
        allowsEditing: false,
        quality: 1,
      });

      if (result.canceled) return;

      // TODO: upload result.assets to the backend; until then they are only held in memory.
      addPickedMedia(result.assets, storage.getStringValue(STORAGE_KEYS.guestName) ?? "");
    } catch (cause) {
      console.warn("[upload] picking media failed", cause);
    } finally {
      isPickingRef.current = false;
      setIsPicking(false);
    }
  };

  const handleViewAlbum = () => router.navigate(ROUTES.ALBUM);

  return {
    guestName,
    uploadedCount: media.length,
    isPicking,
    handleAddMedia,
    handleViewAlbum,
  };
};
