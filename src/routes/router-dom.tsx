import AssistantDoctorDashboard from "@/private/assistant-dashboard/doctor-dashboard/AssistantDoctorDashboard";
import AssistantDoctorDashboardLayout from "@/private/assistant-dashboard/doctor-dashboard/AssistantDoctorDashboardLayout";
import DoctorCheckIn from "@/private/doctor-check-in-out/DoctorCheckIn";
import DoctorCheckInLayout from "@/private/doctor-check-in-out/DoctorCheckInLayout";
import DoctorDashboard from "@/private/doctor-dashboard/DoctorDashboard";
import DoctorDashboardLayout from "@/private/doctor-dashboard/DoctorDashboardLayout";
import UserAppointment from "@/private/UserAppointment";
import UserProfile from "@/private/UserProfile";
import UserRegister from "@/public/UserRegister";
import UserSignIn from "@/public/UserSignIn";
import StudentDasboardLayout from "@/private/student-dashboard/StudentDasboardLayout";
import StudentDashboard from "@/private/student-dashboard/StudentDashboard";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserSignIn />,
  },
  {
    path: "/register",
    element: <UserRegister />,
  },
  {
    path: "/profile",
    element: <UserProfile />,
  },
  {
    path: "/appointment",
    element: <UserAppointment />,
  },
  {
    path: "/student-dashboard",
    element: (
      <StudentDasboardLayout>
        <StudentDashboard />
      </StudentDasboardLayout>
    ),
  },
  {
    path: "/doctor-dashboard",
    element: (
      <DoctorDashboardLayout>
        <DoctorDashboard />
      </DoctorDashboardLayout>
    ),
  },
  {
    path: "/assistant-doctor-dashboard",
    element: (
      <AssistantDoctorDashboardLayout>
        <AssistantDoctorDashboard />
      </AssistantDoctorDashboardLayout>
    ),
  },
  {
    path: "/doctor-check-in-out",
    element: (
      <DoctorCheckInLayout>
        <DoctorCheckIn />
      </DoctorCheckInLayout>
    ),
  },
]);

export default router;
