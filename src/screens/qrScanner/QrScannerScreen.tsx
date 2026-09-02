import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView } from "expo-camera";
import { SymbolView } from "expo-symbols";
import Svg, { Path } from "react-native-svg";

import { AppButton, AppLoader, AppText } from "@/components";
import { useTheme } from "@/theme";

import { _styles, CUTOUT_RADIUS, CUTOUT_SIZE, SCRIM_OPACITY } from "./QrScanner.styles";
import { buildScrimPath } from "./buildScrimPath";
import { useQrScanner } from "./container/useQrScanner";

const ICON_SIZE = 24;

export const QrScannerScreen = () => {
  const { styles, theme } = useTheme(_styles);

  const { width, height } = useWindowDimensions();
  const scrimPath = buildScrimPath({
    width,
    height,
    cutoutX: (width - CUTOUT_SIZE) / 2,
    cutoutY: (height - CUTOUT_SIZE) / 2,
    cutoutSize: CUTOUT_SIZE,
    cutoutRadius: CUTOUT_RADIUS,
  });

  const {
    permission,
    isTorchOn,
    isPicking,
    error,
    requestPermission,
    handleBarcodeScanned,
    handleToggleTorch,
    handleClose,
    handlePickFromGallery,
    handleOpenSettings,
  } = useQrScanner();

  const renderTopBar = () => (
    <View style={styles.topBar}>
      <Pressable onPress={handleClose} style={styles.iconButton} accessibilityRole="button">
        <SymbolView
          name={{ ios: "arrow.left", android: "arrow_back" }}
          tintColor={theme.color.white}
          size={ICON_SIZE}
        />
      </Pressable>

      <AppText style={styles.title}>scan.title</AppText>

      <Pressable
        onPress={handleToggleTorch}
        style={styles.iconButton}
        accessibilityRole="button"
        disabled={!permission?.granted}
      >
        <SymbolView
          name={
            isTorchOn
              ? { ios: "bolt.fill", android: "flash_on" }
              : { ios: "bolt.slash.fill", android: "flash_off" }
          }
          tintColor={theme.color.white}
          size={ICON_SIZE}
        />
      </Pressable>
    </View>
  );

  if (!permission) {
    return (
      <View style={styles.root}>
        <AppLoader fills />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.root}>
        <SafeAreaView style={styles.chrome}>
          {renderTopBar()}

          <View style={styles.permissionContainer}>
            <AppText style={styles.permissionText}>scan.permissionBody</AppText>

            {permission.canAskAgain ? (
              <AppButton title="scan.grantPermission" onPress={requestPermission} />
            ) : (
              <AppButton title="scan.openSettings" onPress={handleOpenSettings} />
            )}
          </View>

          <View style={styles.bottomBar} />
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        enableTorch={isTorchOn}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={handleBarcodeScanned}
      />

      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Svg width={width} height={height}>
          <Path
            d={scrimPath}
            fillRule="evenodd"
            fill={theme.color.gray1000}
            fillOpacity={SCRIM_OPACITY}
          />
        </Svg>

        <View style={[StyleSheet.absoluteFill, styles.bracketLayer]}>
          <View style={styles.cutoutFrame}>
            <View style={[styles.bracket, styles.bracketTopLeft]} />
            <View style={[styles.bracket, styles.bracketTopRight]} />
            <View style={[styles.bracket, styles.bracketBottomLeft]} />
            <View style={[styles.bracket, styles.bracketBottomRight]} />
          </View>
        </View>
      </View>

      <SafeAreaView style={styles.chrome}>
        {renderTopBar()}

        <View style={styles.bottomBar}>
          {!!error && <AppText style={styles.errorText}>{error}</AppText>}
          <AppButton
            title="scan.pickFromGallery"
            onPress={handlePickFromGallery}
            isLoading={isPicking}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
