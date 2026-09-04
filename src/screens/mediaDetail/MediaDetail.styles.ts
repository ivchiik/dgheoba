import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const _styles = (theme: Theme) =>
  StyleSheet.create({
    content: {
      paddingHorizontal: 0,
    },

    appBar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 10,
    },

    backArea: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },

    title: {
      fontSize: 20,
      lineHeight: 26,
    },

    position: {
      fontSize: 14,
      lineHeight: 18,
      color: theme.color.textSecondary,
    },

    stage: {
      flex: 1,
      margin: 20,
      borderRadius: 16,
      overflow: "hidden",
      backgroundColor: theme.color.surface,
      alignItems: "center",
      justifyContent: "center",
    },

    stageImage: {
      width: "100%",
      height: "100%",
    },

    stagePlaceholder: {
      fontSize: 14,
      lineHeight: 18,
      color: theme.color.textSecondary,
    },

    footer: {
      paddingHorizontal: 20,
      paddingBottom: 12,
      gap: 16,
    },

    meta: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },

    metaText: {
      fontSize: 14,
      lineHeight: 18,
      color: theme.color.textSecondary,
    },

    actions: {
      flexDirection: "row",
      gap: 12,
    },

    action: {
      flex: 1,
    },

    missing: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 32,
    },

    missingText: {
      fontSize: 16,
      lineHeight: 22,
      textAlign: "center",
      color: theme.color.textSecondary,
    },
  });
