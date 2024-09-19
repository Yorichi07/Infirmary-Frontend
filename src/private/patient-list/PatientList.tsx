import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Shared from "@/Shared";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import "./PatientList.css";
import { useNavigate } from "react-router-dom";

const PatientList = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<
    Array<{ email: string; name: string; reason: string }>
  >([]);
  const [selectedButton, setSelectedButton] = useState("Pending");
  const [dialogData, setDialogData] = useState({
    pref_doc: "",
    reason: "",
    doc_reason: "",
    temperature: "",
    weight: "",
  });
  const [docData, setDocData] = useState<{
    pref_doc: string;
    doc_reason: string;
  }>();
  const [doctors, setDoctors] = useState<{ id: string; name: string }[]>([]);
  const [currentPatientEmail, setCurrentPatientEmail] = useState("");

  // useEffect(() => {
  //   const fetchList = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const apiUrl =
  //         selectedButton === "Pending"
  //           ? "http://localhost:8081/api/AD/getPatientQueue"
  //           : "http://localhost:8081/api/AD/getCompletedQueue";

  //       const response = await axios.get(apiUrl, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       const fetchedData = response.data;
  //       const formattedData = fetchedData.map((pat: any) => ({
  //         email: pat.sapEmail,
  //         name: pat.name,
  //         reason: pat.reason,
  //       }));

  //       setPatient(formattedData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchList();
  // }, [selectedButton]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        if (selectedButton === "Pending") {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            "http://localhost:8081/api/AD/getPatientQueue",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const fetchedData = response.data;
          const formattedData = fetchedData.map((pat: any) => ({
            email: pat.sapEmail,
            name: pat.name,
            reason: pat.reason,
          }));

          setPatient(formattedData);
        } else if (selectedButton === "Appointed") {
          // Hardcoded example for the "Appointed" list
          const appointedPatients = [
            {
              email: "test.patient@example.com",
              name: "John Doe",
              reason: "Routine Checkup",
            },
          ];
          setPatient(appointedPatients);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchList();
  }, [selectedButton]);

  const getAppointmentDetails = async (email: string) => {
    setCurrentPatientEmail(email); // Store the email of the patient currently being edited
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8081/api/AD/getAptForm/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const formatData = response.data;
      console.log(formatData);
      setDocData({
        pref_doc: formatData.pref_doc || "No Preffered Doctor",
        doc_reason: formatData.doc_reason || "",
      });

      // Fetch available doctors when dialog opens
      await fetchAvailableDoctors();
    } catch (error) {
      console.log("Error fetching appointment details:", error);
    }
  };

  const fetchAvailableDoctors = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8081/api/AD/getAvailableDoctors",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const doctorList = response.data.map((doctor: any) => ({
        id: doctor.doctorId.toString(),
        name: doctor.name,
      }));
      setDoctors(doctorList);
    } catch (error) {
      console.error("Error fetching doctors: ", error);
      alert("Could not fetch available doctors");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8081/api/AD/submitAppointment",
        {
          weight: dialogData.weight,
          temperature: dialogData.temperature,
          doctorAss: parseInt(dialogData.pref_doc, 10),
          patEmail: currentPatientEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Appointment details submitted successfully.");
      } else {
        alert("Failed to submit appointment details.");
      }
    } catch (error) {
      console.error("Error submitting appointment details:", error);
      alert("Failed to submit appointment details.");
    }
  };

  return (
    <div className="bg-[#ECECEC] h-[83%] p-8 space-y-8 flex flex-col">
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => setSelectedButton("Pending")}
          className={`px-4 py-2 rounded-md w-40 ${
            selectedButton === "Pending"
              ? "bg-gradient-to-r from-[#2061f5] to-[#13398f] text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setSelectedButton("Appointed")}
          className={`px-4 py-2 rounded-md w-40 ${
            selectedButton === "Appointed"
              ? "bg-gradient-to-r from-[#2061f5] to-[#13398f] text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          Appointed
        </button>
      </div>
      <div className="flex space-x-2 items-center">
        <img src="/search.png" alt="" className="w-6" />
        <Input className="bg-white"></Input>
      </div>
      <div className="h-full overflow-y-scroll">
        <Table className="bg-white rounded-md">
          <TableHeader>
            <TableRow className="h-20">
              <TableHead className="w-[100px] border text-black font-bold text-center">
                S.No.
              </TableHead>
              <TableHead className="border text-black font-bold text-center">
                Name
              </TableHead>
              <TableHead className="border text-black font-bold text-center">
                SAP ID
              </TableHead>
              <TableHead className="border text-black font-bold text-center">
                Reason for visit
              </TableHead>
              <TableHead className="border text-black font-bold text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patient.map((pat, index) => (
              <TableRow className="text-center" key={index}>
                <TableCell className="border">{index + 1}</TableCell>
                <TableCell className="border">{pat.name}</TableCell>
                <TableCell className="border">{pat.email}</TableCell>
                <TableCell className="border">{pat.reason}</TableCell>
                <TableCell className="border flex items-center justify-center">
                  {selectedButton === "Pending" ? (
                    <Dialog
                      onOpenChange={(open) => {
                        if (open) {
                          getAppointmentDetails(pat.email); // Fetch appointment details when dialog opens
                        }
                      }}
                    >
                      <DialogTrigger className="text-2xl">
                        {Shared.Report}
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="font-medium text-center pb-3">
                            Enter following details
                          </DialogTitle>
                          <DialogDescription>
                            <form onSubmit={handleSubmit}>
                              <div className="form-group">
                                <label htmlFor="preferredDoctor">
                                  Preferred Doctor
                                </label>
                                <input
                                  type="text"
                                  id="preferredDoctor"
                                  name="preferredDoctor"
                                  className="form-input"
                                  placeholder="Enter preferred doctor's name"
                                  value={docData?.pref_doc}
                                  readOnly
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="reason">Reason</label>
                                <input
                                  id="reason"
                                  name="reason"
                                  className="form-input"
                                  placeholder="Enter reason"
                                  value={docData?.doc_reason}
                                  readOnly
                                ></input>
                              </div>
                              <div className="form-group">
                                <label htmlFor="appointment">
                                  Doctor Assigned
                                </label>
                                <select
                                  id="appointment"
                                  name="appointment"
                                  className="form-input"
                                  value={dialogData.pref_doc}
                                  onChange={(e) =>
                                    setDialogData({
                                      ...dialogData,
                                      pref_doc: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">Select a doctor</option>
                                  {doctors.map((doctor) => (
                                    <option key={doctor.id} value={doctor.id}>
                                      {doctor.name}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="flex justify-between">
                                <div className="form-group">
                                  <label htmlFor="temperature">
                                    Temperature (in °C)
                                  </label>
                                  <input
                                    type="number"
                                    id="temperature"
                                    name="temperature"
                                    className="form-input"
                                    placeholder="Enter temperature"
                                    value={dialogData.temperature}
                                    onChange={(e) =>
                                      setDialogData({
                                        ...dialogData,
                                        temperature: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="weight">Weight (in Kg)</label>
                                  <input
                                    type="number"
                                    id="weight"
                                    name="weight"
                                    className="form-input"
                                    placeholder="Enter weight"
                                    value={dialogData.weight}
                                    onChange={(e) =>
                                      setDialogData({
                                        ...dialogData,
                                        weight: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>

                              <div className="flex justify-end items-center">
                                <button
                                  type="submit"
                                  className="submit-button"
                                  onClick={() => console.log(dialogData)}
                                >
                                  Submit
                                </button>
                              </div>
                            </form>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <div className="flex items-center gap-5 text-2xl">
                      <button onClick={() => navigate(`/prescription?id=${pat.email}`)}>
                        {Shared.Prescription}
                      </button>

                      <button onClick={() => console.log("Check clicked")}>
                        {Shared.SquareCheck}
                      </button>

                      <button onClick={() => console.log("Cross clicked")}>
                        {Shared.SquareCross}
                      </button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PatientList;
