// TODO(Q8): tighten to the real alphabet and length once the backend confirms them.
const ACCESS_CODE_PATTERN = /^[A-Z0-9_-]{1,32}$/;

const codeFromUrl = (text: string): string | null => {
  try {
    const url = new URL(text);

    return url.searchParams.get("code") ?? url.pathname.split("/").filter(Boolean).pop() ?? "";
  } catch {
    return null;
  }
};

export const parseAccessCode = (raw: string): string | null => {
  const text = raw.trim();
  const code = (codeFromUrl(text) ?? text).replace(/\s+/g, "").toUpperCase();

  return ACCESS_CODE_PATTERN.test(code) ? code : null;
};
