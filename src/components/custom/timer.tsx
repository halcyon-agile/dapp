import moment from "moment";
import { useEffect, useState } from "react";

function Timer(props: { started_at: string }) {
  const [time, setTime] = useState("")
  useEffect(() => {
    const interval = setInterval(() => {
      const timeDiff = moment.duration(moment().utc(true).diff(moment(props?.started_at).utc(true)))
      const hour = timeDiff.hours()
      const formatHour = Math.floor(hour)
      const minute = timeDiff.minutes()
      const formatMinute = Math.floor(minute)
      setTime(`${("0"+ formatHour).slice(-2)}:${("0"+ formatMinute).slice(-2)}`)
    }, 1000)
    return () => clearInterval(interval)
  }, [time])
  return (
    <p className="font-medium text-base text-gray-700">
      {time}
    </p>
  )
}

export default Timer;