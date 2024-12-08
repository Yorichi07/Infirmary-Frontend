import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ChangeEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.scss";

const API_URLS = {
  patient: "http://192.168.147.176:8081/api/auth/patient/signin",
  doctor: "http://192.168.147.176:8081/api/auth/doc/signin",
  assistant_doctor: "http://192.168.147.176:8081/api/auth/ad/signin",
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
  const [location, setLocation] = useState({ latitude: -1, longitude: -1 });

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, value } = e.target;
    setInput((prev) => ({ ...prev, [id]: value }));
  };

  const handleRoleChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);

    if (selectedRole === "assistant_doctor" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }),(err)=>{console.log(err.message)},{enableHighAccuracy:true,maximumAge:2000,timeout:5000}
      );
    }
  };

  const handleSignIn = async () => {
    const apiUrl = API_URLS[role as keyof typeof API_URLS];
    const dashboardRoute =
      DASHBOARD_ROUTES[role as keyof typeof DASHBOARD_ROUTES];
    
    if (
      role === "assistant_doctor" &&
      (location.latitude === -1 || location.longitude === -1)
    ) {
      return alert(
        "Allow Location Services to sign in as an Assistant Doctor."
      );
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

      navigate(dashboardRoute);
    } catch (error: any) {
      const message =
        error.response?.status === 401
          ? "Incorrect email or password. Please try again."
          : error.response?.data?.message || "An error occurred.";
      setErrorMessage(message);
    }
  };

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
                <div key={field} className="input">
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
