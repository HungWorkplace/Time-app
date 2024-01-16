// SectionTaskProvider
import { createContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

export const SectionTaskContext = createContext({});

function SectionTaskProvider({ part, children }) {
  const [tempoDuration, setTempoDuration] = useState(0);
  const [ready, setReady] = useState(false);
  const [activeWarning, setActiveWarning] = useState({
    value: false,
    animationKey: 0,
  });
  const tasks = useSelector((state) => state.taskList.tasks);

  // All tasks in this section
  const sectionTasks = tasks.map((task) => {
    if (task.partOfDayId[0] === part.id) {
      return task;
    }
  });

  // Total time of all tasks
  const totalTasksTime = sectionTasks.reduce(
    (sum, task) => sum + task.duration,
    0,
  );

  // Duration of Section (Morning: 3:30)
  const sectionDuration = part.endTime - part.startTime;
  const freeTime = useMemo(() => {
    return sectionDuration - totalTasksTime - +tempoDuration;
  }, [sectionDuration, totalTasksTime, tempoDuration]);

  useEffect(() => {
    freeTime < 0 ? setReady(false) : setReady(true);
  }, [freeTime]);

  const value = {
    part,
    sectionTasks,
    totalTasksTime,
    tempoDuration,
    setTempoDuration,
    freeTime,
    sectionDuration,
    ready,
    setReady,
    activeWarning,
    setActiveWarning,
  };

  return (
    <SectionTaskContext.Provider value={value}>
      {children}
    </SectionTaskContext.Provider>
  );
}

export default SectionTaskProvider;
