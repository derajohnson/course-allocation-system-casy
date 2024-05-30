"use client";

import React from "react";
import Image from "next/image";
import SidebarItem from "./SideBarItem";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

type SidebarType = {
  title: string;
  url: string;
}[];

const Sidebar = (): React.JSX.Element => {
  const router = useRouter();
  const sidebarItems: SidebarType = [
    { title: "Course List", url: "/hod-dashboard" },
    { title: "Create Course", url: "/create-course" },
    { title: "Allocate Course", url: "/allocate-course" },
    { title: "Lecturer Profiles", url: "/lecturer-profile" },
  ];

  function signOut() {
    localStorage.removeItem("authToken");
    router.replace("/");
  }

  return (
    <div className="hidden bg-black lg:flex flex-col gap-y-[72px] py-[56px] px-[32px] justify-between bg-sidebar h-screen">
      <div className="flex flex-col gap-[48px]">
        <div className="flex gap-3 items-center">
          <User />

          <div className="flex flex-col justify-center gap-y-2">
            <div className="flex gap-1 items-center">
              <p className="text-[18px] leading-[18px] font-medium text-muted">Welcome,</p>
            </div>
            <p className="text-[14px] leading-[14px] font-normal text-muted">Dr, Ugochi Okengwu</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-5">
            {sidebarItems.map((item) => (
              <div
                className="flex items-center px-6 py-4 sm:py-1 gap-[12px] cursor-pointer"
                key={item.title}
              >
                <SidebarItem title={item.title} url={item.url} key={item.title} />
              </div>
            ))}
          </div>
          <p
            onClick={signOut}
            className="flex items-center px-6 cursor-pointer pt-4 text-[18px] leading-[18px} font-medium hover:text-white text-muted"
          >
            Log Out
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
