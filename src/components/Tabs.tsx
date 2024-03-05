"use client";

import { useRouter } from "next/navigation";

const Tabs = ({ tabs }: { tabs: any[] }) => {
  //   const [activeTab, setActiveTab] = useState(tabs[0].id);
  const router = useRouter();

  return (
    <div className="flex">
      {tabs.map((tab: { id: number; label: string; link: string }) => (
        <button
          key={tab.id}
          onClick={() => {
            router.push(tab.link);
          }}
          className={` px-4 py-2 rounded-l focus:outline-none`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
