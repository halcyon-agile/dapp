import { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { Button } from "../ui";
import { ColorRing } from "react-loader-spinner";
import joinConsultation from "../../api/consultations/join-consultation";
import useStore from "../../store";

interface Props {
  data: any
  name: string
  tab: "requests" | "invites"
}

function ConsultationItem(props: Props) {
  const navigate = useNavigate()
  const [joining, join] = useState<boolean>(false)

  const [
    activeTasks,
  ] = useStore((state) => [
    state.activeTasks,
  ]);

  // console.log(activeTasks.find((item) => item.consultation_id === props?.data?.id))

  return (
    <div className="w-full flex flex-1 flex-col gap-4">
      <div className="w-full flex flex-col border rounded border-slate-200 p-4 gap-1">
        <p className="font-medium text-base text-gray-700">
          {props?.data?.task?.name} - Consult
        </p>
        <p className="font-medium text-xs text-gray-500">
          {props?.data?.type} | {moment(props?.data?.started_at).format("MMM DD, YYYY")}
        </p>
        <p className="font-medium text-xs text-gray-500">
          from {props?.name}
        </p>
        {/* display if consultation is expired */}
        {/* <div className="rounded-full px-4 py-1 bg-slate-100 w-[79px] max-w-[100px] mt-3.5 h-[24px]">
          <p className="font-medium text-xs text-center text-slate-900">
            Expired
          </p>
        </div> */}
        {activeTasks.find((item) => item.consultation_id === props?.data?.id) ? (
          <div className="rounded-full px-4 py-1 bg-slate-100 w-[79px] max-w-[100px] mt-3.5 h-[24px]">
            <p className="font-medium text-xs text-center text-slate-900">
              Joined
            </p>
          </div>
        ) : (
          <div className="w-full flex flex-row items-center mt-2 gap-4">
            <Button
              className="bg-cyan-500"
              disabled={joining}
              onClick={() => {
                join(true)
                joinConsultation(props?.data?.id).then((response) => {
                  navigate("/multiple-projects", { replace: true })
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
                  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
              ) : "Join"}
            </Button>
            <Button
              className="border border-slate-200"
              variant="ghost"
            >
              Decline
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConsultationItem;