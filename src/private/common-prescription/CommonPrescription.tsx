import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CommonPrescription = () => {
  const [ndata, setNdata] = useState({
    name: "John Doe",
    id: "12345",
    age: "25",
    course: "Engineering",
    sex: "Male",
  });

  const [rows, setRows] = useState([0]); // Assuming one row by default
  const [selectedMedicine, setSelectedMedicine] = useState<string[]>([]);
  const [stock, setStock] = useState([
    { batchNumber: "001", medicineName: "Paracetamol", quantity: 50 },
    { batchNumber: "002", medicineName: "Ibuprofen", quantity: 30 },
    // Add more medicines as needed
  ]);

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
            placeholder="Enter diagnosis here..."
          ></textarea>
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
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Medicine">
                          {selectedMedicine[index] || "Select Medicine"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {stock.map((medicine) => (
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
                    <input type="number" className="small-input" />
                  </td>
                  <td>
                    <input type="number" className="small-input" />
                  </td>
                  <td>
                    <input type="text" className="suggestions-input" />
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
            placeholder="Enter dietary recommendations here..."
          ></textarea>
        </div>
        <div className="mt-5">
          <label>Tests Needed:</label>
          <textarea
            className="w-full h-[100px] p-4 rounded-[8px] bg-[#d5d4df] mt-1 resize-none"
            placeholder="Enter tests needed here..."
          ></textarea>
        </div>
        <div className="flex flex-col items-end mt-10">
          <span className="">Dr. Lakshit Butola</span>
          <div className="signature-text">Doctor Name</div>
        </div>
      </div>
    </div>
  );
};

export default CommonPrescription;
