import { useState } from "react";
import { TextInput, View, type BlurEvent, type FocusEvent } from "react-native";
import { useTranslation } from "react-i18next";

import { useTheme } from "@/theme";

import { AppText } from "../AppText/AppText";

import { _styles } from "./AppInput.styles";
import type { AppInputProps } from "./AppInput.types";

export const AppInput = ({
  label,
  error,
  placeholder,
  containerStyle,
  style,
  onFocus,
  onBlur,
  ...rest
}: AppInputProps) => {
  const { styles, theme } = useTheme(_styles);
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);

  const placeholderText = placeholder ? t(placeholder as never) : undefined;

  const handleFocus = (event: FocusEvent) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: BlurEvent) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {!!label && <AppText style={styles.label}>{label}</AppText>}

      <TextInput
        allowFontScaling={false}
        placeholder={placeholderText}
        placeholderTextColor={theme.color.inputPlaceholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[styles.input, isFocused && styles.focused, !!error && styles.errored, style]}
        {...rest}
      />

      {!!error && <AppText style={styles.errorText}>{error}</AppText>}
    </View>
  );
};
