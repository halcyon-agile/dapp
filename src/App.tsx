import { useEffect } from "react";
import {
  isPermissionGranted,
  requestPermission,
} from "@tauri-apps/api/notification";
import {
  RouterProvider, redirect,
} from "react-router-dom"

import useStore from "./store";
import router from "./lib/router";

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

  return (
    <RouterProvider router={router} />
  )
}

export default App;
