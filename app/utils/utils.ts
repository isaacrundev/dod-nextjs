export function roundToSecondPlace(number: number | string) {
  return (Math.round(+number * 100) / 100).toFixed(2);
}
