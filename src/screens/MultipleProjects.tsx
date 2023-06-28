import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { DateTime } from "luxon";
import moment from "moment";
import { Terminal } from "lucide-react";

import useStore from "../store";
import getActiveTasks from "../api/getActiveTasks";
import getAttendance from "../api/getAttendance";
import getRedDots from "../api/getRedDots";
import finishWork from "../api/finishWork";
import { AddRemarksDialog, Graph, Timer } from "../components/custom";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui";
import leaveConsultation from "../api/consultations/leave-consultation";
import portalUrl from "../lib/portalUrl";
import { TaskTime } from "@/types";

function formatHourDifference(startedAt: string) {
  const currentDate = DateTime.now();
  const startedDate = DateTime.fromISO(startedAt);
  const timeDifference = currentDate.diff(startedDate);

  const hours = Math.floor(timeDifference.as("hours"));
  const minutes = Math.floor(timeDifference.as("minutes") % 60);

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  if (isNaN(Number(formattedHours)) || Number(formattedHours) < 0) {
    return "00:00";
  }

  if (isNaN(Number(formattedMinutes)) || Number(formattedMinutes) < 0) {
    return "00:00";
  }
  return `${formattedHours}:${formattedMinutes}`;
  // return moment(startedAt).toNow(true)
}

function isGraphVisible(data: any) {
  if (
    data?.task?.project?.project_type?.show_remaining_hours !== 0 ||
    Number(data?.task?.assignees[0]?.initial_estimate) !== 0 ||
    Number(data?.task?.assignees[0]?.estimate) !== 0 ||
    data?.total_minutes_spent !== 0
  ) {
    return true;
  }

  if (data?.consultation_id === null) return true;

  return false;
}

