import axios from "axios";
import { getLocalAccessToken, getLocalRefreshToken } from "@/utils/storage";
import { authService } from "./auth";

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
  if (config.url === "/auth/refresh_token") {
    const refresh_token = getLocalRefreshToken();
    if (refresh_token) {
      config.headers.Authorization = `Bearer ${refresh_token}`;
    }
  } else {
    const access_token = getLocalAccessToken();
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response) {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const access_token = await authService.refreshToken();
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return axios(originalRequest);
        } catch (error) {
          console.error("Error refreshing token:", error);
          throw error;
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
