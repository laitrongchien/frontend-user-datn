"use client";

import Image from "next/image";
import ProfileLayout from "@/components/profile/ProfileLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LuCamera } from "react-icons/lu";
import { useState } from "react";
import { updateProfile } from "@/store/features/authSlice";

const ProfileInfo = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateInfo = () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (file) formData.append("avatar", file);
      dispatch(updateProfile(formData));
    } catch (err: any) {
      console.log(err.reponse.data.message);
    }
  };

  return (
    <ProfileLayout>
      <div className="rounded-lg p-10 w-full bg-white shadow-md flex max-md:flex-col gap-8">
        <div className="relative w-[120px] h-[120px]">
          <Image
            src={imagePreview || user?.avatar}
            alt="Avatar"
            width={120}
            height={120}
            className="w-[120px] h-[120px] object-cover border rounded-full mr-2"
          />
          <label
            htmlFor="avatar"
            className="absolute bottom-2 right-2 rounded-full p-1 bg-white cursor-pointer border"
          >
            <LuCamera size={22} />
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <div className="w-full md:w-80">
          <div className="mb-4">
            <label className="block text-gray-900">Tên của bạn</label>
            <input
              type="name"
              id="name"
              name="name"
              placeholder="Name"
              className="py-1 border-b border-gray-500 outline-none w-full"
              defaultValue={user?.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-900">Email của bạn</label>
            <p className="py-1 border-b border-gray-500">{user?.email}</p>
          </div>
          <button
            type="button"
            className="w-full bg-primary hover:bg-orange-600 text-white py-2 rounded-lg mt-4"
            onClick={handleUpdateInfo}
          >
            Lưu lại
          </button>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default ProfileInfo;
