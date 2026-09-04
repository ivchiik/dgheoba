import type { Href } from "expo-router";

export const ROUTES = {
  ENTRY: "/",
  SCAN: "/scan",
  UPLOAD: "/upload",
  ALBUM: "/album",
  SETTINGS: "/settings",
} as const satisfies Record<string, Href>;

/**
 * Dynamic routes cannot be plain strings under typed routes — the pathname has to stay a
 * known template with params passed separately.
 */
export const mediaRoute = (id: string) =>
  ({ pathname: "/media/[id]", params: { id } }) satisfies Href;
