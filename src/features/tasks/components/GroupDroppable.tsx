import { useDroppable } from "@dnd-kit/core";
import Task from "./Task";

type GroupDroppable = {
  title: string;
  tasks: any;
};

function GroupDroppable({ title, tasks }: GroupDroppable) {
  const isEmptyTasks = tasks.length === 0;
  const { setNodeRef } = useDroppable({
    id: "group-" + title.toLowerCase(),
    disabled: !isEmptyTasks,
    data: {
      type: "group",
    },
  });

  return (
    <div ref={setNodeRef}>
      <div className="relative mb-4 h-8 border-b-2 border-dashed">
        <span className="absolute bottom-0 left-1/2 inline-block -translate-x-1/2 translate-y-1/2 bg-white px-2 font-medium">
          {title}
        </span>
      </div>
      {tasks?.map((task) => <Task key={task.id} task={task} />)}
      {isEmptyTasks && (
        <div className="h-10 w-full rounded-md bg-gray-100"></div>
      )}
    </div>
  );
}

export default GroupDroppable;
