import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ChangeEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.scss";

const API_URLS = {
  patient:
    "http://ec2-3-108-51-210.ap-south-1.compute.amazonaws.com/api/auth/patient/signin",
  doctor:
    "http://ec2-3-108-51-210.ap-south-1.compute.amazonaws.com/api/auth/doc/signin",
  assistant_doctor:
    "http://ec2-3-108-51-210.ap-south-1.compute.amazonaws.com/api/auth/ad/signin",
};

const DASHBOARD_ROUTES = {
  patient: "/user-dashboard",
  doctor: "/doctor-dashboard",
  assistant_doctor: "/assistant-dashboard",
};

const SignIn = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [role, setRole] = useState<string>("patient");

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [id]: value,
    }));
  };

  const handleRoleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setRole(e.target.value);
  };

  const handleSignIn = async () => {
    const apiUrl = API_URLS[role as keyof typeof API_URLS];
    const dashboardRoute =
      DASHBOARD_ROUTES[role as keyof typeof DASHBOARD_ROUTES];

    try {
      const res = await axios.post(apiUrl, input);
      const { token, email, roles } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem(
        "roles",
        roles[0] === "ROLE_PATIENT"
          ? "user"
          : roles[0] === "ROLE_AD"
          ? "assistant"
          : "doctor"
      );

      navigate(dashboardRoute);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Incorrect email or password. Please try again.");
      } else {
        setErrorMessage(error.response.data.message);
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
              <p className="font-medium">Login as:</p>
              <div className="flex w-full pb-5">
                <label className="text-left w-full flex items-center justify-start">
                  <input
                    type="radio"
                    name="role"
                    value="doctor"
                    checked={role === "doctor"}
                    onChange={handleRoleChange}
                    className="mr-2"
                  />
                  Doctor
                </label>
                <label className="text-center w-full flex items-center justify-center">
                  <input
                    type="radio"
                    name="role"
                    value="patient"
                    checked={role === "patient"}
                    onChange={handleRoleChange}
                    className="mr-2"
                  />
                  Patient
                </label>
                <label className="text-right w-full flex items-center justify-end">
                  <input
                    type="radio"
                    name="role"
                    value="assistant_doctor"
                    checked={role === "assistant_doctor"}
                    onChange={handleRoleChange}
                    className="mr-2"
                  />
                  Assistant Doctor
                </label>
              </div>
              <h1>
                <span className="capitalize">{role.replace("_", " ")}</span>{" "}
                Sign in
              </h1>
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

            <div className="gap-5 flex flex-col w-full">
              <Button className="sign-in-btn" onClick={handleSignIn}>
                Sign In
              </Button>

              {role === "patient" && (
                <div className="flex flex-col items-center">
                  <div className="flex w-full justify-center items-center">
                    <hr className="w-[30%]" />
                    <span className="w-[40%] flex items-center justify-center">
                      Need an account?&nbsp;&nbsp;
                      <Link
                        to="/register"
                        className="text-blue-500 text-center flex items-center justify-center"
                      >
                        Register
                      </Link>
                    </span>
                    <hr className="w-[30%]" />
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
