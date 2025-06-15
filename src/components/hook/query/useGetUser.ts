import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../api/user";

export const QUERY_KEY = "users";

export const useGetUser = (page: number, limit?: number) => {
  return useQuery({
    queryKey: [QUERY_KEY, page, limit],
    queryFn: () => getUsers(page, limit),
    staleTime: 1000 * 10,
  });
};
