import { useEffect, useState } from "react";
import {
  useNavigate,
} from "react-router-dom"
import { AxiosError } from "axios";
import { ColorRing } from "react-loader-spinner";

import { Button } from "../components/ui/button";
import getTasks, { Task } from "../api/getTasks";
import useStore from "../store";
import startTaskApi from "../api/startTask";

function SelectAProject() {
  const [activeTasks, setActiveTasks] = useStore((state) => [
    state.activeTasks,
    state.setActiveTasks,
  ]);
  const navigate = useNavigate();

  const [selectedProject, setCurrentProject] = useState<null | number>(null);
  const [fetching, fetch] = useState<boolean>(true)
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks: Task[] = await getTasks();
        console.log(fetchedTasks)
        setTasks(fetchedTasks);
        fetch(false)
      } catch (error: AxiosError | any) {
        console.error(error?.response?.data?.message || "Something went wrong");
        fetch(false)
      }
    };

    fetchTasks();
  }, []);

  const selectedTask =
    selectedProject !== null ? tasks[selectedProject] : null;

  const startTask = () => {
    if (!selectedTask) return;

    startTaskApi(selectedTask.id)
      .then((taskTime) => {
        setActiveTasks([...activeTasks, taskTime]);
        navigate("/multiple-projects")
      })
      .catch((error: { response: { data: { message: any } } }) => {
        console.error(error?.response?.data?.message || "Something went wrong");
      });
  };

  const finishWork = () => {
    // to be added back once the API is fixed
    // finishWorkApi()
    //   .then(() => {
    //     setUser(undefined);
    //     setActiveTasks([]);
    //     // setScreen("LoginScreen");
    //     localStorage.clear();
    //     navigate("/login", {
    //       replace: true,
    //     })
    //   })
    //   .catch((error) => {
    //     console.log("error", error)
    //     console.error(error?.response?.data?.message || "Something went wrong");
    //   });
    localStorage.clear();
    navigate("/login", {
      replace: true,
    })
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between text-black p-5 font-inter">
      <div className="items-center text-sm flex flex-row w-full border-b border-slate-200 py-4">
        <p className="left-0 top-0 w-full text-xl flex-1 font-semibold">
          Projects
        </p>
      </div>
      <div className="flex flex-col flex-1 bg-white w-full h-full text-black mt-5">
        <div className="w-full border-b py-2">
          {fetching && (
            <ColorRing
              visible={fetching}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          )}
          {tasks.map((data: any, index: number) => (
            <button
              className={`py-1.5 px-2 w-full rounded-md flex flex-row align-center justify-between ${selectedProject === index && "bg-slate-100"}`}
              key={1}
              onClick={() => setCurrentProject(index)}
            >
              <p className={`left-0 top-0 w-full text-1xl flex-1 text-left font-normal text-base text-slate-700`}>
                {data.project.name} - {data.name}
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#334155" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          ))}
        </div>
        <div className="w-full my-4 items-end flex flex-row justify-end gap-4">
          <Button
            variant="ghost"
            className="border border-slate-200"
            onClick={finishWork}
          >
            Cancel
          </Button>
          <Button
            className="bg-cyan-500"
            onClick={startTask}
          >
            Okay
          </Button>
        </div>
      </div>
    </main>
  )
}

export default SelectAProject;