import { createContext, useRef, useState } from "react";
import TASK_MODE from "../features/tasks/features/modes/mode";
import { useDispatch } from "react-redux";
import { taskListActions } from "@/store/slices/taskListSlice";
import useSectionTaskContext from "./useSectionTaskContext";

export const ModeContext = createContext({
  currentMode: TASK_MODE.minutes,
});

interface ModeProvider {
  children: React.ReactNode;
}

function ModeProvider({ children }: ModeProvider) {
  const [currentMode, setCurrentMode] = useState(TASK_MODE.minutes);
  const [touchedIconBox, setTouchedIconBox] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null!);
  const inputContentRef = useRef<HTMLInputElement>(null!);

  const { tempoDuration, setTempoDuration } = useSectionTaskContext();

  const dispatch = useDispatch();

  const addTask = () => {
    const currentContent = inputContentRef.current;
    if (!currentContent.value.trim() || !inputRef.current.value) return;

    let duration = 0;
    let percentValue = 0;

    switch (currentMode.label) {
      case "minute":
        duration = parseInt(inputRef.current.value) * 60 * 1000;
        break;
      case "percent":
        duration = tempoDuration;
        percentValue = parseInt(inputRef.current.value);
        break;
      default:
        break;
    }

    dispatch(
      taskListActions.addTask({
        content: currentContent.value || "",
        duration,
        percent: {
          value: percentValue,
          allDay: false,
        },
        mode: currentMode.label,
      }),
    );

    currentContent.value = "";
    currentContent.focus();
    inputRef.current.value = "0";
    setTempoDuration(0);
  };

  const value = {
    currentMode,
    setCurrentMode,
    touchedIconBox,
    setTouchedIconBox,
    inputRef,
    inputContentRef,
    addTask,
  };

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export default ModeProvider;
