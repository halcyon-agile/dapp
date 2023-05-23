import { create } from "zustand";
import { Task } from "./api/getTasks";

type State = {
  screen: string;
  user?: any;
  activeTasks: Task[];
};

type Action = {
  setUser: (user: State["user"]) => void;
  setScreen: (firstName: State["screen"]) => void;
  setActiveTasks: (firstName: State["activeTasks"]) => void;
};

const useStore = create<State & Action>((set) => ({
  user: undefined,
  setUser: (user) => set(() => ({ user })),
  screen: "",
  setScreen: (screen) => set(() => ({ screen })),
  activeTasks: [],
  setActiveTasks: (activeTasks: Task[]) => set(() => ({ activeTasks })),
}));

export default useStore;
