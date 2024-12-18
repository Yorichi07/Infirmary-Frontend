import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const CommonPrescription = () => {
  const [ndata, setNdata] = useState<{
    name: string;
    id: string;
    age: number;
    course: string;
    sex: string;
    meds: Array<{
      name: string;
      dosageMorning: string;
      dosageAfternoon: string;
      dosageEvening: string;
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
        role === "doctor"
          ? `http://localhost:8081/api/doctor/getPrescription/${val}`
          : role === "ad"
          ? `http://localhost:8081/api/AD/getPrescription/${val}`
          : `http://localhost:8081/api/patient/getPrescription/${val}`;

      if (apiUrl) {
        try {
          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = response.data.prescription;
          const patientData = data.patient;

          const medsData = data.meds.map((med: any) => ({
            name: med.medicine.medicineName,
            dosageMorning: med.dosageMorning,
            dosageAfternoon: med.dosageAfternoon,
            dosageEvening: med.dosageEvening,
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
            meds: medsData,
          });

          setDoctorName(data.doctor.name);
          setDiagnosis(data.diagnosis);
          setDietaryRemarks(data.dietaryRemarks);
          setTestNeeded(data.testNeeded);
        } catch (error: any) {
          alert(
            error.response?.data?.message || "Error fetching prescription data."
          );
          console.error("Error fetching prescription data:", error);
        }
      }
    };

    fetchData();
  }, []);

  const generatePdf = async () => {
    const content = document.getElementById("content");
    if (!content) return;

    const pdf = new jsPDF("p", "mm", "a4");
    const pageHeight = pdf.internal.pageSize.height;
    const pageWidth = pdf.internal.pageSize.width;

    const canvas = await html2canvas(content, {
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let position = 0;

    while (position < imgHeight) {
      pdf.addImage(
        imgData,
        "PNG",
        0,
        position > 0 ? 10 : 0,
        imgWidth,
        imgHeight - position > pageHeight ? pageHeight : imgHeight - position
      );
      position += pageHeight;
      if (position < imgHeight) {
        pdf.addPage();
      }
    }

    pdf.save("prescription.pdf");
  };

  return (
    <div className="p-5 flex flex-col justify-center items-center h-[83%] max-lg:p-0">
      <div
        id="content"
        className="bg-[#fdfdfd] p-5 w-[90%] border-black border overflow-y-scroll max-lg:w-full"
      >
        <div className="flex items-center justify-between mb-[10px]">
          <div className="flex center">
            <img src="/upes-logo2.jpg" alt="Logo" className="w-[50px]" />
          </div>
          <h2 className="font-medium text-center text-[24px]">INFIRMARY</h2>
          <div className="text-[18px]">{new Date().toLocaleDateString()}</div>
        </div>

        <hr className="border border-black my-[10px]" />
        <div className="my-[20px]">
          <div className="flex justify-between max-lg:flex-col max-lg:gap-4">
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
                <label className="font-medium mr-auto">Age:</label>
                <input
                  type="text"
                  value={ndata?.age}
                  className="info-input"
                  readOnly
                />
              </div>
              <div className="flex items-center gap-[10px]">
                <label className="font-medium mr-auto">School:</label>
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
                <label className="font-medium mr-auto">Sex:</label>
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
            className="w-full h-[150px] p-4 rounded-[8px] bg-[#d5d4df] mt-1 resize-none "
            value={diagnosis}
            readOnly
          />
        </div>

        <div className="mt-5">
          <label>Medicine:</label>
          <table className="medicine-table">
            <thead>
              <tr>
                <th className="whitespace-nowrap">S. No.</th>
                <th>Medicine</th>
                <th>Dosage (/day)</th>
                <th className="whitespace-nowrap">Duration (Days)</th>
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
                    <table className="nested-dosage-table w-full">
                      <thead>
                        <tr>
                          <th>Morning</th>
                          <th>Afternoon</th>
                          <th>Evening</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <input
                              type="number"
                              min={0}
                              className="info-input dosage-morning w-full"
                              placeholder="0"
                              value={med.dosageMorning}
                              readOnly
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              min={0}
                              className="info-input dosage-afternoon w-full"
                              value={med.dosageAfternoon}
                              readOnly
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              min={0}
                              className="info-input dosage-evening w-full"
                              value={med.dosageEvening}
                              readOnly
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
      <button
        onClick={generatePdf}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 max-lg:my-2"
      >
        Download as PDF
      </button>
    </div>
  );
};

export default CommonPrescription;
