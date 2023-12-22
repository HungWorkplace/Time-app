import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { DUMMY_TASKS } from "./dummyData";

type Task = {
  id: string;
  content: string;
  duration: {
    morning: number;
    afternoon: number;
  };
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
  },
  reducers: {
    addTask: (state, action) => {
      const { content, duration, mode } = action.payload;
      state.tasks.push({
        id: uuidv4(),
        content,
        duration: {
          morning: duration,
          afternoon: 0,
        },
        percent: {
          value: 0,
          allDay: false,
        },
        mode,
      });
    },
  },
});

export const taskListActions = taskListSlice.actions;
export default taskListSlice.reducer;
