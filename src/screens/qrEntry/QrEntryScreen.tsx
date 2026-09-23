import { View } from "react-native";

import { AppButton, AppInput, AppText, ScanEntryCard, Screen } from "@/components";
import { useTheme } from "@/theme";

import { _styles } from "./QrEntry.styles";
import { useQrEntry } from "./container/useQrEntry";

const WORDMARK = "დღეობა · DGEOBA";

export const QrEntryScreen = () => {
  const { styles } = useTheme(_styles);
  const {
    name,
    code,
    codeError,
    canSubmit,
    isSubmitting,
    handleChangeName,
    handleChangeCode,
    handleScanPress,
    handleSubmit,
  } = useQrEntry();

  return (
    <Screen avoidsKeyboard style={styles.content}>
      <View style={styles.wordmarkBand}>
        <AppText style={styles.wordmark}>{WORDMARK}</AppText>
      </View>

      <View style={styles.body}>
        <ScanEntryCard
          code={code}
          error={codeError}
          onChangeCode={handleChangeCode}
          onScanPress={handleScanPress}
        />
        <AppText style={styles.hint}>entry.hint</AppText>
      </View>

      <View style={styles.entryPanel}>
        <AppInput
          label="entry.yourName"
          placeholder="entry.namePlaceholder"
          value={name}
          onChangeText={handleChangeName}
          autoCapitalize="words"
        />
        <AppButton
          title="entry.submit"
          onPress={handleSubmit}
          disabled={!canSubmit}
          isLoading={isSubmitting}
        />
      </View>
    </Screen>
  );
};
