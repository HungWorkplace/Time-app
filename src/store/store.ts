import { configureStore } from "@reduxjs/toolkit";
import taskListReducer from "./slices/taskListSlice";

const store = configureStore({
  reducer: {
    taskList: taskListReducer,
  },
});

export default store;
