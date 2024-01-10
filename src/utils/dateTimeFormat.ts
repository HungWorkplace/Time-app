import { Duration } from "luxon";

export const timeFormat = (
  milliseconds: number,
  symbol = { positiveSign: false },
) => {
  const sign =
    milliseconds < 0 ? "-" : milliseconds > 0 && symbol.positiveSign ? "+" : "";

  return (
    sign + Duration.fromMillis(milliseconds).toFormat("h:mm").replace(/-/g, "")
  );
};
