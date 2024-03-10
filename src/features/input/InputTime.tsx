import { useEffect } from "react";
import useSectionTaskContext from "@/hooks/useSectionTaskContext";
import useModeContext from "@/hooks/useModeContext";

export function InputTime() {
  const { touchedIconBox, inputRef, addTask } = useModeContext();
  const { setTempoDuration } = useSectionTaskContext();

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
      const cutValue = value.slice(0, maxLength);
      inputRef.current.value = cutValue;
      setTempoDuration(+cutValue * 60 * 1000);
    } else {
      inputRef.current.value = value;
      setTempoDuration(+value * 60 * 1000);
    }
  };

  const handleClick = () => {
    inputRef.current.select();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
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
      className="w-10 border-b py-1 text-center text-sm outline-none focus:border-black"
    />
  );
}
