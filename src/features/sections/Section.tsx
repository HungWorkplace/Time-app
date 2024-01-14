import useSectionTaskContext from "@/contexts/useSectionTaskContext";
import AddTask from "../tasks/components/AddTask";
import TaskList from "../tasks/components/TaskList";
import ModeProvider from "../../contexts/mode-context";
import { cva } from "class-variance-authority";
import { formatDuration, formatTime } from "@/utils/dateTimeFormat";
import { Play } from "@phosphor-icons/react";

function Section() {
  const { part, remainingTime, sectionDuration, totalTime } =
    useSectionTaskContext();

  const { title, startTime, endTime } = part;

  const variants = cva("font-semibold", {
    variants: {
      state: {
        positive: "text-gray-500",
        negative: "text-red-500",
        match: "text-green-700",
      },
    },
  });

  const styleByState = variants({
    state:
      remainingTime < 0
        ? "negative"
        : remainingTime === 0
          ? "match"
          : "positive",
  });

  return (
    <>
      <header className="border-b-2 border-dashed p-3">
        {/* Section title */}
        <div className="flex items-end gap-10">
          <h1 className="text-xl font-semibold leading-none">{title}</h1>
          <div className="space-x-2 text-xs">
            <span>{formatTime(startTime)}</span>
            <span>-</span>
            <span>{formatTime(endTime)}</span>
          </div>
        </div>

        {/* Second line */}
        <div className="mt-6 flex w-full items-end justify-between text-sm">
          <div className="">
            <span className={styleByState}>
              {formatDuration(remainingTime, { positiveSign: true })}
            </span>
            <span className="mx-1">/</span>
            <span>{formatDuration(sectionDuration)}</span>
          </div>
          <div className="space-x-2">
            <span>
              <span className="font-semibold">start: </span>
              {formatTime(startTime)}
            </span>
            <span className="text-lg">+</span>
          </div>
        </div>
      </header>

      <div className="mt-4">
        <TaskList />
        <ModeProvider>
          <AddTask />
        </ModeProvider>
      </div>
      <div className="px-3 py-2 text-right">
        <span className="text-gray-700">SUM: </span>
        {formatDuration(totalTime)}
      </div>
    </>
  );
}

export default Section;
