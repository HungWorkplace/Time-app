import useSectionTaskContext from "@/contexts/useSectionTaskContext";
import AddTask from "../tasks/components/AddTask";
import TaskList from "../tasks/components/TaskList";
import ModeProvider from "../../contexts/mode-context";
import { formatDuration, formatTime } from "@/utils/dateTimeFormat";
import Progress from "@/components/Progress";
import { Play } from "@phosphor-icons/react";
import CountDown from "../tasks/components/CountDown";
import { useState } from "react";

function Section() {
  const { part, totalTasksTime } = useSectionTaskContext();
  const [start, setStart] = useState(false);

  const { title, startTime, endTime } = part;

  return (
    <div className="flex flex-col gap-4">
      <header className=" border-b-2 border-dashed px-2 pb-6">
        {/* Section title */}
        <div className="inline-block">
          <div className="flex items-end gap-10">
            <h1 className="text-xl font-semibold leading-none">{title}</h1>
            <div className="space-x-2 text-xs">
              <span>{formatTime(startTime)}</span>
              <span>-</span>
              <span>{formatTime(endTime)}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="mb-2">
              <Progress />
            </div>
          </div>
        </div>
      </header>

      {/* Start */}
      {!start && (
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => setStart(true)}
            className="flex h-[2.1875rem] w-[4.75rem] items-center justify-center rounded-full bg-black"
          >
            <Play size={18} color="white" />
          </button>
          <p className="text-xs">
            <span className="mr-2 font-semibold">start:</span>
            <span>{formatTime(startTime)}</span>
          </p>
        </div>
      )}

      {start && <CountDown onStart={setStart} />}

      {/* Tasks */}
      <div>
        <TaskList />
        <ModeProvider>
          <AddTask />
        </ModeProvider>
        <div className="flex h-10 items-center justify-end gap-2 px-3 text-xs">
          <span className="text-gray-300">SUM</span>
          <span>{formatDuration(totalTasksTime)}</span>
        </div>
      </div>
    </div>
  );
}

export default Section;
