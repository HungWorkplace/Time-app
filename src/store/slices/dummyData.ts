import { STATUS } from "@/utils/constants";

export const DUMMY_TASKS = [
  {
    id: "task-0",
    partOfDayId: ["part-1"],
    title: "Drink water",
    duration: 10 * 60 * 1000,
    counter: {
      elapsedTime: 0,
      stopwatch: [],
    },
    percent: {
      value: 0,
      allDay: false,
    },
    mode: "minute",
    status: STATUS.NOT_STARTED,
  },
  {
    id: "task-1",
    partOfDayId: ["part-1"],
    title: "Exercise for 30 minutes",
    duration: 2 * 60 * 1000,
    counter: {
      elapsedTime: 0,
      stopwatch: [],
    },
    percent: {
      value: 0,
      allDay: false,
    },
    mode: "minute",
    status: STATUS.NOT_STARTED,
  },
  {
    id: "task-2",
    partOfDayId: ["part-1"],
    title: "Read a book",
    duration: 1 * 10 * 1000,
    counter: {
      elapsedTime: 0,
      stopwatch: [],
    },
    percent: {
      value: 0,
      allDay: false,
    },
    mode: "minute",
    status: STATUS.NOT_STARTED,
  },
  {
    id: "task-3",
    partOfDayId: ["part-1"],
    title: "Write a journal",
    duration: 30 * 60 * 1000,
    counter: {
      elapsedTime: 0,
      stopwatch: [],
    },
    percent: {
      value: 0,
      allDay: false,
    },
    mode: "minute",
    status: STATUS.NOT_STARTED,
  },
  {
    id: "task-4",
    partOfDayId: ["part-1"],
    title: "Learn a new skill",
    duration: 20 * 60 * 1000,
    counter: {
      elapsedTime: 0,
      stopwatch: [],
    },
    percent: {
      value: 0,
      allDay: false,
    },
    mode: "minute",
    status: STATUS.NOT_STARTED,
  },
  {
    id: "task-5",
    partOfDayId: ["part-1"],
    title: "walking the dog",
    duration: 20 * 60 * 1000,
    counter: {
      elapsedTime: 0,
      stopwatch: [],
    },
    percent: {
      value: 0,
      allDay: false,
    },
    mode: "minute",
    status: STATUS.NOT_STARTED,
  },
  {
    id: "task-6",
    partOfDayId: ["part-1"],
    title: "Jogging",
    duration: 20 * 60 * 1000,
    counter: {
      elapsedTime: 0,
      stopwatch: [],
    },
    percent: {
      value: 0,
      allDay: false,
    },
    mode: "minute",
    status: STATUS.NOT_STARTED,
  },
];
