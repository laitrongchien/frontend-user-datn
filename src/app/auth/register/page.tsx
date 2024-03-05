"use client";

import Link from "next/link";
import { useState, useEffect, FormEvent } from "react";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { authService } from "@/services/api/auth";
import { useRouter } from "next/navigation";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password.length < 6)
      toast.error("Mật khẩu phải có ít nhất 6 ký tự");
    setLoading(true);
    const res = await authService.register(formData);
    setLoading(false);
    if (res.status === 400) {
      toast.error("Email này đã tồn tại");
    } else {
      toast.success("Đăng ký tài khoản thành công");
      router.push("/auth/login");
    }
  };

  return (
    <div className="w-full bg-gray-50 text-black flex-center py-10">
      <div className="w-[400px] bg-white shadow py-6 px-8 rounded-xl border border-slate-300">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-4">
          Đăng ký
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-900 mb-1">
              Tên của bạn
            </label>
            <input
              type="name"
              id="name"
              name="name"
              placeholder="Name"
              className="form-input"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-900 mb-1">
              Email của bạn
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              className="form-input"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-900 mb-1">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type={passwordShown ? "text" : "password"}
                id="password"
                name="password"
                placeholder="••••••••"
                className="form-input"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              {passwordShown ? (
                <FaRegEye
                  size={22}
                  color="#888"
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() => setPasswordShown(false)}
                />
              ) : (
                <FaRegEyeSlash
                  size={22}
                  color="#888"
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() => setPasswordShown(true)}
                />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex-center bg-primary hover:bg-orange-600 text-white py-2 rounded-lg mb-4"
          >
            {loading ? (
              <TailSpin
                height="20"
                width="20"
                color="white"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              "Đăng ký"
            )}
          </button>
          <p className="text-center">
            Bạn đã có tài khoản?{" "}
            <Link href={"/auth/login"} className="text-primary font-semibold">
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
