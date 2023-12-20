import { createContext, useState } from "react";
import TASK_MODE from "../mode";

export const ModeContext = createContext({
  currentMode: TASK_MODE.minutes,
});

interface ModeProvider {
  children: React.ReactNode;
}

function ModeProvider({ children }: ModeProvider) {
  const [currentMode, setCurrentMode] = useState(TASK_MODE.minutes);
  const [touchedIconBox, setTouchedIconBox] = useState(0);

  const value = {
    currentMode,
    setCurrentMode,
    touchedIconBox,
    setTouchedIconBox,
  };

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export default ModeProvider;
