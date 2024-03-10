import { DateTime, Duration } from "luxon";

interface optionsType {
  plusSign?: boolean;
  seconds?: boolean;
  type?: "represent" | "digit";
}

export const formatDuration = (
  milliseconds: number,
  options: optionsType = {
    plusSign: false,
    seconds: false,
    type: "represent",
  },
) => {
  const { plusSign, seconds, type } = options;

  let duration = Duration.fromMillis(milliseconds);

  const sign = milliseconds < 0 ? "-" : milliseconds > 0 && plusSign ? "+" : "";

  const { hour, minute } = DateTime.fromObject({
    hour: 0,
    minute: 0,
    second: 0,
  }).plus(duration);

  let format: string;

  if (type === "represent") {
    format =
      hour === 0 && minute === 0
        ? "s's'"
        : hour > 0
          ? "h'h'mm"
          : minute < 0
            ? "mm'm'"
            : "m'm'";
  } else {
    duration = duration.shiftTo("minute", "second");
    format = "mm:ss";
  }

  return sign + duration.toFormat(format).replace(/-/g, "");
};

export const formatTime = (milliseconds: number) => {
  return DateTime.fromMillis(milliseconds).toFormat("h:mm a").toLowerCase();
};
