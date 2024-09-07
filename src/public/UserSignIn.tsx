import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import "./UserSignIn.scss";
import { Link } from "react-router-dom";
import { ChangeEventHandler, useState } from "react";

const UserSignIn = () => {
  const [input, setInput] = useState({ username: "", password: "" });

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [id]: value,
    }));
  };

  const onsubmit = () => {
    console.log(input);
  };

  return (
    <div className="sign-container">
      <div className="sign-container__left"></div>
      <div className="sign-container__right">
        <div className="sign-container__right-content">
          <img src='/upes-logo.jpg' alt="UPES Logo" />
          <div className="sign-container__right-header">
            <h1>Patient Sign in</h1>
            <p>Please login to continue to your account</p>
          </div>
          <form>
            <div className="input">
              <Label htmlFor="username">Username</Label>
              <Input
                type="email"
                id="username"
                placeholder="Email"
                value={input.username}
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
        <div className="sign-container__right-footer">
          <p>Need an account?</p>
          &nbsp;
          <Link to="/register" className="createOne">
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserSignIn;
