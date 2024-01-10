import useSectionTaskContext from "@/contexts/useSectionTaskContext";
import AddTask from "../tasks/components/AddTask";
import TaskList from "../tasks/components/TaskList";
import ModeProvider from "../tasks/features/modes/contexts/mode-context";
import { cva } from "class-variance-authority";
import { timeFormat } from "@/utils/dateTimeFormat";

function Section() {
  const { part, remainingTime, totalTime, sectionDuration } =
    useSectionTaskContext();

  const variants = cva("font-bold", {
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
    <div className="text-sm">
      <header className="flex w-full items-center justify-between border-b-2 border-dashed px-4 py-2">
        <div>
          <span className={styleByState}>
            {timeFormat(remainingTime, { positiveSign: true })}
          </span>
          <span className="mx-1">/</span>
          <span>{timeFormat(sectionDuration)}</span>
        </div>
        <div className="text-right">
          <h1 className="font-semibold ">{part.title}</h1>
          <p className="font-semibold">{timeFormat(totalTime)}</p>
        </div>
      </header>
      <TaskList />
      <ModeProvider>
        <AddTask />
      </ModeProvider>
    </div>
  );
}

export default Section;
