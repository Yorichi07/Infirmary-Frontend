import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";

const DoctorCheckIn = () => {
  const [time, setTime] = useState<Date>(new Date());
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const isAM = Number(hours) > 12 ? "PM" : "AM";
    return `${hours}:${minutes}:${seconds} ${isAM}`;
  };

  return (
    <div className="flex justify-center items-center bg-[#ECECEC] h-[83%]">
      <div className="w-full px-14 py-10 flex justify-center items-center">
        <div className="w-full flex flex-col items-center space-y-6">
          <div className="flex items-center justify-center p-10 border-black border-b-2">
            <p className="text-6xl font-bold">{formatTime(time)}</p>
          </div>
          {/* <div className="h-1 bg-black w-full"></div> */}
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border bg-white"
            />
          </div>
        </div>
        <div className="w-full px-14">
          <div className="w-full flex flex-col space-y-2 p-4 bg-black rounded-lg bg-opacity-10">
            {doctors.map((doctor) => (
              <div className="w-full bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] p-8 rounded-md flex items-center">
                <p className="text-white font-semibold text-lg w-2/3">
                  {doctor.name}
                </p>
                <div className="flex w-full justify-between">
                  <button
                    className={`px-8 py-2 ${
                      doctor.status !== "checked-in"
                        ? "bg-gradient-to-r from-[#2FC800] gap-2 to-[#009534]"
                        : "bg-[#8F8F8F]"
                    }  rounded-md text-white`}
                  >
                    Check-In
                  </button>
                  <button
                    className={`px-8 py-2 ${
                      doctor.status !== "checked-out"
                        ? "bg-gradient-to-r from-[#E00000] gap-2 to-[#7E0000]"
                        : "bg-[#8F8F8F]"
                    }  rounded-md text-white`}
                  >
                    Check-Out
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCheckIn;
