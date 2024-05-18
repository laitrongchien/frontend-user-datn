import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#383838] p-6 flex flex-col items-center">
      <nav className="w-full md:w-[60%] grid grid-cols-2 md:grid-cols-5 gap-y-4">
        <Link href={"/"} className="text-white hover:text-primary">
          Trang chủ
        </Link>
        <Link href={"/tours"} className="text-white hover:text-primary">
          Tour xe motor
        </Link>
        <Link href={"/motorbikes"} className="text-white hover:text-primary">
          Xe motor
        </Link>
        <Link href={"/blogs"} className="text-white hover:text-primary">
          Bài viết
        </Link>
        <Link href={"/policies"} className="text-white hover:text-primary">
          Chính sách
        </Link>
      </nav>
      <aside className="mt-4">
        <p className="text-white text-center">
          Copyright © 2024 - All right reserved by Lai Trong Chien
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
