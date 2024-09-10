import AssistantDoctorDashboard from "@/private/assistant-dashboard/doctor-dashboard/AssistantDoctorDashboard";
import AssistantDoctorDashboardLayout from "@/private/assistant-dashboard/doctor-dashboard/AssistantDoctorDashboardLayout";
import DoctorCheckIn from "@/private/doctor-check-in-out/DoctorCheckIn";
import DoctorCheckInLayout from "@/private/doctor-check-in-out/DoctorCheckInLayout";
import DoctorDashboard from "@/private/doctor-dashboard/DoctorDashboard";
import DoctorDashboardLayout from "@/private/doctor-dashboard/DoctorDashboardLayout";
import UserAppointment from "@/private/user-appointment/UserAppointment";
import SignIn from "@/public/SignIn";
import MedicineStock from "@/private/medicine-stock/MedicineStock";
import MedicineStockLayout from "@/private/medicine-stock/MedicineStockLayout";
import PatientList from "@/private/patient-list/PatientList";
import PatientListLayout from "@/private/patient-list/PatientListLayout";
import Reports from "@/private/reports/Reports";
import ReportsLayout from "@/private/reports/ReportsLayout";
import { createBrowserRouter } from "react-router-dom";
import UserProfileLayout from "@/private/user-profile/UserProfileLayout";
import UserProfile from "@/private/user-profile/UserProfile";
import UserAppointmentLayout from "@/private/user-appointment/UserAppointmentLayout";
import UserDasboardLayout from "@/private/user-dashboard/UserDasboardLayout";
import UserDashboard from "@/private/user-dashboard/UserDashboard";
import UserPrescription from "@/private/user-prescription/UserPrescription";
import UserPrescriptionLayout from "@/private/user-prescription/UserPrescriptionLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn role="user" />,
  },
  {
    path: "/doctor",
    element: <SignIn role="doctor" />,
  },
  {
    path: "/assistant-doctor",
    element: <SignIn role="assistant doctor" />,
  },

  // {
  //   path: "/register",
  //   element: <UserRegister />,
  // },
  {
    path: "/user-profile",
    element: (
      <UserProfileLayout>
        <UserProfile />
      </UserProfileLayout>
    ),
  },
  {
    path: "/user-appointment",
    element: (
      <UserAppointmentLayout>
        <UserAppointment />
      </UserAppointmentLayout>
    ),
  },
  {
    path: "/user-dashboard",
    element: (
      <UserDasboardLayout>
        <UserDashboard />
      </UserDasboardLayout>
    ),
  },
  {
    path: "/user-prescription",
    element: (
      <UserPrescriptionLayout>
        <UserPrescription />
      </UserPrescriptionLayout>
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
    path: "/assistant-dashboard",
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
