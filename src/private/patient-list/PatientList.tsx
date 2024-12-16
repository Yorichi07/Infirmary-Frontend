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
    {
      email: string;
      name: string;
      reason: string;
      aptId: string;
      Id: string;
    }[]
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPatient, setFilteredPatient] = useState(patient);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        if(!(localStorage.getItem("latitude") || localStorage.getItem("longitude"))){
          alert("Select a location");
          return;
        }

        const url =
          selectedButton === "Pending"
            ? "http://localhost:8081/api/AD/getPatientQueue"
            : "http://localhost:8081/api/AD/getCompletedQueue";

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Latitude":localStorage.getItem("latitude"),
            "X-Longitude":localStorage.getItem("longitude")
          },
        });

        const fetchedData = response.data;
        const formattedData = fetchedData.map((pat: any) => ({
          email: pat.sapEmail,
          name: pat.name,
          reason: pat.reason,
          aptId: pat.aptId,
          Id: pat.Id,
        }));

        setPatient(formattedData);
        setFilteredPatient(formattedData);
      } catch (error) {
        handleError(error, "Failed to fetch patient list");
      }
    };

    fetchList();

  }, [selectedButton]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = patient.filter(
        (pat) =>
          pat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pat.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pat.reason.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPatient(filtered);
    } else {
      setFilteredPatient(patient);
    }
  }, [searchQuery, patient]);

  const getAppointmentDetails = async (email: string) => {
    setCurrentPatientEmail(email);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const response = await axios.get(
        `http://localhost:8081/api/AD/getAptForm/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const formatData = response.data;
      setDocData({
        pref_doc: formatData.pref_doc? formatData.pref_doc.name : "No Preferred Doctor",
        doc_reason: formatData.doc_reason || "",
      });

      await fetchAvailableDoctors();
    } catch (error) {
      handleError(error, "Error fetching appointment details");
    }
  };

  const fetchAvailableDoctors = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");
      if(!(localStorage.getItem("latitude") || localStorage.getItem("longitude"))){
        alert("Select a location");
        return;
      }
      const response = await axios.get(
        "http://localhost:8081/api/AD/getAvailableDoctors",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Latitude":localStorage.getItem("latitude"),
            "X-Longitude":localStorage.getItem("longitude")
          },
        }
      );

      const doctorList = response.data.map((doctor: any) => ({
        id: doctor.doctorId.toString(),
        name: doctor.name,
      }));
      setDoctors(doctorList);
    } catch (error) {
      handleError(error, "Error fetching available doctors");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

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
        window.location.reload();
      } else {
        throw new Error("Failed to submit appointment details.");
      }
    } catch (error) {
      handleError(error, "Failed to submit appointment details");
    }
  };

  const handleError = (error: any, defaultMessage: string) => {
    let message = defaultMessage;
    if (axios.isAxiosError(error)) {
      if (error.response) {
        message = `${error.response.data.message}`;
      } else if (error.request) {
        message =
          "No response from server. Please check your network connection.";
      } else {
        message = error.message;
      }
    }
    console.error(message, error);
    alert(message);
  };

  return (
    <div className="bg-[#ECECEC] min-h-[83%] p-8 space-y-8 flex flex-col max-lg:min-h-[93svh] max-lg:p-4 max-lg:py-4">
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => setSelectedButton("Pending")}
          className={`shadow-md px-4 py-2 rounded-md w-40 ${
            selectedButton === "Pending"
              ? "bg-gradient-to-r from-[#2061f5] to-[#13398f] text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setSelectedButton("Appointed")}
          className={`shadow-md px-4 py-2 rounded-md w-40 ${
            selectedButton === "Appointed"
              ? "bg-gradient-to-r from-[#2061f5] to-[#13398f] text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          Appointed
        </button>
      </div>
      <div className="flex space-x-2 items-center">
        {Shared.Search}
        <Input
          className="bg-white"
          placeholder="Search patients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="h-full overflow-y-scroll">
        <Table className="bg-white rounded-md">
          <TableHeader>
            <TableRow className="h-20">
              <TableHead className="border text-black font-bold text-center">
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
            {filteredPatient.length > 0 ? (
              filteredPatient.map((pat, index) => (
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
                            getAppointmentDetails(pat.email);
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
                                  <label htmlFor="reason">
                                    Reason for preference
                                  </label>
                                  <input
                                    id="reason"
                                    name="reason"
                                    className="form-input"
                                    placeholder="Enter reason"
                                    value={docData?.doc_reason}
                                    readOnly
                                  />
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
                                      Current Temperature (in °F)
                                    </label>
                                    <input
                                      type="number"
                                      id="temperature"
                                      name="temperature"
                                      min={0}
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
                                    <label htmlFor="weight">
                                      Current Weight (in Kg)
                                    </label>
                                    <input
                                      type="number"
                                      id="weight"
                                      name="weight"
                                      min={0}
                                      step={0.01}
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
                                <div className="flex justify-between">
                                  <button
                                    type="button"
                                    className="reject-button"
                                    onClick={async () => {
                                      try {
                                        const token =
                                          localStorage.getItem("token");
                                        const response = await axios.get(
                                          `http://localhost:8081/api/AD/rejectAppointment?email=${pat.email}`,
                                          {
                                            headers: {
                                              Authorization: `Bearer ${token}`,
                                            },
                                          }
                                        );

                                        if (response.status === 200) {
                                          alert("Appointment Rejected.");
                                          window.location.reload();
                                        } else {
                                          alert(
                                            "Failed to Reject appointment details."
                                          );
                                        }
                                      } catch (error) {
                                        console.error(
                                          "Error Rejecting appointment details:",
                                          error
                                        );
                                        alert(
                                          "Failed to Reject appointment details."
                                        );
                                      }
                                    }}
                                  >
                                    Reject
                                  </button>
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
                        <button
                          onClick={() =>
                            navigate(`/prescription?id=${pat.aptId}`)
                          }
                        >
                          {Shared.Prescription}
                        </button>

                        <button
                          onClick={async () => {
                            try {
                              const resp = await axios.get(
                                `http://localhost:8081/api/AD/completeAppointment/${pat.email}`,
                                {
                                  headers: {
                                    Authorization: `Bearer ${localStorage.getItem(
                                      "token"
                                    )}`,
                                  },
                                }
                              );
                              window.alert(resp.data);
                              window.location.reload();
                            } catch (err) {
                              console.log(err);
                            }
                          }}
                        >
                          {Shared.SquareCheck}
                        </button>
                        <button
                          onClick={async () => {
                            try {
                              const resp = await axios.get(
                                `http://localhost:8081/api/AD/rejectAppointment?email=${pat.email}`,
                                {
                                  headers: {
                                    Authorization: `Bearer ${localStorage.getItem(
                                      "token"
                                    )}`,
                                  },
                                }
                              );
                              window.alert(resp.data);
                              window.location.reload();
                            } catch (err) {
                              console.log(err);
                            }
                          }}
                        >
                          {Shared.SquareCross}
                        </button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="text-center">
                <TableCell colSpan={5} className="border py-5">
                  No patient available!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PatientList;
