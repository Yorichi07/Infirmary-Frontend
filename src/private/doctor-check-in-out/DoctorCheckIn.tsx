import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DoctorCheckIn = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState<Date>(new Date());
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [doctors, setDoctors] = useState<
    Array<{ id: number; name: string; status: string; email: string }>
  >([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://ec2-13-127-221-134.ap-south-1.compute.amazonaws.com/api/AD/getAllDoctors",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const doctorsData = response.data;

        const formattedDoctors = doctorsData.map((doctor: any) => ({
          id: doctor.doctorId,
          name: doctor.name,
          status: doctor.status ? "checked-in" : "checked-out",
          email: doctor.doctorEmail,
        }));
        setDoctors(formattedDoctors);
      } catch (error: any) {
        alert(error.response?.data?.message || "Error fetching doctors.");
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleCheckIn = async (event: any) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      const response = await fetch(
        `http://ec2-13-127-221-134.ap-south-1.compute.amazonaws.com/api/AD/setStatus/${event.target.dataset.key}?isDoctorCheckIn=true`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Failed to check in.");
      } else {
        location.reload();
      }
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Error during check-in. Please try again."
      );
      console.error("Error during check-in:", error);
    }
  };

  const handleCheckOut = async (event: any) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      const response = await fetch(
        `http://ec2-13-127-221-134.ap-south-1.compute.amazonaws.com/api/AD/setStatus/${event.target.dataset.key}?isDoctorCheckIn=false`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Failed to check out.");
      } else {
        location.reload();
      }
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Error during check-out. Please try again."
      );
      console.error("Error during check-out:", error);
    }
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const isAM = Number(hours) >= 12 ? "PM" : "AM";
    return `${hours}:${minutes}:${seconds} ${isAM}`;
  };

  return (
    <div className="flex justify-center items-center bg-[#ECECEC] h-[83%]">
      <div className="w-full px-14 py-10 flex justify-center items-center">
        <div className="w-full flex flex-col items-center space-y-6">
          <div className="flex items-center justify-center p-10 border-black border-b-2">
            <p className="text-6xl font-bold">{formatTime(time)}</p>
          </div>
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border bg-white shadow-lg"
            />
          </div>
        </div>
        <div className="w-full px-14">
          <div className="w-full flex flex-col space-y-2 p-4 bg-black rounded-lg bg-opacity-10 shadow-lg">
            {doctors.map((doctor, index) => (
              <div
                key={index}
                className="w-full bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] p-8 rounded-md flex items-center shadow-lg"
              >
                <p className="text-white font-semibold text-lg w-2/3">
                  {doctor.name}
                </p>
                <div className="flex w-full justify-between">
                  <button
                    data-key={`${doctor.id}`}
                    className={`shadow-lg px-8 py-2 ${
                      doctor.status == "checked-in"
                        ? "bg-gradient-to-r from-[#2FC800] gap-2 to-[#009534]"
                        : "bg-[#8F8F8F]"
                    } rounded-md text-white`}
                    onClick={(event: any) => {
                      handleCheckIn(event);
                    }}
                  >
                    Check-In
                  </button>
                  <button
                    data-key={`${doctor.id}`}
                    className={`shadow-lg px-8 py-2 ${
                      doctor.status == "checked-out"
                        ? "bg-gradient-to-r from-[#E00000] gap-2 to-[#7E0000]"
                        : "bg-[#8F8F8F]"
                    } rounded-md text-white`}
                    onClick={(event: any) => handleCheckOut(event)}
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
