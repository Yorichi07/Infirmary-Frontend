import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";

import "./SignIn.scss";
import { ChangeEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = ({ role }: { role: string }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: "", password: "" });

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [id]: value,
    }));
  };

  const onsubmit = async () => {
    if (role == "user") {
      try {
        const res = await axios.post(
          "http://localhost:8081/api/auth/patient/signin",
          input
        );
        const token = res.data.token;
        localStorage.setItem("token", token);
  
        return navigate("/user-dashboard");
      } catch (error) {
        console.log(error);
      }
    }
    if (role == "doctor") {
      try {
        const res = await axios.post(
          "http://192.168.0.109:8081/api/auth/patient/signin",
          input
        );
        const token = res.data.token;
        localStorage.setItem("token", token);
  
        return navigate("/user-dashboard");
      } catch (error) {
        console.log(error);
      }
    }
    if (role == "assistant doctor") {
      try {
        const res = await axios.post(
          "http://localhost:8081/api/auth/patient/signin",
          input
        );
        const token = res.data.token;
        localStorage.setItem("token", token);
  
        return navigate("/user-dashboard");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="sign-container">
      <div className="sign-container__left"></div>
      <div className="sign-container__right">
        <div className="sign-container__right-content">
          <img src="/upes-logo.jpg" alt="UPES Logo" />
          <div className="sign-container__right-header">
            <h1>
              <span className="capitalize">{role}</span> Sign in
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
          <a href="">Forgot password?</a>
          <Button className="sign-in-btn" onClick={onsubmit}>
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
