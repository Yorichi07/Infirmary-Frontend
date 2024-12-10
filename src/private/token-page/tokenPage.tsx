import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TokenPage = () => {
  const navigate = useNavigate();
  const [tokenData, setTokenData] = useState<
    Array<{ doctorName: string; PatientToken: string }>
  >([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://ec2-13-127-221-134.ap-south-1.compute.amazonaws.com/api/AD/getTokenData",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          setTokenData(response.data);
        } else if (response.status === 401) {
          navigate("/");
        } else {
          alert(response.data.message);
        }
      } catch (err) {
        alert("Something Went Wrong");
      }
    };

    const interval = setInterval(() => {
      fetchData();
    }, 30000);

    fetchData(); // Fetch data initially

    return () => {
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div className="min-h-[83svh] flex flex-col items-center justify-start py-4">
      <table className="table-auto border-collapse border border-gray-400 w-[95%]">
        <thead>
          <tr className="bg-gray-300">
            <th className="border border-gray-400 px-4 py-2">Doctor</th>
            <th className="border border-gray-400 px-4 py-2">Patient Token</th>
          </tr>
        </thead>
        <tbody>
          {tokenData?.map((data, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="border border-gray-400 px-4 py-2 text-center">
                {data.doctorName}
              </td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                {data.PatientToken}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TokenPage;
