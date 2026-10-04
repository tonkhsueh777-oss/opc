import { test } from "node:test";
import assert from "node:assert/strict";
import { saveRecord, deleteRecord } from "../src/services/records.js";
import { monthlyStats } from "../src/services/stats.js";
const empty = () => ({
  dreams: [],
  journals: [],
  ideas: [],
  progressEvents: [],
  imageEvents: [],
});
test("journal date is unique and updates preserve identity", () => {
  let d = saveRecord(empty(), "journals", {
    date: "2026-10-04",
    content: "one",
    images: [],
  });
  const id = d.journals[0].id;
  d = saveRecord(d, "journals", {
    date: "2026-10-04",
    content: "two",
    images: [],
  });
  assert.equal(d.journals.length, 1);
  assert.equal(d.journals[0].id, id);
  assert.equal(d.journals[0].content, "two");
});
test("progress counts changed saved values only; unchanged image does not count twice", () => {
  let d = saveRecord(empty(), "dreams", {
    title: "Dream",
    progress: 10,
    image: "data:image/jpeg;base64,a",
  });
  const dream = d.dreams[0];
  d = saveRecord(d, "dreams", { ...dream, progress: 30 });
  assert.equal(d.progressEvents.length, 1);
  assert.equal(d.imageEvents.length, 1);
  d = saveRecord(d, "dreams", { ...d.dreams[0], title: "Edited" });
  assert.equal(d.progressEvents.length, 1);
  assert.equal(d.imageEvents.length, 1);
});
test("deleting a dream clears journal links but preserves journal content", () => {
  const d = {
    ...empty(),
    dreams: [{ id: "d" }],
    journals: [{ id: "j", dreamId: "d", content: "safe" }],
  };
  const next = deleteRecord(d, "dreams", "d");
  assert.equal(next.journals[0].dreamId, "");
  assert.equal(next.journals[0].content, "safe");
  assert.equal(d.journals[0].dreamId, "d");
});
test("monthly data filters months and deduplicates journal days", () => {
  const d = {
    ...empty(),
    journals: [
      { date: "2026-10-04" },
      { date: "2026-10-04" },
      { date: "2026-09-30" },
    ],
    dreams: [
      { createdAt: "2026-10-02T12:00:00Z" },
      { createdAt: "2026-09-15T12:00:00Z" },
    ],
    ideas: [{ createdAt: "2026-10-04T12:00:00Z" }],
    progressEvents: [{ createdAt: "2026-10-04T12:00:00Z" }],
    imageEvents: [
      { createdAt: "2026-10-04T12:00:00Z", count: 3 },
      { createdAt: "2026-09-04T12:00:00Z", count: 7 },
    ],
  };
  assert.deepEqual(monthlyStats(d, "2026-10"), {
    journalDays: 1,
    dreams: 1,
    progress: 1,
    ideas: 1,
    images: 3,
  });
  assert.equal(monthlyStats(d, "2026-11").images, 0);
});
test("progress values are clamped and creation reserves transform metadata", () => {
  const d = saveRecord(empty(), "dreams", {
    title: "test",
    progress: 150,
    image: "",
  });
  assert.equal(d.dreams[0].progress, 100);
  assert.deepEqual(d.dreams[0].layout, { x: 0, y: 0, width: 1, rotation: 0 });
});
