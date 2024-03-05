export const getLocalAccessToken = () => {
  if (typeof window !== "undefined") {
    const user = JSON.parse(localStorage.getItem("user") as string);
    return user?.access_token;
  }
};

export const setUser = (user: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const getUser = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("user") as string);
  }
};

export const removeUser = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
};
