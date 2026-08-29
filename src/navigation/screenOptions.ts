import type { NativeStackNavigationOptions } from "expo-router";
import type { BottomTabNavigationOptions } from "expo-router/js-tabs";

import type { Theme } from "@/theme";

export const stackOptions = (theme: Theme): NativeStackNavigationOptions => ({
  headerShown: false,
  contentStyle: { backgroundColor: theme.color.background },
});

export const tabOptions = (theme: Theme): BottomTabNavigationOptions => ({
  headerShown: false,
  tabBarActiveTintColor: theme.color.tabBarActive,
  tabBarInactiveTintColor: theme.color.tabBarInactive,
  tabBarStyle: {
    backgroundColor: theme.color.tabBar,
    borderTopColor: theme.color.divider,
  },
  tabBarLabelStyle: {
    fontFamily: theme.fontFamily,
    fontSize: 12,
  },
  sceneStyle: { backgroundColor: theme.color.background },
});
