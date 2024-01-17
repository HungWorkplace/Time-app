import { useRef } from "react";
import useSectionTaskContext from "@/contexts/useSectionTaskContext";
import { formatDuration } from "@/utils/dateTimeFormat";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Progress() {
  const {
    totalTasksTime: current,
    sectionDuration: total,
    freeTime,
    tempoDuration,
    ready,
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
    animation: !ready.value && freeTime < 0 ? "1s ease-in bound" : undefined,
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
      {/* Progress bar */}
      <div
        key={ready.animationKey}
        style={totalStyle}
        className="mb-2 h-1 overflow-hidden rounded-full ease-in"
      >
        <div style={currentStyle} className="h-full bg-black"></div>
      </div>
      {/* Label */}
      <div className="text-xs">
        {fraction < 1 && (
          <>
            <span className="font-semibold">{formatDuration(freeTime)}</span>

            <span className="mx-1.5">free of</span>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="underline decoration-gray-400 decoration-dotted underline-offset-4">
                  {formatDuration(total)}
                </TooltipTrigger>
                <TooltipContent>
                  <p>7:00 am - 11:55 pm</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}

        {fraction > 1 && renderedOverLabel}
        {fraction === 1 && "Ready to start!"}
      </div>
    </>
  );
}

export default Progress;
