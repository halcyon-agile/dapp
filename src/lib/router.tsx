import {
  createBrowserRouter, redirect,
} from "react-router-dom";

import {
  LoginScreen,
  SelectAProject,
  TakeABreak,
  MultipleProjects,
  AttributeHour,
  BreakReason,
  BreakTimer,
  Consultations,
  Scrum,
} from "../screens"

const router = createBrowserRouter([
  {
    path: "/",
    element: <SelectAProject />,
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
  },
  {
    path: "consultations",
    element: <Consultations />
  },
  {
    path: "scrum",
    element: <Scrum />
  }
]);

export default router;