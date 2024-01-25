import { Button } from "@/components/ui/button";
import useSectionTaskContext from "@/contexts/useSectionTaskContext";
import { formatDuration, formatTime } from "@/utils/dateTimeFormat";
import {
  ArrowsOutSimple,
  Bell,
  Check,
  Coffee,
  SkipBack,
  X,
} from "@phosphor-icons/react";
import { useCallback, useEffect, useRef } from "react";

function CountDown({ onStart }) {
  const { runningTask, setRunningTask, nextTask, sectionTasks } =
    useSectionTaskContext();
  const timeoutId = useRef<NodeJS.Timeout>();

  const updateRunningTask = useCallback(() => {
    setRunningTask((preState) => ({
      ...preState,
      duration: preState.duration - 1000,
    }));
  }, [setRunningTask]);

  useEffect(() => {
    timeoutId.current = setTimeout(updateRunningTask, 1000);

    if (runningTask.duration <= 0 && !runningTask.nonstop) {
      clearInterval(timeoutId.current);
      nextTask();
    }

    return () => clearInterval(timeoutId.current);
  }, [updateRunningTask, runningTask, nextTask]);

  const handleNextTask = () => {
    clearInterval(timeoutId.current);
    nextTask();
  };

  const waittingJSX = (
    <>
      <button
        onClick={() => onStart(false)}
        className="flex h-[2.1875rem] w-[4.75rem] items-center justify-center rounded-full border border-black text-xs"
      >
        Cancel
      </button>
      <button
        onClick={handleNextTask}
        className="flex h-[2.1875rem] w-[4.75rem] items-center justify-center rounded-full border border-black bg-black text-xs font-light text-white"
      >
        Start now
      </button>
    </>
  );

  const runningJSX = (
    <>
      <button>
        <SkipBack size={24} />
      </button>
      <button className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-black">
        <Check size={14} weight="bold" />
      </button>
      <button>
        <Coffee size={24} />
      </button>
    </>
  );

  return (
    <div className="relative flex h-full w-full flex-col items-center gap-6 py-6">
      {/* Title */}
      <div className="flex w-full items-end justify-between">
        <Button
          variant={"ghost"}
          className="h-8 w-8 p-0 hover:bg-[#F5F5F5]"
          onClick={() => onStart(false)}
        >
          <X size={20} />
        </Button>
        <p className="flex-1 text-center text-lg font-semibold">
          {runningTask.data.title}
        </p>
        <Button variant={"ghost"} className="h-8 w-8 p-0 hover:bg-[#F5F5F5]">
          <ArrowsOutSimple size={20} />
        </Button>
      </div>
      {/* Clock */}
      <div className="flex h-56 w-56 flex-col items-center justify-center rounded-full bg-[#F5F5F5]">
        <div className="relative w-full text-center">
          <p className="font-time text-4xl font-bold">
            {formatDuration(runningTask.duration, {
              type: "digit",
            })}
          </p>
          <div className="absolute bottom-0 left-1/2 flex w-full -translate-x-1/2 translate-y-full items-center justify-center gap-1 py-2 text-[#A1A1A1]">
            <Bell size={16} className="inline-block" />
            <span className="text-sm">
              {formatTime(runningTask.endTime).toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* remote */}
      <div className="flex items-center justify-center gap-6">
        {runningTask.id === "wait" ? waittingJSX : runningJSX}
      </div>
    </div>
  );
}

export default CountDown;
