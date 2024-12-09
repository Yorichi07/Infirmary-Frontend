import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { ChangeEventHandler, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.scss";

const API_URLS = {
  patient: "http://localhost:8081/api/auth/patient/signin",
  doctor: "http://localhost:8081/api/auth/doc/signin",
  assistant_doctor: "http://localhost:8081/api/auth/ad/signin",
};

const DASHBOARD_ROUTES = {
  patient: "/patient-dashboard",
  doctor: "/doctor-dashboard",
  assistant_doctor: "/ad-dashboard",
};

const ROLES = [
  { value: "doctor", label: "Doctor" },
  { value: "patient", label: "Patient" },
  { value: "assistant_doctor", label: "Assistant Doctor" },
];

const SignIn = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [role, setRole] = useState<string>("patient");
  const [location, setLocation] = useState<{
    latitude: string;
    longitude: string;
  }>({
    latitude: "-1",
    longitude: "-1",
  });
  const [locations, setLocations] = useState<
    Array<{ locationName: string; latitude: string; longitude: string }>
  >([]);

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, value } = e.target;
    setInput((prev) => ({ ...prev, [id]: value }));
  };

  const handleRoleChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
  };

  const handleLocationChange = (value: string) => {
    const selectedLocation = locations.find(
      (loc) => loc.locationName === value
    );
    if (selectedLocation) {
      setLocation({
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      });
    }
  };

  const handleSignIn = async () => {
    const apiUrl = API_URLS[role as keyof typeof API_URLS];
    const dashboardRoute =
      DASHBOARD_ROUTES[role as keyof typeof DASHBOARD_ROUTES];

    if (
      role === "assistant_doctor" &&
      (location.latitude === "-1" || location.longitude === "-1")
    ) {
      return alert("Please select a location.");
    }

    try {
      const headers =
        role === "assistant_doctor"
          ? {
              "X-Latitude": location.latitude,
              "X-Longitude": location.longitude,
            }
          : {};

      const response = await axios.post(apiUrl, input, { headers });
      const { token, email, roles } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem(
        "roles",
        roles[0].replace("ROLE_", "").toLowerCase()
      );
      localStorage.setItem("longitude", location.longitude);
      localStorage.setItem("latitude", location.latitude);

      navigate(dashboardRoute);
    } catch (error: any) {
      const message =
        error.response?.status === 401
          ? "Incorrect email or password. Please try again."
          : error.response?.data?.message || "An error occurred.";
      setErrorMessage(message);
    }
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const resp = await axios.get("http://localhost:8081/api/location/");
        if (resp.status === 200) {
          const data = resp.data;
          setLocations(data);
        } else {
          alert(resp.data.message);
        }
      } catch (err) {
        alert("Error in fetching locations. Please try again.");
      }
    };
    fetchLocations();
  }, []);

  return (
    <>
      <div className="sign-container">
        <div className="sign-container__left"></div>
        <div className="sign-container__right">
          <div className="sign-container__right-content">
            <img src="/upes-logo.jpg" alt="UPES Logo" />
            <h1 className="text-2xl font-medium pb-3 whitespace-nowrap">
              Welcome to UPES Infirmary Portal
            </h1>
            <div className="sign-container__right-header">
              <p className="font-medium pb-1">Login as:</p>
              <div className="flex w-full pb-5">
                {ROLES.map(({ value, label }) => (
                  <label
                    key={value}
                    className={`flex items-center whitespace-nowrap justify-${
                      value === "doctor"
                        ? "start"
                        : value === "assistant_doctor"
                        ? "end"
                        : "center"
                    } w-full`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={value}
                      checked={role === value}
                      onChange={handleRoleChange}
                      className="mr-2"
                    />
                    {label}
                  </label>
                ))}
              </div>
              <h1>
                <span className="capitalize">{role.replace("_", " ")}</span>{" "}
                Sign in
              </h1>
            </div>
            <form>
              {["email", "password"].map((field) => (
                <div key={field}>
                  <Label htmlFor={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </Label>
                  <Input
                    type={field}
                    id={field}
                    placeholder={field}
                    value={input[field as keyof typeof input]}
                    onChange={onInputChange}
                    className="bg-white text-black"
                  />
                </div>
              ))}
              <div>
                <Label htmlFor="location">Location</Label>
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
              </div>
            </form>

            {errorMessage && (
              <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
            )}

            <div className="gap-5 flex flex-col w-full">
              <Button className="sign-in-btn" onClick={handleSignIn}>
                Sign In
              </Button>

              {role === "patient" && (
                <div className="flex flex-col items-center">
                  <div className="flex w-full justify-center items-center">
                    <span className="w-[40%] flex items-center justify-center whitespace-nowrap">
                      Need an account?&nbsp;&nbsp;
                      <Link to="/register" className="text-blue-500">
                        Register
                      </Link>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="helpline">
        Energy Acres, Bidholi: Tel: +91-135-2770137, 2776053, 2776054, 2776091
        &nbsp; | &nbsp; Knowledge Acres, Kandoli: Tel: +91-135-2770137, 2776053,
        2776054, 2776091
      </div>
    </>
  );
};

export default SignIn;
