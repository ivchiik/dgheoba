import axios from "axios";

import type { ApiErrorBody } from "./types";

export const getApiErrorCode = (error: unknown): string | null => {
  if (!axios.isAxiosError<ApiErrorBody>(error)) return null;

  return error.response?.data?.error?.code ?? null;
};
