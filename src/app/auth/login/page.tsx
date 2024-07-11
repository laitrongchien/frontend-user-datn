"use client";

import Link from "next/link";
import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { login } from "@/store/features/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { useAppSelector } from "@/store/hooks";
import SocialLogin from "@/components/auth/SocialLogin";
import { TailSpin } from "react-loader-spinner";

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordShown, setPasswordShown] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(login(formData));
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      toast.success("Đăng nhập thành công");
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="relative w-full h-[calc(100vh-65px)] text-black flex-center px-6 py-10 bg-[url('https://res.cloudinary.com/dufuwsrue/image/upload/v1715966233/rwd_img_wide_001_xigkl2.jpg')] bg-no-repeat bg-cover bg-center">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="w-full md:w-[400px] bg-white shadow py-6 px-8 rounded-xl z-10">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-4">
          Đăng nhập
        </h1>
        <SocialLogin />
        <form onSubmit={handleSubmit} className="mt-4">
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
          <button
            type="submit"
            className="w-full bg-primary hover:bg-orange-600 text-white py-2 rounded-lg mb-4 flex-center"
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
              "Đăng nhập"
            )}
          </button>
          <Link href={"/auth/reset"}>
            <p className="text-center text-primary font-semibold mb-4">
              Khôi phục mật khẩu
            </p>
          </Link>
          <p className="text-center">
            Chưa có tài khoản?{" "}
            <Link
              href={"/auth/register"}
              className="text-primary font-semibold"
            >
              Đăng ký tài khoản
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
