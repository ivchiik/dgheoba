let pendingCode: string | null = null;

export const setScannedCode = (code: string) => {
  pendingCode = code;
};

export const takeScannedCode = (): string | null => {
  const code = pendingCode;
  pendingCode = null;

  return code;
};
