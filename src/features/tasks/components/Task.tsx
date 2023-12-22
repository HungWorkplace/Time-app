import { Duration } from "luxon";
import TASK_MODE from "../features/modes/mode";

function Task({ task }: { task: any }) {
  const { content, duration, mode } = task;

  const formatDuration = Duration.fromMillis(duration.morning).toFormat("h:mm");

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
    <div className="flex justify-between py-2 border-b border-[#F0F1F3]">
      <p className="font-medium">{content}</p>

      <div className="flex gap-3 border-b border-dashed cursor-pointer">
        <span className="font-bold">{renderedModeIcon()}</span>
        <span>{formatDuration}</span>
      </div>
    </div>
  );
}

export default Task;
