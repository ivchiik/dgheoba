import { useTranslation } from "react-i18next";
import { Tabs } from "expo-router/js-tabs";
import { SymbolView } from "expo-symbols";

import { tabOptions } from "@/navigation";
import { useTheme } from "@/theme";

const TAB_ICON_SIZE = 24;

export default function TabsLayout() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Tabs screenOptions={tabOptions(theme)}>
      <Tabs.Screen
        name="home"
        options={{
          title: t("tabs.home"),
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: "house.fill", android: "home" }}
              tintColor={color}
              size={TAB_ICON_SIZE}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: t("tabs.settings"),
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: "gearshape.fill", android: "settings" }}
              tintColor={color}
              size={TAB_ICON_SIZE}
            />
          ),
        }}
      />
    </Tabs>
  );
}
