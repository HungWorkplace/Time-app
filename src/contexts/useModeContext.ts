import { useContext } from "react";
import { ModeContext } from "./mode-context";

const useModeContext = () => {
  return useContext(ModeContext);
};

export default useModeContext;
