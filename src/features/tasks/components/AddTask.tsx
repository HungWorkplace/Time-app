import { useState } from "react";
import TaskMode from "../features/modes/TaskMode";
import ModeProvider from "../features/modes/contexts/mode-context";
import { useDispatch, useSelector } from "react-redux";
import { taskListActions } from "@/store/slices/taskListSlice";

function AddTask() {
  const [inputValue, setInputValue] = useState("");
  const state = useSelector((state) => state.taskList);
  console.log(state);
  const dispatch = useDispatch();

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      dispatch(
        taskListActions.addTask({
          content: inputValue,
        })
      );
    }
  };

  return (
    <div className="w-full flex py-2 border-b border-[#F0F1F3]">
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        type="text"
        className="flex-1 font-semibold outline-none placeholder:font-normal placeholder:text-[#C8C8C8]"
        placeholder="Task Name"
      />
      <div className="flex-1 flex justify-between gap-3">
        <ModeProvider>
          <TaskMode />
        </ModeProvider>

        <button className="rounded-lg px-2 bg-red-400 font-semibold text-white">
          Save
        </button>
      </div>
    </div>
  );
}

export default AddTask;
