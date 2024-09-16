import Navbar from "@/components/Navbar";
import Shared from "@/Shared";
import React from "react";

const PatientListLayout = ({ children }: { children: React.ReactNode }) => {
  const navsetting = {
    title: "Patient List",
    titleLogo: Shared.List,
    additionalLogo: Shared.ArrowLeft,
    menu: false,
    role: localStorage.getItem("roles"),
  };
  return (
    <div className="h-screen">
      <Navbar props={navsetting} />
      {children}
      <div className="w-full bg-white font-semibold h-[8%] flex items-center justify-center text-[#8F8F8F] border-t border border-[gray]">
        Bidholi Campus: Tel: +91-135-2770137, 2776053, 2776054, 2776091 &nbsp;
        &nbsp; &nbsp; Kandoli Campus: Tel: +91-135-2770137, 2776053, 2776054,
        2776091
      </div>
    </div>
  );
};

export default PatientListLayout;