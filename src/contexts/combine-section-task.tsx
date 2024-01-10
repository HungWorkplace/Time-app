import { createContext, useState } from "react";
import { useSelector } from "react-redux";

export const SectionTaskContext = createContext({});

function SectionTaskProvider({ part, children }) {
  const [tempoDuration, setTempoDuration] = useState("");
  const tasks = useSelector((state) => state.taskList.tasks);

  // All tasks in this section
  const sectionTasks = tasks.map((task) => {
    if (task.partOfDayId[0] === part.id) {
      return task;
    }
  });

  // Total time of all tasks
  const totalTime = sectionTasks.reduce((sum, task) => sum + task.duration, 0);

  // Duration of Section (Morning: 3:30)
  const sectionDuration = part.endTime - part.startTime;
  const remainingTime = sectionDuration - totalTime - +tempoDuration;

  const value = {
    part,
    sectionTasks,
    totalTime,
    tempoDuration,
    setTempoDuration,
    remainingTime,
    sectionDuration,
  };

  return (
    <SectionTaskContext.Provider value={value}>
      {children}
    </SectionTaskContext.Provider>
  );
}

export default SectionTaskProvider;
