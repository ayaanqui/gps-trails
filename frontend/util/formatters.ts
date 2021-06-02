export const numFormat = (num: number): string => {
  return new Intl.NumberFormat('en-US', { maximumSignificantDigits: 10 }).format(num)
}