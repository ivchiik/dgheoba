import { View } from "react-native";

import { AppText, Screen } from "@/components";
import { useTheme } from "@/theme";

import { _styles } from "./Album.styles";

export const AlbumScreen = () => {
  const { styles } = useTheme(_styles);

  return (
    <Screen edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <AppText style={styles.title}>album.title</AppText>
      </View>
    </Screen>
  );
};
