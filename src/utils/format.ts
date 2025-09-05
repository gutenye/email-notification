export function formatPercentage(value: number, digits = 0) {
  return (value * 100).toFixed(digits) + '%'
}
