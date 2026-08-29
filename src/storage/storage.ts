import KvStore from "expo-sqlite/kv-store";

import type { StorageKey } from "./storageKeys";

export const storage = {
  setValue(key: StorageKey, value: string) {
    try {
      KvStore.setItemSync(key, value);
    } catch (error) {
      console.warn(`[storage] setValue(${key}) failed`, error);
    }
  },

  getStringValue(key: StorageKey): string | null {
    try {
      return KvStore.getItemSync(key);
    } catch (error) {
      console.warn(`[storage] getStringValue(${key}) failed`, error);
      return null;
    }
  },

  remove(key: StorageKey) {
    try {
      KvStore.removeItemSync(key);
    } catch (error) {
      console.warn(`[storage] remove(${key}) failed`, error);
    }
  },
};
