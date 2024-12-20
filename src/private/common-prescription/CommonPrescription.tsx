import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { ToastAction } from "@/components/ui/toast";

const CommonPrescription = () => {
  const { toast } = useToast();
  const [ndata, setNdata] = useState<{
    name: string;
    id: string;
    age: number;
    course: string;
    date: string;
    time: string;
    designation: string;
    residenceType: string;
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
    date: "",
    designation: "",
    time: "",
    residenceType: "",
    meds: [],
  });

  const [diagnosis, setDiagnosis] = useState("");
  const [dietaryRemarks, setDietaryRemarks] = useState("");
  const [testNeeded, setTestNeeded] = useState("");
  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "User token is missing. Please log in again.",
          });
          return;
        }

        const role = localStorage.getItem("roles");
        const urlParam = new URLSearchParams(window.location.search).get("id");
        if (!urlParam) return;

        const apiUrl =
          role === "doctor"
            ? `http://localhost:8081/api/doctor/getPrescription/${urlParam}`
            : role === "ad"
            ? `http://localhost:8081/api/AD/getPrescription/${urlParam}`
            : `http://localhost:8081/api/patient/getPrescription/${urlParam}`;

        const { data } = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { prescription } = data;
        const patient = prescription?.patient || {};

        const medsData = prescription.meds.map((med:any) => ({
          name: med.medicine.medicineName,
          dosageMorning: med.dosageMorning || "0",
          dosageAfternoon: med.dosageAfternoon || "0",
          dosageEvening: med.dosageEvening || "0",
          duration: med.duration || "0",
          suggestion: med.suggestion || "",
        }));

        setNdata({
          name: patient.name || "",
          id: patient.sapId || patient.phoneNumber || "",
          age:
            new Date().getFullYear() -
            new Date(patient.dateOfBirth).getFullYear(),
          course: patient.program || "",
          sex: patient.gender || "",
          date: data.date || "",
          time: data.time || "",
          residenceType: data.residenceType || "",
          designation: data.doctor?.designation || "",
          meds: medsData,
        });

        setDoctorName(prescription.doctor?.name || "");
        setDiagnosis(prescription.diagnosis || "");
        setDietaryRemarks(prescription.dietaryRemarks || "");
        setTestNeeded(prescription.testNeeded || "");

        toast({
          title: "Data Loaded Successfully",
          description: "Prescription details have been fetched.",
        });
      } catch (error:any) {
        toast({
          variant: "destructive",
          title: "Error Fetching Data",
          description:
            error.response?.data?.message ||
            "Error occurred while fetching prescription data.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        console.error("Error fetching prescription data:", error);
      }
    };

    fetchData();
  }, []);

  const generatePdf = async () => {
    const content = document.getElementById("content");
    if (!content) return;

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const canvas = await html2canvas(content, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = pdf.internal.pageSize.width;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 0;

      while (position < imgHeight) {
        pdf.addImage(
          imgData,
          "PNG",
          0,
          position > 0 ? 10 : 0,
          imgWidth,
          imgHeight
        );
        position += pdf.internal.pageSize.height;
        if (position < imgHeight) pdf.addPage();
      }

      pdf.save("prescription.pdf");
      toast({
        title: "PDF Downloaded",
        description: "Prescription PDF has been saved successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error Generating PDF",
        description: "Something went wrong while generating the PDF.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="bg-[#ECECEC] p-5 flex flex-col justify-center items-center min-h-[84svh] max-lg:p-0 max-lg:min-h-[93svh]">
        <div
          id="content"
          className="bg-[#fdfdfd] p-5 w-[90%] border-black border overflow-y-scroll max-lg:w-full"
        >
          <div className="flex items-center justify-between mb-[10px]">
            <div className="flex center">
              <img src="/upes-logo2.jpg" alt="Logo" className="w-[50px]" />
            </div>
            <h2 className="font-medium text-center text-[24px]">INFIRMARY</h2>
            <div className="font-medium flex flex-col lg:flex-row items-center max-lg:text-sm ">
              <span>{ndata?.time}</span>
              <span className="lg:ml-2">{ndata?.date}</span>
            </div>
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
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center gap-[10px]">
                  <label className="font-medium mr-auto">Sex:</label>
                  <input
                    type="text"
                    value={ndata?.sex}
                    className="info-input"
                    readOnly
                  />
                </div>
                <div className="flex items-center justify-center gap-[10px]">
                  <label className="font-medium mr-auto">Residence Type:</label>
                  <input
                    type="text"
                    value={ndata?.residenceType}
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
            <label>Recommendations:</label>
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
            <span className="">{ndata?.designation}</span>
            <div className="signature-text">Doctor</div>
          </div>
        </div>
        <button
          onClick={generatePdf}
          className="mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded hover:from-blue-600 hover:to-blue-800 max-lg:my-2"
        >
          Download as PDF
        </button>
      </div>
    </>
  );
};

export default CommonPrescription;
