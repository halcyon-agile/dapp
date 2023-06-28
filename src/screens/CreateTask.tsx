import { useState } from "react";
import {
  Button,
  Input,
  Label,
  Textarea,
} from "../components/ui";
import { useNavigate } from "react-router-dom";

function CreateTask() {
  const navigate = useNavigate()
  const [form, setForm] = useState<any>({
    name: '',
    status: '',
    type: '',
    description: '',
    estimate: '',
    start: '',
    end: '',
  })
  return (
    <main className="flex min-h-screen flex-col items-center justify-between text-black p-5 font-inter">
      <div className="items-center text-sm flex flex-row w-full py-4">
        <p className="left-0 top-0 w-full text-xl font-semibold">
          Create Task
        </p>
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
          <Label
            className="text-black font-medium text-sm self-start"
          >
            Status
          </Label>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            // onChange={handleSelectChange}
          >
            <option value="completed">
              Completed
            </option>
            <option value="pending">
              Pending
            </option>
          </select>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label
            className="text-black font-medium text-sm self-start"
          >
            Type
          </Label>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            // onChange={handleSelectChange}
          >
            <option value="completed">
              Billable
            </option>
            <option value="pending">
              Non-billable
            </option>
          </select>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label
            className="text-black font-medium text-sm self-start"
          >
            Description
          </Label>
          <Textarea
            value={form.description}
            onChange={(e) =>
              setForm({...form, description: e.target.value})
            }
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
            type="estimate"
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
            <Input
              type="start"
              id="start"
              placeholder="< Start Date >"
              className="text-black p-1 rounded-md border px-3 font-normal text-base w-full mt-1.5"
              autoCapitalize="none"
              onChange={(e) => setForm({ ...form, estimate: e.target.value })}
              value={form.estimate}
            />
          </div>
          <div className="grid flex-1">
            <Label
              htmlFor="end"
              className="text-black font-medium text-sm self-start"
            >
              End Date
            </Label>
            <Input
              type="end"
              id="end"
              placeholder="< Start Date >"
              className="text-black p-1 rounded-md border px-3 font-normal text-base w-full mt-1.5"
              autoCapitalize="none"
              onChange={(e) => setForm({ ...form, estimate: e.target.value })}
              value={form.estimate}
            />
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
        <Button
          className="bg-cyan-500"
        >
          Create
        </Button>
      </div>
    </main>    
  )
}

export default CreateTask;
