import { useState } from "react";
import { router } from "expo-router";

import { ROUTES } from "@/navigation";

export const useQrEntry = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const canSubmit = name.trim().length > 0 && code.trim().length > 0;

  const handleScanPress = () => {
    // TODO: open the camera scanner and set the code from the result.
    // Needs expo-camera + a camera permission prompt — not installed yet.
  };

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
