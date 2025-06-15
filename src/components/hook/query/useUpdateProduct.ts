import { useMutation } from "@tanstack/react-query";
import { updateProduct } from "../../../api/product";

export const useUpdateProduct = (
  onSuccess: () => void,
  onError?: () => void
) => {
  return useMutation({
    mutationFn: updateProduct,
    onSuccess,
    onError,
  });
};
