import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task } from "./api/getTasks";
import { TaskTime } from "./api/getActiveTasks";

type State = {
  screen: string;
  user?: any;
  activeTasks: TaskTime[];
  notificationPermissionGranted: boolean;
};

type Action = {
  setUser: (user: State["user"]) => void;
  setScreen: (firstName: State["screen"]) => void;
  setActiveTasks: (firstName: State["activeTasks"]) => void;
  setNotificationPermissionGranted: (
    notificationPermissionGranted: State["notificationPermissionGranted"]
  ) => void;
};

const useStore = create(
  persist<State & Action>(
    (set) => ({
      user: undefined,
      setUser: (user) => set(() => ({ user })),
      screen: "",
      setScreen: (screen) => set(() => ({ screen })),
      activeTasks: [],
      setActiveTasks: (activeTasks: Task[]) => set(() => ({ activeTasks })),
      notificationPermissionGranted: false,
      setNotificationPermissionGranted: (permissionGranted: boolean) =>
        set({ notificationPermissionGranted: permissionGranted }),
    }),
    {
      name: "store",
    }
  )
);

export default useStore;
