import { DateTime, Duration } from "luxon";

export const formatDuration = (
  milliseconds: number,
  symbol = { positiveSign: false },
) => {
  const sign =
    milliseconds < 0 ? "-" : milliseconds > 0 && symbol.positiveSign ? "+" : "";

  return (
    sign + Duration.fromMillis(milliseconds).toFormat("h:mm").replace(/-/g, "")
  );
};

export const formatTime = (milliseconds: number) => {
  return DateTime.fromMillis(milliseconds).toFormat("h:mm a").toLowerCase();
};
