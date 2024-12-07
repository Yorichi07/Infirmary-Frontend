import DoctorCheckIn from "@/private/doctor-check-in-out/DoctorCheckIn";
import DoctorCheckInLayout from "@/private/doctor-check-in-out/DoctorCheckInLayout";
import DoctorDashboard from "@/private/doctor-dashboard/DoctorDashboard";
import DoctorDashboardLayout from "@/private/doctor-dashboard/DoctorDashboardLayout";
import UserAppointment from "@/private/user-appointment/UserAppointment";
import SignIn from "@/public/SignIn";
import MedicineStock from "@/private/medicine-stock/MedicineStock";
import MedicineStockLayout from "@/private/medicine-stock/MedicineStockLayout";
import { createBrowserRouter } from "react-router-dom";
import UserProfileLayout from "@/private/user-profile/UserProfileLayout";
import UserProfile from "@/private/user-profile/UserProfile";
import UserAppointmentLayout from "@/private/user-appointment/UserAppointmentLayout";
import UserDasboardLayout from "@/private/user-dashboard/UserDasboardLayout";
import UserDashboard from "@/private/user-dashboard/UserDashboard";
import UserPrescription from "@/private/user-prescription/UserPrescription";
import UserPrescriptionLayout from "@/private/user-prescription/UserPrescriptionLayout";
import AssistantDoctorDashboardLayout from "@/private/assistant-dashboard/AssistantDoctorDashboardLayout";
import AssistantDoctorDashboard from "@/private/assistant-dashboard/AssistantDoctorDashboard";
import PatientList from "@/private/patient-list/PatientList";
import PatientListLayout from "@/private/patient-list/PatientListLayout";
import UserRegister from "@/public/UserRegister";
import EmergencyLayout from "@/private/emergency/EmergencyLayout";
import Emergency from "@/private/emergency/Emergency";
import Ambulance from "@/private/ambulance/Ambulance";
import AmbulanceLayout from "@/private/ambulance/AmbulanceLayout";
import PatientDetailsLayout from "@/private/patient-details/PatientDetailsLayout";
import PatientDetails from "@/private/patient-details/PatientDetails";
import CommonPrescriptionLayout from "@/private/common-prescription/CommonPrescriptionLayout";
import CommonPrescription from "@/private/common-prescription/CommonPrescription";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <UserRegister></UserRegister>,
  },
  {
    path: "/patient-profile",
    element: (
      <UserProfileLayout>
        <UserProfile />
      </UserProfileLayout>
    ),
  },
  {
    path: "/patient-appointment",
    element: (
      <UserAppointmentLayout>
        <UserAppointment />
      </UserAppointmentLayout>
    ),
  },
  {
    path: "/patient-dashboard",
    element: (
      <UserDasboardLayout>
        <UserDashboard />
      </UserDasboardLayout>
    ),
  },
  {
    path: "/patient-prescription",
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
    path: "/ad-dashboard",
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
    path: "/patient-details",
    element: (
      <PatientDetailsLayout>
        <PatientDetails />
      </PatientDetailsLayout>
    ),
  },

  {
    path: "/emergency",
    element: (
      <EmergencyLayout>
        <Emergency />
      </EmergencyLayout>
    ),
  },

  {
    path: "/ambulance",
    element: (
      <AmbulanceLayout>
        <Ambulance />
      </AmbulanceLayout>
    ),
  },
  {
    path: "/prescription",
    element: (
      <CommonPrescriptionLayout>
        <CommonPrescription />
      </CommonPrescriptionLayout>
    ),
  },
]);

export default router;
