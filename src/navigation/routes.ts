import type { Href } from "expo-router";

export const ROUTES = {
  ENTRY: "/",
  SCAN: "/scan",
  UPLOAD: "/upload",
  ALBUM: "/album",
  SETTINGS: "/settings",
} as const satisfies Record<string, Href>;
