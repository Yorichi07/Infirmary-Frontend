import Navbar from "@/components/Navbar";
import Shared from "@/Shared";
import React from "react";

const UserDasboardLayout = ({ children }: { children: React.ReactNode }) => {
  const navsetting = {
    title: "patient dashboard",
    titleLogo: Shared.HomeUser,
    additionalLogo: Shared.User,
    menu: true,
    role: "user",
  };
  return (
    <div className="min-h-[100svh] overflow-x-hidden">
      <Navbar props={navsetting} />
      {children}
      <div className="w-full flex items-center justify-center bg-white h-[8svh] text-[#8F8F8F] border-t border-[gray] font-semibold max-lg:hidden">
        <span className="w-[48%] text-right">Energy Acres, Bidholi: Tel: +91-135-2770137, 2776053, 2776054, 2776091</span>
        <span className="w-[2%] text-center">|</span>
        <span className="w-[48%] text-left">Knowledge Acres, Kandoli: Tel: +91-135-2770137, 2776053, 2776054, 2776091</span>
      </div>
    </div>
  );
};

export default UserDasboardLayout;
