import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useRef } from "react";
import useModeContext from "../hooks/useModeContext";

function InputPercent() {
  const { touchedIconBox } = useModeContext();
  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (touchedIconBox > 0) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [touchedIconBox]);

  const handleChange = (event: any) => {
    const maxValue = 100;
    const value = parseInt(event.target.value) || 0;

    if (value > maxValue) {
      inputRef.current.value = 100 + "";
    } else {
      inputRef.current.value = value + "";
    }
  };

  const handleClick = () => {
    inputRef.current.select();
  };

  return (
    <div className="flex gap-5">
      <input
        ref={inputRef}
        defaultValue={0}
        onChange={handleChange}
        onClick={handleClick}
        autoComplete="off"
        id="percent-input"
        type="number"
        className="border rounded-md outline-none py-1 w-10 text-center text-xs focus:border-pink-300"
      />
      <div className="flex gap-2 items-center">
        <p>All day</p>
        <Checkbox className="border-gray-300" />
      </div>
    </div>
  );
}

export default InputPercent;
