import { ArrowsOutLineVertical, Percent } from "@phosphor-icons/react";

const TASK_MODE = {
  minutes: {
    label: "minute",
    icon: "m",
  },
  percent: {
    label: "percent",
    icon: <Percent size={16} weight="bold" />,
  },
  flex: {
    label: "flex",
    icon: <ArrowsOutLineVertical size={16} weight="bold" />,
  },
};

export default TASK_MODE;
