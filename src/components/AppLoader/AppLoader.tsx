import { ActivityIndicator, View } from "react-native";

import { useTheme } from "@/theme";

import { _styles } from "./AppLoader.styles";

interface AppLoaderProps {
  size?: "small" | "large";
  fills?: boolean;
}

export const AppLoader = ({ size = "large", fills = false }: AppLoaderProps) => {
  const { styles, theme } = useTheme(_styles);

  return (
    <View style={fills && styles.fills}>
      <ActivityIndicator size={size} color={theme.color.primary} />
    </View>
  );
};
