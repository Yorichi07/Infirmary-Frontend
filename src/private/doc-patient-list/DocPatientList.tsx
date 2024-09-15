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

const DocPatientList = () => {
  return (
    <div className="bg-[#ECECEC] h-[83%] p-8 space-y-8 flex flex-col">
      <div className="flex space-x-2 items-center bg-white rounded-md px-4 py-1">
        <img src="/search.png" alt="" className="w-6" />
        <Input className="bg-white border-none py-1 shadow-none"></Input>
      </div>
      <div className="h-full">
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
            <TableRow className="text-center">
              <TableCell className="border">1</TableCell>
              <TableCell className="border">Bhavya Jain</TableCell>
              <TableCell className="border">500XXXXXX</TableCell>
              <TableCell className="border">Fever</TableCell>
              <TableCell className="border flex items-center justify-center">
                <button className="text-3xl">{Shared.Report}</button>
              </TableCell>
            </TableRow>
            <TableRow className="text-center">
              <TableCell className="border">2</TableCell>
              <TableCell className="border">Bhavya Jain</TableCell>
              <TableCell className="border">500XXXXXX</TableCell>
              <TableCell className="border">Fever</TableCell>
              <TableCell className="border flex items-center justify-center">
                <button className="text-3xl">{Shared.Report}</button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DocPatientList;
