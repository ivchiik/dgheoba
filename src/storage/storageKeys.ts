export const STORAGE_KEYS = {
  language: "i18n.language",
  guestName: "session.guestName",
  albumCode: "session.albumCode",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
