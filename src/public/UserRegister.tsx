import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { Image } from "primereact/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import "./UserRegister.scss";
import Shared from "@/Shared";

const schoolOptions = [
  "Guest",
  "SOCS",
  "SOB",
  "SOL",
  "SOHS",
  "SOAE",
  "SFL",
  "SOD",
  "SOLSM",
] as const;

const bloodGroup = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"] as const;

const programOptions = {
  Guest: ["Guest"],
  SOCS: ["Faculty", "B.Tech", "M.Tech", "B.Sc", "BCA", "MCA"],
  SOB: ["Faculty", "MBA", "BBA", "B.Com(Hons)", "BBA-MBA", "B.Com-MBA(Hons)"],
  SOL: [
    "Faculty",
    "BA LL.B(Hons)",
    "BBA LL.B(Hons)",
    "B.COM LL.B(Hons)",
    "LL.B(Hons)",
    "LL.M",
  ],
  SOHS: ["Faculty", "B.Sc", "M.Sc", "B.Pharm", "B.Tech"],
  SOAE: ["Faculty", "B.Tech", "B.Sc(Hons)", "M.Tech.", "M.Sc"],
  SFL: ["Faculty", "B.A", "M.A"],
  SOD: ["Faculty", "B.Des", "M.Des"],
  SOLSM: ["Faculty", "B.Sc (H)", "BA", "BA(H)", "MA"],
};

const formSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters long")
      .max(30, "Name must be at most 30 characters long")
      .regex(
        /^[a-zA-Z0-9_ ]+$/,
        "Name can only contain letters, numbers, underscores, and spaces"
      ),
    sapID: z.string().regex(/^\d+$/, "Sap ID must be a valid number"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&#]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
    email: z.string().email("Invalid email address"),
    school: z.enum(schoolOptions, {
      required_error: "Please select a valid school",
    }),
    program: z.string().min(1, "Please select a program"),
    dateOfBirth: z
      .date()
      .max(new Date(), "Date of birth cannot be in the future"),
    emergencyContact: z
      .string()
      .regex(/^\d{10}$/, "Emergency contact must be a 10-digit number"),
    phoneNumber: z
      .string()
      .regex(/^\d{10}$/, "Phone number must be a 10-digit number"),
    gender: z
      .enum(["Male", "Female", "Other"])
      .refine((value) => value !== undefined, {
        message: "Please select a gender",
      }),

    bloodGroup: z.enum(bloodGroup, {
      required_error: "Please select a valid blood group",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const UserRegister = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [bs64Img, setBs64Img] = useState<string | null>(null);
  const [availablePrograms, setAvailablePrograms] = useState<string[]>([]);

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
      sapID: 0,
      password: undefined,
      confirmPassword: undefined,
      email: undefined,
      school: undefined,
      program: "",
      dateOfBirth: undefined,
      emergencyContact: undefined,
      phoneNumber: undefined,
      gender: undefined,
      bloodGroup: undefined,
      img: undefined,
    },
  });
  const { isValid } = form.formState;

  const onSubmit = async (data: any) => {
    if (isValid) {
      try {
        const payload = {
          ...data,
          dateOfBirth: data.dateOfBirth
            ? new Date(data.dateOfBirth).toISOString().split("T")[0]
            : undefined,
          img: bs64Img,
        };

        await axios
          .post("http://192.168.176.1:8081/api/auth/patient/signup", payload)
          .then((res) => {
            return res.data;
          });

        alert("Registration successful");
        navigate("/");
      } catch (error: any) {
        console.error("Error submitting form: ", error);
        alert(error?.response?.data?.message || "Registration failed");
      }
    } else {
      console.error("Form Validation Errors:", form.formState.errors);
      alert("Please fill in required details before submitting!");
    }
  };

  const handleSchoolChange = (school: keyof typeof programOptions) => {
    setAvailablePrograms(programOptions[school] || []);
    form.setValue("program", "");
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 1048576) {
      alert("File Size should be less than 1MB");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setBs64Img(reader.result as string);
      setUploadedImage(URL.createObjectURL(file));
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (form.watch("school") === "Guest") {
      form.setValue("sapID", 0);
    }
  }, [form.watch("school")]);

  return (
    <div className="register-container">
      <div className="register-container__content">
        <div className="register-container__header">
          <img src="/upes-logo.jpg" alt="UPES Logo" />
          <div className="flex items-baseline w-full">
            <div className="title">
              {Shared.UserPlus}
              <h1>Patient Registration Form</h1>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="min-h-[91%]">
            <div className="register-container__body">
              <div className="image-container">
                <Image
                  src={uploadedImage || "/default-user.jpg"}
                  alt="Profile Picture"
                  preview
                  style={{
                    border: "1.5px solid black",
                    width: "100%",
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  id="upload-image"
                  style={{ display: "none" }}
                />
                <label htmlFor="upload-image">Upload Image</label>
              </div>
              <div className="patient-details">
                <div className="patient-details__top">
                  <div className="patient-details__left">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="mt-3">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem className="mt-3">
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Confirm password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem className="mt-3">
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              placeholder="Select date of birth"
                              value={
                                field.value
                                  ? new Date(field.value)
                                      .toISOString()
                                      .substring(0, 10)
                                  : ""
                              }
                              onChange={(e) =>
                                field.onChange(new Date(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem className="mt-3">
                          <FormLabel>Gender</FormLabel>
                          <Select
                            {...field}
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup className="h-[5rem] overflow-y-scroll">
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bloodGroup"
                      render={({ field }) => (
                        <FormItem className="mt-3">
                          <FormLabel>Blood Group</FormLabel>
                          <Select
                            {...field}
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select blood group" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup className="h-max-[8rem] overflow-y-scroll">
                                {bloodGroup.map((group) => (
                                  <SelectItem key={group} value={group}>
                                    {group}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="patient-details__right">
                    <FormField
                      control={form.control}
                      name="sapID"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SapId</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter your Id"
                              {...field}
                              disabled={form.watch("school") === "Guest"}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="mt-3">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="school"
                      render={({ field }) => (
                        <FormItem className="mt-3">
                          <FormLabel>School</FormLabel>
                          <Select
                            {...field}
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleSchoolChange(
                                value as keyof typeof programOptions
                              );
                            }}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select school" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup className="h-max-[8rem] overflow-y-scroll">
                                {Object.keys(programOptions).map((school) => (
                                  <SelectItem key={school} value={school}>
                                    {school}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="program"
                      render={({ field }) => (
                        <FormItem className="mt-3">
                          <FormLabel>Program</FormLabel>
                          <Select
                            {...field}
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value}
                            disabled={!availablePrograms.length}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select program" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup className="h-max-[8rem] overflow-y-scroll">
                                {availablePrograms.map((program) => (
                                  <SelectItem key={program} value={program}>
                                    {program}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem className="mt-3">
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your phone number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="emergencyContact"
                      render={({ field }) => (
                        <FormItem className="mt-3">
                          <FormLabel>Emergency Contact</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter emergency contact"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="register-container__footer">
              <Button
                type="button"
                onClick={handleCancel}
                variant="secondary"
                className="cancel-btn"
              >
                Cancel
              </Button>
              <Button type="submit" className="save-btn text-white">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UserRegister;
