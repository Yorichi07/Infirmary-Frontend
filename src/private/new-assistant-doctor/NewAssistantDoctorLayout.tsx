import Shared from "@/Shared";
import Navbar from "@/components/Navbar";

const NewAssistantDoctorLayout = ({ children }: { children: React.ReactNode }) => {
  const navsetting = {
    title: "Register New Assistant Doctor",
    titleLogo: Shared.UserPlus,
    additionalLogo: Shared.ArrowLeft,
    menu: false,
    role: "admin",
  };
  return (
    <>
      <div className="h-[100vh] max-lg:min-h-[100svh] overflow-x-hidden">
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
