import { Text } from "react-native";
import { useTranslation } from "react-i18next";

import { useTheme } from "@/theme";

import { _styles } from "./AppText.styles";
import type { AppTextProps } from "./AppText.types";

export const AppText = ({ style, children, ...rest }: AppTextProps) => {
  const { styles } = useTheme(_styles);
  const { t } = useTranslation();

  const content = typeof children === "string" ? t(children as never) : children;

  return (
    <Text allowFontScaling={false} style={[styles.textStyle, style]} {...rest}>
      {content}
    </Text>
  );
};
