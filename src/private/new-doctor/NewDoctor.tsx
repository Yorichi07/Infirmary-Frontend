import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import axios from "axios";
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
    doctorEmail: z.string().email("Invalid email address"),
    status: z.boolean(),
    gender: z
      .enum(["Male", "Female", "Other"])
      .refine((value) => value !== undefined, {
        message: "Please select a gender",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

const NewDoctor = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
      password: undefined,
      confirmPassword: undefined,
      doctorEmail: undefined,
      gender: undefined,
      status: false,
    },
  });

  const { isValid } = form.formState;

  const onSubmit = async (data: any) => {
    if (isValid) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/admin-portal");
          return;
        }
        const payload = { ...data, status: false };
        await axios.post(
          "http://192.168.147.176:8081/api/admin/doctor/signup",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Registration successful");
        navigate("/admin-dashboard");
      } catch (error: any) {
        console.error("Error submitting form: ", error);
        alert(error?.response?.data?.message || "Registration failed");
      }
    }
  };

  const handleCancel = () => {
    navigate("/admin-dashboard");
  };
  return (
    <>
      <div className="h-[83svh] p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="h-full flex justify-between flex-col gap-8"
          >
            <div>
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
                name="doctorEmail"
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
                        <SelectGroup className="h-[6rem] overflow-y-scroll">
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
            </div>
            <div className="flex justify-end items-center gap-4">
              <Button
                type="button"
                onClick={handleCancel}
                variant="secondary"
                className="text-red-500 bg-white border border-red-500 w-[6rem]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 w-[6rem] text-white"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default NewDoctor;