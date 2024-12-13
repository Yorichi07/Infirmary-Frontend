import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { ToastAction } from "@/components/ui/toast";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Stock {
  id:string,
  location: any;
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
  const { toast } = useToast();
  const [newStock, setNewStock] = useState<Stock | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStocks, setSelectedStocks] = useState<Set<number | string>>(
    new Set()
  );
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState<
    Array<{
      locId: string;
      locationName: string;
      latitude: string;
      longitude: string;
    }>
  >([]);

  const handleLocationChange = (value: string) => {
    const selectedLocation = locations.find(
      (loc) => loc.locationName === value
    );
    if (selectedLocation) {
      setLocation(selectedLocation.locId);
    }
  };

  const fetchStocks = async () => {
    try {
      const token = localStorage.getItem("token");
      let role = localStorage.getItem("roles");

      if (role === "ad") role = role.toUpperCase();

      const response = await axios.get(
        `http://localhost:8081/api/${role}/stock/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStocks(response.data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch stock data. Please try again.",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchLocations = async () => {
    try {
      const resp = await axios.get("http://localhost:8081/api/location/");
      if (resp.status === 200) {
        const data = resp.data;
        setLocations(data);
      } else {
        toast({
          title: "Error",
          description: resp.data.message,
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Error in fetching locations. Please try again.",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  useEffect(() => {
    fetchLocations();
    fetchStocks();
  }, []);

  const handleAddNewRow = () => {
    setNewStock({
      id:"",
      batchNumber: "",
      medicineName: "",
      composition: "",
      quantity: "",
      medicineType: "",
      expirationDate: "",
      company: "",
      location: "",
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
        let role = localStorage.getItem("roles");

        if (role === "ad") role = role.toUpperCase();

        const formattedNewStock = {
          ...newStock,
          expirationDate: formatExpirationDate(
            newStock.expirationDate as string
          ),
        };

        await axios.post(
          `http://localhost:8081/api/${role}/stock/addStock`,
          formattedNewStock,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Location": location,
            },
          }
        );
        setNewStock(null);
        toast({
          title: "Success",
          description: "New stock added successfully!",
        });
        fetchLocations();
        fetchStocks();
      } catch (error:any) {
        console.error("Error adding new stock:", error);
        toast({
          title: "Error",
          description: error.response?.data?.messsage,
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    let role = localStorage.getItem("roles");

    if (role === "ad") role = role.toUpperCase();

    for (const batchNumber of selectedStocks) {
      try {
        await axios.delete(
          `http://localhost:8081/api/${role}/stock/${batchNumber}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStocks((prevStocks) =>
          prevStocks.filter((stock) => stock.id !== batchNumber)
        );
        toast({
          title: "Deleted",
          description: `Stock with batch number ${batchNumber} deleted successfully!`,
        });
        fetchLocations();
        fetchStocks();
      } catch (error) {
        console.error("Error deleting stock:", error);
        toast({
          title: "Error",
          description: `Failed to delete stock with batch number ${batchNumber}.`,
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }

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
    <>
      <Toaster />
      <div className="bg-[#ECECEC] min-h-[84svh] p-8 space-y-8 flex flex-col max-lg:h-[93svh] max-lg:p-4">
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
                  <TableHead className="w-[100px] border text-black font-bold text-center whitespace-nowrap">
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
                  <TableHead className="border text-black font-bold text-center whitespace-nowrap">
                    Expiration Date
                  </TableHead>
                  <TableHead className="border text-black font-bold text-center">
                    Company
                  </TableHead>
                  <TableHead className="border text-black font-bold text-center">
                    Location
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStocks.map((stock) => (
                  <TableRow key={stock.id} className="text-center">
                    <TableCell className="border">
                      <input
                        type="checkbox"
                        checked={selectedStocks.has(stock.id)}
                        onChange={() => handleSelectStock(stock.id)}
                      />
                    </TableCell>
                    <TableCell className="border">
                      {stock.batchNumber}
                    </TableCell>
                    <TableCell className="border">
                      {stock.medicineName}
                    </TableCell>
                    <TableCell className="border">
                      {stock.composition}
                    </TableCell>
                    <TableCell className="border">{stock.quantity}</TableCell>
                    <TableCell className="border">
                      {stock.medicineType}
                    </TableCell>
                    <TableCell className="border">
                      {stock.expirationDate}
                    </TableCell>
                    <TableCell className="border">{stock.company}</TableCell>
                    <TableCell className="border">
                      {stock.location.locationName}
                    </TableCell>
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
                    <TableCell className="border">
                      <Select onValueChange={handleLocationChange}>
                        <SelectTrigger className="bg-white text-black">
                          <SelectValue placeholder="Select a location" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-black">
                          <SelectGroup className="h-[4rem] overflow-y-scroll">
                            {locations.map((loc) => (
                              <SelectItem
                                key={loc.locationName}
                                value={loc.locationName}
                              >
                                {loc.locationName}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
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
        <div className="flex items-center max-lg:justify-center">
          <div className="flex items-center space-x-8">
            <button
              onClick={handleAddNewRow}
              className="bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] text-white font-semibold flex items-center px-8 py-2 rounded-md max-lg:px-4"
            >
              Add
              {Shared.SquarePlus}
            </button>
            <button
              className="bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] text-white font-semibold flex items-center px-8 py-2 rounded-md max-lg:px-4"
              onClick={handleDelete}
            >
              Delete
              {Shared.TrashCan}
            </button>
            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-[#1F60C0] gap-2 to-[#0D4493] text-white font-semibold flex items-center px-8 py-2 rounded-md max-lg:px-4"
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
    </>
  );
};

export default MedicineStock;
