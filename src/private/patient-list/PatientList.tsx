import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PatientList = () => {
  return (
    <div className="bg-[#ECECEC] h-[83%] p-8 space-y-8 flex flex-col">
      <div className="flex space-x-2 items-center bg-white rounded-md px-4 py-1">
        <img src="/search.png" alt="" className="w-6" />
        <Input className="bg-white border-none py-1 shadow-none"></Input>
      </div>
      <div className="h-full">
        <Table className="bg-white rounded-md">
          <TableHeader>
            <TableRow className="">
              <TableHead className="w-[100px] border h-20 text-black font-bold">
                S.No.
              </TableHead>
              <TableHead className="border text-black font-bold text-center">
                Name
              </TableHead>
              <TableHead className="border text-black font-bold text-center">
                SAP ID
              </TableHead>
              <TableHead className="border text-black h-20 font-bold text-center">
                Reason for visit
              </TableHead>
              <TableHead className="border text-black font-bold text-center h-20">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="">
              <TableCell className="border">1</TableCell>
              <TableCell className="border">Bhavya Jain</TableCell>
              <TableCell className="border">500XXXXXX</TableCell>
              <TableCell className="border">Fever</TableCell>
              <TableCell className="border flex items-center justify-center space-x-8">
                <button>
                  <img src="/approve.png" alt="" className="w-6" />
                </button>
                <button>
                  <img src="/reject.png" alt="" className="w-6" />
                </button>
              </TableCell>
            </TableRow>
            <TableRow className="">
              <TableCell className="border">2</TableCell>
              <TableCell className="border">Bhavya Jain</TableCell>
              <TableCell className="border">500XXXXXX</TableCell>
              <TableCell className="border">Fever</TableCell>
              <TableCell className="border flex items-center justify-center space-x-8">
                <button>
                  <img src="/approve.png" alt="" className="w-6" />
                </button>
                <button>
                  <img src="/reject.png" alt="" className="w-6" />
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PatientList;
