import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const _styles = (theme: Theme) =>
  StyleSheet.create({
    content: {
      paddingHorizontal: 0,
    },

    wordmarkBand: {
      alignItems: "center",
      paddingVertical: 12,
      backgroundColor: theme.color.background,
    },

    wordmark: {
      fontSize: 22,
      lineHeight: 28,
      letterSpacing: 1,
      color: theme.color.primary,
    },

    body: {
      flex: 1,
      backgroundColor: theme.color.surface,
      paddingHorizontal: 20,
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
    },

    hint: {
      fontSize: 13,
      lineHeight: 18,
      textAlign: "center",
      color: theme.color.textSecondary,
    },

    entryPanel: {
      backgroundColor: theme.color.background,
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 12,
      gap: 16,
    },
  });
