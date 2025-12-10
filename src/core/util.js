
export function getOneMonthAgo() {
  const now = new Date();
  now.setMonth(now.getMonth() - 1);
  return now;
}
