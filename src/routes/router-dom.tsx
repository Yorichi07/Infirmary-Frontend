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
]);

export default router;
