import Link from "next/link";
import Image from "next/image";
import { LuMenu } from "react-icons/lu";
import { MdHomeFilled, MdPolicy, MdTour } from "react-icons/md";
import { FaMotorcycle, FaRoute } from "react-icons/fa6";
import { useState } from "react";

const Drawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <div>
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={drawerOpen}
        onChange={() => setDrawerOpen(!drawerOpen)}
      />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer"
          className="drawer-button lg:hidden cursor-pointer"
        >
          <LuMenu size={30} />
        </label>
      </div>
      <div className="drawer-side z-[100]">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="p-4 w-80 min-h-full text-base-content bg-white">
          <li className="py-4" onClick={closeDrawer}>
            <Link href={"/"}>
              <Image src="/logo.png" alt="logo" width={237} height={27} />
            </Link>
          </li>

          <li
            className="py-4 hover:bg-gray-200 rounded-lg"
            onClick={closeDrawer}
          >
            <Link href={"/"} className="flex items-center">
              <MdHomeFilled size={24} />
              <h1 className="text-lg font-semibold ml-4">TRANG CHỦ</h1>
            </Link>
          </li>
          <li
            className="py-4 hover:bg-gray-200 rounded-lg"
            onClick={closeDrawer}
          >
            <Link href={"/tours"} className="flex items-center">
              <MdTour size={24} />
              <h1 className="text-lg font-semibold ml-4">TOUR XE MÁY</h1>
            </Link>
          </li>
          <li
            className="py-4 hover:bg-gray-200 rounded-lg"
            onClick={closeDrawer}
          >
            <Link href={"/motorbikes"} className="flex items-center">
              <FaMotorcycle size={24} />
              <h1 className="text-lg font-semibold ml-4">THUÊ XE</h1>
            </Link>
          </li>
          <li
            className="py-4 hover:bg-gray-200 rounded-lg"
            onClick={closeDrawer}
          >
            <Link href={"/create-schedule"} className="flex items-center">
              <FaRoute size={22} />
              <h1 className="text-lg font-semibold ml-5">LỊCH TRÌNH</h1>
            </Link>
          </li>
          <li
            className="py-4 hover:bg-gray-200 rounded-lg"
            onClick={closeDrawer}
          >
            <Link href={"/policies"} className="flex items-center">
              <MdPolicy size={22} />
              <h1 className="text-lg font-semibold ml-4">CHÍNH SÁCH</h1>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