function MultipleProjects() {
  const navigate = useNavigate();
  const [user, activeTasks, setActiveTasks, setUser, setSelectedTask] =
    useStore((state) => [
      state.user,
      state.activeTasks,
      state.setActiveTasks,
      state.setUser,
      state.setSelectedTask,
    ]);
  const hasActiveTask = activeTasks.some(
    (t: TaskTime) => t.task.timer_on === 0
  );

  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [loggedOff, loggingOff] = useState<boolean>(false);
  // const [leavingConsultation, leaveConsult] = useState<boolean>(false);
  const [reddot, setRedDots] = useState<any>({
    scrums: false,
    consultations: false,
  });

  // Refactor later to only fetch once logged in
  useEffect(() => {
    const userData = localStorage.getItem("token");
    if (!userData) {
      navigate("/login", {
        replace: true,
      });
    }
    getActiveTasks().then((tasks) => {
      setActiveTasks(tasks);
    });

    getAttendance().then((data) => {
      setUser({ ...user, attendance: data });
    });

    getRedDots().then((result) => {
      setRedDots(result);
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

  const logoff = () => {
    loggingOff(true);
    finishWork()
      .then(() => {
        loggingOff(false);
        setUser(undefined);
        setActiveTasks([]);
        localStorage.clear();
        navigate("/login", {
          replace: true,
        });
      })
      .catch((error) => {
        loggingOff(false);
        // console.error(error?.response?.data?.message || "Something went wrong");
      });
  };

  console.log("active", activeTasks);

  return (
    <main className="flex min-h-screen flex-col items-center text-black p-5">
      <div className="items-center justify-center text-sm flex flex-col w-full gap-2">
        <div className="w-full border rounded-sm">
          <div className="left-0 top-0 w-full items-center justify-between text-4xl flex-1 flex flex-row align-center py-2 px-4">
            <p className="font-semibold text-xl">Working Hour</p>
            <div className="pr-4" />
            <p className="font-semibold text-xl">
              {formatHourDifference(user?.attendance?.started_at)}
            </p>
          </div>
        </div>
        {activeTasks?.length > 0 ? (
          activeTasks.map((data: any) => (
            <div className="w-full border rounded-sm" key={data?.id}>
              <div className="px-4 w-full text-4xl flex-1 flex flex-col align-center py-4">
                <div className="flex flex-row justify-between">
                  <p className="font-medium text-xs text-slate-500">
                    {data?.consultation_id === null
                      ? data?.task?.project?.project_type?.name
                      : "Consultation"}
                  </p>
                  {data?.task?.project?.project_type?.can_add_remarks === 1 && (
                    <AddRemarksDialog
                      id={data?.task_id}
                      onSuccess={() => {
                        getActiveTasks().then((tasks) => {
                          setActiveTasks(tasks);
                        });
                      }}
                      remark={data?.remark ? data.remark : ""}
                    />
                  )}
                </div>
                <div className="flex flex-row align-center justify-between">
                  <p className="font-medium text-base text-gray-700">
                    {data?.task?.project?.name} - {data?.task?.name}
                  </p>
                  <Timer started_at={data?.started_at} />
                </div>
                <div className="flex flex-row items-center justify-between py-4 border-b border-slate-200">
                  <div className="flex flex-1">
                    {data?.ended_at === null ? (
                      <div className="rounded-full px-4 py-1 bg-green-500 w-[79px] max-w-[100px] mt-3.5 h-[24px]">
                        <p className="font-medium text-xs text-white text-center">
                          Running
                        </p>
                      </div>
                    ) : (
                      <div className="rounded-full px-4 py-1 bg-red-600 w-[79px] max-w-[100px] mt-3.5 h-[24px]">
                        <p className="font-medium text-xs text-white text-center">
                          Stopped
                        </p>
                      </div>
                    )}
                  </div>
                  {data?.consultation_id === null ? (
                    <div className="flex-9 flex-row items-center justify-end">
                      {/* <Button
                      variant="outline"
                      className="font-medium text-xs ml-4"
                      onClick={() => {
                        setSelectedTask(data)
                        navigate("/attribute-hour")
                      }}
                    >
                      Return
                    </Button> */}
                      <Button
                        variant="outline"
                        className={`font-medium text-xs ml-4 ${
                          data?.task?.timer_on ? "hidden" : ""
                        }`}
                        onClick={() => {
                          setSelectedTask(data);
                          navigate("/attribute-hour");
                        }}
                      >
                        Stop
                      </Button>
                      {data?.task?.project?.allow_consultation === 1 && (
                        <Button
                          variant="outline"
                          className={`font-medium text-xs ml-4 ${
                            data?.task?.project?.consultation_members?.find(
                              (member: any) => member.id === user.id
                            )
                              ? ""
                              : "hidden"
                          }`}
                          onClick={() => {
                            navigate("/create-consultation", {
                              state: {
                                id: data?.task_id,
                              },
                            });
                          }}
                        >
                          Consult
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="flex-9 flex-row items-center justify-end">
                      <Button
                        variant="outline"
                        className="font-medium text-xs ml-4"
                        onClick={() => {
                          leaveConsultation(data?.consultation_id).then(
                            (response) => {
                              console.log("leave", response);
                              getActiveTasks().then((tasks) => {
                                setActiveTasks(tasks);
                                // console.log({ activeTasks });
                              });
                            }
                          );
                        }}
                      >
                        Leave
                      </Button>
                    </div>
                  )}
                </div>

                <Graph
                  visible={isGraphVisible(data)}
                  remainingHours={
                    data?.task?.project?.project_type?.show_remaining_hours ===
                      1 && data?.total_remaining_hours
                  }
                  initialEstimateHours={Number(
                    data?.task?.assignees[0]?.initial_estimate || 0
                  )}
                  currentEstimateHours={data?.task?.assignees[0]?.estimate || 0}
                  totalRenderedHours={Number(
                    Number(data?.total_minutes_spent / 60).toFixed(2)
                  )}
                  started_at={data?.started_at}
                />
              </div>
            </div>
          ))
        ) : (
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You have no active tasks running right now.
              <br></br>Please add one.
            </AlertDescription>
          </Alert>
        )}
      </div>
      <div className="w-full flex-row justify-between py-5 flex border-b-2">
        <div className="flex flex-1 flex-row items-center gap-3">
          <button
            className="rounded-md border border-slate-200 py-2 px-4 disabled:bg-gray-100 disabled:cursor-not-allowed"
            onClick={() => navigate("/select-project")}
            disabled={hasActiveTask}
          >
            <p className="text-slate-900 text-xs text-center">Add Task</p>
          </button>
          <button
            className="rounded-md border border-slate-200 py-2 px-4"
            onClick={() => {
              navigate("/take-a-break");
            }}
          >
            <p className="text-slate-900 text-xs text-center">Take a Break</p>
          </button>
        </div>
        <div className="flex">
          <button
            className="rounded-md border border-slate-200 py-2 px-4"
            onClick={logoff}
            disabled={loggedOff}
          >
            {loggedOff ? (
              <ColorRing
                visible={loggedOff}
                height="24"
                width="24"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            ) : (
              <p className="text-slate-900 text-xs text-center">Finish Work</p>
            )}
          </button>
        </div>
      </div>
      <div className="w-full py-5 flex flex-row items-start">
        <div className="flex flex-1 flex-row items-center gap-5 flex-wrap">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex flex-col items-center">
                  <div className="rounded-full border border-slate-200 p-2 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#334155"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500">Message</p>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#dc2626"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                  />
                </svg>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex flex-col items-center">
                  <div className="rounded-full border border-slate-200 p-2 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#334155"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                      />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500">Tickets</p>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#dc2626"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                  />
                </svg>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <a
            className="flex flex-col items-center"
            target="_blank"
            href={`${portalUrl}/admin`}
            rel="noreferrer"
          >
            <div className="rounded-full border border-slate-200 p-2 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#334155"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
            </div>
            <p className="text-xs text-gray-500">Portal</p>
          </a>
          <button
            className="flex flex-col items-center relative"
            onClick={() => navigate("/consultations")}
          >
            <div
              className={`absolute rounded-full bg-red-500 top-0 right-1 w-2 h-2 ${
                reddot?.consultations ? "" : "hidden"
              }`}
            ></div>

            <div className="rounded-full border border-slate-200 p-2 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#334155"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-xs text-gray-500">Consult</p>
          </button>
          <button
            className="flex flex-col items-center relative"
            onClick={() => navigate("/scrum")}
          >
            <div
              className={`absolute rounded-full bg-red-500 top-0 right-1 w-2 h-2 ${
                reddot?.scrums ? "" : "hidden"
              }`}
            ></div>

            <div className="rounded-full border border-slate-200 p-2 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#334155"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </div>
            <p className="text-xs text-gray-500">Scrum</p>
          </button>
        </div>
        <div className="flex items-end justify-end ml-2">
          <div className="flex flex-col items-end">
            <p className="text-xs text-gray-500">Time In</p>
            <p className="font-semibold text-2xl text-slate-900">
              {moment(user?.attendance?.started_at).format("hh:mm A")}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MultipleProjects;
