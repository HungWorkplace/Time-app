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
import { Fragment, useCallback, useEffect, useRef, useState } from "react";

function CountDown({ onStart }) {
  const { runningTask, setRunningTask, nextTask } = useSectionTaskContext();
  const timeoutId = useRef<NodeJS.Timeout>();
  const runningDuration = useRef<number>(runningTask.duration);
  const [stopwatch, setStopwatch] = useState<number[]>([1000]);
  const [elapsedTime, setElapsedTime] = useState(0);

  const updateRunningTask = useCallback(() => {
    setRunningTask((preState) => ({
      ...preState,
      duration: preState.duration - 1000,
    }));

    setStopwatch((prevState) => {
      const updatedStopwatch = [...prevState];
      updatedStopwatch[updatedStopwatch.length - 1] += 1000;
      return updatedStopwatch;
    });

    setElapsedTime((prevState) => prevState + 1000);
  }, [setRunningTask]);

  useEffect(() => {
    timeoutId.current = setTimeout(updateRunningTask, 1000);

    if (runningTask.duration <= 0 && !runningTask.nonstop) {
      handleNextTask();
    }

    return () => clearInterval(timeoutId.current);
  }, [runningTask.duration]);

  const handleNextTask = () => {
    clearInterval(timeoutId.current);
    setStopwatch([0]);
    setElapsedTime(0);
    nextTask();
    runningDuration.current = runningTask.duration;
  };

  const handlePause = () => {
    setStopwatch((prevState) => [...prevState, 1000]);
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
      <button onClick={handlePause}>
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

      <div className="flex flex-col items-center gap-5 text-center font-time text-xs">
        <div className="space-x-1">
          <span>{formatDuration(elapsedTime)}</span>
          <span>/</span>
          <span>{formatDuration(runningDuration.current)}</span>
        </div>
        <div className="flex items-center gap-2">
          {stopwatch.map((time, index) => {
            return (
              <Fragment key={index}>
                {index > 0 && <span>{">"}</span>}
                <span>{formatDuration(time, { type: "digit" })}</span>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CountDown;
