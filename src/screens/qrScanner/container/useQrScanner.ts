import { useCallback, useRef, useState } from "react";
import { router } from "expo-router";
import { scanFromURLAsync, useCameraPermissions, type BarcodeScanningResult } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { openSettings } from "expo-linking";

import { setScannedCode } from "@/screens/qrEntry/container/scannedCode";
import { parseAccessCode } from "@/utils";

export const useQrScanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [isPicking, setIsPicking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasScanned = useRef(false);

  const acceptCode = useCallback((raw: string) => {
    if (hasScanned.current) return;

    const code = parseAccessCode(raw);
    if (!code) {
      setError("scan.notAJoinCode");
      return;
    }

    hasScanned.current = true;
    setScannedCode(code);
    router.back();
  }, []);

  const handleBarcodeScanned = useCallback(
    ({ data }: BarcodeScanningResult) => {
      acceptCode(data);
    },
    [acceptCode]
  );

  const handleToggleTorch = () => setIsTorchOn((current) => !current);

  const handleClose = () => router.back();

  const handlePickFromGallery = async () => {
    setError(null);
    setIsPicking(true);

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 1,
      });

      if (result.canceled) return;

      const codes = await scanFromURLAsync(result.assets[0].uri, ["qr"]);

      if (codes.length === 0) {
        setError("scan.noQrFound");
        return;
      }

      acceptCode(codes[0].data);
    } catch (cause) {
      console.warn("[qrScanner] picking from gallery failed", cause);
      setError("scan.noQrFound");
    } finally {
      setIsPicking(false);
    }
  };

  return {
    permission,
    isTorchOn,
    isPicking,
    error,
    requestPermission,
    handleBarcodeScanned,
    handleToggleTorch,
    handleClose,
    handlePickFromGallery,
    handleOpenSettings: openSettings,
  };
};
