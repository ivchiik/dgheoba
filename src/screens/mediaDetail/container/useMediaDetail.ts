import { useTranslation } from "react-i18next";
import { router, useLocalSearchParams } from "expo-router";

import { removeMedia, useMedia } from "@/store";
import { formatDuration, formatFileSize, formatTime } from "@/utils";

export const useMediaDetail = () => {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<"/media/[id]">();
  const media = useMedia();

  const index = media.findIndex((item) => item.id === id);
  const item = index === -1 ? undefined : media[index];

  const handleClose = () => router.back();

  const handleDownload = () => {
    // TODO: save to the device's photo library. Needs expo-media-library plus a remote URL
    // to fetch — every item currently in the store already came from this device.
  };

  const handleDelete = () => {
    if (!item?.isMine) return;

    removeMedia(item.id);
    router.back();
  };

  const time = item ? formatTime(item.uploadedAt) : "";
  const duration = formatDuration(item?.durationMs);
  const size = formatFileSize(item?.fileSize);

  return {
    item,
    positionLabel: item ? `${index + 1} / ${media.length}` : "",
    uploaderLabel: item ? t("media.uploadedBy", { name: item.uploadedBy }) : "",
    detailsLabel: [time, duration, size].filter(Boolean).join(" · "),
    handleClose,
    handleDownload,
    handleDelete,
  };
};
