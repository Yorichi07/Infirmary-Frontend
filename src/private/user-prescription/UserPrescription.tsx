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

const UserPrescription = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reports, setReports] = useState<
    Array<{ reportId: string; date: string; token:string; downloadLink: string }>
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = "";
        const role = localStorage.getItem("roles");

        if (role !== "patient") {
          const url = window.location.search;
          const val = url.substring(url.indexOf("?") + 4);
          apiUrl = `http://ec2-3-110-204-139.ap-south-1.compute.amazonaws.com/api/doctor/getAppointmentPat/${val}`;
        } else {
          apiUrl = "http://ec2-3-110-204-139.ap-south-1.compute.amazonaws.com/api/patient/getAppointment";
        }

        const resp = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const response = resp.data;

        const formatData = response.map((rept: any) => ({
          reportId: rept.appointmentId,
          date: rept.date,
          token:rept.token,
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

    fetchData();
  }, []);

  return (
    <>
      <Toaster />
      <div className="h-[84svh] flex justify-center max-lg:h-[93svh]">
        <img src="/prescription.jpg" className="w-[55%] max-lg:hidden" />
        <div className="w-[100%] overflow-y-scroll p-5">
          <Table className="border">
            <TableCaption>A list of your recent reports</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[33%] text-center">Token Number</TableHead>
                <TableHead className="w-[33%] text-center">Date</TableHead>
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
                  <TableCell className="text-center">{report.date}</TableCell>

                  {/* Download Report */}
                  <TableCell className="text-center">
                    <a
                      onClick={() =>{
                        if (localStorage.getItem('roles') === "patient")navigate(`/prescription?id=${report.reportId}`)
                        else navigate(`/doctor-prescription?id=${report.reportId}`)
                      }
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
    </>
  );
};

export default UserPrescription;
