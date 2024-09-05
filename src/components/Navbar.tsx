import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = ({
  props,
}: {
  props: {
    title: string;
    titleLogo: undefined | string;
    additionalLogo: undefined | string;
  };
}) => {
  return (
    <div className="bg-white shadow-md p-4 flex items-center justify-between h-[9%] border-b border border-[gray]">
      <img src="/upes-logo.png" alt="" className="w-14" />
      <div className="capitalize font-semibold text-2xl flex items-center gap-2">
        <img src={props.titleLogo} alt="" className="w-8" />
        {props.title}
      </div>
      {props.additionalLogo ? (
        <Popover>
          <PopoverTrigger>
            <img src={props.additionalLogo} alt="" className="w-6" />
          </PopoverTrigger>
          <PopoverContent className="space-y-4">
            <div className="flex items-center gap-2 hover:cursor-pointer">
              {" "}
              <img src="/user-icon.png" alt="" className="w-4" />
              Profile
            </div>
            <div className="flex items-center gap-2 hover:cursor-pointer">
              <img src="/logout.png" alt="" className="w-5" />
              Logout
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Navbar;
