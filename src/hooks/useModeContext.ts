import { useContext } from "react";
import { ModeContext } from "../contexts/mode-context";

const useModeContext = () => {
  return useContext(ModeContext);
};

export default useModeContext;
