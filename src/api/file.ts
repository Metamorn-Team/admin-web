import axios from "axios";
import { http } from "./http";
import type {
  GetPresignedUrlRequest,
  GetPresignedUrlResponse,
} from "lia-admin-type";

export const getPresignedUrl = async (query: GetPresignedUrlRequest) => {
  const response = await http.get<GetPresignedUrlResponse>("/files/presigned", {
    params: query,
  });
  return response.data;
};

export const uploadImage = async (presignedUrl: string, file: File) => {
  return await axios.put(presignedUrl, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
};
