import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const TILE_GAP = 2;
export const GRID_COLUMNS = 3;

export const _styles = (theme: Theme) =>
  StyleSheet.create({
    content: {
      paddingHorizontal: 0,
    },

    header: {
      paddingHorizontal: 20,
      backgroundColor: theme.color.background,
    },

    appBar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 10,
    },

    title: {
      fontSize: 20,
      lineHeight: 26,
    },

    eventName: {
      fontSize: 13,
      lineHeight: 16,
      letterSpacing: 2,
      color: theme.color.textSecondary,
    },

    counts: {
      flexDirection: "row",
      alignItems: "center",
      gap: 20,
      paddingBottom: 12,
    },

    totalCount: {
      fontSize: 14,
      lineHeight: 18,
    },

    myCount: {
      fontSize: 14,
      lineHeight: 18,
      color: theme.color.textSecondary,
    },

    grid: {
      gap: TILE_GAP,
      paddingHorizontal: TILE_GAP,
      paddingBottom: TILE_GAP,
    },

    gridRow: {
      gap: TILE_GAP,
    },

    tile: {
      flex: 1,
      aspectRatio: 1,
      backgroundColor: theme.color.surface,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },

    tilePressed: {
      opacity: 0.7,
    },

    tileImage: {
      width: "100%",
      height: "100%",
    },

    empty: {
      textAlign: "center",
      paddingTop: 48,
      paddingHorizontal: 20,
      fontSize: 14,
      lineHeight: 20,
      color: theme.color.textSecondary,
    },
  });
