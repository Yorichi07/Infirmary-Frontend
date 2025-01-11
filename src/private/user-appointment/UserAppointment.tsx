import "./UserAppointment.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { ToastAction } from "@/components/ui/toast";
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
import { RadioButton } from "primereact/radiobutton";
import { useEffect, useState } from "react";
import axios from "axios";

const UserAppointment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [doctors, setDoctors] = useState<{ id: string; name: string }[]>([]);
  const [lastAppointmentDate, setLastAppointmentDate] = useState<string | null>(
    null
  );

  const formSchema = z.object({
    reason: z.string(),
    followUp: z.enum(["Yes", "No"]),
    lastAppointmentDate: z.string().optional(),
    preferredDoctor: z.string().optional(),
    reasonForPreference: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastAppointmentDate: "",
      followUp: "No",
      preferredDoctor: undefined,
      reasonForPreference: undefined,
      reason: undefined,
    },
  });

  const [userDetails, setUserDetails] = useState({
    email: "",
    name: "",
    school: "",
    dateOfBirth: "",
    program: "",
    phoneNumber: "",
    emergencyContact: "",
    bloodGroup: "",
    imageUrl: "",
    password: "",
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }

        if (
          !(
            localStorage.getItem("latitude") ||
            localStorage.getItem("longitude")
          )
        ) {
          toast({
            title: "Location Required",
            description: "Select a location to proceed.",
            variant: "destructive",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
          return;
        }

        const response = await axios.get(
          "http://localhost:8081/api/patient/getAvailableDoctors",
          {
            headers: {
              Authorization: "Bearer " + token,
              "X-Latitude": localStorage.getItem("latitude"),
              "X-Longitude": localStorage.getItem("longitude"),
            },
          }
        );
        const doctorList = response.data.map((doctor: any) => ({
          id: doctor.doctorId.toString(),
          name: doctor.name,
        }));
        setDoctors(doctorList);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          /* empty */
        } else {
          console.error("Error fetching doctors: ", error);
          toast({
            title: "Error",
            description: "Could not fetch available doctors",
            variant: "destructive",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
      }
    };

    const getUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      try {
        const res = await axios.get("http://localhost:8081/api/patient/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        const data = await res.data;
        setUserDetails(data);
      } catch (error: any) {
        console.log(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast({
            title: "Error",
            description: error.response.data.message,
            variant: "destructive",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        } else {
          toast({
            title: "Error",
            description:
              "Error fetching patient details, please try again later.",
            variant: "destructive",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
      }
    };

    fetchDoctors();
    getUser();
  }, []);

  const fetchLastAppointmentDate = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8081/api/patient/lastAppointmentDate",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setLastAppointmentDate(response.data || null);
      form.setValue("lastAppointmentDate", response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 404) {
          setLastAppointmentDate("No Last Appointment Date");
          form.setValue("lastAppointmentDate", "No Last Appointment Date");
        } else {
          toast({
            title: "Error",
            description: error.response.data.message,
            variant: "destructive",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
      } else {
        console.error("Error fetching last appointment date:", error);
        toast({
          title: "Error",
          description: "Couldn't get last appointment date",
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }
  };

  const { isValid } = form.formState;
  const onSubmit = async (data: any) => {
    if (data.preferredDoctor && data.preferredDoctor !== "none") {
      if (
        !data.reasonForPreference ||
        data.reasonForPreference.trim().length === 0
      ) {
        form.setError("reasonForPreference", {
          type: "manual",
          message:
            "Reason for preference is required when a preferred doctor is selected.",
        });
        return;
      }
    }
    if (isValid) {
      try {
        const token = localStorage.getItem("token");

        const appointmentData = {
          reason: data.reason,
          isFollowUp: data.followUp === "Yes",
          preferredDoctor: data.preferredDoctor
            ? data.preferredDoctor
            : null,
          reasonPrefDoctor: data.reasonForPreference || null,
        };

        if (
          !(
            localStorage.getItem("latitude") ||
            localStorage.getItem("longitude")
          )
        ) {
          toast({
            title: "Location Required",
            description: "Select a location to proceed.",
            variant: "destructive",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
          return;
        }

        const response = await axios.post(
          "http://localhost:8081/api/patient/submitAppointment",
          appointmentData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Latitude": localStorage.getItem("latitude"),
              "X-Longitude": localStorage.getItem("longitude"),
            },
          }
        );

        if (response.status === 200) {
          toast({
            title: "Success",
            description: "Appointment submitted successfully.",
          });
          setTimeout(() => {
            navigate("/patient-dashboard");
          }, 1000);
        } else {
          console.error("Failed to submit appointment");
          toast({
            title: "Error",
            description: "Failed to submit appointment",
            variant: "destructive",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
      } catch (error:any) {
        toast({
          title: "Error",
          description: error.response?.data?.message,
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } else {
      console.error("Form Validation Errors:", form.formState.errors);
      toast({
        title: "Error",
        description: "Form is not valid",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const handleCancel = () => {
    navigate("/patient-dashboard");
  };

  return (
    <>
      <Toaster />
      <div className="min-h-[84svh] w-full flex gap-8 max-lg:min-h-[93svh] px-2">
        {/* <img
          src="/appointment.jpg"
          className="w-[55%] max-lg:hidden border-r border-black shadow-md"
        /> */}
        <div className="w-[55%] max-lg:hidden flex justify-center items-center">
          <div className="w-full bg-[#000000] space-y-4 p-8 bg-opacity-10 rounded-lg flex items-center justify-center flex-col shadow-xl">
            <div className="bg-white border rounded-md shadow-xl">
              <img
                src={
                  userDetails.imageUrl != null
                    ? `http://localhost:8081/${userDetails.imageUrl}`
                    : "/default-user.jpg"
                }
                className="w-63 h-64 object-cover border-2 border-black"
              />
            </div>
            <div className="text-center  space-y-2 text-[#545555] font-semibold">
              <p>{userDetails.name}</p>
              <p>{userDetails.email}</p>
              <p>
                DOB -{" "}
                {new Date(userDetails.dateOfBirth).toLocaleDateString("en-GB")}
              </p>
              <p>Contact - {userDetails.phoneNumber}</p>
              <p>Blood Group - {userDetails.bloodGroup}</p>
            </div>
          </div>
        </div>

        <div className="appointment-container justify-between flex flex-col py-5 px-3">
          <div className="appointment-container__content">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="h-[100%] flex flex-col justify-between"
              >
                <div className="appointment-container__body">
                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem className="form-item">
                        <FormLabel>Reason for Appointment</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter reason for appointment"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="followUp"
                    render={({ field }) => (
                      <FormItem className="form-item">
                        <FormLabel>Is this a follow-up?</FormLabel>
                        <div className="flex mb-5">
                          <div className="flex gap-2 flex-col w-[15%]">
                            <div className="flex align-items-center">
                              <RadioButton
                                inputId="followUpYes"
                                name="followUp"
                                value="Yes"
                                onChange={(e) => {
                                  field.onChange(e.value);
                                  fetchLastAppointmentDate();
                                }}
                                checked={field.value === "Yes"}
                              />
                              <label htmlFor="followUpYes" className="ml-2">
                                Yes
                              </label>
                            </div>
                            <div className="flex align-items-center">
                              <RadioButton
                                inputId="followUpNo"
                                name="followUp"
                                value="No"
                                onChange={(e) => {
                                  field.onChange(e.value);
                                  setLastAppointmentDate(null);
                                }}
                                checked={field.value === "No"}
                              />
                              <label htmlFor="followUpNo" className="ml-2">
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastAppointmentDate"
                    render={({ field }) => (
                      <FormItem className="form-item">
                        <FormLabel>Last appointment date?</FormLabel>
                        <FormControl>
                          <Input
                            id="aDate"
                            {...field}
                            value={lastAppointmentDate || ""}
                            disabled
                            placeholder="Last appointment date"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferredDoctor"
                    render={({ field }) => (
                      <FormItem className="form-item">
                        <FormLabel>Preferred doctor (if any)</FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={(value: any) =>
                              field.onChange(
                                value === "none" ? undefined : value
                              )
                            }
                            disabled={doctors.length === 0}
                          >
                            <SelectTrigger id="doctor" className="mb-5">
                              <SelectValue
                                placeholder={
                                  doctors.length === 0
                                    ? "No doctors available"
                                    : "Select a doctor"
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="none">None</SelectItem>
                                {doctors.map((doctor: any) => (
                                  <SelectItem key={doctor.id} value={doctor.id}>
                                    {doctor.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="reasonForPreference"
                    render={({ field }) => (
                      <FormItem className="form-item">
                        <FormLabel>Reason for Preference?</FormLabel>
                        <FormControl>
                          <Textarea
                            id="reasonForPref"
                            placeholder="Enter reason for preference (if preferred)"
                            {...field}
                            disabled={!form.getValues("preferredDoctor")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </div>
          <div className="appointment-container__footer">
            <Button
              type="button"
              onClick={handleCancel}
              variant="secondary"
              className="back-btn"
            >
              Back
            </Button>
            <Button
              type="submit"
              className="save-btn"
              onClick={form.handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAppointment;
