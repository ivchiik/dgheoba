import type { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClientProvider } from "@tanstack/react-query";

import "@/i18n/i18n";
import { queryClient } from "@/api";
import { useQueryFocusManager } from "@/hooks/useQueryFocusManager";

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
