import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

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
};

const taskListSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [] as Task[],
  },
  reducers: {
    addTask: (state, action) => {
      const { content } = action.payload;
      state.tasks.push({
        id: uuidv4(),
        content,
        duration: {
          morning: 0,
          afternoon: 0,
        },
        percent: {
          value: 0,
          allDay: false,
        },
      });
    },
  },
});

export const taskListActions = taskListSlice.actions;
export default taskListSlice.reducer;
