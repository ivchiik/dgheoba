import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const _styles = (theme: Theme) =>
  StyleSheet.create({
    base: {
      minHeight: 56,
      paddingHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.color.transparent,
    },

    primary: {
      backgroundColor: theme.color.primary,
    },

    outline: {
      backgroundColor: theme.color.surfaceRaised,
      borderColor: theme.color.primary,
    },

    label: {
      fontSize: 17,
      lineHeight: 22,
    },

    primaryLabel: {
      color: theme.color.onPrimary,
    },

    outlineLabel: {
      color: theme.color.primary,
    },

    disabled: {
      opacity: 0.45,
    },

    pressed: {
      opacity: 0.7,
      transform: [{ scale: 0.96 }],
    },
  });
