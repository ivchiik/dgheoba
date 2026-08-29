import type { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform, View, type StyleProp, type ViewStyle } from "react-native";
import { SafeAreaView, type Edge } from "react-native-safe-area-context";

import { useTheme } from "@/theme";

import { _styles } from "./Screen.styles";

interface ScreenProps extends PropsWithChildren {
  /**
   * Which insets to apply. Screens inside a tab or header navigator usually want to drop
   * the edge that navigator already covers.
   */
  edges?: readonly Edge[];
  avoidsKeyboard?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Standard screen shell: themed background, safe-area insets, optional keyboard avoidance.
 *
 * No SafeAreaProvider anywhere in this app — expo-router mounts one itself, and nesting a
 * second provider yields wrong insets.
 */
export const Screen = ({
  edges = ["top", "bottom", "left", "right"],
  avoidsKeyboard = false,
  style,
  children,
}: ScreenProps) => {
  const { styles } = useTheme(_styles);

  return (
    <SafeAreaView edges={edges} style={styles.root}>
      {avoidsKeyboard ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={[styles.content, style]}
        >
          {children}
        </KeyboardAvoidingView>
      ) : (
        <View style={[styles.content, style]}>{children}</View>
      )}
    </SafeAreaView>
  );
};
