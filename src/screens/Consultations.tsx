import { Button } from "../components/ui/button";

function Consultations() {
  return (
    <main className="flex min-h-screen flex-col p-5">
      <div className="left-0 top-0 w-full text-4xl py-2">
        <p className="font-semibold text-xl">
          Consult
        </p>
      </div>
      <div className="w-full mt-4 flex flex-1 flex-col">
        <div className="w-full border rounded border-slate-200 p-4 gap-2">
          <p className="font-medium text-base text-gray-700">
            Project 2 - Consult
          </p>
          <p className="font-medium text-xs text-gray-500">
            from Christian
          </p>
          {/* display if consultation is expired */}
          {/* <div className="rounded-full px-4 py-1 bg-slate-100 w-[79px] max-w-[100px] mt-3.5 h-[24px]">
            <p className="font-medium text-xs text-center text-slate-900">
              Expired
            </p>
          </div> */}
          <div className="w-full flex flex-row items-center mt-2 gap-4">
            <Button
              className="bg-cyan-500"
            >
              Join
            </Button>
            <Button
              className="border border-slate-200"
              variant="ghost"
            >
              Decline
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Consultations;