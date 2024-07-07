"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { authService } from "@/services/api/auth";
import { useRouter } from "next/navigation";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { PASSWORD_REGEX } from "@/constants";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const passwordRegex = PASSWORD_REGEX;
  const [loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!passwordRegex.test(formData.password)) {
      toast.error(
        "Mật khẩu phải có ít nhất 8 ký tự gồm chữ cái, chữ số và ký tự đặc biệt"
      );
      return;
    }
    if (formData.confirmPassword !== formData.password) {
      toast.error("Mật khẩu xác nhận không trùng với mật khẩu");
      return;
    }
    setLoading(true);
    const res = await authService.register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    setLoading(false);
    if (res.status === 400) {
      toast.error("Email này đã được đăng ký");
    } else {
      toast.success("Đăng ký tài khoản thành công");
      router.push("/auth/login");
    }
  };

  return (
    <div className="w-full text-black flex-center px-6 py-4 bg-[url('https://res.cloudinary.com/dufuwsrue/image/upload/v1715966233/rwd_img_wide_001_xigkl2.jpg')] bg-no-repeat bg-cover bg-center">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="w-full md:w-[400px] bg-white shadow py-4 px-8 rounded-xl z-10">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-4">
          Đăng ký
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="block text-gray-900 mb-1">
              Tên của bạn
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Tên"
              className="form-input"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
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
          <div className="mb-3">
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
                  className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer"
                  onClick={() => setPasswordShown(false)}
                />
              ) : (
                <FaRegEyeSlash
                  size={22}
                  color="#888"
                  className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer"
                  onClick={() => setPasswordShown(true)}
                />
              )}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-900 mb-1">
              Xác nhận mật khẩu
            </label>
            <div className="relative">
              <input
                type={confirmPasswordShown ? "text" : "password"}
                id="password"
                name="password"
                placeholder="••••••••"
                className="form-input"
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
              />
              {confirmPasswordShown ? (
                <FaRegEye
                  size={22}
                  color="#888"
                  className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer"
                  onClick={() => setConfirmPasswordShown(false)}
                />
              ) : (
                <FaRegEyeSlash
                  size={22}
                  color="#888"
                  className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer"
                  onClick={() => setConfirmPasswordShown(true)}
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
