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
import { RadioButton } from "primereact/radiobutton"; // Assuming you're using PrimeReact for RadioButton

// Define form schema using Zod for validation
const formSchema = z.object({
  allergies: z.string().optional(),
  followUp: z.enum(["Yes", "No"]).optional(),
  lastAppointmentDate: z
    .date()
    .max(new Date(), { message: "Last appointment cannot be in the future" }),
  preferredDoctor: z.string().optional(),
  reasonForPreference: z.string().optional(),
});

const UserAppointment = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastAppointmentDate: "",
      followUp: "",
      preferredDoctor: "",
      reasonForPreference: "",
      allergies: "",
    },
  });

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
    <div className="appointment-container">
      <div className="appointment-container__content">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="h-[100%] flex flex-col justify-between">
            <div className="appointment-container__body">
              {/* Allergies */}
              <FormField
                control={form.control}
                name="allergies"
                render={({ field }) => (
                  <FormItem className="form-item">
                    <FormLabel>Allergies</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Allergies ( if any )"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Follow-up Radio */}
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
                            onChange={(e) => field.onChange(e.value)}
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
                            onChange={(e) => field.onChange(e.value)}
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
              {/* Last Appointment Date */}
              <FormField
                control={form.control}
                name="lastAppointmentDate"
                render={({ field }) => (
                  <FormItem className="form-item">
                    <FormLabel>Last appointment date?</FormLabel>
                    <FormControl>
                      <Input type="date" id="aDate" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Preferred Doctor */}
              <FormField
                control={form.control}
                name="preferredDoctor"
                render={({ field }) => (
                  <FormItem className="form-item">
                    <FormLabel>Preferred doctor (if any)</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger id="doctor" className="mb-5">
                          <SelectValue placeholder="Select a doctor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="saluke">Mr. Saluke</SelectItem>
                            <SelectItem value="tarika">Ms. Tarika</SelectItem>
                            <SelectItem value="virender">
                              Mr.Virender
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Reason for Preference */}
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Form Buttons */}
            <div className="appointment-container__footer">
              <Button
                type="button"
                onClick={handleCancel}
                variant="secondary"
                className="back-btn"
              >
                Back
              </Button>
              <Button type="submit" className="save-btn">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UserAppointment;
