import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const _styles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      alignSelf: "stretch",
      backgroundColor: theme.color.surfaceRaised,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: theme.color.border,
      padding: 20,
      gap: 20,
    },

    dividerRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },

    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.color.border,
    },

    dividerLabel: {
      fontSize: 16,
      lineHeight: 20,
      color: theme.color.textPrimary,
    },
  });
