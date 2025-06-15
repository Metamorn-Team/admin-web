export const API_URL = "http://localhost:8000/admin";
export const CDN_URL = "https://cdn.metamorn.com";
export const BUCKET_PATH = {
  AURA: "product/aura",
  SPEECH_BUBBLE: "product/speech-bubble",
};
export const PAWN_AVATAR_URL = (key: string) =>
  `${CDN_URL}/image/avatar/${key}_avatar.png`;
