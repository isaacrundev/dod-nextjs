export function roundToSecondPlace(item: string | number) {
  return +(Math.round(+item * 100) / 100).toFixed(2);
}
