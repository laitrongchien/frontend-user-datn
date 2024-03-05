import axios from "./axios";

const updateProfile = async (formData: any) => {
  return await axios.put("/user/update-profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const userService = { updateProfile };
