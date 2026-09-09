export function numberWithCommas(x: number) {
  return Number(x).toLocaleString("en-US", {
    minimumFractionDigits: 2,
  });
}
