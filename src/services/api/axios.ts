import axios from "axios";
import { getLocalAccessToken } from "@/utils/storage";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://backend-service-api-x43j.onrender.com/api"
    : "http://localhost:8000/api";

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(async (config) => {
  const access_token = getLocalAccessToken();
  if (access_token) config.headers.Authorization = `Bearer ${access_token}`;
  return config;
});

export default instance;
