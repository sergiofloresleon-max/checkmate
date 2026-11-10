/**
 * CheckMate — Largest Remainder Method (Hamilton's Method) in integer cents.
 * Ensures sum of individual shares equals exact item price in cents.
 */
export function allocateExactCents(priceDollars, claimantIds) {
  const uniqueIds = Array.from(new Set(claimantIds)).sort();
  const n = uniqueIds.length;
  if (n === 0) return {};

  const totalCents = Math.round(priceDollars * 100);
  const baseCents = Math.floor(totalCents / n);
  const remainder = totalCents - baseCents * n;

  const shares = {};
  uniqueIds.forEach((id, idx) => {
    const cents = baseCents + (idx < remainder ? 1 : 0);
    shares[id] = cents / 100;
  });
  return shares;
}
