import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { BottomTabBarProps } from "expo-router/js-tabs";

import { AppText } from "@/components";
import { useTheme } from "@/theme";

import { _styles } from "./AppTabBar.styles";

export const AppTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { styles } = useTheme(_styles);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const label = options.title ?? route.name;

        const handlePress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={handlePress}
            style={styles.tab}
            accessibilityRole="button"
            accessibilityState={{ selected: isFocused }}
          >
            <AppText style={[styles.label, isFocused && styles.labelFocused]}>{label}</AppText>
            {isFocused && <View style={styles.indicator} />}
          </Pressable>
        );
      })}
    </View>
  );
};
