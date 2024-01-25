import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { DUMMY_TASKS } from "./dummyData";
import { STATUS } from "@/utils/constains";

type Task = {
  id: string;
  partOfDayId: string[];
  title: string;
  duration: number;
  percent: {
    value: number;
    allDay: boolean;
  };
  mode: "minute" | "percent" | "flex";
  status: string;
};

const taskListSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: DUMMY_TASKS as Task[],
    partOfDays: [
      {
        id: "part-1",
        title: "Morning",
        taskIds: [
          "task-0",
          "task-1",
          "task-2",
          "task-3",
          "task-4",
          "task-5",
          "task-6",
        ],
        startTime: new Date().setHours(7, 30, 0),
        endTime: new Date().setHours(11, 55, 0),
      },
    ],
  },
  reducers: {
    addTask: (state, action) => {
      const { title, duration, mode, percent } = action.payload;
      state.tasks.push({
        id: uuidv4(),
        partOfDayId: ["part-1"],
        title,
        duration,
        percent: {
          value: percent.value || 0,
          allDay: percent.allDay || false,
        },
        mode,
        status: STATUS.NOT_STARTED,
      });
    },

    setTaskIds: (state, action) => {
      const part = state.partOfDays.find(
        (part) => part.id === action.payload.id,
      );

      if (part) {
        part.taskIds = action.payload.taskIds;
      }
    },
    // action: {id, status}
    setTaskStatus: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
      }
    },
  },
});

export const taskListActions = taskListSlice.actions;
export default taskListSlice.reducer;
