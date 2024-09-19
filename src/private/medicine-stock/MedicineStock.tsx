import { useEffect, useState } from "react";
import axios from "axios";
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
} from "@/components/ui/select";

interface Stock {
  batchNumber: number | string;
  medicineName: string;
  composition: string;
  quantity: number | string;
  medicineType: string;
  expirationDate: string; // Expected in YYYY-MM-DD format
  company: string;
}

const MedicineStock = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [newStock, setNewStock] = useState<Stock | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8081/api/stock/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStocks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  const handleAddNewRow = () => {
    setNewStock({
      batchNumber: "",
      medicineName: "",
      composition: "",
      quantity: "",
      medicineType: "",
      expirationDate: "",
      company: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof Stock
  ) => {
    if (newStock) {
      setNewStock({
        ...newStock,
        [field]: e.target.value,
      });
    }
  };

  const formatExpirationDate = (dateString: string) => {
    // Assuming the input date format is MM/DD/YY
    const [month, day, year] = dateString.split("/");
    return month // Convert to YYYY-MM-DD
  };

  const handleSave = async () => {
    if (newStock) {
      try {
        const token = localStorage.getItem("token");

        // Format expirationDate to YYYY-MM-DD
        const formattedNewStock = {
          ...newStock,
          expirationDate: formatExpirationDate(
            newStock.expirationDate as string
          ),
        };

        await axios.post(
          "http://localhost:8081/api/stock/addStock",
          formattedNewStock,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Clear the new stock after saving and add it to the stocks list
        setStocks([...stocks, formattedNewStock]);
        setNewStock(null);
      } catch (error) {
        console.error("Error adding new stock:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while the data is being fetched
  }

  return (
    <div className="bg-[#ECECEC] h-[83%] p-8 space-y-8 flex flex-col">
      <div className="flex space-x-2 items-center">
        <img src="/search.png" alt="" className="w-6" />
        <Input className="bg-white" placeholder="Search"></Input>
      </div>

      <div className="h-full overflow-y-scroll">
        {stocks.length > 0 || newStock ? (
          <Table className="bg-white rounded-md">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] border text-black font-bold text-center">
                  Batch no.
                </TableHead>
                <TableHead className="border text-black font-bold text-center">
                  Medicine
                </TableHead>
                <TableHead className="border text-black font-bold text-center">
                  Composition
                </TableHead>
                <TableHead className="border text-black font-bold text-center">
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
                <TableHead className="border text-black font-bold text-center">
                  <div className="flex space-x-2 items-center justify-center">
                    <p>Expiration Date</p>
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
              {stocks.map((stock) => (
                <TableRow key={stock.batchNumber} className="text-center">
                  <TableCell className="border">{stock.batchNumber}</TableCell>
                  <TableCell className="border">{stock.medicineName}</TableCell>
                  <TableCell className="border">{stock.composition}</TableCell>
                  <TableCell className="border">{stock.quantity}</TableCell>
                  <TableCell className="border">{stock.medicineType}</TableCell>
                  <TableCell className="border">
                    {stock.expirationDate}
                  </TableCell>
                  <TableCell className="border">{stock.company}</TableCell>
                </TableRow>
              ))}

              {newStock && (
                <TableRow className="text-center">
                  <TableCell className="border">
                    <Input
                      value={newStock.batchNumber}
                      onChange={(e) => handleInputChange(e, "batchNumber")}
                      placeholder="Batch no."
                    />
                  </TableCell>
                  <TableCell className="border">
                    <Input
                      value={newStock.medicineName}
                      onChange={(e) => handleInputChange(e, "medicineName")}
                      placeholder="Medicine name"
                    />
                  </TableCell>
                  <TableCell className="border">
                    <Input
                      value={newStock.composition}
                      onChange={(e) => handleInputChange(e, "composition")}
                      placeholder="Composition"
                    />
                  </TableCell>
                  <TableCell className="border">
                    <Input
                      value={newStock.quantity}
                      onChange={(e) => handleInputChange(e, "quantity")}
                      placeholder="Quantity"
                    />
                  </TableCell>
                  <TableCell className="border">
                    <Input
                      value={newStock.medicineType}
                      onChange={(e) => handleInputChange(e, "medicineType")}
                      placeholder="Type"
                    />
                  </TableCell>
                  <TableCell className="border">
                    <Input
                      type="date" // Change type to date for better input handling
                      value={newStock.expirationDate}
                      onChange={(e) => handleInputChange(e, "expirationDate")}
                      placeholder="Expiration date"
                    />
                  </TableCell>
                  <TableCell className="border">
                    <Input
                      value={newStock.company}
                      onChange={(e) => handleInputChange(e, "company")}
                      placeholder="Company"
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center text-gray-500">
            No medicine in the stock
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <button
            onClick={handleAddNewRow}
            className="bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] text-white font-semibold flex items-center px-8 py-2 rounded-md"
          >
            Add
            <img src="/add.png" alt="" className="w-6" />
          </button>
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] text-white font-semibold flex items-center px-8 py-2 rounded-md"
          >
            Save
            <img src="/save.png" alt="" className="w-6" />
          </button>
        </div>
        {/* <div className="flex items-center space-x-8">
          <button className="bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] text-white font-semibold flex items-center px-8 py-2 rounded-md">
            Add From Excel
            <img src="/excel.png" alt="" className="w-6" />
          </button>
          <button className="bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] text-white font-semibold flex items-center px-8 py-2 rounded-md">
            Export to Excel
            <img src="/excel.png" alt="" className="w-6" />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default MedicineStock;
