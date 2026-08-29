import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const _styles = (_theme: Theme) =>
  StyleSheet.create({
    fills: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });
