import { useState } from "react";

import {
  useNavigate,
} from "react-router-dom"

const data = [
  {
    name: 'Project 1',
    task: 'Task 2.1',
  },
  {
    name: 'Project 2',
    task: 'Task 1.0',
  },
  {
    name: 'Project 3',
    task: 'Task 2.2',
  },
  {
    name: 'Project 4',
    task: 'Task 4.1',
  },
]

function SelectAProject() {
  const navigate = useNavigate();
  const [selectedProject, setCurrentProject] = useState<null | number>(null);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between text-black p-5 font-inter">
      <div className="items-center text-sm flex flex-row w-full border-b py-4">
        <p className="left-0 top-0 w-full text-4xl flex-1 font-bold text-base">
          Projects
        </p>
      </div>
      <div className="flex flex-col flex-1 bg-white w-full h-full text-black mt-5">
        {data.map((data: any, index: number) => (
          <button
            className="border-b p-4 mb-2"
            key={index}
            onClick={() => setCurrentProject(index)}
          >
            <p className={`left-0 top-0 w-full text-1xl flex-1 text-left font-normal text-base ${selectedProject === index ? "text-sky-400" : "text-gray-500"}`}>
              {data.name} - {data.task}
            </p>
          </button>
        ))}
        <div
          className="w-full items-center justify-center flex py-6"
        >
          <button
            onClick={() => navigate(-1)}
            className="bg-white py-2 border border-sky-400 rounded flex-none text-sky-400 font-medium text-base w-3/12"
          >
            Cancel
          </button>
          <div className="w-5" />
          <button
            className="bg-sky-400 py-2 rounded flex-none text-white font-medium text-base w-3/12"
            // onClick={() => router.push("projects/timer")}
          >
            Okay
          </button>
        </div>
      </div>
    </main>
  )
}

export default SelectAProject;