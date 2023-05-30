import {
  createBrowserRouter, redirect,
} from "react-router-dom";

import {
  LoginScreen,
  MainScreen,
  TakeABreak,
} from "../screens"

const router = createBrowserRouter([
  {
    path: "login",
    element: <LoginScreen />
  },
  {
    path: "/",
    element: <MainScreen />,
    loader: () => {
      const user = localStorage.getItem("token")

      if (user === null) {
        throw redirect("login")
      }
      throw redirect("/")
    },
    children: [
      {
        path: "take-a-break",
        element: <TakeABreak />
      }
    ]
  },
]);

export default router;