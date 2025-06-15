import { useSuspenseQuery } from "@tanstack/react-query";
import { getAllPromotion } from "../../../api/promotion";

export const QUERY_KEY = "all-promotion";

export const useGetAllPromotion = () => {
  const { data, isLoading, isError } = useSuspenseQuery({
    queryKey: [QUERY_KEY],
    queryFn: getAllPromotion,
    staleTime: 1000 * 60 * 60,
  });

  return {
    data: data.promotions,
    isLoading,
    isError,
  };
};
