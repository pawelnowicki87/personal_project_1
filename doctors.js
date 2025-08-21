// doctors.js
export const DAYS = ["MON","TUE","WED","THU","FRI","SAT","SUN"];

const DEFAULT_WORK_WINDOWS = [
  { day: "MON", from: "07:30", to: "15:30" },
  { day: "TUE", from: "07:30", to: "15:30" },
  { day: "WED", from: "07:30", to: "15:30" },
  { day: "THU", from: "07:30", to: "15:30" },
  { day: "FRI", from: "07:30", to: "15:30" }
];

const DEFAULT_BREAKS = [
  { day: "MON", from: "11:30", to: "12:30" },
  { day: "TUE", from: "11:30", to: "12:30" },
  { day: "WED", from: "11:30", to: "12:30" },
  { day: "THU", from: "11:30", to: "12:30" },
  { day: "FRI", from: "11:30", to: "12:30" }
];

export const doctors = [
  // Cardiology
  { id: 1, name: "John Smith",   specialization: "cardiology", slotSizeMin: 30, workWindows: [...DEFAULT_WORK_WINDOWS], breaks: [...DEFAULT_BREAKS] },
  { id: 2, name: "Emily Carter", specialization: "cardiology", slotSizeMin: 30, workWindows: [...DEFAULT_WORK_WINDOWS], breaks: [...DEFAULT_BREAKS] },

  // Surgery
  { id: 3, name: "Michael Brown", specialization: "surgery", slotSizeMin: 30, workWindows: [...DEFAULT_WORK_WINDOWS], breaks: [...DEFAULT_BREAKS] },
  { id: 4, name: "Olivia Wilson",  specialization: "surgery", slotSizeMin: 30, workWindows: [...DEFAULT_WORK_WINDOWS], breaks: [...DEFAULT_BREAKS] },

  // Dermatology
  { id: 5, name: "Sofia Martinez", specialization: "dermatology", slotSizeMin: 30, workWindows: [...DEFAULT_WORK_WINDOWS], breaks: [...DEFAULT_BREAKS] },
  { id: 6, name: "Liam Anderson",  specialization: "dermatology", slotSizeMin: 30, workWindows: [...DEFAULT_WORK_WINDOWS], breaks: [...DEFAULT_BREAKS] },

  // Neurology
  { id: 7, name: "Ava Thompson",  specialization: "neurology", slotSizeMin: 30, workWindows: [...DEFAULT_WORK_WINDOWS], breaks: [...DEFAULT_BREAKS] },
  { id: 8, name: "Noah Davis",    specialization: "neurology", slotSizeMin: 30, workWindows: [...DEFAULT_WORK_WINDOWS], breaks: [...DEFAULT_BREAKS] },

  // Pediatrics
  { id: 9,  name: "Mia Robinson",  specialization: "pediatrics", slotSizeMin: 30, workWindows: [...DEFAULT_WORK_WINDOWS], breaks: [...DEFAULT_BREAKS] },
  { id: 10, name: "William Lee",   specialization: "pediatrics", slotSizeMin: 30, workWindows: [...DEFAULT_WORK_WINDOWS], breaks: [...DEFAULT_BREAKS] }
];
