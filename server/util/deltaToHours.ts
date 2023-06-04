/**
 * Figures out how many hours are between two unix timestamps
 * @param start
 * @param end
 */
export function deltaToHours(start: number, end: number): number {
  const hour = 60 * 60 * 1000;
  return (end - start) / hour;
}
