import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const _styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: 8,
    },

    label: {
      fontSize: 14,
      lineHeight: 18,
      color: theme.color.textSecondary,
    },

    input: {
      minHeight: 56,
      paddingHorizontal: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.color.inputBorder,
      backgroundColor: theme.color.inputBackground,
      color: theme.color.textPrimary,
      fontFamily: theme.fontFamily,
      fontSize: 17,
    },

    focused: {
      borderColor: theme.color.primary,
    },

    errored: {
      borderColor: theme.color.danger,
    },

    errorText: {
      fontSize: 14,
      lineHeight: 18,
      color: theme.color.danger,
    },
  });
