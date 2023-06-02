import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TaskTime } from "./api/getActiveTasks";

type State = {
  screen: string;
  user?: any;
  activeTasks: TaskTime[];
  notificationPermissionGranted: boolean;
  selectedTask: any;
};

type Action = {
  setUser: (user: State["user"]) => void;
  setScreen: (firstName: State["screen"]) => void;
  setActiveTasks: (firstName: any) => void;
  setNotificationPermissionGranted: (
    notificationPermissionGranted: State["notificationPermissionGranted"]
  ) => void;
  setSelectedTask: (task: any) => void;
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
      setSelectedTask: (task: any) => set(() => ({ selectedTask: task }))
    }),
    {
      name: "store",
    }
  )
);

export default useStore;
