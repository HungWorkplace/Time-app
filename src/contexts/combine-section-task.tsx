// SectionTaskProvider
import { STATUS } from "@/utils/constants";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskListActions } from "@/store/slices/taskListSlice";

export const SectionTaskContext = createContext({});

type runningTask = {
  duration: number;
  type: "wait" | "task";
  nonstop: boolean;
  endTime: number;
  data: {
    id: string;
    title: string;
  };
};

function SectionTaskProvider({ part, children }) {
  const [tempoDuration, setTempoDuration] = useState(0);
  const [start, setStart] = useState(false);
  const [runningTask, setRunningTask] = useState<runningTask>({});
  const [ready, setReady] = useState({
    value: false,
    animationKey: 0,
  });

  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.taskList.tasks);

  // Map loops
  // const sectionTasks = useMemo(() => {
  //   return tasks.map((task) => {
  //     if (task.partOfDayId[0] === part.id) {
  //       return task;
  //     }
  //   });
  // }, [part.id, tasks]);
  const sectionTasks = useMemo(() => {
    return part.taskIds.map((taskId) =>
      tasks.find((task) => task.id === taskId),
    );
  }, [part.taskIds, tasks]);

  const totalTasksTime = sectionTasks.reduce(
    (sum, task) => sum + task.duration,
    0,
  );

  const isEmptyDuration = sectionTasks.every((task) => task.duration <= 0);

  const sectionStatus = useMemo(() => {
    return sectionTasks.some((task) => task.status === STATUS.DOING)
      ? STATUS.DOING
      : sectionTasks.every((task) => task.status === STATUS.DONE)
        ? STATUS.DONE
        : STATUS.NOT_STARTED;
  }, [sectionTasks]);

  const sectionDuration = part.endTime - part.startTime;

  const freeTime = useMemo(() => {
    return sectionDuration - totalTasksTime - +tempoDuration;
  }, [sectionDuration, totalTasksTime, tempoDuration]);

  useEffect(() => {
    if (freeTime < 0 || isEmptyDuration) {
      setReady((preState) => ({ ...preState, value: false }));
      return;
    }
    setReady((preState) => ({ ...preState, value: true }));
  }, [freeTime, isEmptyDuration]);

  const initialRunTime = () => {
    if (sectionStatus === STATUS.NOT_STARTED) {
      const now = new Date().setHours(7, 29, 55);
      const waitingTime = Math.round((part.startTime - now) / 1000) * 1000;

      setRunningTask({
        duration: waitingTime,
        type: "wait",
        nonstop: false,
        endTime: part.startTime,
        data: {
          id: "wait",
          title: "Waiting for start time...",
        },
      });
    }
  };

  const nextTask = useCallback(() => {
    if (runningTask.type === "task") {
      dispatch(
        taskListActions.setTaskStatus({
          id: runningTask.data.id,
          status: STATUS.DONE,
        }),
      );
    }

    const next = sectionTasks.find((task) => {
      return (
        (task.status === STATUS.NOT_STARTED || task.status === STATUS.DOING) &&
        task.id !== runningTask.data.id
      );
    });

    if (next) {
      dispatch(
        taskListActions.setTaskStatus({
          id: next.id,
          status: STATUS.DOING,
        }),
      );
    }

    setRunningTask({
      duration: next.duration - 1000,
      nonstop: false,
      type: "task",
      endTime: Date.now() + next.duration,
      data: next,
    });
  }, [runningTask]);

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
    start,
    setStart,
    runningTask,
    setRunningTask,
    initialRunTime,
    nextTask,
    // intervalId, setIntervalId
  };

  return (
    <SectionTaskContext.Provider value={value}>
      {children}
    </SectionTaskContext.Provider>
  );
}

export default SectionTaskProvider;
