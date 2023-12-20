import { useEffect, useRef } from "react";
import TASK_MODE from "./mode";
import useModeContext from "./hooks/useModeContext";

interface IconList {
  onClose: any;
  showModeIcon: any;
}

function IconList({ onClose, showModeIcon }: IconList) {
  const modeList = useRef<HTMLDivElement>(null);
  const { minutes, percent, flex } = TASK_MODE;
  const { setCurrentMode } = useModeContext();

  //   Handle outside click
  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (modeList.current && !modeList.current.contains(event.target)) {
        onClose((prevState: any) => !prevState);
      }
    };

    if (showModeIcon) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  //   Handle switch icon
  const switchIcon = (mode: any) => {
    setCurrentMode(mode);
    onClose((prevState: any) => !prevState);
  };

  return (
    <div
      ref={modeList}
      className="absolute left-0 top-[120%] w-full bg-red-50 flex flex-col py-1 select-none"
    >
      <span
        onClick={() => switchIcon(minutes)}
        className="w-full text-center font-bold leading-none py-1 cursor-pointer hover:bg-white"
      >
        {minutes.icon}
      </span>
      <span
        onClick={() => switchIcon(percent)}
        className="w-full flex justify-center py-1 cursor-pointer hover:bg-white"
      >
        {percent.icon}
      </span>
      <span
        onClick={() => switchIcon(flex)}
        className="w-full flex justify-center py-1 cursor-pointer hover:bg-white"
      >
        {flex.icon}
      </span>
    </div>
  );
}

export default IconList;
