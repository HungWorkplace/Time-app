import { useEffect, useRef } from "react";
import useModeContext from "../hooks/useModeContext";

function InputTime() {
  const { touchedIconBox } = useModeContext();
  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (touchedIconBox > 0) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [touchedIconBox]);

  const handleChange = (event) => {
    const value = event.target.value;
    value.replace(/\D/, "");
  };

  const handleClick = () => {
    inputRef.current.select();
  };

  const handleKeyDown = (event) => {
    if (inputRef.current.value.length > 2) {
      event.preventDefault();
    }
  };

  return (
    <input
      ref={inputRef}
      defaultValue={0}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      type="number"
      className="border rounded-md outline-none py-1 w-10 text-center focus:border-sky-300"
    />
  );
}

export default InputTime;
