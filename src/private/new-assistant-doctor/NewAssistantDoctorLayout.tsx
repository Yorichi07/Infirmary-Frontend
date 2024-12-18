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
        <div className="flex items-center justify-center w-full border border-black bg-white text-black min-h-[8svh] shadow-md">
          <b>Energy Acres, Bidholi : </b>&nbsp;+91-135-2770137, 2776053,
          2776054, 2776091 &nbsp; | &nbsp; <b>Knowledge Acres, Kandoli : </b>
          &nbsp;+91-135-2770137, 2776053, 2776054, 2776091
        </div>
      </div>
    </>
  );
};

export default NewAssistantDoctorLayout;
