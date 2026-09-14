import { useSyncExternalStore } from "react";
import type { ImagePickerAsset } from "expo-image-picker";

import { getVideoThumbnail } from "@/utils";

import type { AlbumMedia } from "./media.types";

let media: AlbumMedia[] = [];
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((listener) => listener());

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => media;

const toAlbumMedia = (asset: ImagePickerAsset, uploadedBy: string): AlbumMedia => ({
  id: asset.assetId ?? asset.uri,
  uri: asset.uri,
  kind: asset.type === "video" || asset.type === "pairedVideo" ? "video" : "image",
  uploadedBy,
  isMine: true,
  uploadedAt: Date.now(),
  fileSize: asset.fileSize,
  durationMs: asset.duration ?? undefined,
});

const attachThumbnails = (items: AlbumMedia[]) => {
  items
    .filter((item) => item.kind === "video")
    .forEach(async (item) => {
      const thumbnailUri = await getVideoThumbnail(item.uri);
      if (!thumbnailUri) return;

      if (!media.some((current) => current.id === item.id)) return;

      media = media.map((current) =>
        current.id === item.id ? { ...current, thumbnailUri } : current
      );
      emit();
    });
};

export const addPickedMedia = (assets: ImagePickerAsset[], uploadedBy: string) => {
  if (assets.length === 0) return;

  const existingIds = new Set(media.map((item) => item.id));
  const added = assets
    .map((asset) => toAlbumMedia(asset, uploadedBy))
    .filter((item) => !existingIds.has(item.id));

  if (added.length === 0) return;

  media = [...media, ...added];
  emit();

  attachThumbnails(added);
};

export const removeMedia = (id: string) => {
  const next = media.filter((item) => item.id !== id);
  if (next.length === media.length) return;

  media = next;
  emit();
};

export const useMedia = () => useSyncExternalStore(subscribe, getSnapshot);
