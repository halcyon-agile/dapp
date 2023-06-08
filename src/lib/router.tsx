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
  CreateConsultation,
} from "../screens"
import { m } from "@tauri-apps/api/dialog-20ff401c";

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
  },
  {
    path: "create-consultation",
    element: <CreateConsultation />
  }
]);

export default router;