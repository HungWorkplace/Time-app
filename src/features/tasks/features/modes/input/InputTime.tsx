import { useEffect, useRef } from "react";
import useModeContext from "../hooks/useModeContext";

function InputTime() {
  const { touchedIconBox, inputRef, addTask } = useModeContext();

  useEffect(() => {
    if (touchedIconBox > 0) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [touchedIconBox, inputRef]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maxLength = 3;
    const paresInt = parseInt(event.target.value);
    const value = Number.isNaN(paresInt) ? "0" : paresInt.toString();

    if (value.length > maxLength) {
      inputRef.current.value = value.slice(0, maxLength);
    } else {
      inputRef.current.value = value;
    }
  };

  const handleClick = () => {
    inputRef.current.select();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
      inputRef.current.value = "0";
      return;
    }
  };

  return (
    <input
      ref={inputRef}
      defaultValue={0}
      onChange={handleChange}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      autoComplete="off"
      id="minute-input"
      type="number"
      className="border rounded-md outline-none py-1 w-10 text-center text-xs focus:border-sky-300"
    />
  );
}

export default InputTime;
