import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";

import { mediaRoute } from "@/navigation";
import { storage, STORAGE_KEYS } from "@/storage";
import { useMedia } from "@/store";

export const useAlbum = () => {
  const { t } = useTranslation();
  const media = useMedia();

  const handleOpenMedia = useCallback((id: string) => {
    router.push(mediaRoute(id));
  }, []);

  return {
    eventName: storage.getStringValue(STORAGE_KEYS.albumCode) ?? "",
    media,
    totalLabel: t("album.total", { value: media.length }),
    myCountLabel: t("album.mine", { value: media.length }),
    handleOpenMedia,
  };
};
