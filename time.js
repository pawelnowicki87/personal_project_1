export function timeToMin(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function minToTime(mins) {
  const h = Math.floor(mins / 60).toString().padStart(2, "0");
  const m = (mins % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

export function generateSlots(from, to, slotSize) {
  const slots = [];
  let current = timeToMin(from);
  const end = timeToMin(to);

  while (current + slotSize <= end) {
    const slotStart = minToTime(current);
    const slotEnd = minToTime(current + slotSize);
    slots.push({ start: slotStart, end: slotEnd });
    current += slotSize;
  }

  return slots;
}
