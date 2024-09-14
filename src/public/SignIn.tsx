import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ChangeEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.scss";

const API_URLS = {
  patient: "http://localhost:8081/api/auth/patient/signin",
  doctor: "http://localhost:8081/api/auth/doctor/signin",
  assistant_doctor: "http://localhost:8081/api/auth/assistant/signin",
};

const DASHBOARD_ROUTES = {
  patient: "/user-dashboard",
  doctor: "/doctor-dashboard",
  assistant_doctor: "/assistant-dashboard",
};

const SignIn = ({ role }: { role: string }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [id]: value,
    }));
  };

  const handleSignIn = async () => {
    const apiUrl = API_URLS[role as keyof typeof API_URLS];
    const dashboardRoute =
      DASHBOARD_ROUTES[role as keyof typeof DASHBOARD_ROUTES];

    try {
      const res = await axios.post(apiUrl, input);
      const token =
        role === "assistant_doctor"
          ? JSON.parse(res.data).token
          : res.data.token;
      localStorage.setItem("token", token);
      navigate(dashboardRoute);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Incorrect email or password. Please try again.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="sign-container">
        <div className="sign-container__left"></div>
        <div className="sign-container__right">
          <div className="sign-container__right-content">
            <img src="/upes-logo.jpg" alt="UPES Logo" />
            <div className="sign-container__right-header">
              <h1>
                <span className="capitalize">{role.replace("_", " ")}</span>{" "}
                Sign in
              </h1>
              <p>Please login to continue to your account</p>
            </div>
            <form>
              <div className="input">
                <Label htmlFor="email">Username</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={input.email}
                  onChange={onInputChange}
                  className="bg-white text-black"
                />
              </div>
              <div className="input">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={input.password}
                  onChange={onInputChange}
                  className="bg-white text-black"
                />
              </div>
            </form>

            {errorMessage && (
              <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
            )}

            <Button className="sign-in-btn" onClick={handleSignIn}>
              Sign In
            </Button>
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
