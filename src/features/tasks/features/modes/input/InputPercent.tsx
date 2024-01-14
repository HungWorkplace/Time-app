import { useEffect } from "react";
import { formatDuration } from "@/utils/dateTimeFormat";
import useSectionTaskContext from "@/contexts/useSectionTaskContext";
import useModeContext from "@/contexts/useModeContext";

function InputPercent() {
  const { touchedIconBox, inputRef, addTask } = useModeContext();
  const { sectionDuration, tempoDuration, setTempoDuration } =
    useSectionTaskContext();

  useEffect(() => {
    if (touchedIconBox > 0) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [touchedIconBox, inputRef]);

  const preview = (value: number) => {
    const calculatePercent = sectionDuration * (value / 100);
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="flex gap-1">
      <input
        ref={inputRef}
        defaultValue={0}
        onChange={handleChange}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        id="percent-input"
        type="number"
        className="w-10 rounded-md border py-1 text-center text-xs outline-none focus:border-pink-300"
      />
      <span>-</span>
      <span className="flex items-center rounded-md bg-gray-100 px-2 text-center text-xs">
        {formatDuration(+tempoDuration)}
      </span>
    </div>
  );
}

export default InputPercent;
