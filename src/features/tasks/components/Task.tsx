import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cx } from "class-variance-authority";
import TASK_MODE from "../features/modes/mode";
import { timeFormat } from "@/utils/dateTimeFormat";

function Task({ task, isOverlay }: { task: any; isOverlay: boolean }) {
  const { content, duration, mode, percent: percentTask } = task;

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: task });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const classes = cx(
    "flex justify-between px-3 py-2 border-b border-[#F0F1F3] cursor-pointer bg-white rounded-md transition-[width] ease-in duration-300",
    {
      "relative z-50": isDragging,
      "shadow-md w-[95%]": isOverlay,
    },
  );

  const renderedMode = (() => {
    const { minutes, percent, flex } = TASK_MODE;

    switch (mode) {
      case minutes.label:
        return { icon: minutes.icon };
      case percent.label:
        return { icon: percent.icon, value: percentTask.value };
      case flex.label:
        return { icon: flex.icon };
      default:
        return "";
    }
  })();

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={classes}
    >
      <p className="font-medium">{content}</p>

      <div className="flex cursor-pointer items-end gap-3 border-b border-dashed">
        {renderedMode.value && (
          <span className="text-xs">{renderedMode.value}</span>
        )}
        <span className="font-bold">{renderedMode.icon}</span>
        <span className="w-9 text-right">{timeFormat(duration)}</span>
      </div>

      {isDragging && (
        <>
          <div className="absolute inset-0 rounded-md bg-gray-100"></div>
          <div className="absolute inset-x-0 top-0 h-0.5 bg-[#a0caf2]"></div>
        </>
      )}
    </div>
  );
}

export default Task;
