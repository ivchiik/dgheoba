import { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";

import { ApiErrorCode, getApiErrorCode, useRedeemCodeMutation } from "@/api";
import { ROUTES } from "@/navigation";
import { storage, STORAGE_KEYS } from "@/storage";
import { parseAccessCode } from "@/utils";

import { takeScannedCode } from "./scannedCode";

const toRedeemErrorKey = (error: unknown) => {
  switch (getApiErrorCode(error)) {
    case ApiErrorCode.CodeNotRecognised:
      return "entry.errors.codeNotRecognised";
    case ApiErrorCode.AccessRevoked:
      return "entry.errors.revoked";
    case ApiErrorCode.AccessWindowClosed:
      return "entry.errors.windowClosed";
    case ApiErrorCode.RateLimited:
      return "entry.errors.rateLimited";
    default:
      console.warn("[entry] redeem failed", error);
      return "entry.errors.generic";
  }
};

export const useQrEntry = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string>();

  const { mutateAsync: redeemCode, isPending: isSubmitting } = useRedeemCodeMutation();

  useFocusEffect(
    useCallback(() => {
      const scanned = takeScannedCode();
      if (!scanned) return;

      setCode(scanned);
      setCodeError(undefined);
    }, [])
  );

  const canSubmit = name.trim().length > 0 && code.trim().length > 0;

  const handleChangeCode = (next: string) => {
    setCode(next);
    setCodeError(undefined);
  };

  const handleScanPress = () => router.push(ROUTES.SCAN);

  const handleSubmit = async () => {
    if (!canSubmit) return;

    const accessCode = parseAccessCode(code);
    if (!accessCode) {
      setCodeError("entry.errors.codeNotRecognised");
      return;
    }

    const guestName = name.trim();

    try {
      const { token } = await redeemCode({ code: accessCode, name: guestName });

      storage.setValue(STORAGE_KEYS.guestToken, token);
      storage.setValue(STORAGE_KEYS.guestName, guestName);
      storage.setValue(STORAGE_KEYS.albumCode, accessCode);

      router.replace(ROUTES.UPLOAD);
    } catch (error) {
      setCodeError(toRedeemErrorKey(error));
    }
  };

  return {
    name,
    code,
    codeError,
    canSubmit,
    isSubmitting,
    handleChangeName: setName,
    handleChangeCode,
    handleScanPress,
    handleSubmit,
  };
};
