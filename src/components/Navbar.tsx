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
    if (props.role == "admin") {
      navigateTo("/admin-portal");
    } else {
      navigateTo("/");
    }
  };

  return (
    <div className="bg-white shadow-md p-4 flex items-center justify-between h-[8svh] border-b border border-[gray] max-lg:h-[7svh]">
      <img
        src="/upes-logo.jpg"
        alt="UPES Logo"
        className="w-[100px] h-[45px] max-lg:w-[80px] max-lg:h-[35px]"
      />
      <div className="capitalize font-semibold text-2xl max-lg:text-xl flex gap-2 items-baseline">
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
          <PopoverTrigger className="text-2xl max-lg:text-lg w-[100px] flex items-center justify-end">
            {props.additionalLogo}
          </PopoverTrigger>
          <PopoverContent className="space-y-2 p-2 max-lg:p-2">
            {props.role !== "doctor" &&
            props.role !== "ad" &&
            props.role !== "admin" ? (
              <div
                className="flex items-center gap-3 max-lg:items-start max-lg:gap-1 hover:bg-gray-100 hover:text-blue-500 hover:cursor-pointer p-1 rounded-md"
                onClick={() => navigateTo("/patient-profile")}
              >
                <img
                  src="/user-icon.png"
                  alt="User Icon"
                  className="w-4 max-lg:w-5"
                />
                <span className="text-base max-lg:text-sm">Profile</span>
              </div>
            ) : (
              <></>
            )}
            <div
              className="flex items-center gap-2.5 max-lg:items-start max-lg:gap-1 hover:bg-gray-100 hover:text-blue-500 p-1 hover:cursor-pointer rounded-md"
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
          className="text-base max-lg:text-sm flex items-center justify-end w-[100px]"
        >
          {props.additionalLogo}
        </Link>
      )}
    </div>
  );
};

export default Navbar;
