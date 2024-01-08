import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cx } from "class-variance-authority";
import { Duration } from "luxon";
import TASK_MODE from "../features/modes/mode";

function Task({ task, isOverlay }: { task: any; isOverlay: boolean }) {
  const { content, duration, mode } = task;

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
    "flex justify-between px-3 py-2 border-b border-[#F0F1F3] cursor-pointer bg-white rounded-md",
    {
      "relative z-50": isDragging,
      "shadow-md scale-100": isOverlay,
    }
  );

  const formatDuration = Duration.fromMillis(duration).toFormat("h:mm");

  const renderedModeIcon = () => {
    const { minutes, percent, flex } = TASK_MODE;

    switch (mode) {
      case minutes.label:
        return minutes.icon;
      case percent.label:
        return percent.icon;
      case flex.label:
        return flex.icon;
      default:
        return "";
    }
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={classes}
    >
      <p className="font-medium">{content}</p>

      <div className="flex gap-3 border-b border-dashed cursor-pointer">
        <span className="font-bold">{renderedModeIcon()}</span>
        <span>{formatDuration}</span>
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
