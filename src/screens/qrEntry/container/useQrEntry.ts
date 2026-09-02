import { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";

import { ROUTES } from "@/navigation";

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

    // TODO: validate the code against the backend before entering.
    router.replace(ROUTES.HOME);
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
