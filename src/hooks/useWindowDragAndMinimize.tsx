import { useState, useEffect } from "react";
import { appWindow, LogicalSize } from "@tauri-apps/api/window";
import { platform } from "@tauri-apps/api/os";

function useWindowDragAndMinimize() {
  const [platformName, setPlatformName] = useState("");
  const [minimal, setMinimal] = useState(false);

  const toggleMinimize = async () => {
    if (platformName !== "darwin") return;

    if (minimal) {
      appWindow.setDecorations(true);
      appWindow.setSize(new LogicalSize(650, 500)).then(async () => {
        setMinimal(false);
        await appWindow.center();
        await appWindow.setAlwaysOnTop(false);
      });
    } else {
      const newWidth = 200;
      appWindow.setDecorations(false);
      appWindow.setSize(new LogicalSize(newWidth, 90)).then(async () => {
        setMinimal(true);

        await appWindow.setAlwaysOnTop(true);
      });
    }
  };

  useEffect(() => {
    if (minimal) {
      const startDrag = async () => {
        await appWindow.startDragging();
      };
      window.addEventListener("mousedown", startDrag);

      return () => {
        window.removeEventListener("mousedown", startDrag);
      };
    }
  }, [minimal]);

  useEffect(() => {
    platform().then((name: string) => {
      setPlatformName(name);
    });
  }, []);

  return { minimal, toggleMinimize, platformName };
}

export default useWindowDragAndMinimize;
