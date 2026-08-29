import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

import i18n from "@/i18n/i18n";

const REQUEST_TIMEOUT_MS = 20_000;

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.set("Accept-Language", i18n.language);

  return config;
});
