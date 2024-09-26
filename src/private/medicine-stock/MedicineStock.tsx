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
import Shared from "@/Shared";

interface Stock {
  batchNumber: number | string;
  medicineName: string;
  composition: string;
  quantity: number | string;
  medicineType: string;
  expirationDate: string;
  company: string;
}

const MedicineStock = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [newStock, setNewStock] = useState<Stock | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStocks, setSelectedStocks] = useState<Set<number | string>>(
    new Set()
  );

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://ec2-3-108-51-210.ap-south-1.compute.amazonaws.com/api/stock/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStocks(response.data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setError("Failed to fetch stock data. Please try again.");
      } finally {
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
    const month = dateString.split("/");
    return month.join("-");
  };

  const handleSave = async () => {
    if (newStock) {
      try {
        const token = localStorage.getItem("token");

        const formattedNewStock = {
          ...newStock,
          expirationDate: formatExpirationDate(
            newStock.expirationDate as string
          ),
        };

        await axios.post(
          "http://ec2-3-108-51-210.ap-south-1.compute.amazonaws.com/api/stock/addStock",
          formattedNewStock,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStocks((prevStocks) => [...prevStocks, formattedNewStock]);
        setNewStock(null);
      } catch (error) {
        console.error("Error adding new stock:", error);
        setError("Failed to add new stock. Please try again.");
      }
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    for (const batchNumber of selectedStocks) {
      try {
        await axios.delete(`http://ec2-3-108-51-210.ap-south-1.compute.amazonaws.com/api/stock/${batchNumber}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update state after deletion
        setStocks((prevStocks) =>
          prevStocks.filter((stock) => stock.batchNumber !== batchNumber)
        );
        window.location.reload();
      } catch (error) {
        console.error("Error deleting stock:", error);
        setError(`Failed to delete stock with batch number ${batchNumber}.`);
      }
    }

    // Clear selected stocks
    setSelectedStocks(new Set());
  };

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.composition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectStock = (batchNumber: number | string) => {
    const updatedSelection = new Set(selectedStocks);
    if (updatedSelection.has(batchNumber)) {
      updatedSelection.delete(batchNumber);
    } else {
      updatedSelection.add(batchNumber);
    }
    setSelectedStocks(updatedSelection);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#ECECEC] h-[83%] p-8 space-y-8 flex flex-col">
      {error && <div className="text-red-500 font-medium">{error}</div>}
      <div className="flex space-x-2 items-center">
        {Shared.Search}
        <Input
          className="bg-white"
          placeholder="Search Medicine"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="h-full overflow-y-scroll">
        {stocks.length > 0 || newStock ? (
          <Table className="bg-white rounded-md">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] border text-black font-bold text-center">
                  Select
                </TableHead>
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
                  Quantity
                </TableHead>
                <TableHead className="border text-black font-bold text-center">
                  Type
                </TableHead>
                <TableHead className="border text-black font-bold text-center">
                  Expiration Date
                </TableHead>
                {/* <TableHead className="border text-black font-bold text-center">
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
                </TableHead> */}

                {/* <TableHead className="border text-black font-bold text-center h-20">
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
                </TableHead> */}
                {/* <TableHead className="border text-black font-bold text-center">
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
                </TableHead> */}
                <TableHead className="border text-black font-bold text-center">
                  Company
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStocks.map((stock) => (
                <TableRow key={stock.batchNumber} className="text-center">
                  <TableCell className="border">
                    <input
                      type="checkbox"
                      checked={selectedStocks.has(stock.batchNumber)}
                      onChange={() => handleSelectStock(stock.batchNumber)}
                    />
                  </TableCell>
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
                    <input type="checkbox" disabled />
                  </TableCell>
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
                      type="date"
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
            {Shared.SquarePlus}
          </button>
          <button
            className="bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] text-white font-semibold flex items-center px-8 py-2 rounded-md"
            onClick={handleDelete}
          >
            Delete
            {Shared.TrashCan}
          </button>
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] text-white font-semibold flex items-center px-8 py-2 rounded-md"
          >
            Save
            {Shared.Save}
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
