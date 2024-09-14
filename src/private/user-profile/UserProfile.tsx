import "./UserProfile.scss";
import { Image } from "primereact/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import axios from "axios";

const formSchema = z.object({
  name: z.string(),
  patientId: z.string(),
  school: z.string(),
  program: z.string(),
  dateOfBirth: z.string(),
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
  bloodGroup: z.string(),
  medicalHistory: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  allergies: z.string().optional(),
  imageUrl: z.string(),
});

const UserProfile = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      patientId: "",
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
      imageUrl: "",
    },
  });

  useEffect(() => {
    const getUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      try {
        const res = await axios.get(
          "http://localhost:8081/api/patient/getAllDetails",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const data = await res.data;
        form.setValue("name", data.name || "");
        form.setValue("patientId", data.email || "");
        form.setValue("school", data.school || "");
        form.setValue("program", data.program || "");
        form.setValue("dateOfBirth", data.dateOfBirth || "");
        form.setValue("emergencyContact", data.emergencyContact || "");
        form.setValue("height", data.height || 0);
        form.setValue("weight", data.weight || 0);
        form.setValue("gender", data.gender || "");
        form.setValue("bloodGroup", data.bloodGroup || "");
        form.setValue("medicalHistory", data.medicalHistory || "");
        form.setValue("familyMedicalHistory", data.familyMedicalHistory || "");
        form.setValue("allergies", data.allergies || "");
        form.setValue("imageUrl", data.imageUrl || "/default-user.jpg");
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          try {
            const resBackup = await axios.get(
              "http://localhost:8081/api/patient/",
              {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            );

            const dataBackup = await resBackup.data;
            form.setValue("name", dataBackup.name || "");
            form.setValue("patientId", dataBackup.email || "");
            form.setValue("school", dataBackup.school || "");
            form.setValue("program", dataBackup.program || "");
            form.setValue("dateOfBirth", dataBackup.dateOfBirth || "");
            form.setValue(
              "emergencyContact",
              dataBackup.emergencyContact || ""
            );
            form.setValue("height", dataBackup.height || 0);
            form.setValue("weight", dataBackup.weight || 0);
            form.setValue("gender", dataBackup.gender || "Male");
            form.setValue("bloodGroup", dataBackup.bloodGroup || "");
            form.setValue("medicalHistory", dataBackup.medicalHistory || "");
            form.setValue(
              "familyMedicalHistory",
              dataBackup.familyMedicalHistory || ""
            );
            form.setValue("allergies", dataBackup.allergies || "");
            form.setValue(
              "imageUrl",
              dataBackup.imageUrl || "/default-user.jpg"
            );
          } catch (backupError) {
            console.log("Error during backup request:", backupError);
          }
        } else {
          console.log("Error:", error);
        }
      }
    };

    getUserDetails();
  }, []);

  const { isValid } = form.formState;
  const onSubmit = (data: unknown) => {
    if (isValid) {
      try {
        console.log("Form Data Submitted: ", JSON.stringify(data, null, 2));
        navigate("/user-dashboard");
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
    navigate("/user-dashboard");
  };

  return (
    <div className="profile-container__content">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-[100%]">
          <div className="profile-container__body">
            <div className="image-container">
              <Image
                // src={form.watch("imageUrl")}
                src="/default-user.jpg"
                alt="Profile Picture"
                preview
                style={{
                  border: "1px solid black",
                  display: "flex",
                  justifyContent:"center",
                  alignItems:"center",
                }}
              />
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
                          <Input placeholder="Name" {...field} disabled />
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
                          <Input placeholder="School" {...field} disabled />
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
                            placeholder="Date of Birth"
                            {...field}
                            disabled
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
                        <FormControl>
                          <Input placeholder="Gender" {...field} disabled />
                        </FormControl>
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
                          <Textarea placeholder="Enter allergies" {...field} />
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
                          <Input placeholder="Patient Id" {...field} disabled />
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
                          <Input placeholder="Program" {...field} disabled />
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
                          <Input
                            placeholder="Blood group"
                            {...field}
                            disabled
                          />
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
          <div className="profile-container__footer">
            <Button
              type="button"
              onClick={handleCancel}
              variant="secondary"
              className="back-btn"
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
  );
};

export default UserProfile;
