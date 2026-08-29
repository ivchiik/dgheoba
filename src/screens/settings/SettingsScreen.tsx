import { Pressable, View } from "react-native";

import { AppText, Screen } from "@/components";
import { useTheme } from "@/theme";

import { _styles } from "./Settings.styles";
import { useSettings } from "./container/useSettings";

export const SettingsScreen = () => {
  const { styles } = useTheme(_styles);
  const { currentLanguage, languages, handleSelectLanguage } = useSettings();

  return (
    <Screen edges={["top", "left", "right"]} style={styles.container}>
      <AppText style={styles.label}>settings.language</AppText>

      <View style={styles.row}>
        {languages.map((language) => {
          const isSelected = currentLanguage === language;

          return (
            <Pressable
              key={language}
              onPress={() => handleSelectLanguage(language)}
              style={[styles.chip, isSelected && styles.chipSelected]}
            >
              <AppText style={[styles.chipLabel, isSelected && styles.chipLabelSelected]}>
                {language.toUpperCase()}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </Screen>
  );
};
