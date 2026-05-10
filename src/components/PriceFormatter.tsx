'use client';

export function formatPrice(price: number): string {
  if (price >= 1_000_000_000) {
    return `₦${(price / 1_000_000_000).toFixed(1)}B`;
  }
  if (price >= 1_000_000) {
    return `₦${(price / 1_000_000).toLocaleString()}M`;
  }
  return `₦${price.toLocaleString()}`;
}

export function formatPriceFull(price: number, type?: string): string {
  const formatted = `₦${price.toLocaleString()}`;
  if (type === 'rent') {
    return `${formatted}/year`;
  }
  return formatted;
}
