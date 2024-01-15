import useSectionTaskContext from "@/contexts/useSectionTaskContext";
import { formatDuration } from "@/utils/dateTimeFormat";
import { useRef } from "react";

function Progress() {
  const {
    totalTasksTime: current,
    sectionDuration: total,
    freeTime,
    tempoDuration,
  } = useSectionTaskContext();
  const width = useRef(237);

  const fraction = (current + tempoDuration) / total;
  let totalProgress = width.current;
  let currentProgress = fraction * width.current;

  if (fraction > 1) {
    totalProgress = fraction * width.current;
    currentProgress = width.current;
  }

  const totalStyle = {
    width: totalProgress + "px",
    backgroundColor: fraction <= 1 ? "#D9D9D9" : "#FFC5C5",
  };

  const currentStyle = {
    width: currentProgress + "px",
  };

  const renderedOverLabel = (
    <>
      <span>Over </span>
      <span className="font-semibold">
        {formatDuration(current + tempoDuration - total)}
      </span>
    </>
  );

  return (
    <>
      <div style={totalStyle} className="mb-2 h-1 overflow-hidden rounded-full">
        <div style={currentStyle} className="h-full bg-black"></div>
      </div>
      <p className="text-xs">
        {fraction < 1 && (
          <>
            <span className="font-semibold">{formatDuration(freeTime)}</span>
            <span>
              <span className="mx-1.5">free of</span>
              <span className="cursor-pointer underline decoration-gray-400 decoration-dotted underline-offset-4">
                {formatDuration(total)}
              </span>
            </span>
          </>
        )}

        {fraction > 1 && renderedOverLabel}
        {fraction === 1 && "Ready to start!"}
      </p>
    </>
  );
}

export default Progress;
