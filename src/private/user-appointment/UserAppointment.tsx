import "./UserAppointment.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

const formSchema = z.object({
  reason: z.string(),
  followUp: z.enum(["Yes", "No"]),
  lastAppointmentDate: z.string().optional(),
  preferredDoctor: z.string().optional(),
  reasonForPreference: z.string().optional(),
});

const UserAppointment = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<{ id: string; name: string }[]>([]);
  const [lastAppointmentDate, setLastAppointmentDate] = useState<string | null>(
    null
  );
  const [latitude,setLatitude]=useState(-1);
  const [longitude,setLongitude]=useState(-1);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastAppointmentDate: "",
      followUp: "No",
      preferredDoctor: undefined,
      reasonForPreference: "",
      reason: undefined,
    },
  });

  useEffect(() => {
    
    if(!navigator.geolocation) alert("Allow Location Permissions")

    navigator.geolocation.getCurrentPosition(async (position)=> {
      setLongitude(position.coords.longitude);
      setLatitude(position.coords.latitude);
      fetchDoctors(position)
    })

    const fetchDoctors = async (pos:any) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }

        const response = await axios.get(
          "http://192.168.147.176:8081/api/AD/getAvailableDoctors",
          {
            headers: {
              Authorization: "Bearer " + token,
              "X-Latitude": pos.coords.latitude,
              "X-Longitude": pos.coords.longitude
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
          
        } else {
          console.error("Error fetching doctors: ", error);
          alert("Could not fetch available doctors");
        }
      }
    };
  }, []);

  const fetchLastAppointmentDate = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://192.168.147.176:8081/api/appointment/lastAppointmentDate",
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
          alert(error.response.data.message);
        }
      } else {
        console.error("Error fetching last appointment date:", error);
        alert("Could'nt get last appointment date");
      }
    }
  };

  const { isValid } = form.formState;

  const onSubmit = async (data: any) => {

    if (isValid) {
      try {
        const token = localStorage.getItem("token");

        const appointmentData = {
          reason: data.reason,
          isFollowUp: data.followUp === "Yes",
          preferredDoctor: data.preferredDoctor
            ? Number(data.preferredDoctor)
            : null,
          reasonPrefDoctor: data.reasonForPreference || null,
        };

        if(latitude === -1 || longitude === -1) {
          alert("Allow Location Permissions")
          return 0;
        }

        const response = await axios.post(
          "http://192.168.147.176:8081/api/patient/submitAppointment",
          appointmentData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Latitude": latitude,
              "X-Longitude": longitude
            },
          }
        );

        if (response.status === 200) {
          alert("Appointment submitted successfully");
          navigate("/patient-dashboard");
        } else {
          console.error("Failed to submit appointment");
          alert("Failed to submit appointment");
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          alert(error.response.data.message);
        } else {
          console.error("Error submitting appointment:", error);
          alert("Failed to submit appointment");
        }
      }
    } else {
      console.error("Form Validation Errors:", form.formState.errors);
      alert("Form is not valid");
    }
  };

  const handleCancel = () => {
    navigate("/patient-dashboard");
  };

  return (
    <div className="min-h-[83svh] w-full flex gap-8 max-lg:min-h-[93svh]">
      <img src="/appointment.jpg" className="w-[55%] max-lg:hidden" />

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
                            field.onChange(value === "none" ? undefined : value)
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
                        {
                            form.getValues("preferredDoctor") ? (<Textarea
                            id="reasonForPref"
                            placeholder="Enter reason for preference (if preferred)"
                            {...field}
                            
                          />):(<Textarea
                            id="reasonForPref"
                            placeholder="Enter reason for preference (if preferred)"
                            {...field}
                            disabled
                          />)
                        }
                        
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
  );
};

export default UserAppointment;
