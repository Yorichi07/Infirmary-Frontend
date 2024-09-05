import React from "react";

const StudentDashboard = () => {
  const [userInfo, setUserInfo] = React.useState({
    name: "",
    sap: "",
    course: "",
    semester: "",
    appointmentStatus: "appointed",
    doctorStatus: "appointed",
  });
  return (
    <div className="flex justify-center items-center bg-[#ECECEC] h-[83%]">
      <div className="w-full px-14 py-10 flex justify-center items-center">
        <div className="w-full bg-[#000000] space-y-4 p-12 bg-opacity-10 rounded-lg flex items-center justify-center flex-col">
          <div className="bg-white border border-spacing-1 min-w-64">
            <img
              src="/default-user.jpg"
              alt=""
              className="w-64 object-contain"
            />
          </div>
          <div className="text-center space-y-2 text-[#545555]">
            <p>Name - {userInfo.name}</p>
            <p>Patient Id - {userInfo.sap}</p>
            <p className="line-clamp-1">Course - {userInfo.course}</p>
            <p>Semester - {userInfo.semester}</p>
          </div>
        </div>
      </div>
      <div className="w-full px-14 py-10 flex items-center justify-center">
        <div className="w-full flex flex-col px-10 space-y-8">
          <div className="bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] p-2 py-4 rounded-md flex flex-col items-center justify-center">
            <p className="text-white font-semibold text-lg text-center">
              Appointment Status
            </p>
            <div className="bg-[#E0E0E0] flex items-center text-[#797979] font-semibold rounded-lg w-1/2">
              <div
                className={`px-8 py-3 w-full ${
                  userInfo.appointmentStatus === "pending"
                    ? "bg-[#1F60C0] text-white shadow-lg rounded-md"
                    : ""
                }`}
              >
                Pending
              </div>
              <div
                className={`px-8 py-3 w-full ${
                  userInfo.appointmentStatus === "appointed"
                    ? "bg-[#1F60C0] text-white shadow-lg rounded-md"
                    : ""
                }`}
              >
                Appointed
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] p-2 py-4 rounded-md flex flex-col items-center justify-center">
            <p className="text-white font-semibold text-lg text-center">
              Doctor Status
            </p>
            <div className="bg-[#E0E0E0] flex items-center text-[#797979] font-semibold  rounded-lg w-1/2">
              <div
                className={`px-8 py-3 w-full ${
                  userInfo.doctorStatus === "pending"
                    ? "bg-[#1F60C0] text-white shadow-lg rounded-md"
                    : ""
                }`}
              >
                Pending
              </div>
              <div
                className={`px-8 py-3 w-full ${
                  userInfo.doctorStatus === "appointed"
                    ? "bg-[#1F60C0] text-white shadow-lg rounded-md"
                    : ""
                }`}
              >
                Appointed
              </div>
            </div>
          </div>
          <div className="flex hover:-translate-y-1 transition ease-in duration-200 px-10 justify-between items-center bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] py-3 rounded-md">
            <img src="/calander.png" alt="" />
            <button className="text-white font-semibold text-lg text-center flex-1">
              Schedule an Appointment
            </button>
          </div>
          <div className="flex hover:-translate-y-1 transition ease-in duration-200 px-10 justify-between items-center bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] py-3 rounded-md">
            <img src="/prescription.png" alt="" />
            <button className="text-white font-semibold text-lg text-center flex-1">
              Prescription History
            </button>
          </div>
          <div className="flex hover:-translate-y-1 transition ease-in duration-200 px-10 justify-between items-center bg-gradient-to-r from-[#FF0004] gap-2 to-[#0D4493] py-3 rounded-md">
            <img src="/emergency.png" alt="" />
            <button className="text-white font-semibold text-lg text-center flex-1">
              Emergengy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
