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
    role: string;
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
    <div className="bg-white shadow-md p-4 pr-8 flex items-center justify-between h-[9%] border-b border border-[gray]">
      <img src="/upes-logo.png" alt="UPES Logo" className="w-14" />
      <div className="capitalize font-semibold text-2xl flex items-center gap-2">
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
          <PopoverTrigger className="text-2xl">
            {props.additionalLogo}
          </PopoverTrigger>
          <PopoverContent className="space-y-4">
            {props.role !== "doctor" && props.role !== "assistant" && (
              <div
                className="flex items-center gap-2 hover:cursor-pointer"
                onClick={() => navigateTo("/user-profile")}
              >
                <img src="/user-icon.png" alt="User Icon" className="w-4" />
                Profile
              </div>
            )}
            <div
              className="flex items-center gap-2 hover:cursor-pointer"
              onClick={handleLogout}
            >
              <img src="/logout.png" alt="Logout Icon" className="w-5" />
              Logout
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Link to={`/${props.role}-dashboard`}>{props.additionalLogo}</Link>
      )}
    </div>
  );
};

export default Navbar;
