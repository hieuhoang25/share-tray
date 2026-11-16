/**
 * Currency, time and calculation helpers
 */

export function formatVND(amount: number, locale: 'en' | 'vi' = 'en'): string {
  if (locale === 'vi') {
    return `${amount.toLocaleString('vi-VN')}₫`;
  }
  return `${amount.toLocaleString('en-US')}₫`;
}

export function formatUSD(amountVnd: number, usdRate = 26000): string {
  const usd = amountVnd / usdRate;
  return `about $${usd.toFixed(2)}`;
}

export function calculateDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // metres
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}
