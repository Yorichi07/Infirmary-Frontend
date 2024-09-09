import Navbar from "@/components/Navbar";
import React from "react";

const DoctorCheckInLayout = ({ children }: { children: React.ReactNode }) => {
  const navsetting = {
    title: "Doctor Check-In / Check-Out",
    titleLogo: "/check.png",
    additionalLogo: "/return.png",
    menu: false,
  };
  return (
    <div className="h-screen">
      <Navbar props={navsetting} />
      {children}
      {/* <Outlet /> */}
      <div className="w-full bg-white font-semibold h-[8%] flex items-center justify-center text-[#8F8F8F] border-t border border-[gray]">
        Helpline: 1800-XXXX-XXXX
      </div>
    </div>
  );
};

export default DoctorCheckInLayout;
