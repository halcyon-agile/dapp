import { useState } from "react";
import { useNavigate } from "react-router-dom"

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

function TakeABreak() {
  const navigate = useNavigate()
  const [form, setForm] = useState<{hour: number | null, minute: number | null}>({
    hour: null,
    minute: null,
  });
  return (
    <main className="flex min-h-screen flex-col items-center text-black p-5">
      <div className="text-sm w-full">
        <p className="font-semibold text-lg text-gray-900">
          How long will your break be?
        </p>
      </div>
      <div className="w-full p-4 mt-3.5 border rounded-sm border-slate-200">
        <div className="flex flex-row justify-between gap-4">
          <div className="flex-col flex-1 gap-1.5">
            <p className="font-medium text-sm text-slate-900">
              Hour
            </p>
            <Input
              type="hour"
              id="hour"
              placeholder="Hour"
              className="text-black p-1 rounded-md border px-3 font-normal text-base text-sm w-full mt-1.5"
              autoCapitalize="none"
              onChange={(e) => setForm({ ...form, hour: parseInt(e.target.value, 10) })}
              value={form.hour !== null ? form.hour : ""}
            />
          </div>
          <div className="flex-col flex-1 gap-1.5">
            <p className="font-medium text-sm text-slate-900">
              Minute
            </p>
            <Input
              type="minute"
              id="minute"
              placeholder="Minute"
              className="text-black p-1 rounded-md border px-3 font-normal text-base text-sm w-full mt-1.5"
              autoCapitalize="none"
              onChange={(e) => setForm({ ...form, minute: parseInt(e.target.value, 10) })}
              value={form.minute !== null ? form.minute : ""}
            />
          </div>
        </div>
      </div>
      <div className="w-full my-4 items-end flex flex-row justify-end gap-4">
        <Button
          variant="ghost"
          className="border border-slate-200"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button
          className="bg-cyan-500"
          onClick={() => navigate("/break-reason")}
        >
          Okay
        </Button>
      </div>
    </main>
  )
}

export default TakeABreak;