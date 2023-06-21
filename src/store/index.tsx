import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TaskTime, BreakForm, Consultations } from "@/types";

type State = {
  screen: string;
  user?: any;
  activeTasks: TaskTime[];
  notificationPermissionGranted: boolean;
  selectedTask: any;
  consultations: Consultations[];
  stoppedTasks: TaskTime[];
  breakForm: BreakForm;
};

type Action = {
  setUser: (user: State["user"]) => void;
  setScreen: (firstName: State["screen"]) => void;
  setActiveTasks: (firstName: any) => void;
  setNotificationPermissionGranted: (
    notificationPermissionGranted: State["notificationPermissionGranted"]
  ) => void;
  setSelectedTask: (task: any) => void;
  setConsultations: (list: any) => void;
  setStoppedTasks: (task: any) => void;
  setBreakForm: (breakForm: any) => void;
};

const useStore = create(
  persist<State & Action>(
    (set) => ({
      user: undefined,
      setUser: (user) => set(() => ({ user })),
      screen: "",
      setScreen: (screen) => set(() => ({ screen })),
      activeTasks: [],
      setActiveTasks: (activeTasks: any) => set(() => ({ activeTasks })),
      notificationPermissionGranted: false,
      setNotificationPermissionGranted: (permissionGranted: boolean) =>
        set({ notificationPermissionGranted: permissionGranted }),
      selectedTask: null,
      setSelectedTask: (task: any) => set(() => ({ selectedTask: task })),
      consultations: [],
      setConsultations: (consultations: any) => set(() => ({ consultations })),
      stoppedTasks: [],
      setStoppedTasks: (task: any) => set(() => ({ stoppedTasks: task })),
      breakForm: {
        reason: "",
        hours: 0,
        minutes: 15,
      },
      setBreakForm: (breakForm: BreakForm) =>
        set(() => ({ breakForm: breakForm })),
    }),
    {
      name: "store",
    }
  )
);

export default useStore;
