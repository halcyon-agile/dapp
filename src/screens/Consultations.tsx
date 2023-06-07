import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "../components/ui";
import getConsultations from "../api/consultations/consultations";
import useStore from "../store";
import getConsultationInvites from "../api/consultations/consultationInvites";
import { Terminal } from "lucide-react";

function Consultations() {
  const navigate = useNavigate()
  const [fetching, isFetching] = useState<boolean>(false)
  const [
    consultations,
    setConsultations,
  ] = useStore((state) => [
    state.consultations,
    state.setConsultations,
  ]);
  useEffect(() => {
    isFetching(true)
    getConsultations().then((list) => {
      setConsultations(list);
      isFetching(false)
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col p-5">
      <div className="left-0 top-0 w-full text-4xl py-2">
        <p className="font-semibold text-xl">
          Consult
        </p>
      </div>
      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="grid grid-cols-2 w-[40%]">
          <TabsTrigger
            value="requests"
            onClick={() => {
              isFetching(true)
              getConsultations().then((list) => {
                setConsultations(list);
                isFetching(false)
              });
            }}>From you</TabsTrigger>
          <TabsTrigger
            value="invites"
            onClick={() => {
              isFetching(true)
              getConsultationInvites().then((list) => {
                setConsultations(list);
                isFetching(false)
              });
            }}
          >From others</TabsTrigger>
        </TabsList>
        <TabsContent value="requests">
          {fetching ? (
            <ColorRing
              visible={fetching}
              height="100"
              width="100"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          ) : consultations.length > 0 ? (
            <div className="w-full flex flex-1 flex-col gap-4">
              <div className="w-full flex flex-col border rounded border-slate-200 p-4 gap-1">
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
          ) : (
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You have no consultation requests right now.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
        <TabsContent value="invites">
          {fetching ? (
            <ColorRing
              visible={fetching}
              height="100"
              width="100"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          ) : consultations.length > 0 ? (
            <div className="w-full flex flex-1 flex-col gap-4">
              <div className="w-full flex flex-col border rounded border-slate-200 p-4 gap-1">
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
          ) : (
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You have no consultation invites right now.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
      </Tabs>
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
        >
          Add Consult
        </Button>
      </div>
    </main>
  )
}

export default Consultations;