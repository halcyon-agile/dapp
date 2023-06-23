import { useEffect, useState } from "react";
import { CalendarIcon, ChevronsUpDown } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

import {
  Button,
  Calendar,
  Command,
  CommandGroup,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui";
import getUsers from "../api/users";
import { cn } from "../lib/utils";
import requestConsultation from "../api/consultations/requestConsultation";

function CreateConsultation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState<number>(0);
  const [users, setUsers] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<any>(null);
  const [members, setMembers] = useState<any>([]);
  const [form, setForm] = useState<{
    started_at: any;
    duration: string;
  }>({
    started_at: "",
    duration: "",
  });
  const [creating, create] = useState<boolean>(false);

  useEffect(() => {
    getUsers().then((data) => {
      // console.log('data', data)
      setUsers(data);
    });
  }, []);

  // console.log('value', value)
  console.log("members", members);

  const filteredUsers = users.filter((user: any) => {
    return members.every((member: any) => {
      return member.id !== user.id;
    });
  });

  // console.log('filtered users', filteredUsers)
  // console.log('form', form)

  return (
    <main className="flex min-h-screen flex-col p-5">
      <div className="left-0 top-0 w-full text-4xl py-2">
        <p className="font-semibold text-xl">Create Consultation</p>
      </div>
      <div className="flex flex-row w-full items-center justify-between gap-4">
        <div className="flex-1 flex-col gap-1.5">
          <h1 className="font-medium text-sm text-slate-900 self-start mb-2.5">
            Date
          </h1>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !form.started_at && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {form.started_at ? form.started_at : <span>Pick a date</span>}
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
        <div className="flex-1 flex-col gap-1.5">
          <Label
            htmlFor="time"
            className="font-medium text-sm text-slate-900 self-start"
          >
            Time
          </Label>
          <Input
            type="time"
            id="time"
            placeholder="< Time >"
            className="text-black p-1 rounded-md border px-3 font-normal text-base w-full mt-1.5"
            autoCapitalize="none"
            // onChange={(e) => setForm({ ...form, password: e.target.value })}
            // value={form.password}
          />
        </div>
      </div>
      <div className="flex flex-row w-full items-center justify-between gap-4 mt-4">
        <div className="flex-1 flex-col gap-1.5">
          <Label
            htmlFor="duration"
            className="font-medium text-sm text-slate-900 self-start"
          >
            Duration
          </Label>
          <Input
            type="duration"
            id="duration"
            placeholder="< Duration >"
            className="text-black p-1 rounded-md border px-3 font-normal text-base w-full mt-1.5"
            autoCapitalize="none"
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            value={form.duration}
          />
        </div>
        <div className="flex flex-1 flex-col items-center justify-between gap-1.5 pt-6">
          <div className="flex w-full flex-row items-center gap-1">
            <button
              className="flex flex-1 flex-row items-center"
              onClick={() => setSelected(0)}
            >
              <div className="p-[4px] mr-1 rounded-full border border-slate-200 items-center justify-center">
                {selected === 0 ? (
                  <div className="w-[8px] h-[8px] bg-cyan-500 rounded-full"></div>
                ) : (
                  <div className="w-[8px] h-[8px] rounded-full"></div>
                )}
              </div>
              <p className="font-medium text-sm text-slate-900 self-start">
                Fixed Time
              </p>
            </button>
            <button
              className="flex flex-1 flex-row items-center"
              onClick={() => setSelected(1)}
            >
              <div className="p-[4px] mr-1 rounded-full border border-slate-200 items-center justify-center">
                {selected === 1 ? (
                  <div className="w-[8px] h-[8px] bg-cyan-500 rounded-full"></div>
                ) : (
                  <div className="w-[8px] h-[8px] rounded-full"></div>
                )}
              </div>
              <p className="font-medium text-sm text-slate-900 self-start">
                Flexible Time
              </p>
            </button>
          </div>
        </div>
      </div>
      <div className="flex-col gap-1.5 mt-4 border-b pb-4">
        <Label
          htmlFor="members"
          className="font-medium text-sm text-slate-900 self-start"
        >
          Members
        </Label>
        <div className="flex flex-row items-center justify-between mt-1.5 gap-2">
          {/* <Input
            type="members"
            id="members"
            placeholder="Members"
            className="text-black p-1 rounded-md border px-3 font-normal text-base w-full"
            autoCapitalize="none"
          /> */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {value
                  ? `${
                      users.find((user: any) => user.id === value)?.first_name
                    } ${
                      users.find((user: any) => user.id === value)?.last_name
                    }`
                  : "Select member..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command className="w-full">
                <CommandGroup className="w-full">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user: any) => (
                      <button
                        className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                        onClick={() => {
                          setValue(user.id);
                          setOpen(false);
                        }}
                      >
                        <p>
                          {user.first_name} {user.last_name}
                        </p>
                      </button>
                    ))
                  ) : (
                    <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                      <p>No users.</p>
                    </div>
                  )}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <Button
            className="bg-cyan-500"
            onClick={() => {
              if (value) {
                const list = members;
                list.push(users.find((user: any) => user.id === value));
                setMembers(list);
                setValue(null);
              }
            }}
          >
            Add
          </Button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-1.5">
        {members.map((item: any, index: number) => (
          <div
            className="w-full py-3.5 border-b flex flex-row items-center justify-between"
            key={item.id}
          >
            <p className="font-medium text-sm text-slate-700">
              {item.first_name} {item.last_name}
            </p>
            <button
              onClick={() => {
                const memberList = members;
                const list = memberList.splice(index + 1, 1);
                setMembers(list);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#334155"
                className="w-5 h-5"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <div className="w-full items-end flex flex-row justify-end gap-4 mt-4">
        <Button
          variant="ghost"
          className="border border-slate-200"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button
          className="bg-cyan-500"
          onClick={() => {
            create(true);
            requestConsultation(
              location?.state?.id,
              form.started_at,
              form.duration,
              selected === 0 ? "fixed" : "flexible",
              members
            ).then(() => {
              create(false);
              navigate("/multiple-projects", { replace: true });
            });
          }}
        >
          Request
        </Button>
      </div>
    </main>
  );
}

export default CreateConsultation;