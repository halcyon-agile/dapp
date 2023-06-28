import { createBrowserRouter } from "react-router-dom";

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
  CreateConsultation,
  CreateTask,
} from "../screens";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MultipleProjects />,
  },
  {
    path: "login",
    element: <LoginScreen />,
  },
  {
    path: "take-a-break",
    element: <TakeABreak />,
  },
  {
    path: "select-project",
    element: <SelectAProject />,
  },
  {
    path: "attribute-hour",
    element: <AttributeHour />,
  },
  {
    path: "break-reason",
    element: <BreakReason />,
  },
  {
    path: "break-timer",
    element: <BreakTimer />,
  },
  {
    path: "consultations",
    element: <Consultations />,
  },
  {
    path: "scrum",
    element: <Scrum />,
  },
  {
    path: "create-consultation",
    element: <CreateConsultation />,
  },
  {
    path: "create-task",
    element: <CreateTask />,
  }
]);

export default router;
