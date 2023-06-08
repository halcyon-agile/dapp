import { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { Button } from "../ui";
import { ColorRing } from "react-loader-spinner";
import joinConsultation from "../../api/consultations/join-consultation";
import useStore from "../../store";
import { useToast } from "../ui/use-toast";

interface Props {
  data: any
  name: string
  tab: "requests" | "invites"
}

function ConsultationItem(props: Props) {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [joining, join] = useState<boolean>(false)

  const [
    activeTasks,
  ] = useStore((state) => [
    state.activeTasks,
  ]);

  // console.log(activeTasks.find((item) => item.consultation_id === props?.data?.id))

  // console.log(props?.data)

  return (
    <div className="w-full flex flex-1 flex-col gap-4 mt-4" key={props?.data?.id}>
      <div className="w-full flex flex-col border rounded border-slate-200 p-4 gap-1">
        <div className="w-full flex flex-row items-center justify-between">
          <div className="flex-1">
            <p className="font-medium text-base text-gray-700">
              {props?.data?.task?.name} - Consult
            </p>
          </div>
          <div className="flex-row items-center">
            <button className="mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#334155" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
            </button>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#EF4444" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
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
                joinConsultation(props?.data?.id)
                .then((response) => {
                  console.log('response', response)
                  // navigate("/multiple-projects", { replace: true })
                })
                .catch((error) => {
                  toast({
                    title: "Error",
                    description: error,
                  })
                })
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
              onClick={() => {
                toast({
                  title: "Error",
                  description: "something",
                })
              }}
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