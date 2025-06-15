import type { AddItemRequest, GetAllItemResponse } from "lia-admin-type";
import { http } from "./http";

export const getAllItem = async () => {
  const response = await http.get<GetAllItemResponse>("/items/all");
  return response.data;
};

export const addItem = async (body: AddItemRequest) => {
  return await http.post("/items", body);
};
