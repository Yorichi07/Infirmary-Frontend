import { useEffect, useState } from "react";
import Shared from "@/Shared";
import Navbar from "@/components/Navbar";

const NewAssistantDoctorLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [title, setTitle] = useState("Register New Assistant Doctor");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setTitle(e.matches ? "Register New AD" : "Register New Assistant Doctor");
    };

    setTitle(
      mediaQuery.matches ? "Register New AD" : "Register New Assistant Doctor"
    );

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  const navsetting = {
    title,
    titleLogo: Shared.UserPlus,
    additionalLogo: Shared.ArrowLeft,
    menu: false,
    role: "admin",
  };

  return (
    <>
      <div className="min-h-[100svh]">
        <Navbar props={navsetting} />
        {children}
        <div className="max-lg:hidden w-full flex items-center justify-center bg-white h-[8svh] text-[#8F8F8F] border-t border-[gray] font-semibold">
          <span className="w-[48%] text-right">
            Energy Acres, Bidholi: Tel: +91-135-2770137, 2776053, 2776054,
            2776091
          </span>
          <span className="w-[2%] text-center">|</span>
          <span className="w-[48%] text-left">
            Knowledge Acres, Kandoli: Tel: +91-135-2770137, 2776053, 2776054,
            2776091
          </span>
        </div>
      </div>
    </>
  );
};

export default NewAssistantDoctorLayout;
