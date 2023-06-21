import { useEffect } from "react";
import {
  isPermissionGranted,
  requestPermission,
} from "@tauri-apps/api/notification";
import { RouterProvider } from "react-router-dom";

import useStore from "./store";
import router from "./lib/router";
import { Toaster } from "./components/ui/toaster";

function App() {
  const [setNotificationPermissionGranted] = useStore((state) => [
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

  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      router.navigate("/login");
      console.log(router);
    }
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
