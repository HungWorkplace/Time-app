import { DateTime, Duration } from "luxon";

interface optionsType {
  positiveSign?: boolean;
  seconds?: boolean;
}

export const formatDuration = (
  milliseconds: number,
  options: optionsType = { positiveSign: false, seconds: false },
) => {
  const { positiveSign, seconds } = options;

  const sign =
    milliseconds < 0 ? "-" : milliseconds > 0 && positiveSign ? "+" : "";

  const format = seconds ? "h:mm:ss" : "h:mm";

  return (
    sign + Duration.fromMillis(milliseconds).toFormat(format).replace(/-/g, "")
  );
};

export const formatTime = (milliseconds: number) => {
  return DateTime.fromMillis(milliseconds).toFormat("h:mm a").toLowerCase();
};
