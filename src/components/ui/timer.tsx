import moment from "moment";
import { useEffect, useState } from "react";

function Timer(props: { started_at: string }) {
  const [time, setTime] = useState("")
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment(props.started_at).toNow(true))
    }, 1000)
    return () => clearInterval(interval)
  }, [time])
  return (
    <p className="font-medium text-base text-gray-700">
      {time} ago
    </p>
  )
}

export default Timer;