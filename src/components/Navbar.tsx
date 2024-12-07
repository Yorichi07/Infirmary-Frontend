import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({
  props,
}: {
  props: {
    title: string;
    titleLogo: JSX.Element | false;
    additionalLogo: JSX.Element | undefined;
    menu: boolean | undefined;
    role: string | null;
  };
}) => {
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigateTo("/");
  };

  return (
    <div className="bg-white shadow-md p-4 flex items-center justify-between h-[9svh] border-b border border-[gray] max-lg:h-[7svh]">
      <img
        src="/upes-logo.jpg"
        alt="UPES Logo"
        className="w-[100px] h-[45px] max-lg:w-[80px] max-lg:h-[35px]"
      />
      <div className={props.role !== "ad" ?"capitalize font-semibold text-2xl max-lg:text-xl flex gap-2 items-baseline":"capitalize font-semibold text-2xl max-lg:text-xl flex gap-2 items-baseline max-lg:hidden"}>
        {props.titleLogo &&
          (typeof props.titleLogo === "string" ? (
            <img src={props.titleLogo} alt="Title Logo" className="w-8" />
          ) : (
            props.titleLogo
          ))}
        {props.title}
      </div>
      {props.additionalLogo && props.menu ? (
        <Popover>
          <PopoverTrigger className="text-2xl max-lg:text-lg">
            {props.additionalLogo}
          </PopoverTrigger>
          <PopoverContent className="space-y-4 p-4 max-lg:p-2">
            
            {props.role !== "doctor" && props.role !== "ad" ? (
              <div
                className="flex items-center gap-2 max-lg:items-start max-lg:gap-1 hover:cursor-pointer"
                onClick={() => navigateTo("/patient-profile")}
              >
                <img
                  src="/user-icon.png"
                  alt="User Icon"
                  className="w-4 max-lg:w-5"
                />
                <span className="text-base max-lg:text-sm">Profile</span>
              </div>
            ):(<></>)}
            <div
              className="flex items-center gap-2 max-lg:items-start max-lg:gap-1 hover:cursor-pointer"
              onClick={handleLogout}
            >
              <img
                src="/logout.png"
                alt="Logout Icon"
                className="w-5 max-lg:w-6"
              />
              <span className="text-base max-lg:text-sm">Logout</span>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Link
          to={`/${props.role}-dashboard`}
          className="text-base max-lg:text-sm"
        >
          {props.additionalLogo}
        </Link>
      )}
    </div>
  );
};

export default Navbar;
