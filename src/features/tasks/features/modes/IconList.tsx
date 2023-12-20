import { ArrowsOutLineVertical, Percent } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";

interface IconList {
  onClose: any;
  showModeIcon: any;
}

function IconList({ onClose, showModeIcon }: IconList) {
  const modeList = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={modeList}
      className="absolute left-0 top-[120%] w-full bg-red-50 flex flex-col py-1 select-none"
    >
      <span className="w-full text-center font-bold leading-none py-1 cursor-pointer hover:bg-white">
        m
      </span>
      <span className="w-full flex justify-center py-1 cursor-pointer hover:bg-white">
        <Percent size={16} weight="bold" />
      </span>
      <span className="w-full flex justify-center py-1 cursor-pointer hover:bg-white">
        <ArrowsOutLineVertical size={16} weight="bold" />
      </span>
    </div>
  );
}

export default IconList;
