import LoginScreen from "./LoginScreen";
import SelectTasksScreen from "./SelectTasksScreen";
import MainScreen from "./MainScreen";
import useStore from "./store";
import { useEffect } from "react";
import {
  isPermissionGranted,
  requestPermission,
} from "@tauri-apps/api/notification";

function App() {
  const [screen, setNotificationPermissionGranted] = useStore((state) => [
    state.screen,
    state.setNotificationPermissionGranted,
  ]);

  useEffect(() => {
    const askPermissions = async () => {
      let permissionGranted = await isPermissionGranted();
      if (!permissionGranted) {
        const permission = await requestPermission();
        permissionGranted = permission === "granted";
        setNotificationPermissionGranted(permissionGranted);
      } else {
        setNotificationPermissionGranted(permissionGranted);
      }
    };
    askPermissions();
  }, [setNotificationPermissionGranted]);

  if (screen === "SelectTasksScreen") {
    return <SelectTasksScreen />;
  }

  if (screen === "MainScreen") {
    return <MainScreen />;
  }

  return <LoginScreen />;
}

export default App;
