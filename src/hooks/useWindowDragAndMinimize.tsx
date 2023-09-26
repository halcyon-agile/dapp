import { useState, useEffect } from "react";
import {
  appWindow,
  PhysicalPosition,
  LogicalSize,
  currentMonitor,
} from "@tauri-apps/api/window";

function useWindowDragAndMinimize() {
  const [minimal, setMinimal] = useState(false);

  const toggleMinimize = async () => {
    const monitor = await currentMonitor();
    await appWindow.innerSize();

    if (minimal) {
      appWindow.setDecorations(true);
      appWindow.setSize(new LogicalSize(650, 500)).then(() => {
        setMinimal(!minimal);
        appWindow.center();
      });
    } else {
      const newWidth = 200;
      appWindow.setDecorations(false);
      appWindow.setSize(new LogicalSize(newWidth, 70)).then(async () => {
        setMinimal(true);
        appWindow.setPosition(
          new PhysicalPosition(
            monitor ? monitor.size.width - newWidth * 2 : 0,
            0
          )
        );
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

  return { minimal, toggleMinimize };
}

export default useWindowDragAndMinimize;
