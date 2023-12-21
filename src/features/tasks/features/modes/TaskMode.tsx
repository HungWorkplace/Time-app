import InputMode from "./input/InputMode";
import ModeSelect from "./ModeSelect";

function TaskMode() {
  return (
    <div className="flex gap-1 items-center">
      <ModeSelect />
      <InputMode />
    </div>
  );
}

export default TaskMode;
