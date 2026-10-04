const dateKey = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
};
export function monthlyStats(data, month) {
  const inMonth = (value) => dateKey(value) === month;
  return {
    journalDays: new Set(
      data.journals
        .filter((j) => j.date.slice(0, 7) === month)
        .map((j) => j.date),
    ).size,
    dreams: data.dreams.filter((d) => inMonth(d.createdAt)).length,
    progress: data.progressEvents.filter((e) => inMonth(e.createdAt)).length,
    ideas: data.ideas.filter((i) => inMonth(i.createdAt)).length,
    images: data.imageEvents
      .filter((e) => inMonth(e.createdAt))
      .reduce((n, e) => n + e.count, 0),
  };
}
