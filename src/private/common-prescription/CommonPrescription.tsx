import { useEffect, useState } from "react";
import axios from "axios";

const CommonPrescription = () => {
  const [ndata, setNdata] = useState<{
    name: string;
    id: string;
    age: number;
    course: string;
    sex: string;
    meds: Array<{
      name: string;
      dosage: string;
      duration: string;
      suggestion: string;
    }>;
  }>({
    name: "",
    id: "",
    age: 0,
    course: "",
    sex: "",
    meds: [],
  });

  const [diagnosis, setDiagnosis] = useState("");
  const [dietaryRemarks, setDietaryRemarks] = useState("");
  const [testNeeded, setTestNeeded] = useState("");
  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("roles");

      const url = window.location.search;
      const val = url.substring(url.indexOf("?") + 4);

      const apiUrl =
        role === "user"
          ? `http://ec2-3-108-51-210.ap-south-1.compute.amazonaws.com/api/patient/getPrescription/${val}`
          : `http://ec2-3-108-51-210.ap-south-1.compute.amazonaws.com/api/prescription/getPrescription/${val}`;

      if (apiUrl) {
        try {
          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = response.data.prescription;
          const patientData = data.patient;

          // Map meds to the required fields
          const medsData = data.meds.map((med: any) => ({
            name: med.medicine.medicineName,
            dosage: med.dosage,
            duration: med.duration,
            suggestion: med.suggestion,
          }));

          setNdata({
            name: patientData.name,
            id: patientData.sapId || patientData.phoneNumber,
            age:
              new Date().getFullYear() -
              new Date(patientData.dateOfBirth).getFullYear(),
            course: patientData.program,
            sex: patientData.gender,
            meds: medsData, // Set mapped meds data here
          });

          setDoctorName(data.doctor.name);
          setDiagnosis(data.diagnosis);
          setDietaryRemarks(data.dietaryRemarks);
          setTestNeeded(data.testNeeded);
        } catch (error) {
          console.error("Error fetching prescription data:", error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-5 flex flex-col justify-center items-center h-[83%]">
      <div className="bg-[#fdfdfd] p-5 w-[90%] border-black border overflow-y-scroll">
        <div className="flex items-center justify-between mb-[10px]">
          <div className="flex center">
            <img src="/public/upes-logo.png" alt="Logo" className="w-[50px]" />
          </div>
          <h2 className="font-medium text-center text-[24px]">INFIRMARY</h2>
          <div className="text-[18px]">{new Date().toLocaleDateString()}</div>
        </div>

        <hr className="border border-black my-[10px]" />
        <div className="my-[20px]">
          <div className="flex justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-[10px]">
                <label className="mr-auto font-medium">Name:</label>
                <input
                  type="text"
                  value={ndata?.name}
                  className="info-input"
                  readOnly
                />
              </div>
              <div className="flex items-center gap-[10px]">
                <label className="mr-auto font-medium">ID:</label>
                <input
                  type="text"
                  value={ndata?.id}
                  className="info-input"
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-[10px]">
                <label className="font-bold mr-auto">Age:</label>
                <input
                  type="text"
                  value={ndata?.age}
                  className="info-input"
                  readOnly
                />
              </div>
              <div className="flex items-center gap-[10px]">
                <label className="font-bold mr-auto">School:</label>
                <input
                  type="text"
                  value={ndata?.course}
                  className="info-input"
                  readOnly
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-[10px]">
                <label className="font-bold mr-auto">Sex:</label>
                <input
                  type="text"
                  value={ndata?.sex}
                  className="info-input"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="border border-black my-[10px]" />
        <div className="mt-5">
          <label>Diagnosis:</label>
          <textarea
            className="w-full h-[150px] p-4 rounded-[8px] bg-[#d5d4df] mt-1 resize-none"
            value={diagnosis}
            readOnly
          />
        </div>

        <div className="mt-5">
          <label>Medicine:</label>
          <table className="medicine-table">
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Medicine</th>
                <th>Dosage (per day)</th>
                <th>Duration (in Days)</th>
                <th>Suggestions</th>
              </tr>
            </thead>
            <tbody>
              {ndata.meds.map((med, index) => (
                <tr key={index} className="text-center">
                  <td>{index + 1}</td>
                  <td className="w-[25%]">
                    <input
                      className="bg-[#d5d4df] rounded-lg p-2 w-full text-center"
                      value={med.name}
                      readOnly
                    />
                  </td>
                  <td className="w-[15%]">
                    <input
                      type="number"
                      className="bg-[#d5d4df] rounded-lg p-2 text-center"
                      value={med.dosage}
                      readOnly
                    />
                  </td>
                  <td className="w-[15%]">
                    <input
                      type="number"
                      className="bg-[#d5d4df] rounded-lg p-2 text-center"
                      value={med.duration}
                      readOnly
                    />
                  </td>
                  <td>
                    <textarea
                      className="bg-[#d5d4df] rounded-lg p-2 w-full text-center"
                      value={med.suggestion}
                      readOnly
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5">
          <label>Dietary Recommendations:</label>
          <textarea
            className="w-full h-[100px] p-4 rounded-[8px] bg-[#d5d4df] mt-1 resize-none"
            value={dietaryRemarks}
            readOnly
          />
        </div>

        <div className="mt-5">
          <label>Tests Needed:</label>
          <textarea
            className="w-full h-[100px] p-4 rounded-[8px] bg-[#d5d4df] mt-1 resize-none"
            value={testNeeded}
            readOnly
          />
        </div>

        <div className="flex flex-col items-end mt-10">
          <span className="">{doctorName}</span>
          <div className="signature-text">Doctor Name</div>
        </div>
      </div>
    </div>
  );
};

export default CommonPrescription;
