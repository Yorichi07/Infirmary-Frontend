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

const UserPrescription = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<
    Array<{ reportId: string; date: string; downloadLink: string }>
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = "";
        const role = localStorage.getItem("roles");
        console.log(role);

        if (role !== "user") {
          const url = window.location.search;
          const val = url.substring(url.indexOf("?") + 4);
          apiUrl = `ec2-3-108-64-92.ap-south-1.compute.amazonaws.com/api/patient/getAppointmentPat/${val}`;
        } else {
          apiUrl = "ec2-3-108-64-92.ap-south-1.compute.amazonaws.com/api/patient/getAppointment";
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
          downloadLink: `http://localhost:5173/prescription?id=${rept.appointmentId}`,
        }));

        setReports(formatData);
      } catch (error: any) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          alert(error.response.data.message);
        } else {
          alert("An error occurred while fetching reports. Please try again.");
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-[83%] flex justify-center">
      <img src="/prescription.jpg" className="w-[60%]" />
      <div className="w-[50%] overflow-y-scroll p-5">
        <Table className="border">
          <TableCaption>A list of your recent reports</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[33%] text-center">Report Id</TableHead>
              <TableHead className="w-[33%] text-center">Date</TableHead>
              <TableHead className="text-center">Download Report</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.reportId}>
                {/* Report Id */}
                <TableCell className="font-medium text-center">
                  {report.reportId}
                </TableCell>

                {/* Date */}
                <TableCell className="text-center">{report.date}</TableCell>

                {/* Download Report */}
                <TableCell className="text-center">
                  <a
                    onClick={() =>
                      navigate(`/prescription?id=${report.reportId}`)
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
  );
};

export default UserPrescription;
