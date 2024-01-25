import { useState } from "react";
import TaskMode from "../features/modes/TaskMode";
import { Plus } from "@phosphor-icons/react";
import useModeContext from "@/contexts/useModeContext";

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
      className="absolute inset-0 flex cursor-pointer items-center gap-3 border-b bg-white px-2 py-2 text-[#8c95a2] hover:bg-[#f7f8f9]"
    >
      <Plus size={13} weight="bold" className="w-5 px-0.5 text-center" />
      <span>Add Task</span>
    </div>
  );

  return (
    <div className="relative w-full border-[#F0F1F3]">
      <div className="flex h-10 items-center justify-between border-b px-2 pl-10">
        {/* warning: input must have ID */}
        <input
          id="add-task"
          ref={inputRef}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          type="text"
          placeholder="Task Name"
          className="flex-1 text-sm font-medium outline-none placeholder:font-light placeholder:text-gray-400"
        />
        <div className="flex flex-1 justify-between gap-3">
          <TaskMode />
        </div>
      </div>

      {!activeAddBox && placeholderAddTaskJSX}
    </div>
  );
}

export default AddTask;
