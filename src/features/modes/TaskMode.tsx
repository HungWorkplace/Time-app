import * as mode from "./";
import * as input from "../input";

export function TaskMode() {
  return (
    <div className="flex items-center gap-1">
      <mode.ModeSelect />
      <input.InputMode />
    </div>
  );
}
