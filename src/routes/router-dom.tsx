import UserAppointment from "@/private/UserAppointment";
import UserProfile from "@/private/UserProfile";
import UserRegister from "@/public/UserRegister";
import UserSignIn from "@/public/UserSignIn";
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
]);

export default router;
