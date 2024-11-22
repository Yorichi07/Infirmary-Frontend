import { useEffect, useState, useRef } from "react";
import "./PatientDetails.css";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PatientDetails = () => {
  const navigate = useNavigate();
  const [diagnosis, setDiagnosis] = useState<string>();
  const [dietary, setDietary] = useState<string>();
  const [tests, setTests] = useState<string>();
  const [medLst, setMedLst] = useState<Record<number, string>>();

  const [rows, setRows] = useState([1]);
  const [ndata, setNdata] = useState<{
    name: string;
    age: number;
    sex: string;
    id: string;
    course: string;
    medHis: string;
    famHis: string;
    allergies: string;
    reports: [];
    reason: string;
    email: string;
    imageUrl: string;
    docName: string;
  }>();
  const [stock, setStock] = useState<
    Array<{ batchNumber: number; medicineName: string; quantity: number }>
  >([]);
  const [selectedMedicine, setSelectedMedicine] = useState<
    Record<number, string>
  >({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const age = (dob: string) => {
    const diff_ms = Date.now() - new Date(dob).getTime();
    const age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  };

  const handleSubmit = async () => {
    const medAry: any = new Array<{
      medicine: any;
      dosage: any;
      duration: any;
      suggestion: any;
    }>();

    const dosg = document.querySelectorAll(".dosage");
    const dur = document.querySelectorAll(".duration");
    const sugs = document.querySelectorAll(".suggestion");

    for (const meds in medLst) {
      medAry.push({
        medicine: medLst[parseInt(meds)],
        dosage: (dosg[parseInt(meds)] as HTMLInputElement).value,
        duration: (dur[parseInt(meds)] as HTMLInputElement).value,
        suggestion: (sugs[parseInt(meds)] as HTMLInputElement).value,
      });
    }
    const req: {
      diagnosis: string;
      dietaryRemarks: string;
      testNeeded: string;
      meds: any;
    } = {
      diagnosis: diagnosis || "",
      dietaryRemarks: dietary || "",
      testNeeded: tests || "",
      meds: medAry,
    };

    try {
      const resp = await axios.post(
        "ec2-3-108-64-92.ap-south-1.compute.amazonaws.com/api/prescription/submit",
        req,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      window.alert(resp.data);
      navigate(-1);
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.details) {
        alert(err.response.data.details);
      } else {
        alert("An error occurred. Please try again.");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(
          "ec2-3-108-64-92.ap-south-1.compute.amazonaws.com/api/doctor/getPatient",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const response = resp.data;

        const formatData = {
          name: response.patient.name,
          age: age(response.patient.dateOfBirth),
          sex: response.patient.gender,
          id: response.patient.sapID,
          course: response.patient.school,
          medHis: response.medicalDetails.medicalHistory,
          famHis: response.medicalDetails.familyMedicalHistory,
          allergies: response.medicalDetails.allergies,
          reports: response.prescriptions,
          reason: response.reason,
          email: response.patient.email,
          imageUrl: response.patient.imageUrl,
          docName: response.docName,
        };
        setNdata(formatData);
      } catch (err: any) {
        if (err.response && err.response.data && err.response.data.details) {
          alert(err.response.data.message);
        } else {
          alert("An error occurred while fetching patient data.");
        }
        console.error(err);
      }
    };

    const fetchMed = async () => {
      try {
        const resp = await axios.get("ec2-3-108-64-92.ap-south-1.compute.amazonaws.com/api/stock/available", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const response = resp.data;
        setStock(response);
      } catch (err: any) {
        if (err.response && err.response.data && err.response.data.details) {
          alert(err.response.data.details);
        } else {
          alert("An error occurred while fetching stock data.");
        }
        console.error(err);
      }
    };

    fetchData();
    fetchMed();
  }, []);

  const addRow = () => {
    setRows([...rows, rows.length + 1]);
  };

  const removeRow = () => {
    if (rows.length > 1) {
      setRows(rows.slice(0, -1));
    }
  };

  const handleMedicineSelect = (index: number, medicine: string) => {
    const indx = medicine.indexOf(":");
    setSelectedMedicine({
      ...selectedMedicine,
      [index]: medicine.substring(0, indx),
    });
    setMedLst({ ...medLst, [index]: medicine.substring(indx + 1) });

    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div className="h-[83%] p-5 flex flex-col bg-[#f5f5f5]">
      <div className=" overflow-y-scroll p-5">
        <div className="flex justify-between mb-5">
          <img
            className="w-[15%] border-black border"
            src={
              ndata?.imageUrl != null
                ? `ec2-3-108-64-92.ap-south-1.compute.amazonaws.com/${ndata?.imageUrl}`
                : "/default-user.jpg"
            }
          />
          <div className="flex flex-col justify-between">
            <div className="input-field">
              <label>Name:</label>
              <input type="text" value={ndata?.name} disabled />
            </div>
            <div className="input-field">
              <label>Age:</label>
              <input type="text" value={ndata?.age} disabled />
            </div>
            <div className="input-field">
              <label>Sex:</label>
              <input type="text" value={ndata?.sex} disabled />
            </div>
            <div className="input-field">
              <label>ID:</label>
              <input type="text" value={ndata?.id} disabled />
            </div>
            <div className="input-field">
              <label>School:</label>
              <input type="text" value={ndata?.course} disabled />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 w-[20%]">
            <Popover>
              <PopoverTrigger className="history-btn">
                Medical History
              </PopoverTrigger>
              <PopoverContent>{ndata?.medHis}</PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger className="history-btn">
                Family Medical History
              </PopoverTrigger>
              <PopoverContent>{ndata?.famHis}</PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger className="history-btn">Allergies</PopoverTrigger>
              <PopoverContent>{ndata?.allergies}</PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger
                className="history-btn"
                onClick={() =>
                  navigate(`/user-prescription?id=${ndata?.email}`)
                }
              >
                Reports
              </PopoverTrigger>
            </Popover>
          </div>
          <div className="flex flex-col w-[30%] gap-2">
            <label className="font-medium">Reason for Visit:</label>
            <textarea
              className="h-full p-2 bg-white text-black shadow-md rounded-[5px]"
              disabled
              value={ndata?.reason}
            ></textarea>
          </div>
        </div>
        <div className="p-5 flex flex-col justify-center items-center">
          <div className="bg-[#fdfdfd] p-5 w-[70%] border-black border">
            <div className="flex items-center justify-between mb-[10px]">
              <div className="flex center">
                <img
                  src="/upes-logo2.jpg"
                  alt="Logo"
                  className="w-[50px]"
                />
              </div>
              <h2 className="font-medium text-center text-[24px]">INFIRMARY</h2>
              <div className="text-[18px]">
                {new Date().toLocaleDateString()}
              </div>
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
                    />
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <label className="mr-auto font-medium">ID:</label>
                    <input
                      type="text"
                      value={ndata?.id}
                      className="info-input"
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
                    />
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <label className="font-bold mr-auto">School:</label>
                    <input
                      type="text"
                      value={ndata?.course}
                      className="info-input"
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
                onChange={(event: any) => setDiagnosis(event.target.value)}
              ></textarea>
            </div>
            <div className="mt-5">
              <label className="mb-[10px]">Medicine:</label>
              <table className="medicine-table">
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th>Medicine</th>
                    <th>Dosage (/day)</th>
                    <th>Duration (Days)</th>
                    <th>Suggestions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((_, index) => (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td className="w-[30%]">
                        <Select
                          onValueChange={(value) =>
                            handleMedicineSelect(index, value)
                          }
                        >
                          <SelectTrigger className="w-[100%]">
                            <SelectValue placeholder="Select Medicine">
                              {selectedMedicine[index] || "Select Medicine"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <div className="p-2">
                              <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search Medicine"
                                className="w-full px-2 py-1 border rounded"
                                onChange={(e) => setSearchQuery(e.target.value)}
                              />
                            </div>
                            {stock
                              .filter((medicine) =>
                                medicine.medicineName
                                  .toLowerCase()
                                  .includes(searchQuery.toLowerCase())
                              )
                              .map((medicine) => (
                                <SelectItem
                                  key={medicine.batchNumber}
                                  value={`${medicine.medicineName}:${medicine.batchNumber}`}
                                >
                                  {medicine.medicineName} (Quantity:{" "}
                                  {medicine.quantity})
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="w-[15%]">
                        <input
                          type="number"
                          min={1}
                          className="small-input dosage w-full"
                        />
                      </td>
                      <td className="w-[16%]">
                        <input
                          type="number"
                          className="small-input duration w-full"
                          min={1}
                        />
                      </td>
                      <td>
                        <textarea className="long-input suggestion" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="table-actions">
                <button className="add-btn" onClick={addRow}>
                  Add
                </button>
                <button className="remove-btn" onClick={removeRow}>
                  Remove
                </button>
              </div>
            </div>
            <div className="mt-5">
              <label>Dietary Recommendations:</label>
              <textarea
                className="w-full h-[100px] p-4 rounded-[8px] bg-[#d5d4df] mt-1 resize-none"
                placeholder="Enter dietary recommendations here..."
                onChange={(event: any) => setDietary(event.target.value)}
              ></textarea>
            </div>
            <div className="mt-5">
              <label>Tests Needed:</label>
              <textarea
                className="w-full h-[100px] p-4 rounded-[8px] bg-[#d5d4df] mt-1 resize-none"
                placeholder="Enter tests needed here..."
                onChange={(event: any) => setTests(event.target.value)}
              ></textarea>
            </div>
            <div className="flex flex-col items-end mt-10">
              <span className="">{ndata?.docName}</span>
              <div className="signature-text">Doctor Name</div>
            </div>
          </div>
          <Button
            type="button"
            className="rounded-none rounded-b-lg w-[70%]"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
