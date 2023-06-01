import {
  createBrowserRouter, redirect,
} from "react-router-dom";

import {
  LoginScreen,
  MainScreen,
  SelectAProject,
  TakeABreak,
  MultipleProjects,
  AttributeHour,
  BreakReason,
  BreakTimer,
} from "../screens"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainScreen />,
  },
  {
    path: "login",
    element: <LoginScreen />,
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
    path: "multiple-projects",
    element: <MultipleProjects />,
  },
  {
    path: "attribute-hour",
    element: <AttributeHour />,
  },
  {
    path: "break-reason",
    element: <BreakReason />
  },
  {
    path: "break-timer",
    element: <BreakTimer />
  }
]);

export default router;