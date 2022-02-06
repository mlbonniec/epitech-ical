/**
 * Get the ISO String of the current date with a day shift
 * @param shift Amount of day to shift the date
 * @returns A string containing the date as ISO
 * @example
 * const date = getDateFormat(10);
 * console.log(date);
 */
export function getDateFormat(shift: number): string {
  const date = new Date();

  date.setDate(date.getDate() + shift);
  return date.toISOString().slice(0, 10);
}
