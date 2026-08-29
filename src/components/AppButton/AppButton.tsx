import { useEffect, useRef } from "react";
import { ActivityIndicator, Pressable, type GestureResponderEvent } from "react-native";

import { useTheme } from "@/theme";

import { AppText } from "../AppText/AppText";

import { _styles } from "./AppButton.styles";
import type { AppButtonProps } from "./AppButton.types";

const DOUBLE_TAP_GUARD_MS = 600;

export const AppButton = ({
  title,
  variant = "primary",
  icon,
  isLoading = false,
  disabled = false,
  style,
  onPress,
  ...rest
}: AppButtonProps) => {
  const { styles, theme } = useTheme(_styles);

  const isGuarded = useRef(false);
  const guardTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (guardTimeout.current) clearTimeout(guardTimeout.current);
    },
    []
  );

  const handlePress = (event: GestureResponderEvent) => {
    if (isGuarded.current) return;

    isGuarded.current = true;
    guardTimeout.current = setTimeout(() => {
      isGuarded.current = false;
    }, DOUBLE_TAP_GUARD_MS);

    onPress?.(event);
  };

  const isBlocked = disabled || isLoading;
  const isPrimary = variant === "primary";

  return (
    <Pressable
      disabled={isBlocked}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.base,
        isPrimary ? styles.primary : styles.outline,
        isBlocked && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={isPrimary ? theme.color.onPrimary : theme.color.primary}
        />
      ) : (
        <>
          {icon}
          <AppText style={[styles.label, isPrimary ? styles.primaryLabel : styles.outlineLabel]}>
            {title}
          </AppText>
        </>
      )}
    </Pressable>
  );
};
