import { useState } from "react";
import IconList from "./IconList";

function ModeSelect() {
  const [showModeIcon, setShowModeIcon] = useState(false);

  return (
    <div className="relative">
      <span
        onClick={() => setShowModeIcon((preState) => !preState)}
        className="font-bold px-3 rounded cursor-pointer select-none hover:bg-gray-100 "
      >
        m
      </span>
      {showModeIcon && (
        <IconList onClose={setShowModeIcon} showModeIcon={showModeIcon} />
      )}
    </div>
  );
}

export default ModeSelect;
