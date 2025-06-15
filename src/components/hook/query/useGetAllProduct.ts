import { useSuspenseQuery } from "@tanstack/react-query";
import { getAllProduct } from "../../../api/product";

export const QUERY_KEY = "all-product";

export const useGetAllProduct = () => {
  const { data, isLoading, isError } = useSuspenseQuery({
    queryKey: [QUERY_KEY],
    queryFn: getAllProduct,
    staleTime: 1000 * 60 * 60,
  });

  return {
    data: data.products,
    isLoading,
    isError,
  };
};
