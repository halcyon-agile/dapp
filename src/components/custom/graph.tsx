import { useEffect, useState } from "react";
import moment from "moment";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

import { cn } from "../../lib/utils";

interface Props {
  visible: boolean;
  remainingHours: number | boolean;
  initialEstimateHours: number;
  currentEstimateHours: number;
  totalRenderedHours: number;
  started_at: string;
}

function Graph(props: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [time, setTime] = useState("");

  const longestHour = Math.max(
    props.initialEstimateHours,
    props.currentEstimateHours,
    props.totalRenderedHours,
    typeof props.remainingHours === "number" ? props.remainingHours : 0
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const timeDiff = moment.duration(
        moment().diff(moment(props?.started_at))
      );
      const hour = timeDiff.hours();
      const formatHour = Math.floor(hour);
      setTime(`${formatHour}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  if (!props.visible) return <></>;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleContent>
        <div className="w-full pt-2">
          {typeof props.remainingHours === "number" && (
            <p className="text-sm font-normal text-gray-700">
              Remaining Hours: {props.remainingHours}
            </p>
          )}

          <div className="flex flex-row w-full items-center py-1">
            <p className="flex-1 pr-2 text-xs text-gray-500">
              {props?.initialEstimateHours} Hrs (
              {props?.initialEstimateHours / 8})
            </p>
            <div className="flex-[5]">
              <div
                style={{
                  width: `${Math.min(
                    Math.ceil((props.initialEstimateHours / longestHour) * 100),
                    100
                  )}%`,
                }}
                className={cn("rounded-full bg-teal-500 grow h-2.5")}
              />
            </div>
          </div>

          <div className="flex flex-row w-full items-center py-1">
            <p className="flex-1 pr-2 text-xs text-gray-500">
              {props.currentEstimateHours} Hrs ({props.currentEstimateHours / 8}
              )
            </p>
            <div className="flex-[5]">
              <div
                style={{
                  width: `${Math.min(
                    Math.ceil((props.currentEstimateHours / longestHour) * 100),
                    100
                  )}%`,
                }}
                className={cn(
                  "rounded-full h-2.5",
                  props.currentEstimateHours > props.initialEstimateHours
                    ? "bg-red-500"
                    : "bg-green-500"
                )}
              />
            </div>
          </div>

          <div className="flex flex-row w-full items-center py-1">
            <p className="flex-1 pr-2 text-xs text-gray-500">
              {props.totalRenderedHours} Hrs ({props.totalRenderedHours / 8})
            </p>
            <div className="flex-[5]">
              <div
                style={{
                  width: `${Math.min(
                    Math.ceil((props.totalRenderedHours / longestHour) * 100),
                    100
                  )}%`,
                }}
                className={cn(
                  "rounded-full h-2.5",
                  props.totalRenderedHours > props.initialEstimateHours
                    ? "bg-red-500"
                    : "bg-cyan-500"
                )}
              />
            </div>
          </div>
        </div>
      </CollapsibleContent>
      <CollapsibleTrigger asChild>
        <button className="w-full flex flex-row items-center justify-center pt-3 gap-2">
          <p className="font-medium text-sm text-slate-500">View More</p>
          {!isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#334155"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#334155"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          )}
        </button>
      </CollapsibleTrigger>
    </Collapsible>
  );
}

export default Graph;
