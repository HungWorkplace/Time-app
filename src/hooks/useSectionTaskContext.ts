import { useContext } from "react";
import { SectionTaskContext } from "../contexts/combine-section-task";

const useSectionTaskContext = () => {
  return useContext(SectionTaskContext);
};

export default useSectionTaskContext;
