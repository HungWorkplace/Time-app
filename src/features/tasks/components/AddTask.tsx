import TaskMode from "../features/modes/TaskMode";

function AddTask() {
  return (
    <div className="w-full flex py-2 border-b border-[#F0F1F3]">
      <input
        type="text"
        className="flex-[2_2_0%] font-semibold outline-none placeholder:font-normal placeholder:text-[#C8C8C8]"
        placeholder="Task Name"
      />
      <div className="flex-1 flex gap-3">
        <TaskMode />
      </div>
    </div>
  );
}

export default AddTask;
