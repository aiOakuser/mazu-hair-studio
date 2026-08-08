import type { DayHours } from "./types";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function parseTimeToMinutes(time: string): number | null {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s?(am|pm)$/i);
  if (!match) return null;
  const [, hourStr, minuteStr, meridiem] = match;
  let hour = parseInt(hourStr, 10) % 12;
  if (meridiem.toLowerCase() === "pm") hour += 12;
  return hour * 60 + parseInt(minuteStr, 10);
}

function formatMinutes(totalMinutes: number): string {
  const hour24 = Math.floor(totalMinutes / 60) % 24;
  const minute = totalMinutes % 60;
  const meridiem = hour24 >= 12 ? "pm" : "am";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${minute.toString().padStart(2, "0")} ${meridiem}`;
}

/** Returns "Open until 6:00 pm" / "Opens at 10:00 am" / "Closed today" based on the current time. */
export function getOpenStatus(hours: DayHours[], now: Date = new Date()): string {
  const todayName = DAY_NAMES[now.getDay()];
  const today = hours.find((h) => h.day === todayName);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  if (today?.open && today.close) {
    const openMinutes = parseTimeToMinutes(today.open);
    const closeMinutes = parseTimeToMinutes(today.close);
    if (openMinutes !== null && closeMinutes !== null) {
      if (nowMinutes < openMinutes) {
        return `Opens at ${formatMinutes(openMinutes)}`;
      }
      if (nowMinutes < closeMinutes) {
        return `Open until ${formatMinutes(closeMinutes)}`;
      }
    }
  }
  return "Closed today";
}
