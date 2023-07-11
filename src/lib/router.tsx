import { createBrowserRouter } from "react-router-dom";

import {
  LoginScreen,
  SelectTask,
  TakeABreak,
  MultipleProjects,
  AttributeHour,
  BreakReason,
  BreakTimer,
  Consultations,
  Scrum,
  CreateConsultation,
  CreateTask,
  EditConsultation,
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
    element: <SelectTask />,
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
  },
  {
    path: "edit-consultation",
    element: <EditConsultation />,
  },
]);

export default router;
