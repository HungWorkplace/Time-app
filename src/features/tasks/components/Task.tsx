import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cx } from "class-variance-authority";
import { formatDuration } from "@/utils/dateTimeFormat";
import useSectionTaskContext from "@/contexts/useSectionTaskContext";

function Task({ task, isOverlay }: { task: any; isOverlay: boolean }) {
  const { title, duration } = task;
  const { ready } = useSectionTaskContext();

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
    "flex justify-between items-center px-3 h-10 border-b border-[#F0F1F3] cursor-pointer bg-white transition-[width] ease-in duration-300",
    {
      "relative z-50": isDragging,
      "shadow-md w-[95%] rounded-md ": isOverlay,
    },
  );

  // const renderedMode = (() => {
  //   const { minutes, percent, flex } = TASK_MODE;

  //   switch (mode) {
  //     case minutes.label:
  //       return { icon: minutes.icon };
  //     case percent.label:
  //       return { icon: percent.icon, value: percentTask.value };
  //     case flex.label:
  //       return { icon: flex.icon };
  //     default:
  //       return "";
  //   }
  // })();

  const durationClasses = cx(
    "flex cursor-pointer items-end gap-3 border-b border-dashed",
    {
      "animation-bound border-red-500 text-red-500":
        ready.value && duration <= 0,
    },
  );

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={classes}
    >
      <p className="text-sm font-medium">{title}</p>

      <div key={ready.animationKey} className={durationClasses}>
        <span className="text-right text-xs">{formatDuration(duration)}</span>
      </div>

      {isDragging && (
        <>
          <div className="absolute inset-0 bg-gray-100"></div>
          <div className="absolute inset-x-0 top-0 h-0.5 bg-[#a0caf2]"></div>
        </>
      )}
    </div>
  );
}

export default Task;
