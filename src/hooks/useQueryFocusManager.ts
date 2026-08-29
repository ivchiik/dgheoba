import { useEffect } from "react";
import { AppState, type AppStateStatus } from "react-native";
import { focusManager } from "@tanstack/react-query";

/**
 * Native equivalent of window focus: tells React Query the app is active again so
 * `refetchOnMount`-style freshness rules behave the way they do on the web.
 *
 * Mount once, in the root layout. Never per screen.
 */
export const useQueryFocusManager = () => {
  useEffect(() => {
    const handleChange = (status: AppStateStatus) => {
      focusManager.setFocused(status === "active");
    };

    const subscription = AppState.addEventListener("change", handleChange);

    return () => subscription.remove();
  }, []);
};
