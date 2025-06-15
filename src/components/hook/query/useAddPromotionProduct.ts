import { useMutation } from "@tanstack/react-query";
import { addPromotionProduct } from "../../../api/promotion-product";

export const useAddPromotionProduct = (
  onSuccess: () => void,
  onError?: () => void
) => {
  return useMutation({
    mutationFn: addPromotionProduct,
    onSuccess,
    onError,
  });
};
