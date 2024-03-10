import useModeContext from "@/hooks/useModeContext";
import { TASK_MODE } from "../../utils/constantsTSX";
import * as input from "./";

export function InputMode() {
  const { currentMode } = useModeContext();

  const inputRendered = () => {
    const { minutes, percent, flex } = TASK_MODE;

    switch (currentMode.label) {
      case minutes.label:
        return <input.InputTime />;
      case percent.label:
        return <input.InputPercent />;
      case flex.label:
        return;
      default:
        return;
    }
  };

  return <div>{inputRendered()}</div>;
}
