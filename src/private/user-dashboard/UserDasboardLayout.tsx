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
    <div className="h-screen">
      <Navbar props={navsetting} />
      {children}
      <div className="w-full bg-white h-[8%] flex items-center justify-center text-[#8F8F8F] border-t border border-[gray] font-semibold">
        Energy Acres, Bidholi: Tel: +91-135-2770137, 2776053, 2776054, 2776091 &nbsp; | &nbsp; Knowledge Acres, Kandoli: Tel: +91-135-2770137, 2776053, 2776054,
        2776091
      </div>
    </div>
  );
};

export default UserDasboardLayout;
