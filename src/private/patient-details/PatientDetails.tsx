import { useEffect, useState } from "react";
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
import Shared from "@/Shared";

const PatientDetails = () => {
  const navigate = useNavigate();
  // Ref Elements
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
    email:string;
  }>();
  const [stock, setStock] = useState<
    Array<{ batchNumber: number; medicineName: string; quantity: number }>
  >([]);
  const [selectedMedicine, setSelectedMedicine] = useState<
    Record<number, string>
  >({});

  const age = (dob: string) => {
    const diff_ms = Date.now() - new Date(dob).getTime();

    const age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  };

  const handleSubmit = async () =>{
    let medAry:any = new Array<{ medicine: any,dosage:any,duration:any,suggestion:any }>();

    const dosg = document.querySelectorAll(".dosage");
    const dur = document.querySelectorAll(".duration");
    const sugs = document.querySelectorAll(".suggestion");
    
    for( const meds in medLst){
      medAry.push({
        medicine: medLst[parseInt(meds)],
        dosage: dosg[parseInt(meds)].value,
        duration: dur[parseInt(meds)].value,
        suggestion: sugs[parseInt(meds)].value
      });
    }
    let req: {diagnosis:string,dietaryRemarks:string,testNeeded:string,meds:any} = {
      diagnosis:diagnosis||"",
      dietaryRemarks:dietary||"",
      testNeeded:tests||"",
      meds:medAry
    }

    try{

      const resp = await axios.post("http://localhost:8081/api/prescription/submit",req,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      window.alert(resp.data);
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:8081/api/doctor/getPatient",
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
          email:response.email
        };
        setNdata(formatData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

    const fetchMed = async () => {
      try {
        const resp = await axios.get("http://localhost:8081/api/stock/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const response = resp.data;
        setStock(response);
      } catch (err) {
        console.log(err);
      }
    };
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
    setSelectedMedicine({ ...selectedMedicine, [index]: medicine.substring(0,indx) });
    setMedLst({ ...medLst , [index]:medicine.substring(indx+1) });
  };

  return (
    <div className="h-[83%] p-5 flex flex-col bg-[#f5f5f5]">
      <div className=" overflow-y-scroll p-5">
        <div className="flex justify-between mb-5">
          <img
            className="w-[15%] border-black border"
            src="/public/default-user.jpg"
            alt="Profile Picture"
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
                onClick={() => navigate(`/user-prescription?id=${ndata?.email}`)}
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
                  src="/public/upes-logo.png"
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
                onChange={(event:any)=>setDiagnosis(event.target.value)}
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
                    <th></th>
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
                                value={`${medicine.medicineName}:${medicine.batchNumber}`}
                              >
                                {medicine.medicineName} (Quantity:{" "}
                                {medicine.quantity})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td>
                        <input type="number" className="small-input dosage" />
                      </td>
                      <td>
                        <input type="number" className="small-input duration" min={1} />
                      </td>
                      <td>
                        <input type="number" className="small-input" />
                      </td>
                      <td>
                        <button type="button" className="">{Shared.SquareCheck}</button>
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
                onChange={(event:any)=>setDietary(event.target.value)}
              ></textarea>
            </div>
            <div className="mt-5">
              <label>Tests Needed:</label>
              <textarea
                className="w-full h-[100px] p-4 rounded-[8px] bg-[#d5d4df] mt-1 resize-none"
                placeholder="Enter tests needed here..."
                onChange={(event:any)=>setTests(event.target.value)}
              ></textarea>
            </div>
            <div className="flex flex-col items-end mt-10">
              <span className="">Dr. Lakshit Butola</span>
              <div className="signature-text">Doctor Name</div>
            </div>
          </div>
          <Button className="rounded-none rounded-b-lg w-[70%]" onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
