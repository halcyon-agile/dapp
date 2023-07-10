import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import useStore from "./store";
import router from "./lib/router";
import { Toaster } from "./components/ui/toaster";
import { checkUpdate, installUpdate } from "@tauri-apps/api/updater";
import { relaunch } from "@tauri-apps/api/process";
import useUser from "./data/use-user";
import { cn } from "./lib/utils";

function App() {
  const [setUser] = useStore((state) => [state.setUser]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { status, data, error } = useUser();

  const handleUpdate = async () => {
    setIsUpdating(true);
    await installUpdate();
    await relaunch();
  };

  useEffect(() => {
    if (status === "error") {
      setUser(null);
      router.navigate("/login");
    }

    if (status === "success") {
      setUser(data);
    }
  }, [error, status, data, setUser]);

  useEffect(() => {
    async function check() {
      const update: any = await checkUpdate();
      if (update.shouldUpdate) {
        setShowUpdate(true);
      }
    }

    check();
  }, []);

  return (
    <>
      <div
        className={cn(
          "fixed right-2 top-1 z-50 grid gap-4 border bg-background px-3 py-1 shadow-lg rounded-lg text-xs",
          !showUpdate && "hidden"
        )}
      >
        <div>
          A new update is available. Click{" "}
          <button
            className="underline text-blue-500 inline-block"
            onClick={() => handleUpdate()}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "here"}
          </button>{" "}
          to install
        </div>
      </div>

      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
