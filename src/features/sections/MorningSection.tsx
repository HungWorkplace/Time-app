import AddTask from "../tasks/components/AddTask";
import TaskList from "../tasks/components/TaskList";

function MorningSection() {
  return (
    <div className="text-sm">
      <header className="w-full px-2 py-2 border-b bg-red-400">
        <p className="font-semibold">3:30</p>
      </header>
      <TaskList />
      <AddTask />
    </div>
  );
}

export default MorningSection;
