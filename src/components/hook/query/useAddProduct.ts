import { useMutation } from "@tanstack/react-query";
import { addProduct } from "../../../api/product";

export const useAddProduct = (onSuccess: () => void, onError?: () => void) => {
  return useMutation({
    mutationFn: addProduct,
    onSuccess,
    onError,
  });
};
