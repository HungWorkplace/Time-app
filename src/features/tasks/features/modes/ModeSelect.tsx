import { useState } from "react";
import IconList from "./IconList";
import useModeContext from "@/contexts/useModeContext";

function ModeSelect() {
  const [showModeListBox, setShowModeListBox] = useState(false);
  const { currentMode } = useModeContext();

  return (
    <div className="relative">
      <span
        onClick={() => setShowModeListBox((preState) => !preState)}
        className="inline-flex h-7 w-9 cursor-pointer select-none items-center justify-center rounded font-bold hover:bg-gray-100 "
      >
        {currentMode.icon}
      </span>
      {showModeListBox && (
        <IconList onClose={setShowModeListBox} showModeIcon={showModeListBox} />
      )}
    </div>
  );
}

export default ModeSelect;
