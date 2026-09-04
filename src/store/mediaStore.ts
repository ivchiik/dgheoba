import { useSyncExternalStore } from "react";
import type { ImagePickerAsset } from "expo-image-picker";

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
});

export const addPickedMedia = (assets: ImagePickerAsset[], uploadedBy: string) => {
  if (assets.length === 0) return;

  media = [...media, ...assets.map((asset) => toAlbumMedia(asset, uploadedBy))];
  emit();
};

export const removeMedia = (id: string) => {
  const next = media.filter((item) => item.id !== id);
  if (next.length === media.length) return;

  media = next;
  emit();
};

export const useMedia = () => useSyncExternalStore(subscribe, getSnapshot);
