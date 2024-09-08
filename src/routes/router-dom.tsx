import AssistantDoctorDashboard from "@/private/assistant-dashboard/doctor-dashboard/AssistantDoctorDashboard";
import AssistantDoctorDashboardLayout from "@/private/assistant-dashboard/doctor-dashboard/AssistantDoctorDashboardLayout";
import DoctorDashboard from "@/private/doctor-dashboard/DoctorDashboard";
import DoctorDashboardLayout from "@/private/doctor-dashboard/DoctorDashboardLayout";
import StudentDasboardLayout from "@/private/student-dashboard/StudentDasboardLayout";
import StudentDashboard from "@/private/student-dashboard/StudentDashboard";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <></>,
  },
  {
    path: "/student",
    element: <StudentDasboardLayout />,
    children: [
      {
        path: "dashboard",
        element: <StudentDashboard />,
      },
    ],
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
]);

export default router;
