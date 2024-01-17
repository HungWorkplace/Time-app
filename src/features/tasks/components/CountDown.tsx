import useSectionTaskContext from "@/contexts/useSectionTaskContext";
import { formatDuration } from "@/utils/dateTimeFormat";
import { Bell } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

function CountDown({ onStart }) {
  const { part } = useSectionTaskContext();
  const now = useRef(new Date().setHours(6, 59, 0));

  const [timer, setTimer] = useState(part.startTime - now.current);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((preState) => preState - 1000);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  return (
    <div className="mx-auto py-6">
      <div className="flex h-56 w-56 flex-col items-center justify-center rounded-full bg-[#F5F5F5]">
        <div className="relative w-full text-center">
          <p className="font-time text-4xl font-bold">
            {formatDuration(timer, { seconds: true })}
          </p>
          <div className="absolute bottom-0 left-1/2 flex w-full -translate-x-1/2 translate-y-full items-center justify-center gap-1 py-2 text-[#A1A1A1]">
            <Bell size={16} className="inline-block" />
            <span className="text-sm">8:35 AM</span>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-6">
        <button
          onClick={() => onStart(false)}
          className="flex h-[2.1875rem] w-[4.75rem] items-center justify-center rounded-full border border-black text-xs"
        >
          Cancel
        </button>
        <button className="flex h-[2.1875rem] w-[4.75rem] items-center justify-center rounded-full border border-black bg-black text-xs font-light text-white">
          Start now
        </button>
      </div>
    </div>
  );
}

export default CountDown;
