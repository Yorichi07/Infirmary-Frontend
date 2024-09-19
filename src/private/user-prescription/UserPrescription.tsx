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
      let apiUrl = "";

      if(localStorage.getItem("role") === "user"){
        apiUrl = "http://localhost:8081/api/patient/getAppointment"
      }else{
        const url = window.location.search
        const val = url.substring(url.indexOf("?")+4)
        apiUrl = `http://localhost:8081/api/patient/getAppointmentPat/${val}`
      }

      const resp = await axios.get(apiUrl,{
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
  },[]);

  return (
    <div className="h-[83%] flex justify-center">
      <img src="/public/prescription.jpg" alt="" />
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
