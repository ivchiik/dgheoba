import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const CUTOUT_SIZE = 320;
export const CUTOUT_RADIUS = 16;
export const SCRIM_OPACITY = 0.6;

const BRACKET_LENGTH = 48;
const BRACKET_WIDTH = 3;

export const _styles = (theme: Theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.color.gray1000,
    },

    bracketLayer: {
      alignItems: "center",
      justifyContent: "center",
    },

    cutoutFrame: {
      width: CUTOUT_SIZE,
      height: CUTOUT_SIZE,
    },

    bracket: {
      position: "absolute",
      width: BRACKET_LENGTH,
      height: BRACKET_LENGTH,
      borderColor: theme.color.white,
    },

    bracketTopLeft: {
      top: -5,
      left: -5,
      borderTopWidth: BRACKET_WIDTH,
      borderLeftWidth: BRACKET_WIDTH,
      borderTopLeftRadius: CUTOUT_RADIUS,
    },

    bracketTopRight: {
      top: -5,
      right: -5,
      borderTopWidth: BRACKET_WIDTH,
      borderRightWidth: BRACKET_WIDTH,
      borderTopRightRadius: CUTOUT_RADIUS,
    },

    bracketBottomLeft: {
      bottom: -5,
      left: -5,
      borderBottomWidth: BRACKET_WIDTH,
      borderLeftWidth: BRACKET_WIDTH,
      borderBottomLeftRadius: CUTOUT_RADIUS,
    },

    bracketBottomRight: {
      bottom: -5,
      right: -5,
      borderBottomWidth: BRACKET_WIDTH,
      borderRightWidth: BRACKET_WIDTH,
      borderBottomRightRadius: CUTOUT_RADIUS,
    },

    chrome: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "space-between",
    },

    topBar: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 8,
    },

    iconButton: {
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
    },

    title: {
      flex: 1,
      textAlign: "center",
      fontSize: 17,
      lineHeight: 22,
      color: theme.color.white,
    },

    bottomBar: {
      paddingHorizontal: 20,
      paddingBottom: 12,
      gap: 12,
    },

    errorText: {
      fontSize: 14,
      lineHeight: 18,
      textAlign: "center",
      color: theme.color.white,
    },

    permissionContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 32,
      gap: 16,
    },

    permissionText: {
      fontSize: 16,
      lineHeight: 22,
      textAlign: "center",
      color: theme.color.white,
    },
  });
