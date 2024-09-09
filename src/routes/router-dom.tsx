import AssistantDoctorDashboard from "@/private/assistant-dashboard/doctor-dashboard/AssistantDoctorDashboard";
import AssistantDoctorDashboardLayout from "@/private/assistant-dashboard/doctor-dashboard/AssistantDoctorDashboardLayout";
import DoctorCheckIn from "@/private/doctor-check-in-out/DoctorCheckIn";
import DoctorCheckInLayout from "@/private/doctor-check-in-out/DoctorCheckInLayout";
import DoctorDashboard from "@/private/doctor-dashboard/DoctorDashboard";
import DoctorDashboardLayout from "@/private/doctor-dashboard/DoctorDashboardLayout";
import MedicineStock from "@/private/medicine-stock/MedicineStock";
import MedicineStockLayout from "@/private/medicine-stock/MedicineStockLayout";
import PatientList from "@/private/patient-list/PatientList";
import PatientListLayout from "@/private/patient-list/PatientListLayout";
import Reports from "@/private/reports/Reports";
import ReportsLayout from "@/private/reports/ReportsLayout";
import StudentDasboardLayout from "@/private/student-dashboard/StudentDasboardLayout";
import StudentDashboard from "@/private/student-dashboard/StudentDashboard";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <></>,
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
  {
    path: "/medicine-stock",
    element: (
      <MedicineStockLayout>
        <MedicineStock />
      </MedicineStockLayout>
    ),
  },
  {
    path: "/patient-list",
    element: (
      <PatientListLayout>
        <PatientList />
      </PatientListLayout>
    ),
  },
  {
    path: "/reports",
    element: (
      <ReportsLayout>
        <Reports />
      </ReportsLayout>
    ),
  },
]);

export default router;
