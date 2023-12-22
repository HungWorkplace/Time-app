import { useSelector } from "react-redux";
import Task from "./Task";

function TaskList() {
  const tasks = useSelector((state) => state.taskList.tasks);

  const renderedTaskList = tasks.map((task) => {
    return <Task key={task.id} task={task} />;
  });

  return <div className="pt-5">{renderedTaskList}</div>;
}

export default TaskList;
