import { createContext, useRef, useState } from "react";
import TASK_MODE from "../mode";
import { useDispatch } from "react-redux";
import { taskListActions } from "@/store/slices/taskListSlice";

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

  const dispatch = useDispatch();

  const addTask = () => {
    const currentContent = inputContentRef.current;
    if (!currentContent.value.trim() || !inputRef.current.value) return;

    const duration = parseInt(inputRef.current.value) * 60 * 1000;

    dispatch(
      taskListActions.addTask({
        content: currentContent.value || "",
        duration,
        mode: currentMode.label,
      })
    );

    currentContent.value = "";
    currentContent.focus();
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
