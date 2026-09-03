import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const _styles = (theme: Theme) =>
  StyleSheet.create({
    content: {
      paddingHorizontal: 20,
      paddingTop: 4,
      paddingBottom: 12,
      gap: 16,
    },

    appBar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 14,
    },

    eventLabel: {
      fontSize: 13,
      lineHeight: 16,
      letterSpacing: 2,
      color: theme.color.textPrimary,
    },

    guestName: {
      fontSize: 14,
      lineHeight: 18,
      color: theme.color.textSecondary,
    },

    dropzone: {
      flex: 1,
      borderRadius: 20,
      backgroundColor: theme.color.surface,
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },

    dropzonePressed: {
      opacity: 0.7,
    },

    dropzoneTitle: {
      fontSize: 20,
      lineHeight: 26,
      marginTop: 8,
    },

    dropzoneHint: {
      fontSize: 13,
      lineHeight: 18,
      color: theme.color.textSecondary,
    },

    countCard: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 16,
      backgroundColor: theme.color.surface,
      padding: 16,
    },

    countValue: {
      fontSize: 24,
      lineHeight: 30,
    },

    countLabel: {
      fontSize: 13,
      lineHeight: 18,
      color: theme.color.textSecondary,
    },

    viewAlbum: {
      fontSize: 14,
      lineHeight: 18,
      color: theme.color.textPrimary,
    },
  });
