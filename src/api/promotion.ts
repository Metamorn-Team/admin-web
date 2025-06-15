import type {
  AddPromotionRequest,
  GetAllPromotionResponse,
} from "lia-admin-type";
import { http } from "./http";

export const addPromotion = async (body: AddPromotionRequest) => {
  return await http.post("/promotions", body);
};

export const getAllPromotion = async () => {
  const response = await http.get<GetAllPromotionResponse>("/promotions/all");
  return response.data;
};
