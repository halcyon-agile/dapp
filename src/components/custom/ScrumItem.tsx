import { useState } from "react";
import { Button } from "../ui";
import { ColorRing } from "react-loader-spinner";
import startTaskApi from "../../api/startTask";
import useActiveTasks from "../../data/use-active-tasks";

interface Props {
  data: any;
}

function ScrumItem(props: Props) {
  const [joining, join] = useState<boolean>(false);
  const { data: activeTasks, refetch: refetchActiveTasks } = useActiveTasks();

  return (
    <div className="w-full flex flex-col border rounded border-slate-200 p-4 gap-1">
      <p className="font-medium text-base text-gray-700">
        {props?.data?.name} {props?.data?.id}
      </p>
      <p className="font-medium text-xs text-gray-500">
        {props?.data?.project?.scrums[0]?.time}{" "}
        {parseInt(props?.data?.project?.scrums[0]?.time.slice(0, 2), 10) < 12
          ? "AM"
          : "PM"}
      </p>
      <div className="w-full flex flex-row items-center mt-2 gap-4">
        {activeTasks &&
        activeTasks.find((item) => item.task.id === props?.data?.id) ? (
          <div className="rounded-full px-4 py-1 bg-slate-100 w-[79px] max-w-[100px] mt-3.5 h-[24px]">
            <p className="font-medium text-xs text-center text-slate-900">
              Joined
            </p>
          </div>
        ) : (
          <Button
            className="bg-cyan-500"
            disabled={joining}
            onClick={() => {
              join(true);
              startTaskApi(props?.data?.id)
                .then(() => {
                  refetchActiveTasks();
                })
                .catch((error: { response: { data: { message: any } } }) => {
                  console.error(
                    error?.response?.data?.message || "Something went wrong"
                  );
                });
            }}
          >
            {joining ? (
              <ColorRing
                visible={joining}
                height="24"
                width="24"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            ) : (
              "Join"
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

export default ScrumItem;
