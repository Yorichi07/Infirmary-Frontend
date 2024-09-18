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



const UserPrescription = () => {

  const [reports, setReports] = useState<Array<{reportId:string,date:string,downloadLink:string}>>([]);

  useEffect(()=>{
    const fetchData = async () => {
      const resp = await axios.get("http://localhost:8081/api/patient/getAppointment",{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
      const response = resp.data;

      const formatData = response.map((rept:any)=>({
        reportId:rept.appointmentId,
        date:rept.date,
        downloadLink:`http://localhost:5173/prescription?id=${rept.appointmentId}`
      }));

      setReports(formatData)
    }
    fetchData();
    console.log(reports);
  },[]);

  return (
    <div className="h-[83%] pt-5 pb-10 flex justify-center">
      <div className="w-[50%] overflow-y-scroll">
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
            {reports.map((report, index) => (
              <TableRow key={report.reportId}>
                {/* Report Id */}
                <TableCell className="font-medium text-center">{report.reportId}</TableCell>

                {/* Date */}
                <TableCell className="text-center">{report.date}</TableCell>

                {/* Download Report */}
                <TableCell className="text-center">
                  <a href={report.downloadLink} download>
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
