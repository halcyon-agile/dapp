import { useEffect, useState } from "react";
import useStore from "./store";
import getTasks, { Task } from "./api/getTasks";
import startTaskApi from "./api/startTask";
import { AxiosError } from "axios";

function SelectTasksScreen() {
  const [user, setScreen, activeTasks, setActiveTasks] = useStore((state) => [
    state.user,
    state.setScreen,
    state.activeTasks,
    state.setActiveTasks,
  ]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskIndex, setCurrentTaskIndex] = useState<number | null>(
    null
  );
  const selectedTask =
    selectedTaskIndex !== null ? tasks[selectedTaskIndex] : null;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks: Task[] = await getTasks();
        setTasks(
          fetchedTasks.filter(
            (task) =>
              !activeTasks.find((activeTask) => activeTask.task.id === task.id)
          )
        );
      } catch (error: AxiosError | any) {
        console.error(error?.response?.data?.message || "Something went wrong");
      }
    };

    fetchTasks();
  }, []);

  const startTask = () => {
    if (!selectedTask) return;

    startTaskApi(selectedTask.id)
      .then((taskTime) => {
        setActiveTasks([...activeTasks, taskTime]);
        setScreen("MainScreen");
      })
      .catch((error: { response: { data: { message: any } } }) => {
        console.error(error?.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between text-black p-5 font-inter">
      <div className="items-center text-sm flex flex-row w-full border-b py-4">
        <p className="left-0 top-0 w-full text-4xl flex-1 font-bold">Tasks</p>
      </div>
      <div className="flex flex-col flex-1 bg-white w-full h-full text-black mt-5">
        {tasks.map((data, index) => (
          <button
            className="border-b p-4 mb-2"
            key={index}
            onClick={() => setCurrentTaskIndex(index)}
          >
            <p
              className={`left-0 top-0 w-full text-1xl flex-1 text-left font-normal text-base ${
                selectedTaskIndex === index ? "text-sky-400" : "text-gray-500"
              }`}
            >
              {data.project.name} - {data.name}
            </p>
          </button>
        ))}
        <div className="w-full items-center justify-center flex py-6">
          <button
            className="bg-white py-2 border border-sky-400 rounded flex-none text-sky-400 font-medium text-base w-3/12"
            onClick={() =>
              user.has_active_task_time
                ? setScreen("MainScreen")
                : setScreen("LoginScreen")
            }
          >
            Cancel
          </button>
          <div className="w-5" />
          <button
            className="bg-sky-400 py-2 rounded flex-none text-white font-medium text-base w-3/12 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => startTask()}
            disabled={selectedTaskIndex === null}
          >
            Okay
          </button>
        </div>
      </div>
    </main>
  );
}

export default SelectTasksScreen;
