import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";

const DoctorDashboard = () => {
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
        <div className="w-full flex flex-col items-center">
          <div className="flex space-x-4">
            <div className="text-center bg-black bg-opacity-10 px-12 py-6 rounded-lg">
              <p className="font-semibold text-xl">Patients</p>
              <p className="text-lg">100</p>
            </div>
            <div className="w-[3px] my-4 bg-black"></div>
            <div className="text-center bg-black bg-opacity-10 px-12 py-6 rounded-lg">
              <p className="font-semibold text-xl">In Queue</p>
              <p className="text-lg">55</p>
            </div>
            <div className="w-[3px] my-4 bg-black"></div>
            <div className="text-center bg-black bg-opacity-10 px-12 py-6 rounded-lg">
              <p className="font-semibold text-xl">Treatments</p>
              <p className="text-lg">45</p>
            </div>
          </div>
          <div className="flex items-center justify-center p-10">
            <p className="text-4xl font-bold">{formatTime(time)}</p>
          </div>
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
          <div className="w-full flex flex-col px-10 space-y-10">
            <div className="flex w-full justify-between">
              <button className="text-white px-10 py-3 rounded-md font-semibold text-lg text-center bg-gradient-to-r from-[#2FC800] gap-2 to-[#009534]">
                Check-In
              </button>
              <button className="text-white px-10 py-3 rounded-md font-semibold text-lg text-center bg-gradient-to-r from-[#E00000] gap-2 to-[#7E0000]">
                Check-Out
              </button>
            </div>
            <button className="flex hover:-translate-y-1 transition ease-in duration-200 px-10 justify-between items-center bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] py-3 rounded-md">
              <p className="text-white font-semibold text-lg text-center flex-1">
                Patient Queue
              </p>
            </button>
            <button className="flex hover:-translate-y-1 transition ease-in duration-200 px-10 justify-between items-center bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] py-3 rounded-md">
              <p className="text-white font-semibold text-lg text-center flex-1">
                Medical Stock
              </p>
            </button>
            <button className="flex hover:-translate-y-1 transition ease-in duration-200 px-10 justify-between items-center bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] py-3 rounded-md">
              <p className="text-white font-semibold text-lg text-center flex-1">
                Reports
              </p>
            </button>
            <button className="flex hover:-translate-y-1 transition ease-in duration-200 px-10 justify-between items-center bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] py-3 rounded-md">
              <p className="text-white font-semibold text-lg text-center flex-1">
                Ambulance Tracker
              </p>
            </button>
            <button className="flex hover:-translate-y-1 transition ease-in duration-200 px-10 justify-between items-center bg-gradient-to-r from-[#FF0004] gap-2 to-[#0D4493] py-3 rounded-md">
              <img src="/emergency.png" alt="" />
              <p className="text-white font-semibold text-lg text-center flex-1">
                Emergengy
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
