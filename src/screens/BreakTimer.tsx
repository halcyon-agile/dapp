import { useNavigate } from "react-router-dom";

import { Button } from "../components/ui/button";
import endBreakApi from "../api/endBreak";

function BreakTimer() {
  const navigate = useNavigate();

  const endBreak = () => {
    endBreakApi()
      .then(() => navigate("/multiple-projects"))
      .catch((error) => {
        console.error(error?.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <main className="flex min-h-screen flex-col text-black py-16">
      <div className="w-full flex flex-col items-center gap-4">
        <p className="font-semibold text-3xl text-gray-900 text-center">
          TIMER STOPPED
        </p>
        <div className="rounded-full px-4 py-1 bg-red-600">
          <p className="font-medium text-xs text-white">
            ALERT! Break exceeds inputted time.
          </p>
        </div>
        <Button className="bg-cyan-500 px-4" onClick={() => endBreak()}>
          End Break
        </Button>
      </div>
    </main>
  );
}

export default BreakTimer;
