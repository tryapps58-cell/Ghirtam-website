export function getDiscount(price: number, mrp: number): number {
  if (!mrp || mrp <= 0 || !price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}
