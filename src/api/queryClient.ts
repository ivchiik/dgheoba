import { onlineManager, QueryCache, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import * as Network from "expo-network";

const DEFAULT_STALE_TIME_MS = 5 * 60 * 1000;
const DEFAULT_GC_TIME_MS = 24 * 60 * 60 * 1000;
const MAX_RETRIES = 3;

onlineManager.setEventListener((setOnline) => {
  let initialised = false;

  const subscription = Network.addNetworkStateListener((state) => {
    initialised = true;
    setOnline(!!state.isConnected);
  });

  Network.getNetworkStateAsync()
    .then((state) => {
      if (!initialised) setOnline(!!state.isConnected);
    })
    .catch(() => {});

  return subscription.remove;
});

const queryCache = new QueryCache({
  onError: (error, query) => {
    console.warn(`[query] ${String(query.queryKey)}`, error);
  },
});

export const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      staleTime: DEFAULT_STALE_TIME_MS,
      gcTime: DEFAULT_GC_TIME_MS,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (axios.isAxiosError(error) && error.response?.status === 404) return false;

        return failureCount < MAX_RETRIES;
      },
    },
    mutations: { retry: false },
  },
});
