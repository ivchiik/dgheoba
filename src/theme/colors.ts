import type { ColorTheme } from "./theme.types";

const palette = {
  cream100: "#F3ECDF",
  cream200: "#D8D3C7",

  gray100: "#F5F5F6",
  gray600: "#6E6E76",
  gray900: "#15151A",
  gray1000: "#0B0B0E",

  red500: "#B40000",
  red600: "#A40200",

  white: "#FFFFFF",
  transparent: "transparent",
} as const;

export const COLORS: ColorTheme = {
  ...palette,

  background: palette.cream100,
  surface: palette.gray100,
  surfaceRaised: palette.white,

  border: palette.cream200,
  divider: palette.cream200,

  textPrimary: palette.gray900,
  textSecondary: palette.gray600,

  primary: palette.red500,
  primaryPressed: palette.red600,
  onPrimary: palette.white,
  danger: palette.red500,

  inputBackground: palette.gray100,
  inputBorder: palette.cream200,
  inputPlaceholder: palette.gray600,

  tabBar: palette.white,
  tabBarActive: palette.gray900,
  tabBarInactive: palette.gray600,
};
