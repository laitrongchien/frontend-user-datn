import axios from "axios";
import { getLocalAccessToken } from "@/utils/storage";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
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
