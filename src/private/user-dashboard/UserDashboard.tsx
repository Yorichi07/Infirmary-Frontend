import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    appointmentStatus: "",
    doctorName: "",
  });
  const [userDetails, setUserDetails] = useState({
    email: "",
    name: "",
    school: "",
    dateOfBirth: "",
    program: "",
    phoneNumber: "",
    emergencyContact: "",
    bloodGroup: "",
    imageUrl: "",
    password: "",
  });

  const navigateTo = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      try {
        // Fetch user details
        const res = await axios.get("http://localhost:8081/api/patient/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        const data = await res.data;
        setUserDetails(data);
      } catch (e) {
        console.log(e);
        alert("Error fetching patient details, please try again later.")
      }
    };

    const getStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      try {
        // Fetch appointment and doctor status
        const response = await axios.get(
          "http://localhost:8081/api/patient/getStatus",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const statusData = response.data;
        // Set appointmentStatus and doctorName based on the response
        setStatus({
          appointmentStatus: statusData.Appointment ? "Queued" : "NA",
          doctorName: statusData.Doctor
            ? statusData.DoctorName
            : "Not Appointed",
        });
      } catch (error) {
        console.log("Error fetching status: ", error);
        alert("Couldn't fetch appointment details")
      }
    };

    getUser();
    getStatus();

    // Set up interval to call getStatus every 1 minute (60000 ms)
    const intervalId = setInterval(getStatus, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex justify-center items-center bg-[#ECECEC] h-[83%]">
      <div className="w-full px-14 py-10 flex justify-center items-center">
        <div className="w-full bg-[#000000] space-y-4 p-8 bg-opacity-10 rounded-lg flex items-center justify-center flex-col">
          <div className="bg-white border border-spacing-1 min-w-64">
            <img
              src={userDetails.imageUrl != null ? `http://localhost:8081/${userDetails.imageUrl}`:"http://localhost:8081/Profile/Profile.jpg"}
              alt=""
              className="w-64 object-contain border-2 border-black"
            />
          </div>
          <div className="text-center space-y-2 text-[#545555] font-medium">
            <p>{userDetails.name}</p>
            <p>{userDetails.email}</p>
            <p>DOB - {userDetails.dateOfBirth}</p>
            <p>Contact - {userDetails.phoneNumber}</p>
            <p>Blood Group - {userDetails.bloodGroup}</p>
          </div>
        </div>
      </div>

      <div className="w-full px-14 py-10 flex items-center justify-center">
        <div className="w-full flex flex-col px-10 space-y-8">
          {/* Appointment Status */}
          <div className="bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] p-2 py-4 rounded-md flex flex-col items-center justify-center">
            <p className="text-white font-semibold text-lg text-center">
              Appointment Status
            </p>
            <div className="bg-[#E0E0E0] flex items-center text-[#797979] font-semibold rounded-lg">
              <div
                className={`px-8 py-3 w-full ${
                  status.appointmentStatus === "NA"
                    ? "bg-[#1F60C0] text-white shadow-lg rounded-md"
                    : ""
                }`}
              >
                NA
              </div>
              <div
                className={`px-8 py-3 w-full ${
                  status.appointmentStatus === "Queued"
                    ? "bg-[#1F60C0] text-white shadow-lg rounded-md"
                    : ""
                }`}
              >
                Queued
              </div>
            </div>
          </div>

          {/* Doctor Status */}
          <div className="bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] p-2 py-4 rounded-md flex flex-col items-center justify-center">
            <p className="text-white font-semibold text-lg text-center">
              Doctor Status
            </p>
            <div className="bg-[#E0E0E0] flex justify-center items-center text-[#797979] font-semibold  rounded-lg w-1/2">
              {status.doctorName !== "Not Appointed" ? (
                <div className="p-4 bg-[#1F60C0] text-white w-full rounded-md justify-center flex shadow-md">
                  {status.doctorName}
                </div>
              ) : (
                <div className="p-4 bg-gray text-[#797979] w-full rounded-md justify-center flex shadow-md">
                  {status.doctorName}
                </div>
              )}
            </div>
          </div>

          {/* Other Buttons */}
          <div className="flex hover:-translate-y-1 transition ease-in duration-200 px-10 justify-between items-center bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] py-3 rounded-md">
            {/* <img src="/calander.png" alt="" /> */}
            <button
              className="text-white font-semibold text-lg text-center flex-1"
              onClick={() => navigateTo("/user-appointment")}
            >
              Schedule an Appointment
            </button>
          </div>
          <div className="flex hover:-translate-y-1 transition ease-in duration-200 px-10 justify-between items-center bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] py-3 rounded-md">
            {/* <img src="/prescription.png" alt="" /> */}
            <button
              className="text-white font-semibold text-lg text-center flex-1"
              onClick={() => navigateTo("/user-prescription")}
            >
              Prescription History
            </button>
          </div>
          <div className="flex hover:-translate-y-1 transition ease-in duration-200 px-10 justify-between items-center bg-gradient-to-r from-[#FF0004] gap-2 to-[#0D4493] py-3 rounded-md">
            {/* <img src="/emergency.png" alt="" /> */}
            <button className="text-white font-semibold text-lg text-center flex-1" onClick={()=>navigateTo("/emergency")}>
              Emergency
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
