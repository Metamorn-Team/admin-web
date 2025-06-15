import type {
  AddPromotionProductRequest,
  GetAllPromotionProductResponse,
  UpdatePromotionProductRequest,
} from "lia-admin-type";
import { http } from "./http";

export const addPromotionProduct = async (body: AddPromotionProductRequest) => {
  return await http.post("/promotion-products", body);
};

export const updatePromotionProduct = async (
  body: UpdatePromotionProductRequest
) => {
  return await http.put("/promotion-products", body);
};

export const getAllPromotionProduct = async () => {
  const response = await http.get<GetAllPromotionProductResponse>(
    "/promotion-products/all"
  );
  return response.data;
};
