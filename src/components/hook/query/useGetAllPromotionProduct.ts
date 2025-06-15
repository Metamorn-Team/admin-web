import { useSuspenseQuery } from "@tanstack/react-query";
import { getAllPromotionProduct } from "../../../api/promotion-product";

export const QUERY_KEY = "all-promotion-product";

export const useGetAllPromotionProduct = () => {
  const { data, isLoading, isError } = useSuspenseQuery({
    queryKey: [QUERY_KEY],
    queryFn: getAllPromotionProduct,
  });

  return {
    promotionProducts: data.promotionProducts,
    isLoading,
    isError,
  };
};
