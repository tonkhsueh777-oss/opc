const uid = () => crypto.randomUUID();
export function saveRecord(data, type, record) {
  const now = new Date().toISOString();
  const old = data[type].find(
    (x) =>
      x.id === record.id || (type === "journals" && x.date === record.date),
  );
  const saved = {
    ...record,
    id: old?.id || record.id || uid(),
    createdAt: old?.createdAt || now,
    demo: false,
  };
  if (type === "dreams") {
    saved.progress = Math.max(0, Math.min(100, Number(saved.progress) || 0));
    saved.layout = old?.layout || { x: 0, y: 0, width: 1, rotation: 0 };
  }
  const next = {
    ...data,
    [type]: old
      ? data[type].map((x) => (x.id === saved.id ? saved : x))
      : [saved, ...data[type]],
  };
  if (type === "dreams" && old && old.progress !== saved.progress)
    next.progressEvents = [
      ...data.progressEvents,
      {
        id: uid(),
        dreamId: saved.id,
        from: old.progress,
        to: saved.progress,
        createdAt: now,
      },
    ];
  const imgs =
    type === "dreams" ? (saved.image ? [saved.image] : []) : saved.images || [];
  const prev =
    type === "dreams" ? (old?.image ? [old.image] : []) : old?.images || [];
  const count = imgs.filter(
    (v) => v.startsWith("data:") && !prev.includes(v),
  ).length;
  if (count)
    next.imageEvents = [
      ...data.imageEvents,
      { id: uid(), recordId: saved.id, count, createdAt: now },
    ];
  return next;
}
export function deleteRecord(data, type, id) {
  const next = { ...data, [type]: data[type].filter((x) => x.id !== id) };
  if (type === "dreams")
    next.journals = data.journals.map((j) =>
      j.dreamId === id ? { ...j, dreamId: "" } : j,
    );
  return next;
}
