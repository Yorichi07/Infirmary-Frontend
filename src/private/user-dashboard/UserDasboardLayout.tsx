import Navbar from "@/components/Navbar";
import Shared from "@/Shared";
import React from "react";

const UserDasboardLayout = ({ children }: { children: React.ReactNode }) => {
  const navsetting = {
    title: "student dashboard",
    titleLogo: Shared.HomeUser,
    additionalLogo: Shared.User,
    menu: true,
  };
  return (
    <div className="h-screen">
      <Navbar props={navsetting} />
      {children}
      <div className="w-full bg-white h-[8%] flex items-center justify-center text-[#8F8F8F] border-t border border-[gray] font-semibold">
        Helpline: 1800-XXXX-XXXX
      </div>
    </div>
  );
};

export default UserDasboardLayout;
