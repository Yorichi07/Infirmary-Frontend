import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import Shared from "@/Shared";
  import axios from "axios";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { useToast } from "@/hooks/use-toast";
  import { Toaster } from "@/components/ui/toaster";
  import { ToastAction } from "@/components/ui/toast";
  
  const PatientLogs = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [reports, setReports] = useState<
      Array<{ reportId: string; patientName: string; token: string; downloadLink: string }>
    >([]);
    const [selectedDate, setSelectedDate] = useState<string>("");
  
    const fetchData = async (date?: string) => {
      try {
        let apiUrl = "http://ec2-3-110-204-139.ap-south-1.compute.amazonaws.com/api/AD/getAppointmentByDate";
  
        if (date) {
          apiUrl += `?date=${date}`;
        }
  
        const resp = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        const response = resp.data;
  
        const formatData = response.map((rept: any) => ({
          reportId: rept.appointmentId,
          patientName: rept.PatientName,
          token: rept.token,
          downloadLink: `http://ec2-3-110-204-139.ap-south-1.compute.amazonaws.com/prescription?id=${rept.appointmentId}`,
        }));
  
        setReports(formatData);
      } catch (error: any) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast({
            title: "Error",
            description: error.response.data.message,
            variant: "destructive",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        } else {
          toast({
            title: "Error",
            description:
              "An error occurred while fetching reports. Please try again.",
            variant: "destructive",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
      }
    };
  
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedDate(e.target.value);
    };
  
    const handleDateFilter = () => {
      fetchData(selectedDate);
    };
  
    return (
      <>
        <Toaster />
        <div className="min-h-[84svh] flex flex-col items-center max-lg:h-[93svh]">
          <div className="w-full p-5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <label htmlFor="date-picker" className="font-medium">
                Select Date:
              </label>
              <input
                id="date-picker"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="border rounded px-2 py-1"
              />
            </div>
            <button
              onClick={handleDateFilter}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
          <div className="flex justify-center w-full max-lg:h-[80svh]">
            <img src="/prescription.jpg" className="w-[55%] max-lg:hidden" />
            <div className="w-full overflow-y-scroll p-5">
              <Table className="border">
                <TableCaption>A list of your recent reports</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[33%] text-center">Token Number</TableHead>
                    <TableHead className="w-[33%] text-center">Patient Name</TableHead>
                    <TableHead className="text-center whitespace-nowrap">
                      Download Report
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.reportId}>
                      {/* Report Id */}
                      <TableCell className="font-medium text-center">
                        {report.token}
                      </TableCell>
  
                      {/* Date */}
                      <TableCell className="text-center">{report.patientName}</TableCell>
  
                      {/* Download Report */}
                      <TableCell className="text-center">
                        <a
                          onClick={() =>
                            navigate(`/previous-prescription?id=${report.reportId}`)
                          }
                          download
                        >
                          {Shared.Download}
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default PatientLogs;
  