const MS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;

export const formatDuration = (milliseconds?: number | null): string => {
  if (!milliseconds || milliseconds <= 0) return "";

  const totalSeconds = Math.round(milliseconds / MS_PER_SECOND);
  const seconds = totalSeconds % SECONDS_PER_MINUTE;
  const totalMinutes = Math.floor(totalSeconds / SECONDS_PER_MINUTE);
  const minutes = totalMinutes % SECONDS_PER_MINUTE;
  const hours = Math.floor(totalMinutes / SECONDS_PER_MINUTE);

  const paddedSeconds = String(seconds).padStart(2, "0");

  if (hours === 0) return `${minutes}:${paddedSeconds}`;

  return `${hours}:${String(minutes).padStart(2, "0")}:${paddedSeconds}`;
};
