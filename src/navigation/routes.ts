import type { Href } from "expo-router";

export const ROUTES = {
  ENTRY: "/",
  SCAN: "/scan",
  HOME: "/home",
  SETTINGS: "/settings",
} as const satisfies Record<string, Href>;
