import Navbar from "@/components/Navbar";
import React from "react";

const StudentDasboardLayout = ({ children }: { children: React.ReactNode }) => {
  const navsetting = {
    title: "student dashboard",
    titleLogo: "/home-icon.png",
    additionalLogo: "/user-icon.png",
    menu: true,
  };
  return (
    <div className="h-screen">
      <Navbar props={navsetting} />
      {children}
      <div className="w-full bg-white h-[8%] flex items-center justify-center text-[#8F8F8F] border-t border border-[gray]">
        Helpline: 1800-XXXX-XXXX
      </div>
    </div>
  );
};

export default StudentDasboardLayout;
