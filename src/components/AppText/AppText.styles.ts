import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const _styles = (theme: Theme) =>
  StyleSheet.create({
    textStyle: {
      fontFamily: theme.fontFamily,
      color: theme.color.textPrimary,
    },
  });
