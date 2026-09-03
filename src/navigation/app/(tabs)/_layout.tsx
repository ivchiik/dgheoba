import { useTranslation } from "react-i18next";
import { Tabs } from "expo-router/js-tabs";

import { AppTabBar, tabOptions } from "@/navigation";
import { useTheme } from "@/theme";

export default function TabsLayout() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Tabs screenOptions={tabOptions(theme)} tabBar={(props) => <AppTabBar {...props} />}>
      <Tabs.Screen name="upload" options={{ title: t("tabs.upload") }} />
      <Tabs.Screen name="album" options={{ title: t("tabs.album") }} />
    </Tabs>
  );
}
