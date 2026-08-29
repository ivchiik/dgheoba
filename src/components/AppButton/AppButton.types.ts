import type { ReactNode } from "react";
import type { PressableProps, StyleProp, ViewStyle } from "react-native";

export type AppButtonVariant = "primary" | "outline";

export interface AppButtonProps extends Omit<PressableProps, "style" | "children"> {
  title: string;
  variant?: AppButtonVariant;
  icon?: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}
