import InputMode from "./input/InputMode";
import ModeSelect from "./ModeSelect";

function TaskMode() {
  return (
    <div className="flex items-center gap-1">
      <ModeSelect />
      <InputMode />
    </div>
  );
}

export default TaskMode;
