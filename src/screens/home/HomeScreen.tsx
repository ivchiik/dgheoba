import { View } from "react-native";

import { AppText, Screen } from "@/components";
import { useTheme } from "@/theme";

import { _styles } from "./Home.styles";
import { useHome } from "./container/useHome";

import QRScanner from "@/assets/icons/QRScanner.svg";

export const HomeScreen = () => {
  const { styles } = useTheme(_styles);
  useHome();

  return (
    <Screen edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <QRScanner />
        <AppText style={styles.title}>home.title</AppText>
      </View>
    </Screen>
  );
};
