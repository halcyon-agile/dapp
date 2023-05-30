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
    path: "/",
    element: <MainScreen />,
    children: [
      {
        path: "take-a-break",
        element: <TakeABreak />
      }
    ]
  },
  {
    path: "login",
    element: <LoginScreen />,
  },
]);

export default router;