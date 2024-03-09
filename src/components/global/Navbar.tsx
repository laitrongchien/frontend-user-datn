"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { FaChevronDown, FaRegHeart } from "react-icons/fa";
import { LuUser, LuLogOut, LuBell, LuStar } from "react-icons/lu";
import { useState } from "react";
import { logout } from "@/store/features/authSlice";
import Drawer from "./Drawer";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    toggleDropdown();
    router.push("/");
  };

  return (
    <nav className="w-[calc(100vw-6px)] bg-white fixed top-0 left-0 z-50 border-b border-slate-300 px-10 py-3 flex justify-between">
      <div className="basis-1/4 flex items-center">
        <Link href={"/"} className="max-lg:hidden">
          <Image src="/logo.png" alt="logo" width={237} height={27} />
        </Link>
        <Drawer />
      </div>
      <ul className="flex items-center justify-between text-gray-700 font-semibold basis-1/2 max-lg:hidden">
        <li className={`nav-item ${pathname === "/" ? "active" : ""}`}>
          <Link href={"/"}>Trang chủ</Link>
        </li>
        <li className={`nav-item ${pathname === "/tours" ? "active" : ""}`}>
          <Link href={"/tours"}>Tour xe motor</Link>
        </li>

        <li
          className={`nav-item ${pathname === "/motorbikes" ? "active" : ""}`}
        >
          <Link href={"/motorbikes"}>Xe motor</Link>
        </li>
        <li
          className={`nav-item ${pathname === "/destinations" ? "active" : ""}`}
        >
          <Link href={"/destinations"}>Điểm đến</Link>
        </li>
        <li className={`nav-item ${pathname === "/blogs" ? "active" : ""}`}>
          <Link href={"/blogs"}>Bài viết</Link>
        </li>
      </ul>
      {isAuthenticated ? (
        <div className="basis-1/4 flex items-center justify-end max-lg:basis-3/4 relative">
          <div className="w-8 h-8 rounded-full bor bg-gray-200 mr-4 flex-center">
            <LuBell size={20} color="#333" />
          </div>

          <div
            tabIndex={0}
            role="button"
            className="cursor-pointer flex-center"
            onClick={toggleDropdown}
          >
            <Image
              src={user?.avatar}
              alt="Avatar"
              width={42}
              height={42}
              className="w-[42px] h-[42px] object-cover rounded-full mr-2"
            />
            <p>{user?.name}</p>
            <FaChevronDown size={12} className="ml-1" />
          </div>

          <ul
            tabIndex={0}
            className={`z-[1] absolute top-full right-0 mt-2 p-2 shadow-md rounded-lg w-40 bg-white text-base text-black border border-gray-200 ${
              isDropdownOpen ? "block" : "hidden"
            }`}
          >
            <li className="p-1 hover:bg-gray-100 rounded-md">
              <Link
                href={"/profile/info"}
                className="flex items-center"
                onClick={toggleDropdown}
              >
                <LuUser />
                <p className="ml-2">Tài khoản</p>
              </Link>
            </li>
            <li className="p-1 hover:bg-gray-100 rounded-md">
              <Link
                href={"/profile/favorite-tours"}
                className="flex items-center"
                onClick={toggleDropdown}
              >
                <FaRegHeart />
                <p className="ml-2">Yêu thích</p>
              </Link>
            </li>
            <li className="p-1 hover:bg-gray-100 rounded-md">
              <Link
                href={"/profile/info"}
                className="flex items-center"
                onClick={toggleDropdown}
              >
                <LuStar />
                <p className="ml-2">Đánh giá</p>
              </Link>
            </li>
            <li className="p-1 hover:bg-gray-100 rounded-md">
              <button className="flex items-center" onClick={handleLogout}>
                <LuLogOut />
                <p className="ml-2">Đăng xuất</p>
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="basis-1/4 flex items-center justify-end max-lg:basis-3/4">
          <button
            className="px-2 py-2 bg-primary text-white rounded-lg mr-4"
            onClick={() => router.push("/auth/login")}
          >
            Đăng nhập
          </button>
          <button
            className="px-4 py-2 text-primary rounded-lg border border-primary bg-white"
            onClick={() => router.push("/auth/register")}
          >
            Đăng ký
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
