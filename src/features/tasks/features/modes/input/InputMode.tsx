import useModeContext from "../hooks/useModeContext";
import TASK_MODE from "../mode";
import InputPercent from "./InputPercent";
import InputTime from "./InputTime";

function InputMode() {
  const { currentMode } = useModeContext();

  const inputRendered = () => {
    const { minutes, percent, flex } = TASK_MODE;

    switch (currentMode.label) {
      case minutes.label:
        return <InputTime />;
      case percent.label:
        return <InputPercent />;
      case flex.label:
        return;
      default:
        return;
    }
  };

  return <div>{inputRendered()}</div>;
}

export default InputMode;
