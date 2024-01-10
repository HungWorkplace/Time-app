import { useEffect, useRef, useState } from "react";
import useModeContext from "../hooks/useModeContext";
import { timeFormat } from "@/utils/dateTimeFormat";
import useSectionTaskContext from "@/contexts/useSectionTaskContext";

function InputPercent() {
  const { touchedIconBox } = useModeContext();
  const { sectionDuration, totalTime, tempoDuration, setTempoDuration } =
    useSectionTaskContext();
  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (touchedIconBox > 0) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [touchedIconBox]);

  const preview = (value: number) => {
    const remainingTime = sectionDuration - totalTime;
    const calculatePercent = remainingTime * (value / 100);
    setTempoDuration(calculatePercent);
  };

  const handleChange = (event: any) => {
    const maxValue = 100;
    const value = parseInt(event.target.value) || 0;

    if (value > maxValue) {
      inputRef.current.value = 100 + "";
      preview(100);
    } else {
      inputRef.current.value = value + "";
      preview(value);
    }
  };

  const handleClick = () => {
    inputRef.current.select();
  };

  return (
    <div className="flex gap-1">
      <input
        ref={inputRef}
        defaultValue={0}
        onChange={handleChange}
        onClick={handleClick}
        autoComplete="off"
        id="percent-input"
        type="number"
        className="w-10 rounded-md border py-1 text-center text-xs outline-none focus:border-pink-300"
      />
      <span>-</span>
      <span className="flex items-center rounded-md bg-gray-100 px-2 text-center text-xs">
        {timeFormat(+tempoDuration)}
      </span>
    </div>
  );
}

export default InputPercent;
