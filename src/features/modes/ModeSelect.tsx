import { useState } from "react";
import * as mode from "./";
import useModeContext from "@/hooks/useModeContext";

export function ModeSelect() {
  const [showModeListBox, setShowModeListBox] = useState(false);
  const { currentMode } = useModeContext();

  return (
    <div className="relative">
      <span
        onClick={() => setShowModeListBox((preState) => !preState)}
        className="inline-flex h-full w-9 cursor-pointer select-none items-center justify-center rounded text-sm font-bold hover:bg-gray-100 "
      >
        {currentMode.icon}
      </span>
      {showModeListBox && (
        <mode.IconList
          onClose={setShowModeListBox}
          showModeIcon={showModeListBox}
        />
      )}
    </div>
  );
}
