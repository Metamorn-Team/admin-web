import { formatInTimeZone } from "date-fns-tz";
import { ko } from "date-fns/locale";

/**
 * 기본 포맷: 2025년 7월 14일 (월) 00:00
 */
export function formatKST(date: string, pattern = "PPPp") {
  return formatInTimeZone(date, "Asia/Seoul", pattern, { locale: ko });
}
