import { useMutation } from "@tanstack/react-query";
import { addPromotion } from "../../../api/promotion";

export const useAddPromotion = (
  onSuccess: () => void,
  onError?: () => void
) => {
  return useMutation({
    mutationFn: addPromotion,
    onSuccess,
    onError,
  });
};
