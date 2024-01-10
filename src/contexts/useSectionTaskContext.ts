import { useContext } from "react";
import { SectionTaskContext } from "./combine-section-task";

const useSectionTaskContext = () => {
  return useContext(SectionTaskContext);
};

export default useSectionTaskContext;
