import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import {
  formatDisplayDate,
  formatMonthDay,
  getDateKey,
  getDayRange,
  getLastNDateKeys,
  getLastNDaysStart,
  getTodayDate,
  normalizeCalendarDate,
  toStoredIntakeDate,
} from "@/lib/date";

describe("date helpers", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-05-05T14:30:00.000Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("converts a UTC timestamp into a Taipei date key", () => {
    expect(getDateKey("2026-05-05T23:30:00.000Z")).toBe("2026-05-06");
  });

  it("normalizes calendar dates to the start of the Taipei day", () => {
    const normalized = normalizeCalendarDate(new Date("2026-05-05T18:45:00.000Z"));

    expect(getDateKey(normalized)).toBe("2026-05-06");
    expect(normalized.toISOString()).toBe("2026-05-05T16:00:00.000Z");
  });

  it("stores intake dates at the day boundary and returns the correct query range", () => {
    const stored = toStoredIntakeDate("2026-05-05");
    const range = getDayRange("2026-05-05");

    expect(stored.toISOString()).toBe("2026-05-04T16:00:00.000Z");
    expect(range.start.toISOString()).toBe("2026-05-04T16:00:00.000Z");
    expect(range.end.toISOString()).toBe("2026-05-05T16:00:00.000Z");
  });

  it("formats display strings consistently for the UI", () => {
    expect(formatDisplayDate("2026-05-04T16:00:00.000Z")).toBe("05/05/2026");
    expect(formatMonthDay("2026-05-04T16:00:00.000Z")).toBe("05/05");
  });

  it("derives today and rolling date keys from the fixed system time", () => {
    const today = getTodayDate();

    expect(getDateKey(today)).toBe("2026-05-05");
    expect(getLastNDateKeys(3)).toEqual([
      "2026-05-03",
      "2026-05-04",
      "2026-05-05",
    ]);
    expect(getDateKey(getLastNDaysStart(3))).toBe("2026-05-03");
  });
});
