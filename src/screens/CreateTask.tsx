import { useState } from "react";
import {
  Button,
  Calendar,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "../components/ui";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { cn } from "../lib/utils";
import useTaskTypes from "../data/use-task-types";
import useProjects from "../data/use-projects";
import request from "../lib/request";
import { useMutation } from "@tanstack/react-query";

function CreateTask() {
  const {
    status: taskTypesStatus,
    data: taskTypes,
    error: taskTypesError,
  } = useTaskTypes();
  const {
    status: projectsStatus,
    data: projects,
    error: projectsError,
  } = useProjects();
  const navigate = useNavigate();
  const [form, setForm] = useState<any>({
    name: "",
    project_id: null,
    task_type_id: null,
    label: "",
    estimate: "",
    started_at: "",
    ended_at: "",
  });

  const mutation = useMutation(
    (task) => {
      // console.log('task', task)
      return request.post("/api/tasks", task);
    },
    {
      onSuccess: () => {
        navigate("/select-project");
      },
    }
  );

  if (taskTypesError || projectsError) {
    return <>{taskTypesError || projectsError}</>;
  }

  return (
    <form
      className="flex min-h-screen flex-col items-center justify-between text-black p-5 font-inter"
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate(form);
      }}
    >
      <div className="items-center text-sm flex flex-row w-full py-4">
        <p className="left-0 top-0 w-full text-xl font-semibold">Create Task</p>
      </div>
      <div className="flex flex-1 flex-col w-full gap-4">
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="taskName"
            className="text-black font-medium text-sm self-start"
          >
            Task Name
          </Label>
          <Input
            type="taskName"
            id="taskName"
            placeholder="< Task Name >"
            className="text-black p-1 rounded-md border px-3 font-normal text-base w-full mt-1.5"
            autoCapitalize="none"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            value={form.name}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label className="text-black font-medium text-sm self-start">
            Project
          </Label>
          {projectsStatus === "success" && (
            <select
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onChange={(e) => {
                setForm((data: any) => ({
                  ...data,
                  project_id: e.target.value,
                }));
              }}
            >
              <option value={""}>Select a project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label className="text-black font-medium text-sm self-start">
            Type
          </Label>
          {taskTypesStatus === "success" && (
            <select
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onChange={(e) => {
                setForm((data: any) => ({
                  ...data,
                  task_type_id: e.target.value,
                }));
              }}
            >
              <option value={""}>Select a type</option>
              {taskTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label className="text-black font-medium text-sm self-start">
            Description
          </Label>
          <Textarea
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="estimate"
            className="text-black font-medium text-sm self-start"
          >
            Estimate
          </Label>
          <Input
            type="number"
            id="estimate"
            placeholder="< Estimate >"
            className="text-black p-1 rounded-md border px-3 font-normal text-base w-full mt-1.5"
            autoCapitalize="none"
            onChange={(e) => setForm({ ...form, estimate: e.target.value })}
            value={form.estimate}
          />
        </div>
        <div className="flex flex-row w-full items-center justify-between gap-4">
          <div className="grid flex-1">
            <Label
              htmlFor="start"
              className="text-black font-medium text-sm self-start"
            >
              Start Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal mt-1.5",
                    !form.started_at && "text-muted-foreground"
                  )}
                >
                  {form.started_at ? (
                    form.started_at
                  ) : (
                    <span>{`< Start Date >`}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={form.started_at}
                  onSelect={(value) =>
                    setForm({
                      ...form,
                      started_at: moment(value).format("MM/DD/YYYY"),
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
              className="text-black font-medium text-sm self-start"
            >
              End Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal mt-1.5",
                    !form.started_at && "text-muted-foreground"
                  )}
                >
                  {form.ended_at ? (
                    form.ended_at
                  ) : (
                    <span>{`< End Date >`}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={form.ended_at}
                  onSelect={(value) =>
                    setForm({
                      ...form,
                      ended_at: moment(value).format("MM/DD/YYYY"),
                    })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <div className="w-full my-4 items-end flex flex-row justify-end gap-4 border-t pt-4">
        <Button
          variant="ghost"
          className="border border-slate-200"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button className="bg-cyan-500" type="submit">
          Create
        </Button>
      </div>
    </form>
  );
}

export default CreateTask;
