import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";

const AssistantDoctorDashboard = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState<Date>(new Date());
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [totalPatients, setTotalPatients] = useState(0);
  const [patientsLeft, setPatientsLeft] = useState(0);
  const [inQueue, setInQueue] = useState(0);

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
        "http://localhost:8081/api/doctor/total-patient-count",
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
        console.error("Failed to fetch patient data.");
        alert("Failed to fetch patient data");
      }
    } catch (error: any) {
      console.error("Error fetching patient data:", error);
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Failed to fetch patient data due to a network error.");
      }
    }
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const isAM = Number(hours) > 12 ? "PM" : "AM";
    return `${hours}:${minutes}:${seconds} ${isAM}`;
  };

  useEffect(() => {
    fetchPatientData();

    const interval = setInterval(() => {
      fetchPatientData();
    }, 25000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex justify-center items-center bg-[#ECECEC] min-h-[83%] overflow-hidden max-lg:min-h-[93svh] max-lg:items-center">
      <div className="w-full px-14 py-4 max-lg:py-5 flex justify-center items-center max-lg:flex-col max-lg:px-0">
        <div className="w-full flex flex-col items-center">
          <div className="flex space-x-4 max-lg:gap-5">
            <div className="text-center bg-black bg-opacity-10 px-12 py-6 rounded-lg shadow-lg max-lg:p-0 max-lg:bg-opacity-0 max-lg:shadow-none">
              <p className="font-semibold text-xl">Patients</p>
              <p className="text-lg">{totalPatients}</p>
            </div>
            <div className="w-[3px] my-4 bg-black max-lg:hidden"></div>
            <div className="text-center bg-black bg-opacity-10 px-12 py-6 rounded-lg shadow-lg max-lg:p-0 max-lg:bg-opacity-0 max-lg:shadow-none">
              <p className="font-semibold text-xl">In Queue</p>
              <p className="text-lg">{inQueue}</p>
            </div>
            <div className="w-[3px] my-4 bg-black max-lg:hidden"></div>
            <div className="text-center bg-black bg-opacity-10 px-12 py-6 rounded-lg shadow-lg max-lg:p-0 max-lg:bg-opacity-0 max-lg:shadow-none">
              <p className="font-semibold text-xl">Treatments</p>
              <p className="text-lg">{patientsLeft}</p>
            </div>
          </div>
          <div className="flex items-center justify-center p-10 max-lg:p-5">
            <p className="text-4xl font-bold">{formatTime(time)}</p>
          </div>
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border bg-white shadow-lg max-lg:hidden"
            />
          </div>
        </div>
        <div className="w-full px-14 max-lg:px-8">
          <div className="w-full flex flex-col px-10 max-lg:px-0 space-y-10 max-lg:py-2">
            <button
              className="shadow-xl flex hover:-translate-y-1 transition ease-in duration-200 px-10 justify-between items-center bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] py-3 rounded-md"
              onClick={() => navigate("/doctor-check-in-out")}
            >
              <p className="text-white font-semibold text-lg text-center flex-1">
                Doctors Availability
              </p>
            </button>
            <button
              className="shadow-xl flex hover:-translate-y-1 transition ease-in duration-200 px-10 justify-between items-center bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] py-3 rounded-md"
              onClick={() => navigate("/patient-list")}
            >
              <p className="text-white font-semibold text-lg text-center flex-1">
                Patient Queue
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
              onClick={() => navigate("/Ambulance")}
            >
              <p className="text-white font-semibold text-lg text-center flex-1">
                Ambulance Details
              </p>
            </button>
            <button
              className="shadow-xl flex hover:-translate-y-1 transition ease-in duration-200 px-10 justify-between items-center bg-gradient-to-r from-[#FF0004] gap-2 to-[#0D4493] py-3 rounded-md"
              onClick={() => navigate("/Emergency")}
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

export default AssistantDoctorDashboard;
