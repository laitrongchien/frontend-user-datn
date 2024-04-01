import Sidebar from "./Sidebar";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex px-10 py-6 bg-gray-100 min-h-[calc(100vh-66px)] max-w-[100vw]">
      <Sidebar />
      <main className="flex-1 ml-8">{children}</main>
    </div>
  );
};

export default ProfileLayout;
