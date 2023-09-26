import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import useStore from "./store";
import router from "./lib/router";
import { Toaster } from "./components/ui/toaster";
import useUser from "./data/use-user";
import Updater from "./components/custom/Updater";
import useWindowDragAndMinimize from "./hooks/useWindowDragAndMinimize";

function App() {
  const [setUser] = useStore((state) => [state.setUser]);
  const { status, data, error } = useUser();
  const { minimal, toggleMinimize } = useWindowDragAndMinimize();

  useEffect(() => {
    if (status === "error") {
      setUser(null);
      router.navigate("/login");
    }

    if (status === "success") {
      setUser(data);
    }
  }, [error, status, data, setUser]);

  return (
    <>
      <Updater />
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
