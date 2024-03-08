import axios from "./axios";
import { getLocalRefreshToken, setUser } from "@/utils/storage";

const register = async (formData: any) => {
  try {
    const res = await axios.post("/auth/register", formData);
    return res;
  } catch (err: any) {
    return err.response;
  }
};

const login = async (formData: any) => {
  return await axios.post("/auth/login", formData);
};

const googleLogin = async (token: string) => {
  return await axios.post("/auth/google_login", { token });
};

const logout = async () => {
  return await axios.get("/auth/logout");
};

const refreshToken = async () => {
  try {
    const res = await axios.get("/auth/refresh_token");
    console.log(res);
    setUser(res.data);
    return res.data.access_token;
  } catch (err) {
    console.error("Error refreshing token:", err);
  }
};

export const authService = {
  register,
  login,
  logout,
  googleLogin,
  refreshToken,
};
