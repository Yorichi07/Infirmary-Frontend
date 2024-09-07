import React, { useState } from "react";
import "./UserRegister.scss";
import { Image } from "primereact/image";
import Shared from "@/Shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long" })
      .max(30, { message: "Name must be at most 30 characters long" })
      .regex(/^[a-zA-Z0-9_ ]+$/, {
        message:
          "Name can only contain letters, numbers, underscores, and spaces",
      }),
    patientId: z
      .string()
      .min(1, { message: "Patient Id must be at least 1" })
      .transform((val) => parseInt(val, 10))
      .refine((val) => val > 0, { message: "Patient Id must be positive" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(64, { message: "Password must be at most 64 characters long" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/\d/, { message: "Password must contain at least one number" })
      .regex(/[@$!%*?&#]/, {
        message:
          "Password must contain at least one special character (@, $, !, %, *, ?, &, or #)",
      }),
    confirmPassword: z.string(),
    school: z.string().min(1, { message: "School cannot be empty" }),
    program: z.string().min(1, { message: "Program cannot be empty" }),
    dateOfBirth: z
      .date()
      .max(new Date(), { message: "Date of birth cannot be in the future" }),
    emergencyContact: z
      .string()
      .regex(/^\d+$/, {
        message: "Emergency contact phone must contain only numbers",
      })
      .length(10, {
        message: "Emergency contact phone must be 10 digits long",
      }),
    height: z
      .string()
      .transform((val) => parseInt(val, 10))
      .refine((val) => val >= 30 && val <= 250, {
        message: "Height must be between 30 cm and 250 cm",
      }),
    weight: z
      .string()
      .transform((val) => parseFloat(val))
      .refine((val) => val >= 1 && val <= 300, {
        message: "Weight must be between 1 kg and 300 kg",
      }),
    gender: z.enum(["Male", "Female", "Prefer not to say"], {
      message: "Choose gender from given options",
    }),
    bloodGroup: z.string().min(1, { message: "Blood group cannot be empty" }),
    medicalHistory: z.string().optional(),
    familyMedicalHistory: z.string().optional(),
    allergies: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const UserRegister = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      patientId: 0,
      password: "",
      confirmPassword: "",
      school: "",
      program: "",
      dateOfBirth: "",
      emergencyContact: "",
      height: 0,
      weight: 0,
      gender: "",
      bloodGroup: "",
      medicalHistory: "",
      familyMedicalHistory: "",
      allergies: "",
    },
  });

  const onSubmit = (data: unknown) => {
    console.log(data);
    console.log(form);
    if (form.formState.isValid) {
      try {
        console.log("Form Data Submitted: ", JSON.stringify(data, null, 2));
        navigate("/");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      console.log("Form is not valid.");
      console.error("Form Validation Errors:", form.formState.errors);

      Object.entries(form.formState.errors).forEach(([field, error]) => {
        console.error(`Error in ${field}: ${error.message}`);
      });
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
    }
  };

  return (
    <div className="register-container">
      <div className="register-container__content">
        <div className="register-container__header">
          <img src="/upes-logo2.jpg" alt="UPES Logo" />
          <div className="title">
            {Shared.UserPlus}
            <h1>Patient Registration Form</h1>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="h-[84%]">
            <div className="register-container__body">
              <div className="image-container">
                <Image
                  src={uploadedImage || "/default-user.jpg"}
                  alt="Profile Picture"
                  preview
                  style={{
                    border: "1px solid black",
                    display: "flex",
                    maxWidth: "200px",
                    maxHeight: "200px",
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  id="upload-image"
                  style={{ display: "none" }}
                />
                <label htmlFor="upload-image" className="upload-button">
                  Upload Image
                </label>
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
                      name="school"
                      render={({ field }) => (
                        <FormItem className="mt-3">
                          <FormLabel>School</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter school" {...field} />
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
                      name="height"
                      render={({ field }) => (
                        <FormItem className="mt-3">
                          <FormLabel>Height (cm)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter height"
                              {...field}
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
                            <SelectTrigger className="dropdown">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Prefer not to say">
                                  Prefer not to say
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="medicalHistory"
                      render={({ field }) => (
                        <FormItem className="mt-3">
                          <FormLabel>Medical History</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter medical history"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="allergies"
                      render={({ field }) => (
                        <FormItem className="mt-3">
                          <FormLabel>Allergies</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter allergies"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="patient-details__right">
                    <FormField
                      control={form.control}
                      name="patientId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Patient Id</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter your Id"
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
                      name="program"
                      render={({ field }) => (
                        <FormItem className="mt-3">
                          <FormLabel>Program</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your program"
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
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem className="mt-3">
                          <FormLabel>Weight (kg)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter weight"
                              {...field}
                            />
                          </FormControl>
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
                          <FormControl>
                            <Input placeholder="Enter blood group" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="familyMedicalHistory"
                      render={({ field }) => (
                        <FormItem className="mt-3">
                          <FormLabel>Family Medical History</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter family medical history"
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
              <Button
                type="submit"
                className="save-btn text-white"
                onClick={onSubmit}
              >
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
