import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { DUMMY_TASKS } from "./dummyData";
import { Duration } from "luxon";

type Task = {
  id: string;
  partOfDayId: string[];
  content: string;
  duration: number;
  percent: {
    value: number;
    allDay: boolean;
  };
  mode: "minute" | "percent" | "flex";
};

const taskListSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: DUMMY_TASKS as Task[],
    partOfDays: [
      {
        id: "part-1",
        title: "Morning",
        startTime: Duration.fromObject({ hours: 7 }).toMillis(),
        endTime: Duration.fromObject({ hours: 11, minutes: 55 }).toMillis(),
      },
    ],
  },
  reducers: {
    addTask: (state, action) => {
      const { content, duration, mode, percent } = action.payload;
      state.tasks.push({
        id: uuidv4(),
        partOfDayId: ["part-1"],
        content,
        duration,
        percent: {
          value: percent.value || 0,
          allDay: percent.allDay || false,
        },
        mode,
      });
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const taskListActions = taskListSlice.actions;
export default taskListSlice.reducer;
