import useSectionTaskContext from "@/contexts/useSectionTaskContext";
import AddTask from "../tasks/components/AddTask";
import TaskList from "../tasks/components/TaskList";
import ModeProvider from "../../contexts/mode-context";
import { cva } from "class-variance-authority";
import { timeFormat } from "@/utils/dateTimeFormat";
import { Play, Plus } from "@phosphor-icons/react";

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
        <div className="flex items-center justify-between">
          <div className="flex items-end gap-9">
            <h1 className="text-xl font-semibold leading-none">{title}</h1>
            <div className="space-x-2 text-xs">
              <span>{timeFormat(startTime)}</span>
              <span>-</span>
              <span>{timeFormat(endTime)}</span>
            </div>
          </div>

          {/* Button play */}
          <span className="flex h-7 w-12 cursor-pointer items-center justify-center rounded-full bg-black">
            <Play size={16} color="white" />
          </span>
        </div>

        {/* Second line */}
        <div className="mt-6 flex w-full items-end justify-between text-sm">
          <div className="">
            <span className={styleByState}>
              {timeFormat(remainingTime, { positiveSign: true })}
            </span>
            <span className="mx-1">/</span>
            <span>{timeFormat(sectionDuration)}</span>
          </div>
          <div className="space-x-2">
            <span>
              <span className="font-semibold">start: </span>
              {timeFormat(startTime)}
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
        {timeFormat(totalTime)}
      </div>
    </>
  );
}

export default Section;
