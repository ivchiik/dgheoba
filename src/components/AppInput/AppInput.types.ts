import type { StyleProp, TextInputProps, ViewStyle } from "react-native";

export interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
}
