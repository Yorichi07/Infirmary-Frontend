import Navbar from "@/components/Navbar";
import Shared from "@/Shared";
import React from "react";

const UserAppointmentLayout = ({ children }: { children: React.ReactNode }) => {
  const navsetting = {
    title: "Patient Appointment",
    titleLogo: Shared.UserPlus,
    additionalLogo: Shared.ArrowLeft,
    menu: false,
    role: localStorage.getItem("roles"),
    prevRef:null
  };
  return (
    <div className="h-[100vh] max-lg:min-h-[100svh] overflow-x-hidden">
      <Navbar props={navsetting} />
      {children}
      <div className="flex items-center justify-center w-full border border-black bg-white text-black min-h-[8svh] shadow-md max-lg:hidden">
        <b>Energy Acres, Bidholi : </b>&nbsp;+91-135-2770137, 2776053, 2776054,
        2776091 &nbsp; | &nbsp; <b>Knowledge Acres, Kandoli : </b>
        &nbsp;+91-135-2770137, 2776053, 2776054, 2776091
      </div>
    </div>
  );
};

export default UserAppointmentLayout;
