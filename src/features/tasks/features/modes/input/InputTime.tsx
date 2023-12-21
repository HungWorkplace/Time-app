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

  return (
    <input
      ref={inputRef}
      defaultValue={0}
      onChange={handleChange}
      onClick={handleClick}
      type="number"
      className="border rounded-md outline-none py-1 w-10 text-center text-xs focus:border-sky-300"
    />
  );
}

export default InputTime;
