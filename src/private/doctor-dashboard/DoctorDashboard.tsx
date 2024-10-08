import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState<Date>(new Date());
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [totalPatients, setTotalPatients] = useState(0);
  const [patientsLeft, setPatientsLeft] = useState(0);
  const [inQueue, setInQueue] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const fetchPatientData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      const response = await fetch(
        "http://ec2-3-108-51-210.ap-south-1.compute.amazonaws.com/api/doctor/total-patient-count",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setTotalPatients(data.Total_Appointment);
        setPatientsLeft(data.Patients_left);
        setInQueue(data.In_Queue);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to fetch patient data.");
        console.error("Failed to fetch patient data:", errorData);
      }
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Failed to fetch patient data due to a network error."
      );
      console.error("Error fetching patient data:", error);
    }
  };

  const handleCheckIn = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      const response = await fetch(
        "http://ec2-3-108-51-210.ap-south-1.compute.amazonaws.com/api/doctor/setStatus?isDoctorCheckIn=true",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.ok) {
        setMessage("Doctor checked in successfully.");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to check in.");
      }
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Error during check-in. Please try again."
      );
      console.error("Error during check-in:", error);
    }

    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };

  const handleCheckOut = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      const response = await fetch(
        "http://ec2-3-108-51-210.ap-south-1.compute.amazonaws.com/api/doctor/setStatus?isDoctorCheckIn=false",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.ok) {
        setMessage("Doctor checked out successfully.");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to check out.");
      }
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Error during check-out. Please try again."
      );
      console.error("Error during check-out:", error);
    }

    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };

  useEffect(() => {
    fetchPatientData();

    const interval = setInterval(() => {
      fetchPatientData();
    }, 30000);

    return () => {
      clearInterval(interval);
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
            <div className="text-center bg-black bg-opacity-10 px-12 py-6 rounded-lg shadow-lg">
              <p className="font-semibold text-xl">Patients</p>
              <p className="text-lg">{totalPatients}</p>
            </div>
            <div className="w-[3px] my-4 bg-black"></div>
            <div className="text-center bg-black bg-opacity-10 px-12 py-6 rounded-lg shadow-lg">
              <p className="font-semibold text-xl">In Queue</p>
              <p className="text-lg">{inQueue}</p>
            </div>
            <div className="w-[3px] my-4 bg-black"></div>
            <div className="text-center bg-black bg-opacity-10 px-12 py-6 rounded-lg shadow-lg">
              <p className="font-semibold text-xl">Treatments</p>
              <p className="text-lg">{patientsLeft}</p>
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
              className="rounded-md border bg-white shadow-lg"
            />
          </div>
        </div>
        <div className="w-full px-14">
          <div className="w-full flex flex-col px-10 py-10 space-y-12">
            <div className="flex w-full justify-between">
              <button
                className="shadow-lg text-white px-10 py-3 rounded-md font-semibold text-lg text-center bg-gradient-to-r from-[#2FC800] gap-2 to-[#009534]"
                onClick={handleCheckIn}
              >
                Check-In
              </button>
              <button
                className="shadow-lg text-white px-10 py-3 rounded-md font-semibold text-lg text-center bg-gradient-to-r from-[#E00000] gap-2 to-[#7E0000]"
                onClick={handleCheckOut}
              >
                Check-Out
              </button>
            </div>
            {message && (
              <div className="text-center p-1 bg-green-100 border border-green-400 text-green-700 rounded-md">
                {message}
              </div>
            )}
            <button
              className="shadow-xl flex hover:-translate-y-1 transition ease-in duration-200 px-10 justify-between items-center bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] py-3 rounded-md"
              onClick={() => navigate("/patient-details")}
            >
              <p className="text-white font-semibold text-lg text-center flex-1">
                Patient Details
              </p>
            </button>
            <button
              className="shadow-xl flex hover:-translate-y-1 transition ease-in duration-200 px-10 justify-between items-center bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] py-3 rounded-md"
              onClick={() => navigate("/medicine-stock")}
            >
              <p className="text-white font-semibold text-lg text-center flex-1">
                Medical Stock
              </p>
            </button>
            <button
              className="shadow-xl flex hover:-translate-y-1 transition ease-in duration-200 px-10 justify-between items-center bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] py-3 rounded-md"
              onClick={() => navigate("/ambulance")}
            >
              <p className="text-white font-semibold text-lg text-center flex-1">
                Ambulance Details
              </p>
            </button>
            <button
              className="shadow-xl flex hover:-translate-y-1 transition ease-in duration-200 px-10 justify-between items-center bg-gradient-to-r from-[#FF0004] gap-2 to-[#0D4493] py-3 rounded-md"
              onClick={() => navigate("/emergency")}
            >
              <p className="text-white font-semibold text-lg text-center flex-1">
                Emergency Contacts
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
