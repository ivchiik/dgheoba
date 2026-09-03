import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const _styles = (theme: Theme) =>
  StyleSheet.create({
    bar: {
      flexDirection: "row",
      backgroundColor: theme.color.tabBar,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: theme.color.divider,
    },

    tab: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 18,
      paddingBottom: 8,
      gap: 8,
    },

    label: {
      fontSize: 14,
      lineHeight: 18,
      color: theme.color.tabBarInactive,
    },

    labelFocused: {
      color: theme.color.tabBarActive,
    },

    indicator: {
      width: 20,
      height: 2,
      borderRadius: 1,
      backgroundColor: theme.color.tabBarActive,
    },
  });
