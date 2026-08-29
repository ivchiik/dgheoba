import type { Href } from "expo-router";

export const ROUTES = {
  ENTRY: "/",
  HOME: "/home",
  SETTINGS: "/settings",
} as const satisfies Record<string, Href>;
