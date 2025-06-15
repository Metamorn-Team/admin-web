import type {
  AddProductRequest,
  GetAllProductResponse,
  UpdateProductRequest,
} from "lia-admin-type";
import { http } from "./http";

export const addProduct = async (body: AddProductRequest) => {
  return await http.post("/products", body);
};

export const getAllProduct = async () => {
  const response = await http.get<GetAllProductResponse>("/products/all");
  return response.data;
};

export const updateProduct = async (body: UpdateProductRequest) => {
  return await http.put("/products", body);
};
