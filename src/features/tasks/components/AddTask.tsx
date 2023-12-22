import TaskMode from "../features/modes/TaskMode";
import useModeContext from "../features/modes/hooks/useModeContext";

function AddTask() {
  const { inputContentRef: inputRef, addTask } = useModeContext();

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="w-full flex py-2 border-b border-[#F0F1F3]">
      <input
        ref={inputRef}
        onChange={(e) => (inputRef.current.value = e.target.value)}
        onKeyDown={handleKeyDown}
        id="content-input"
        type="text"
        className="flex-[3_3_0%] font-semibold outline-none placeholder:font-normal placeholder:text-[#C8C8C8]"
        placeholder="Task Name"
      />
      <div className="flex-[2_2_0%] flex justify-between gap-3">
        <TaskMode />
        <button
          onClick={() => addTask()}
          className="rounded-lg px-2 bg-red-400 font-semibold text-white hover:bg-red-500"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default AddTask;
