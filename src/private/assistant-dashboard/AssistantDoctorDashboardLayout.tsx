import Navbar from "@/components/Navbar";
import Shared from "@/Shared";
import React, { useEffect, useState } from "react";

const AssistantDoctorDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [title, setTitle] = useState("assistant doctor dashboard");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setTitle(e.matches ? "AD dashboard" : "assistant doctor dashboard");
    };

    setTitle(
      mediaQuery.matches ? "AD dashboard" : "assistant doctor dashboard"
    );

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  const navsetting = {
    title: title,
    titleLogo: Shared.DoctorHome,
    additionalLogo: Shared.User,
    menu: true,
    role: "ad",
  };
  return (
    <div className="h-[100vh] max-lg:min-h-[100svh] overflow-x-hidden">
      <Navbar props={navsetting} />
      {children}
      <div className="max-lg:hidden w-full flex items-center justify-center bg-white h-[8%] text-[#8F8F8F] border-t border-[gray] font-semibold">
        <span className="w-[48%] text-right">Energy Acres, Bidholi: Tel: +91-135-2770137, 2776053, 2776054, 2776091</span>
        <span className="w-[2%] text-center">|</span>
        <span className="w-[48%] text-left">Knowledge Acres, Kandoli: Tel: +91-135-2770137, 2776053, 2776054, 2776091</span>
      </div>
    </div>
  );
};

export default AssistantDoctorDashboardLayout;
