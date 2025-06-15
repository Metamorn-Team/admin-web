import { useMutation } from "@tanstack/react-query";
import { updatePromotionProduct } from "../../../api/promotion-product";

export const useUpdatePromotionProduct = (
  onSuccess: () => void,
  onError?: () => void
) => {
  return useMutation({
    mutationFn: updatePromotionProduct,
    onSuccess,
    onError,
  });
};
