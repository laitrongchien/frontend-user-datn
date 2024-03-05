import axios from "./axios";

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

export const authService = { register, login, logout, googleLogin };
