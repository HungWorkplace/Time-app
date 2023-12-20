import { useState } from "react";
import IconList from "./IconList";
import useModeContext from "./hooks/useModeContext";

function ModeSelect() {
  const [showModeListBox, setShowModeListBox] = useState(false);
  const { currentMode } = useModeContext();

  return (
    <div className="relative">
      <span
        onClick={() => setShowModeListBox((preState) => !preState)}
        className="inline-flex items-center justify-center h-7 w-9 font-bold rounded cursor-pointer select-none hover:bg-gray-100 "
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
