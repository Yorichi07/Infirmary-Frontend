import Navbar from "@/components/Navbar";
import React from "react";
import { any } from "zod";

const ReportsLayout = ({ children }: { children: React.ReactNode }) => {
  const navsetting = {
    title: any,
    titleLogo: any,
    additionalLogo: any,
    menu: any,
    role:any
  };
  return (
    <div className="h-screen">
      <Navbar props={navsetting} />
      {children}
      <div className="w-full bg-white font-semibold h-[8%] flex items-center justify-center text-[#8F8F8F] border-t border border-[gray]">
        Helpline: 1800-XXXX-XXXX
      </div>
    </div>
  );
};

export default ReportsLayout;
