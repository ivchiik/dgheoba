import type { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClientProvider } from "@tanstack/react-query";

import "@/i18n/i18n";
import { queryClient } from "@/api";
import { useQueryFocusManager } from "@/hooks/useQueryFocusManager";

/**
 * Everything the whole tree needs.
 *
 * GestureHandlerRootView is outermost and must be mounted by hand — expo-router does not
 * add it, and without it gestures silently do nothing. SafeAreaProvider is deliberately
 * absent: expo-router already mounts one. There is no theme provider — the theme is a single
 * static object read directly by `useTheme`.
 */
export const AppProviders = ({ children }: PropsWithChildren) => {
  useQueryFocusManager();

  return (
    <GestureHandlerRootView style={styles.root}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
});
