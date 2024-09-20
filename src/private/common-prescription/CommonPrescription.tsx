import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

const CommonPrescription = () => {
  const [ndata, setNdata] = useState<{
    name: string;
    id: string;
    age: number;
    course: string;
    sex: string;
  }>({
    name: "",
    id: "",
    age: 0,
    course: "",
    sex: "",
  });

  const [diagnosis, setDiagnosis] = useState("");
  const [dietaryRemarks, setDietaryRemarks] = useState("");
  const [testNeeded, setTestNeeded] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState<string[]>([]);
  const [rows, setRows] = useState([0]);

  const [stock, setStock] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("roles");

      const url = window.location.search;
      const val = url.substring(url.indexOf("?") + 4);

      const apiUrl =
        role === "user"
          ? `http://localhost:8081/api/patient/getPrescription/${val}`
          : `http://localhost:8081/api/prescription/getPrescription/${val}`;

      if (apiUrl) {
        try {
          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = response.data.prescription;

          const patientData = data.patient;
          setNdata({
            name: patientData.name,
            id: patientData.sapId || patientData.phoneNumber,
            age:
              new Date().getFullYear() -
              new Date(patientData.dateOfBirth).getFullYear(),
            course: patientData.program,
            sex: patientData.gender,
          });

          setDoctorName(data.doctor.name);

          setDiagnosis(data.diagnosis);
          setDietaryRemarks(data.dietaryRemarks);
          setTestNeeded(data.testNeeded);

          setStock(data.medicine.map((med: any) => med.medicine));
          setRows(new Array(data.medicine.length).fill(0));
          setSelectedMedicine(
            data.medicine.map((med: any) => med.medicine.medicineName)
          );
        } catch (error) {
          console.error("Error fetching prescription data:", error);
        }
      }
    };

    fetchData();
  }, []);

  const handleMedicineSelect = (index: number, value: string) => {
    const newSelection = [...selectedMedicine];
    newSelection[index] = value;
    setSelectedMedicine(newSelection);
  };

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
          <h2 className="mb-[10px]">Medicine</h2>
          <table className="medicine-table">
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Medicine</th>
                <th>Dosage (per day)</th>
                <th>Duration (Days)</th>
                <th>Suggestions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((_, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <Select
                      onValueChange={(value) =>
                        handleMedicineSelect(index, value)
                      }
                      value={selectedMedicine[index]}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue>{selectedMedicine[index]}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {stock.map((medicine: any) => (
                          <SelectItem
                            key={medicine.batchNumber}
                            value={medicine.medicineName}
                          >
                            {medicine.medicineName} (Quantity:{" "}
                            {medicine.quantity})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td>
                    <input
                      type="number"
                      value={stock[index]?.dosage}
                      className="small-input"
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={stock[index]?.duration}
                      className="small-input"
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={stock[index]?.suggestion}
                      className="suggestions-input"
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
