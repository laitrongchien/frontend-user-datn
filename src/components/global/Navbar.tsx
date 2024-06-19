"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { FaChevronDown, FaRegHeart } from "react-icons/fa";
import { LuUser, LuLogOut, LuMap } from "react-icons/lu";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { logout } from "@/store/features/authSlice";
import Drawer from "./Drawer";
import Chatbox from "./ChatBox";
import { colors } from "@/constants";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleChatBox = () => {
    setIsChatBoxOpen(!isChatBoxOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    toggleDropdown();
    router.push("/");
  };

  return (
    <nav className="w-full bg-white fixed top-0 left-0 z-50 border-b border-slate-300 px-6 md:px-10 py-3 flex justify-between">
      <div className="basis-[25%] flex items-center">
        <Link href={"/"} className="max-lg:hidden">
          <Image src="/logo.png" alt="logo" width={237} height={27} />
        </Link>
        <Drawer />
      </div>
      <ul className="flex items-center gap-[60px] text-gray-700 font-semibold basis-[55%] max-lg:hidden">
        <li className={`nav-item ${pathname === "/" ? "active" : ""}`}>
          <Link href={"/"}>Trang chủ</Link>
        </li>
        <li
          className={`nav-item ${pathname.includes("/tours") ? "active" : ""}`}
        >
          <Link href={"/tours"}>Tour xe máy</Link>
        </li>

        <li
          className={`nav-item ${
            pathname.includes("/motorbikes") ? "active" : ""
          }`}
        >
          <Link href={"/motorbikes"}>Thuê xe</Link>
        </li>
        {/* <li
          className={`nav-item ${pathname.includes("/blogs") ? "active" : ""}`}
        >
          <Link href={"/blogs"}>Bài viết</Link>
        </li> */}
        <li
          className={`nav-item ${
            pathname.includes("/policies") ? "active" : ""
          }`}
        >
          <Link href={"/policies"}>Chính sách</Link>
        </li>
        {isAuthenticated && (
          <li
            className={`nav-item ${
              pathname.includes("/create-schedule") ? "active" : ""
            }`}
          >
            <Link href={"/create-schedule"}>Tạo lịch trình</Link>
          </li>
        )}
      </ul>
      <div className="basis-[20%] flex items-center gap-4 justify-end max-lg:basis-3/4 relative">
        <button onClick={toggleChatBox}>
          <IoChatboxEllipsesOutline
            size={24}
            color={isChatBoxOpen ? colors.primary : colors.black}
          />
        </button>
        {isAuthenticated ? (
          <>
            {" "}
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
              <p className="text-sm">{user?.name}</p>
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
                  href={"/profile/self-trip"}
                  className="flex items-center"
                  onClick={toggleDropdown}
                >
                  <LuMap />
                  <p className="ml-2">Lịch trình</p>
                </Link>
              </li>
              <li className="p-1 hover:bg-gray-100 rounded-md">
                <button className="flex items-center" onClick={handleLogout}>
                  <LuLogOut />
                  <p className="ml-2">Đăng xuất</p>
                </button>
              </li>
            </ul>
          </>
        ) : (
          <button
            className="px-2 py-2 bg-primary text-white rounded-lg"
            onClick={() => router.push("/auth/login")}
          >
            Đăng nhập
          </button>
        )}
      </div>
      {isChatBoxOpen && <Chatbox toggleChatBox={toggleChatBox} />}
    </nav>
  );
};

export default Navbar;
