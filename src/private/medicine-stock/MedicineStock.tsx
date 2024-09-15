import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
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

const MedicineStock = () => {
  return (
    <div className="bg-[#ECECEC] h-[83%] p-8 space-y-8 flex flex-col">
      <div className="flex space-x-2 items-center">
        <img src="/search.png" alt="" className="w-6" />
        <Input className="bg-white"></Input>
      </div>
      <div className="h-full">
        <Table className="bg-white rounded-md">
          <TableHeader>
            <TableRow className="">
              <TableHead className="w-[100px] border h-20 text-black font-bold">
                Batch no.
              </TableHead>
              <TableHead className="border text-black font-bold text-center">
                Medicine
              </TableHead>
              <TableHead className="border text-black font-bold text-center">
                Composition
              </TableHead>
              <TableHead className="border text-black h-20 font-bold text-center">
                <div className="flex items-center justify-center space-x-2">
                  <p>Quantity</p>
                  <Select>
                    <SelectTrigger className="w-10">
                      <img src="/filter.png" alt="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="highToLow">High to Low</SelectItem>
                      <SelectItem value="lowToHigh">Low to High</SelectItem>
                      <SelectItem value="outOfStock">Out of Stock</SelectItem>
                      <SelectItem value="inStock">In Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TableHead>
              <TableHead className="border text-black font-bold text-center h-20">
                <div className="flex items-center justify-center space-x-2">
                  <p>Type</p>
                  <Select>
                    <SelectTrigger className="w-10">
                      <img src="/filter.png" alt="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tablet">Tablet</SelectItem>
                      <SelectItem value="fluid">Fluid</SelectItem>
                      <SelectItem value="emulsion">Emulsion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TableHead>
              <TableHead className="border text-black font-bold text-center h-20">
                <div className="flex space-x-2 items-center justify-center">
                  <p>Expiration</p>
                  <Select>
                    <SelectTrigger className="w-10">
                      <img src="/filter.png" alt="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newestToOldest">
                        Newest to Oldest
                      </SelectItem>
                      <SelectItem value="oldestToNewest">
                        Oldest to Newest
                      </SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                      <SelectItem value="not-expired">Not Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TableHead>
              <TableHead className="border text-black font-bold text-center">
                Company
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="">
              <TableCell className="border">INV001</TableCell>
              <TableCell className="border">Paid</TableCell>
              <TableCell className="border">Paid</TableCell>
              <TableCell className="border">Paid</TableCell>
              <TableCell className="border">Paid</TableCell>
              <TableCell className="border">Credit Card</TableCell>
              <TableCell className="border">$250.00</TableCell>
            </TableRow>
            <TableRow className="">
              <TableCell className="border">INV001</TableCell>
              <TableCell className="border">Paid</TableCell>
              <TableCell className="border">Paid</TableCell>
              <TableCell className="border">Paid</TableCell>
              <TableCell className="border">Paid</TableCell>
              <TableCell className="border">Credit Card</TableCell>
              <TableCell className="border">$250.00</TableCell>
            </TableRow>
            <TableRow className="">
              <TableCell className="border">INV001</TableCell>
              <TableCell className="border">Paid</TableCell>
              <TableCell className="border">Paid</TableCell>
              <TableCell className="border">Paid</TableCell>
              <TableCell className="border">Paid</TableCell>
              <TableCell className="border">Credit Card</TableCell>
              <TableCell className="border">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <button className="bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] text-white font-semibold flex items-center px-8 py-2 rounded-md">
            Add
            <img src="/add.png" alt="" className="w-6" />
          </button>
          <button className="bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] text-white font-semibold flex items-center px-8 py-2 rounded-md">
            Save
            <img src="/save.png" alt="" className="w-6" />
          </button>
        </div>
        <div className="flex items-center space-x-8">
          <button className="bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] text-white font-semibold flex items-center px-8 py-2 rounded-md">
            Add From Excel
            <img src="/excel.png" alt="" className="w-6" />
          </button>
          <button className="bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] text-white font-semibold flex items-center px-8 py-2 rounded-md">
            Export
            <img src="/excel.png" alt="" className="w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineStock;
