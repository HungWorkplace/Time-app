import { useEffect, useRef } from "react";
import { TASK_MODE } from "../../utils/constantsTSX";
import useModeContext from "../../hooks/useModeContext";

interface IconList {
  onClose: any;
  showModeIcon: any;
}

export function IconList({ onClose, showModeIcon }: IconList) {
  const modeList = useRef<HTMLDivElement>(null);
  const { minutes, percent, flex } = TASK_MODE;
  const { setCurrentMode, setTouchedIconBox } = useModeContext();

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

    setTouchedIconBox((preState: number) => preState + 1);
  };

  return (
    <div
      ref={modeList}
      className="absolute left-0 top-[120%] flex w-full select-none flex-col bg-red-50 py-1"
    >
      <span
        onClick={() => switchIcon(minutes)}
        className="w-full cursor-pointer py-1 text-center font-bold leading-none hover:bg-white"
      >
        {minutes.icon}
      </span>
      <span
        onClick={() => switchIcon(percent)}
        className="flex w-full cursor-pointer justify-center py-1 hover:bg-white"
      >
        {percent.icon}
      </span>
      <span
        onClick={() => switchIcon(flex)}
        className="flex w-full cursor-pointer justify-center py-1 hover:bg-white"
      >
        {flex.icon}
      </span>
    </div>
  );
}
