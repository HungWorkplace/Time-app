import useSectionTaskContext from "@/contexts/useSectionTaskContext";
import AddTask from "../tasks/components/AddTask";
import TaskList from "../tasks/components/TaskList";
import ModeProvider from "../../contexts/mode-context";
import { formatDuration, formatTime } from "@/utils/dateTimeFormat";
import Progress from "@/components/Progress";
import { Play } from "@phosphor-icons/react";
import CountDown from "../tasks/components/CountDown";
import { useState } from "react";
import { cx } from "class-variance-authority";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import CountdownTaskList from "../tasks/components/CountdownTaskList";

function Section() {
  const {
    part,
    totalTasksTime,
    ready,
    setReady,
    freeTime,
    start,
    setStart,
    initialRunTime,
  } = useSectionTaskContext();

  const [open, setOpen] = useState(false);

  const { title, startTime, endTime } = part;

  const checkError = () => {
    if (!ready.value) {
      setReady((preState) => ({
        ...preState,
        animationKey: preState.animationKey + 1,
      }));
      return;
    }

    if (freeTime > 0) {
      setOpen(true);
    }
  };

  const startCountdown = () => {
    setStart(true);
    initialRunTime();
  };

  const buttonClasses = cx(
    "flex h-[2.1875rem] w-[4.75rem] items-center justify-center rounded-full",
    {
      "bg-black": ready.value,
      "bg-[#CACACA]": !ready.value,
    },
  );

  const startJSX = {
    notStart: {
      button: (
        <div className="flex items-center justify-center gap-6">
          <button onClick={checkError} className={buttonClasses}>
            <Play size={18} color="white" />
          </button>
          <p className="text-xs">
            <span className="mr-2 font-semibold">start:</span>
            <span>{formatTime(startTime)}</span>
          </p>
        </div>
      ),
      taskList: <TaskList />,
      addTask: (
        <ModeProvider>
          <AddTask />
        </ModeProvider>
      ),
    },
    start: {
      countdown: (
        <div className="mb-6">
          <CountDown onStart={setStart} />
        </div>
      ),
      taskList: <CountdownTaskList />,
    },
  };

  return (
    <div className="flex flex-col gap-8">
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

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              <span>You have</span>
              <span className="mx-1 font-semibold">
                {formatDuration(freeTime)}
              </span>
              <span>unused time left, do you still want to continue?</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <button onClick={startCountdown}>Continue</button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {start ? startJSX.start.countdown : startJSX.notStart.button}

      {/* Tasks */}
      <div>
        {start ? startJSX.start.taskList : startJSX.notStart.taskList}
        {!start && startJSX.notStart.addTask}

        <div className="flex h-10 items-center justify-end gap-2 border-t px-3 text-xs">
          <span className="text-gray-300">SUM</span>
          <span>{formatDuration(totalTasksTime)}</span>
        </div>
      </div>
    </div>
  );
}

export default Section;
