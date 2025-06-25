export function daysDiff(unixTimestamp: number): string {
  const now = new Date();
  const past = new Date(unixTimestamp * 1000);
  const diffTime = Math.abs(now.getTime() - past.getTime());
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays} days ago`;
}
