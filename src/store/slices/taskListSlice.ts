import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { DUMMY_TASKS } from "./dummyData";

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
        title: "Untitled",
        startTime: new Date().setHours(7, 0, 0),
        endTime: new Date().setHours(11, 55, 0),
      },
    ],
  },
  reducers: {
    addTask: (state, action) => {
      const { content, duration, mode } = action.payload;
      state.tasks.push({
        id: uuidv4(),
        partOfDayId: ["part-1"],
        content,
        duration,
        percent: {
          value: 0,
          allDay: false,
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
