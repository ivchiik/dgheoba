import { useMutation } from "@tanstack/react-query";

import { accessService } from "./accessService";

export const useRedeemCodeMutation = () =>
  useMutation({
    mutationFn: accessService.redeem,
  });
