import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cx } from "class-variance-authority";
import { formatDuration } from "@/utils/dateTimeFormat";
import useSectionTaskContext from "@/contexts/useSectionTaskContext";
import { CheckSquare } from "@phosphor-icons/react";
import { useState } from "react";
import { STATUS } from "@/utils/constains";

function Task({ task, isOverlay }: { task: any; isOverlay?: boolean }) {
  const { title, duration } = task;
  const { ready, start } = useSectionTaskContext();
  const [checked, setChecked] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { task, type: "task" } });

  // DOC: Transform - scale x times element
  // Translate: Not scale
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    // touchAction: "none", // to prevent scrolling on mobile devices (when use only Ponter Events)
  };

  const groupClasses = cx(
    "flex justify-between items-center px-2 h-10 border-b border-[#F0F1F3] cursor-pointer bg-white transition-[width] ease-in duration-300 select-none",
    {
      "relative z-50": isDragging,
      "shadow-md w-[95%] rounded-md ": isOverlay,
      "border-black": start && task.status === STATUS.DOING,
      "text-[#757575]": start && task.status === STATUS.NOT_STARTED,
    },
  );

  const titleClasses = cx("flex-1 text-sm font-medium", {
    "font-normal": start && task.status === STATUS.NOT_STARTED,
  });

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
        !start && ready.value && duration <= 0,
    },
  );

  return (
    <div ref={setNodeRef} style={style} className={groupClasses}>
      <div className="flex flex-1 justify-center gap-3">
        <div className="flex items-center gap-2">
          <div
            className="relative select-none"
            onClick={() => setChecked((preState) => !preState)}
          >
            <CheckSquare
              className={!checked ? "opacity-0" : ""}
              size={20}
              color="#2383e2"
              weight="fill"
            />

            {!checked && (
              <div className="absolute inset-0 m-0.5 rounded-sm border border-transparent transition hover:border-black"></div>
            )}
          </div>
          {start && task.status === STATUS.DOING && (
            <div className="h-1.5 w-1.5 rounded-full bg-black"></div>
          )}
        </div>
        <p {...attributes} {...listeners} className={titleClasses}>
          {title}
        </p>
      </div>

      <div key={ready.animationKey} className={durationClasses}>
        <span className="text-right font-time text-xs">
          {formatDuration(duration)}
        </span>
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
