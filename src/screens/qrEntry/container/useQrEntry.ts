import { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";

import { ROUTES } from "@/navigation";
import { storage, STORAGE_KEYS } from "@/storage";

import { takeScannedCode } from "./scannedCode";

export const useQrEntry = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  useFocusEffect(
    useCallback(() => {
      const scanned = takeScannedCode();
      if (scanned) setCode(scanned);
    }, [])
  );

  const canSubmit = name.trim().length > 0 && code.trim().length > 0;

  const handleScanPress = () => router.push(ROUTES.SCAN);

  const handleSubmit = () => {
    if (!canSubmit) return;

    storage.setValue(STORAGE_KEYS.guestName, name.trim());
    storage.setValue(STORAGE_KEYS.albumCode, code.trim());

    router.replace(ROUTES.UPLOAD);
  };

  return {
    name,
    code,
    canSubmit,
    handleChangeName: setName,
    handleChangeCode: setCode,
    handleScanPress,
    handleSubmit,
  };
};
