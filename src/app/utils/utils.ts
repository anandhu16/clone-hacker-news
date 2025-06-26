export function daysDiff(unixTimestamp: number): string {
  const now = new Date();
  const past = new Date(unixTimestamp * 1000);
  const diffTime = Math.abs(now.getTime() - past.getTime());
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays} days ago`;
}

export function formatTime(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
