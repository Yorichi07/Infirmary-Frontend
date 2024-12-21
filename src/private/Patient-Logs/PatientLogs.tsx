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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { ToastAction } from "@/components/ui/toast";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

const PatientLogs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [time, setTime] = useState<Date>(new Date());
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [reports, setReports] = useState<
    Array<{
      reportId: string;
      patientName: string;
      token: string;
      downloadLink: string;
    }>
  >([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const fetchData = async (date?: string) => {
    try {
      let apiUrl = "http://ec2-13-126-247-225.ap-south-1.compute.amazonaws.com/api/AD/getAppointmentByDate";

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
        downloadLink: `http://ec2-13-126-247-225.ap-south-1.compute.amazonaws.com/prescription?id=${rept.appointmentId}`,
      }));

      setReports(formatData);
      if (reports.length == 0) {
        toast({
          title: "No Appointment Found",
          description: "No Appointments are found for the current date",
        });
      }
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

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
    return `${formattedHours}:${minutes}:${seconds} ${period}`;
  };

  return (
    <>
      <Toaster />
      <div className="min-h-[84svh] flex flex-col items-center max-lg:h-[93svh]">
        <div className="w-full p-5 flex gap-4 items-center max-lg:justify-between">
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
          <Button
            type="submit"
            onClick={handleDateFilter}
            className="bg-gradient-to-r from-[#2061f5] to-[#13398f] w-24 text-white"
          >
            Submit
          </Button>
        </div>
        <div className="flex justify-center w-full max-lg:h-[80svh]">
          <div className="flex flex-col gap-4 w-3/4 justify-center items-center max-lg:hidden">
            <div className="flex items-center justify-center p-5 max-lg:p-5 bg-gray-800 rounded-lg shadow-lg my-5">
              <p className="text-4xl font-bold text-white drop-shadow-lg">
                {formatTime(time)}
              </p>
            </div>
            <div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border bg-white shadow-lg max-lg:hidden"
              />
            </div>
          </div>
          <div className="w-full overflow-y-scroll p-5">
            <Table className="border">
              <TableCaption>A list of your recent reports</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[33%] text-center">
                    Token Number
                  </TableHead>
                  <TableHead className="w-[33%] text-center">
                    Patient Name
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap">
                    Download Report
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.reportId}>
                    <TableCell className="font-medium text-center">
                      {report.token}
                    </TableCell>

                    <TableCell className="text-center">
                      {report.patientName}
                    </TableCell>

                    <TableCell className="text-center">
                      <a
                        onClick={() =>
                          navigate(
                            `/previous-prescription?id=${report.reportId}`
                          )
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
