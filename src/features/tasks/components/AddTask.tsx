import { useState } from "react";
import TaskMode from "../features/modes/TaskMode";
import useModeContext from "../../../contexts/useModeContext";
import { Plus } from "@phosphor-icons/react";

function AddTask() {
  const [activeAddBox, setActiveAddBox] = useState(false);
  const { inputContentRef: inputRef, addTask } = useModeContext();

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      addTask();
      inputRef.current.focus();
    }
  };

  const handleClickPlaceholder = () => {
    setActiveAddBox(true);
    inputRef.current.focus();
  };

  const handleChange = (event) => {
    inputRef.current.value = event.target.value;
  };

  const placeholderAddTaskJSX = (
    <div
      onClick={handleClickPlaceholder}
      className="absolute inset-0 flex cursor-pointer items-center gap-2 border-b border-transparent bg-white px-3 py-2 text-[#8c95a2] hover:border-inherit hover:bg-[#f7f8f9]"
    >
      <Plus size={13} weight="bold" />
      <span>Add Task</span>
    </div>
  );

  return (
    <div className="relative w-full border-[#F0F1F3]">
      <div className="flex border-b px-3 py-2">
        <input
          ref={inputRef}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          type="text"
          className="flex-[3_3_0%] font-semibold outline-none placeholder:font-normal placeholder:text-[#C8C8C8]"
          placeholder="Task Name"
        />
        <div className="flex flex-[2_2_0%] justify-between gap-3">
          <TaskMode />
          <button
            onClick={() => addTask()}
            className="rounded-lg bg-red-400 px-2 font-semibold text-white hover:bg-red-500"
          >
            Save
          </button>
        </div>
      </div>

      {!activeAddBox && placeholderAddTaskJSX}
    </div>
  );
}

export default AddTask;
