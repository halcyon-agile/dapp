import { useEffect, useState } from "react";

import { ColorRing } from "react-loader-spinner";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Calendar,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "../../components/ui";
import { Project, Task } from "@/types";
import getProjects from "../../api/getProjects";
import { AxiosError } from "axios";
import getTasks from "../../api/getTasks";
import useActiveTasks from "../../data/use-active-tasks";
import { cn } from "../../lib/utils";

function CreateTaskForConsultation() {
  const { data: activeTasks } = useActiveTasks();
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [form, setForm] = useState<{
    description: string,
    start: any,
    end: any,
    start_time: string,
    end_time: string,
  }>({
    description: '',
    start: '',
    end: '',
    start_time: moment().format('HH:mm'),
    end_time: moment().format('HH:mm'),
  })
  const [fetching, fetch] = useState<boolean>(false)
  const [projects, setProjects] = useState<any>([]);
  const [selectedProject, setSelectedProject] = useState<any>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<any>();

  useEffect(() => {
    fetch(true)
    const fetchProjects = async () => {
      try {
        const fetchProjects: Project[] = await getProjects();
        setProjects(fetchProjects);
        fetch(false);
      } catch (error: AxiosError | any) {
        fetch(false);
      }
    };
    fetchProjects();
  }, [])

  useEffect(() => {
    fetch(true)
    const userData = localStorage.getItem("token");
    if (!userData) {
      navigate("/login", {
        replace: true,
      });
    }

    setTasks([])

    const fetchTasks = async (filter: number) => {
      try {
        const fetchedTasks: Task[] = await getTasks(filter);
        setTasks(
          fetchedTasks.filter(
            (task) =>
              !activeTasks?.find((activeTask) => activeTask.task.id === task.id)
          )
        );
        fetch(false);
      } catch (error: AxiosError | any) {
        fetch(false);
      }
    };

    fetchTasks(selectedProject);
  }, [selectedProject]);

  console.log(projects)

  const submit = () => {
    setLoading(true)
    // suddenConsultation(task?.id, moment().set({'hour': Number(form.start.split(':')[0]), 'minute': Number(form.end.split(':')[1])}).format(), moment().set({'hour': Number(form.end.split(':')[0]), 'minute': Number(form.end.split(':')[1])}).format())
    //   .then(() => {
    //     setLoading(false)
    //     navigate('/')
    //   })
    //   .catch(() => {
    //     setLoading(false)
    //   })
  }

  const handleProjectChange = (value: any) => {
    setSelectedProject(value);
  };

  const handleTaskChange = (value: any) => {
    setSelectedTask(value)
  }

  // console.log('selected', tasks)

  return (
    <div className="flex min-h-screen flex-col items-center justify-between text-black p-5 font-inter">
      <div className="items-center text-sm flex flex-row w-full py-4">
        <p className="left-0 top-0 w-full text-xl font-semibold">Log a Consultation - Create Task</p>
      </div>
      <div className="flex flex-1 flex-col w-full gap-4">
        {/* {Object.keys(errors).length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Some errors popped up while trying to create a new task. Hover the
              info icon for more info.
            </AlertDescription>
          </Alert>
        )} */}
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="taskName"
            className={`font-medium text-sm self-start flex flex-row gap-2.5 items-center`}
          >
            Project
          </Label>
          {projects.length > 0 ? (
            <Select onValueChange={handleProjectChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Project</SelectLabel>
                  {projects.map((data: any) => (
                    <SelectItem key={data?.id} value={data?.id}>{data?.name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            ""
          )}
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="taskName"
            className={`font-medium text-sm self-start flex flex-row gap-2.5 items-center`}
          >
            Task Name
          </Label>
          {tasks.length > 0 ? (
            <Select onValueChange={handleTaskChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a task" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Task</SelectLabel>
                  {tasks.map((data: any) => (
                    <SelectItem key={data?.id} value={data?.id}>{data?.name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-row w-full items-center justify-between gap-4">
          <div className="grid flex-1">
            <Label
              htmlFor="start"
              className="font-medium text-sm self-start flex flex-row gap-2.5 items-center"
            >
              Start Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal mt-1.5",
                    !form.start && "text-muted-foreground"
                  )}
                >
                  {form.start ? (
                    form.start
                  ) : (
                    <span>{`< Start Date >`}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={form.start}
                  onSelect={(value) =>
                    setForm({
                      ...form,
                      start: moment(value).format("MM/DD/YYYY"),
                    })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid flex-1">
            <Label
              htmlFor="end"
              className="font-medium text-sm self-start flex flex-row gap-2.5 items-center"
            >
              End Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal mt-1.5",
                    !form.end && "text-muted-foreground"
                  )}
                >
                  {form.end ? (
                    form.end
                  ) : (
                    <span>{`< End Date >`}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={form.end}
                  onSelect={(value) =>
                    setForm({
                      ...form,
                      end: moment(value).format("MM/DD/YYYY"),
                    })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label
            className="font-medium text-sm self-start flex flex-row gap-2.5 items-center"
          >
            Description
          </Label>
          <Textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="w-full flex flex-row items-center justify-between gap-4">
          <div className="flex-1 flex-col gap-1.5">
            <Label
              htmlFor="startTime"
              className="font-medium text-sm text-slate-900 self-start"
            >
              Start Time
            </Label>
            <Input
              type="time"
              id="startTime"
              placeholder="< Start Time >"
              className="text-black p-1 rounded-md border px-3 font-normal text-base w-full mt-1.5"
              autoCapitalize="none"
              onChange={(e) => {
                setForm({...form, start: e?.currentTarget?.value})
              }}
              value={form.start}
            />
          </div>
          <div className="flex-1 flex-col gap-1.5">
            <Label
              htmlFor="endTime"
              className="font-medium text-sm text-slate-900 self-start"
            >
              End Time
            </Label>
            <Input
              type="time"
              id="endTime"
              placeholder="< End Time >"
              className="text-black p-1 rounded-md border px-3 font-normal text-base w-full mt-1.5"
              autoCapitalize="none"
              onChange={(e) => {
                setForm({...form, end: e?.currentTarget?.value})
              }}
              // onChange={(event: any) => console.log(moment(event?.target?.valueAsDate).set({'year': moment().year(), 'day': moment().day(), 'month': moment().month()}).format('HH:mm'))}
              value={form.end}
            />
          </div>
        </div>
      </div>
      <div className="w-full my-4 items-end flex flex-row justify-end gap-4 border-t pt-4">
        <Button
          variant="ghost"
          className="border border-slate-200"
          onClick={() => navigate('/select-task-for-consultation')}
        >
          Cancel
        </Button>
        <Button
          className="bg-cyan-500"
          type="submit"
          onClick={submit}
        >
          {loading ? (
            <ColorRing
              visible={loading}
              height="24"
              width="24"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          ) : (
            "Create"
          )}
        </Button>
      </div>
    </div>
  );
}

export default CreateTaskForConsultation;
