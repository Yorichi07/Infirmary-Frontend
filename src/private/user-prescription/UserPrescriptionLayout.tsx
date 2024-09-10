import Navbar from "@/components/Navbar";
import Shared from "@/Shared";
import React from "react";

const UserPrescriptionLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navsetting = {
    title: "Prescription History",
    titleLogo: Shared.Prescription,
    additionalLogo: Shared.ArrowLeft,
    menu: false,
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

export default UserPrescriptionLayout;
