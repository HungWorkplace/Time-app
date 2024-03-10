import { useDroppable } from "@dnd-kit/core";
import * as taskBarrel from "./";
import { cx } from "class-variance-authority";

type GroupDroppable = {
  title: string;
  tasks: any;
};

export function GroupDroppable({ title, tasks }: GroupDroppable) {
  const isEmptyTasks = tasks.length === 0;
  const { setNodeRef, isOver } = useDroppable({
    id: "group-" + title.toLowerCase(),
    disabled: !isEmptyTasks,
    data: {
      type: "group",
    },
  });

  const titleWrapperClasses = cx("relative mb-4 h-8 border-b-2 border-dashed", {
    "border-sky-200": isEmptyTasks && isOver,
  });

  const titleClasses = cx(
    "absolute bottom-0 left-1/2 inline-block -translate-x-1/2 translate-y-1/2 bg-white px-2 font-medium",
    {
      "text-sky-500": isEmptyTasks && isOver,
    },
  );

  const placeholderClasses = cx("rounded-md", {
    "h-10 w-full bg-[#F8F8F8]": isEmptyTasks,
    "bg-sky-100": isOver,
  });

  return (
    <div ref={setNodeRef}>
      <div className={titleWrapperClasses}>
        <span className={titleClasses}>{title}</span>
      </div>
      {tasks?.map((task) => <taskBarrel.Task key={task.id} task={task} />)}
      {isEmptyTasks && <div className={placeholderClasses}></div>}
    </div>
  );
}
