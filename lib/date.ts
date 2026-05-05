import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

/**
 * 專案日期處理守則
 *
 * 1. UI/日曆元件內部可以使用 Date，因為第三方元件通常吃 Date。
 * 2. 前後端傳輸「某一天」時，一律使用 YYYY-MM-DD（date key）。
 * 3. 跟資料庫查詢邊界有關的轉換，只能集中在這個檔案做。
 * 4. 所有 day-level 邏輯都以 Asia/Taipei 為準，避免時區偷偷偏移。
 */
export const APP_TIMEZONE = "Asia/Taipei";
export const DATE_KEY_FORMAT = "YYYY-MM-DD";
export const DISPLAY_DATE_FORMAT = "MM/DD/YYYY";
export const DISPLAY_LONG_DATE_FORMAT = "MMM D, YYYY";
export const MONTH_DAY_FORMAT = "MM/DD";

/**
 * 把 Date / ISO string 轉成專案內部統一使用的 date key。
 * 例：2026-05-05
 */
export function getDateKey(value: Date | string) {
  return dayjs(value).tz(APP_TIMEZONE).format(DATE_KEY_FORMAT);
}

/**
 * 把 date key 轉成「台北時區該日 00:00」的 dayjs 物件。
 */
export function parseDateKey(dateKey: string) {
  return dayjs.tz(dateKey, DATE_KEY_FORMAT, APP_TIMEZONE);
}

/**
 * 取得今天（台北時區）的日曆日期。
 * 回傳 Date 只是為了配合 React Day Picker / Calendar 元件。
 */
export function getTodayDate() {
  return parseDateKey(getDateKey(new Date())).toDate();
}

/**
 * 把任意 Date 正規化成「台北時區該日 00:00」。
 * 適合放在 onSelect、初始化 state 等地方。
 */
export function normalizeCalendarDate(date: Date | string) {
  return parseDateKey(getDateKey(date)).toDate();
}

export function formatDisplayDate(value: Date | string) {
  return dayjs(value).tz(APP_TIMEZONE).format(DISPLAY_DATE_FORMAT);
}

export function formatLongDisplayDate(value: Date | string) {
  return dayjs(value).tz(APP_TIMEZONE).format(DISPLAY_LONG_DATE_FORMAT);
}

export function formatMonthDay(value: Date | string) {
  return dayjs(value).tz(APP_TIMEZONE).format(MONTH_DAY_FORMAT);
}

/**
 * 把 date key 轉成實際寫入 DB 的 DateTime。
 * 規則：永遠存成該日的起點，避免前端把時分秒混進來。
 */
export function toStoredIntakeDate(dateKey: string) {
  return parseDateKey(dateKey).startOf("day").toDate();
}

/**
 * 產生某一天的查詢區間：[start, end)
 * 用在 Prisma where: { gte: start, lt: end }
 */
export function getDayRange(dateKey: string) {
  const start = parseDateKey(dateKey).startOf("day");
  const end = start.add(1, "day");

  return {
    start: start.toDate(),
    end: end.toDate(),
  };
}

/**
 * 取得最近 N 天視窗的起點。
 * 例：7 -> 今天往前含今天共 7 天的起點
 */
export function getLastNDaysStart(days: number) {
  return dayjs()
    .tz(APP_TIMEZONE)
    .startOf("day")
    .subtract(days - 1, "day")
    .toDate();
}

/**
 * 取得最近 N 天的 date keys，預設從舊到新。
 * 例：7 -> [05/01, 05/02, ..., 05/07] 對應的 YYYY-MM-DD keys
 */
export function getLastNDateKeys(days: number) {
  const today = dayjs().tz(APP_TIMEZONE).startOf("day");

  return Array.from({ length: days }, (_, index) =>
    today.subtract(days - 1 - index, "day").format(DATE_KEY_FORMAT),
  );
}
