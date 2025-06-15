import type { GetUserResponse } from "lia-admin-type";
import { http } from "./http";

export const getUsers = async (page: number, limit?: number) => {
  const response = await http.get<GetUserResponse>("/users", {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};
