import {
  createBrowserRouter, redirect,
} from "react-router-dom";

import {
  LoginScreen,
  MainScreen,
  SelectAProject,
  TakeABreak,
  MultipleProjects,
} from "../screens"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainScreen />,
  },
  {
    path: "take-a-break",
    element: <TakeABreak />
  },
  {
    path: "select-a-project",
    element: <SelectAProject />
  },
  {
    path: "login",
    element: <LoginScreen />,
  },
  {
    path: "multiple-projects",
    element: <MultipleProjects />,
  }
]);

export default router;