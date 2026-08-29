export interface ColorTheme {
  cream100: string;
  cream200: string;

  gray100: string;
  gray600: string;
  gray900: string;
  gray1000: string;

  red500: string;
  red600: string;

  white: string;
  transparent: string;

  background: string;
  surface: string;
  surfaceRaised: string;

  border: string;
  divider: string;

  textPrimary: string;
  textSecondary: string;

  primary: string;
  primaryPressed: string;
  onPrimary: string;
  danger: string;

  inputBackground: string;
  inputBorder: string;
  inputPlaceholder: string;

  tabBar: string;
  tabBarActive: string;
  tabBarInactive: string;
}

export interface Theme {
  color: ColorTheme;
  fontFamily: string;
}

export type StyleFactory<T> = (theme: Theme) => T;
