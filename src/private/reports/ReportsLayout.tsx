import Navbar from "@/components/Navbar";
import React from "react";

const ReportsLayout = ({ children }: { children: React.ReactNode }) => {
  const navsetting = {
    title: "Reports",
    titleLogo: "/report.png",
    additionalLogo: "/return.png",
    menu: false,
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
