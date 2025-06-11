import type { LoginRequest } from "lia-admin-type";
import { http } from "./http";

export const login = async (body: LoginRequest) => {
  await http.post("/auth/login", body);
};
