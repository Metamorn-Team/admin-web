import { useMutation } from "@tanstack/react-query";
import { addItem } from "../../../api/item";

export const useAddItem = (onSuccess: () => void, onError?: () => void) => {
  return useMutation({
    mutationFn: addItem,
    onSuccess,
    onError,
  });
};
