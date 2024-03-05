"use client";

import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { LuUser, LuStar } from "react-icons/lu";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside>
      <ul className="p-2 shadow-md rounded-lg w-60 bg-white text-base text-black border border-gray-200">
        <li className="p-1.5 hover:bg-gray-100 rounded-md flex items-center">
          <LuUser />
          <p className="ml-2">Tài khoản</p>
        </li>
        <li className="p-1.5 hover:bg-gray-100 rounded-md">
          <Link
            href={"/profile/info"}
            className={`flex items-center w-full ${
              pathname === "/profile/info" ? "text-primary" : ""
            }`}
          >
            <p className="ml-6">Thông tin cá nhân</p>
          </Link>
        </li>
        <li className="p-1.5 hover:bg-gray-100 rounded-md">
          <Link href={"/profile/info"} className="flex items-center w-full">
            <p className="ml-6">Đổi mật khẩu</p>
          </Link>
        </li>
        <li className="p-1.5 hover:bg-gray-100 rounded-md flex items-center">
          <FaRegHeart />
          <p className="ml-2">Yêu thích</p>
        </li>
        <li className="p-1.5 hover:bg-gray-100 rounded-md">
          <Link href={"/profile/info"} className="flex items-center w-full">
            <p className="ml-6">Tour xe motor</p>
          </Link>
        </li>
        <li className="p-1.5 hover:bg-gray-100 rounded-md">
          <Link href={"/profile/info"} className="flex items-center w-full">
            <p className="ml-6">Xe motor</p>
          </Link>
        </li>
        {/* <li className="p-1.5 hover:bg-gray-100 rounded-md">
          <Link href={"/profile/reviews"} className="flex items-center w-full">
            <LuStar />
            <p className="ml-2">Đánh giá</p>
          </Link>
        </li> */}
      </ul>
    </aside>
  );
};

export default Sidebar;
