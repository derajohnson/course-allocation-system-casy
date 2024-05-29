import React from "react";
import { Metadata } from "next";
import LecturerSidebar from "@/components/modules/common/LecturerSideBar";

export const metadata: Metadata = {
  title: "Course Allocation | Lecturer",
  description: "Streamline your course allocation process",
};

const layout = async ({ children }: { children: React.ReactNode }): Promise<React.JSX.Element> => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[287px_1fr] w-full h-screen fixed">
      <LecturerSidebar />

      <main className="px-[16px] md:px-[48px] py-[32px] md:py-[56px]  overflow-y-auto md:h-screen h-full">
        {children}
      </main>
    </div>
  );
};

export default layout;
