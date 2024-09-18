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
import { Popover } from "@radix-ui/react-popover";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PatientList = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<
    Array<{ email: string; name: String; reason: string }>
  >([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8081/api/AD/getPatientQueue",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const fetchd = response.data;
        const ffetchd = fetchd.map((pat:any)=>({
          email:pat.sapEmail,
          name:pat.name,
          reason:pat.reason
        }))
        setPatient(ffetchd);
      } catch (error) {
        console.log(error);
      }
    };
    fetchList();
  }, []);



  return (
    <div className="bg-[#ECECEC] h-[83%] p-8 space-y-8 flex flex-col">
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
              <TableRow className="text-center">
                <TableCell className="border">{index + 1}</TableCell>
                <TableCell className="border">{pat.name}</TableCell>
                <TableCell className="border">{pat.email}</TableCell>
                <TableCell className="border">{pat.reason}</TableCell>
                <TableCell className="border flex items-center justify-center">
                  <button
                    className="text-3xl"
                    key={pat.email}
                    onClick={() => {
                      <Popover>

                      </Popover>
                    }}
                  >
                    {Shared.Report}
                  </button>
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
