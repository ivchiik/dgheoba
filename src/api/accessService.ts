import { apiClient } from "./apiClient";
import { ENDPOINTS } from "./endpoints";
import type { RedeemReq, RedeemRes } from "./types";

export const accessService = {
  redeem: async (payload: RedeemReq): Promise<RedeemRes> => {
    const response = await apiClient.post(ENDPOINTS.access.redeem, payload);

    // TODO: drop once the response shape is confirmed;
    if (typeof response.data?.token !== "string") {
      console.warn("[access] redeem response has no token", Object.keys(response.data ?? {}));
      throw new Error("Redeem response has no token");
    }

    return response.data;
  },
};
