import { useState, useEffect } from "react";
import useStore from "./store";
import getActiveTasks from "./api/getActiveTasks";
import stopTaskApi from "./api/stopTask";
import finishWorkApi from "./api/finishWork";
import getAttendance from "./api/getAttendance";

function formatHourDifference(startedAt: string) {
  const currentDate = new Date();
  const startedDate = new Date(startedAt);
  const timeDifference = (currentDate.getTime() -
    startedDate.getTime()) as number;

  const hours = Math.floor(timeDifference / 3600000); // 1 hour = 3600000 milliseconds
  const minutes = Math.floor((timeDifference % 3600000) / 60000); // 1 minute = 60000 milliseconds

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  if (isNaN(Number(formattedHours)) || Number(formattedHours) < 0) {
    return "00:00";
  }

  if (isNaN(Number(formattedMinutes)) || Number(formattedMinutes) < 0) {
    return "00:00";
  }

  return `${formattedHours}:${formattedMinutes}`;
}

function MainScreen() {
  const [user, activeTasks, setActiveTasks, setScreen, setUser] = useStore(
    (state) => [
      state.user,
      state.activeTasks,
      state.setActiveTasks,
      state.setScreen,
      state.setUser,
    ]
  );

  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Refactor later to only fetch once logged in
  useEffect(() => {
    getActiveTasks().then((tasks) => {
      setActiveTasks(tasks);
    });

    getAttendance().then((data) => {
      setUser({ ...user, attendance: data });
    });
  }, []);

  useEffect(() => {
    const currentDateTime = new Date();
    const nextMinuteStart = new Date(
      currentDateTime.getFullYear(),
      currentDateTime.getMonth(),
      currentDateTime.getDate(),
      currentDateTime.getHours(),
      currentDateTime.getMinutes() + 1,
      0, // Reset seconds to 0
      0 // Reset milliseconds to 0
    );
    const delay = nextMinuteStart.getTime() - currentDateTime.getTime();

    const timeoutId = setTimeout(() => {
      setCurrentTime(new Date());
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentTime]);

  const stopTask = (id: number) => {
    stopTaskApi(id)
      .then(() => {
        setActiveTasks(activeTasks.filter((task) => task.id !== id));
      })
      .catch((error) => {
        console.error(error?.response?.data?.message || "Something went wrong");
      });
  };

  const finishWork = () => {
    finishWorkApi()
      .then(() => {
        setUser(undefined);
        setScreen("LoginScreen");
      })
      .catch((error) => {
        console.error(error?.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center text-black p-5">
      <div className="items-center justify-center text-sm flex flex-row w-full py-10">
        <div className="left-0 top-0 w-full items-center justify-center text-4xl flex-1 flex flex-row">
          {user?.attendance?.started_at && (
            <p className="font-bold text-4xl">
              {formatHourDifference(user?.attendance?.started_at)}
            </p>
          )}

          <div className="pr-4" />
          <p className="text-base text-gray-500 font-normal">Working Hours</p>
        </div>
      </div>

      <div className="flex flex-col w-full gap-4">
        {activeTasks.map((data) => (
          <div className="flex w-full" key={data.id}>
            <div className="w-full p-3 border rounded">
              <div className="flex justify-between">
                <p className="font-bold text-base text-gray-900">
                  {data.project.name} - {data.name}
                </p>
                <button
                  className="text-red-500 font-bold hover:underline"
                  onClick={() => stopTask(data.id)}
                >
                  Stop Task
                </button>
              </div>
              <div className="w-full pt-3">
                <div className="flex flex-row w-full items-center py-1">
                  <p className="flex-1 pr-2 text-xs text-gray-500">12 Days</p>
                  <div className="flex-[9]">
                    <div className="h-2.5 rounded-full bg-black grow" />
                  </div>
                </div>
                <div className="flex flex-row w-full items-center py-1">
                  <p className="flex-1 pr-2 text-xs text-gray-500">8 Days</p>
                  <div className="flex-[9]">
                    <div className="h-2.5 w-[80%] rounded-full bg-sky-400" />
                  </div>
                </div>
                <div className="flex flex-row w-full items-center py-1">
                  <p className="flex-1 pr-2 text-xs text-gray-500">4 Days</p>
                  <div className="flex-[9]">
                    <div className="h-2.5 w-[40%] rounded-full bg-green-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex-row items-center justify-between py-5 flex border-b-2">
        <button
          className="h-6 rounded-full border border-sky-400 py-1 px-4"
          onClick={() => {
            setScreen("SelectTasksScreen");
          }}
        >
          <p className="text-sky-400 text-xs text-center">Add Project</p>
        </button>
        <button
          className="h-6 rounded-full border border-sky-400 py-1 px-4"
          onClick={() => {
            setScreen("SelectTasksScreen");
          }}
        >
          <p className="text-sky-400 text-xs text-center">Take a Break</p>
        </button>
        <button
          className="h-6 rounded-full border border-sky-400 py-1 px-4"
          onClick={finishWork}
        >
          <p className="text-sky-400 text-xs text-center">Finish Work</p>
        </button>
      </div>
      <div className="w-full py-5 flex flex-row">
        <div className="flex flex-1 flex-row items-center justify-between">
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#6B7280"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
            <p className="text-xs text-gray-500">Message</p>
          </div>
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#6B7280"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
              />
            </svg>
            <p className="text-xs text-gray-500">Tickets</p>
          </div>
          <a
            className="flex flex-col items-center"
            href="https://lively-geyser-q53l27l9w5bc.vapor-farm-e1.com/admin/tasks"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#6B7280"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
            <p className="text-xs text-gray-500">Portal</p>
          </a>
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#6B7280"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-xs text-gray-500">Consultation</p>
          </div>
        </div>
        {user?.attendance?.started_at && (
          <div className="flex flex-1 items-end justify-end">
            <div className="flex flex-col items-end">
              <p className="text-xs text-gray-500">Time In</p>
              <p className="font-bold text-base text-gray-900">
                {new Date(user.attendance.started_at).toLocaleTimeString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default MainScreen;
