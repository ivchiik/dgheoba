import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const _styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingTop: 16,
      gap: 10,
    },
    label: {
      fontSize: 14,
      lineHeight: 18,
      color: theme.color.textSecondary,
    },
    row: {
      flexDirection: "row",
      gap: 8,
    },
    chip: {
      flex: 1,
      paddingVertical: 12,
      alignItems: "center",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.color.border,
      backgroundColor: theme.color.surface,
    },
    chipSelected: {
      borderColor: theme.color.primary,
      backgroundColor: theme.color.surfaceRaised,
    },
    chipLabel: {
      fontSize: 16,
      lineHeight: 20,
      color: theme.color.textSecondary,
    },
    chipLabelSelected: {
      color: theme.color.primary,
    },
  });
