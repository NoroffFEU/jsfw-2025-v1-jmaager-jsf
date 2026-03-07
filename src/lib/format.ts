export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function getDiscountPercent(price: number, discountedPrice: number) {
  if (discountedPrice >= price || price <= 0) {
    return 0;
  }

  return Math.round(((price - discountedPrice) / price) * 100);
}

export function hasDiscount(price: number, discountedPrice: number) {
  return discountedPrice < price;
}
