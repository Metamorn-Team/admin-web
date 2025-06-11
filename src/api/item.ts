import type { GetAllItemResponse } from "lia-admin-type";
import { http } from "./http";

export const getAllItem = async () => {
  const response = await http.get<GetAllItemResponse>("/items/all");
  return response.data;
};
