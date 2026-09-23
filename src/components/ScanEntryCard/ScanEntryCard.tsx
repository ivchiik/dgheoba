import { View } from "react-native";

import QRCodeIcon from "@/assets/icons/QRCode.svg";
import { useTheme } from "@/theme";

import { AppButton } from "../AppButton/AppButton";
import { AppInput } from "../AppInput/AppInput";
import { AppText } from "../AppText/AppText";

import { _styles } from "./ScanEntryCard.styles";
import type { ScanEntryCardProps } from "./ScanEntryCard.types";

const ICON_SIZE = 22;

export const ScanEntryCard = ({ code, error, onChangeCode, onScanPress }: ScanEntryCardProps) => {
  const { styles, theme } = useTheme(_styles);

  return (
    <View style={styles.card}>
      <AppButton
        title="entry.scanWithCamera"
        onPress={onScanPress}
        icon={<QRCodeIcon width={ICON_SIZE} height={ICON_SIZE} color={theme.color.onPrimary} />}
      />

      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <AppText style={styles.dividerLabel}>entry.or</AppText>
        <View style={styles.dividerLine} />
      </View>

      <AppInput
        value={code}
        error={error}
        onChangeText={onChangeCode}
        placeholder="entry.codePlaceholder"
        autoCapitalize="characters"
        autoCorrect={false}
      />
    </View>
  );
};
