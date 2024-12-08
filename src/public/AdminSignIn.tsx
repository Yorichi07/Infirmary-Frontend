import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ChangeEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminSignIn.scss";

const AdminSignIn = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: "", password: "" });

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, value } = e.target;
    setInput((prev) => ({ ...prev, [id]: value }));
  };

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignIn = async () => {
    const apiUrl = "http://192.168.147.176:8081/api/auth/admin/signin";
    const dashboardRoute = "/admin-dashboard";

    try {
      const response = await axios.post(apiUrl, input);
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
              Welcome to Infirmary Admin Portal
            </h1>
            <div className="sign-container__right-header">
              <h1>Admin Sign in</h1>
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

export default AdminSignIn;
