export const STORAGE_KEYS = {
  language: "i18n.language",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
