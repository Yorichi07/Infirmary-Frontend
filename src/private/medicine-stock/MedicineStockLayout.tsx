import Navbar from "@/components/Navbar";
import Shared from "@/Shared";
import React from "react";

const MedicineStockLayout = ({ children }: { children: React.ReactNode }) => {
  const navsetting = {
    title: "Medicine Stock",
    titleLogo: Shared.Pills,
    additionalLogo: Shared.ArrowLeft,
    menu: false,
    role: "doctor",
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

export default MedicineStockLayout;
