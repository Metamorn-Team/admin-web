import { useSuspenseQuery } from "@tanstack/react-query";
import { getAllItem } from "../../../api/item";

export const QUERY_KEY = "all-item";

export const useGetAllItem = () => {
  const { data, isLoading } = useSuspenseQuery({
    queryKey: [QUERY_KEY],
    queryFn: getAllItem,
    staleTime: 1000 * 60 * 60,
  });

  return {
    data: data.items,
    isLoading,
  };
};
