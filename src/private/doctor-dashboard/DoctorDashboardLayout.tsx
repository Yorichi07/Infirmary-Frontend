import Navbar from "@/components/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const DoctorDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const navsetting = {
    title: "doctor dashboard",
    titleLogo: "/home-icon.png",
    additionalLogo: "/user-icon.png",
  };
  return (
    <div className="h-screen">
      <Navbar props={navsetting} />
      {children}
      {/* <Outlet /> */}
      <div className="w-full bg-white h-[8%] flex items-center justify-center text-[#8F8F8F] border-t border border-[gray]">
        Helpline: 1800-XXXX-XXXX
      </div>
    </div>
  );
};

export default DoctorDashboardLayout;
