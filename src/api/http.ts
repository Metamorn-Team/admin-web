import axios from "axios";
import { API_URL } from "../constants/url";

export const http = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  withCredentials: true,
});
