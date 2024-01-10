export type addTask = (payload: {
  type: "minute" | "percent";
  duration?;
}) => void;
