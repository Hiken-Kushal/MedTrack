/**
 * Fictional demonstration data for the MedTrack patient prototype.
 * No real patient information. No backend, no external APIs.
 */

export type DoseStatus = "taken" | "missed" | "delayed" | "upcoming";

export type ScheduledDose = {
  id: string;
  medicine: string;
  dosage: string;
  time: string;
  status: DoseStatus;
  note?: string;
};

export type ActivityEntry = {
  id: string;
  title: string;
  detail: string;
  timeAgo: string;
  kind: "taken" | "missed" | "added" | "updated";
};

export type InteractionWarning = {
  id: string;
  medicines: [string, string];
  severity: "moderate" | "high";
  summary: string;
  source: string;
};

export const patient = {
  firstName: "Alex",
  fullName: "Alex Fernandes",
  initials: "AF",
  email: "alex.fernandes@example.com",
};

export const overview = {
  activeMedications: 4,
  dosesScheduledToday: 6,
  dosesCompletedToday: 4,
  adherencePercent: 82,
  refillsDue: 1,
  streakDays: 12,
};

export const nextDose = {
  medicine: "Metformin",
  dosage: "500 mg",
  time: "8:00 PM",
  status: "upcoming" as DoseStatus,
  timeRemaining: "in 1 h 20 m",
  instruction: "Take with or just after food.",
};

export const todaySchedule: ScheduledDose[] = [
  { id: "d1", medicine: "Metformin", dosage: "500 mg", time: "8:00 AM", status: "taken" },
  { id: "d2", medicine: "Atorvastatin", dosage: "10 mg", time: "9:00 AM", status: "taken" },
  {
    id: "d3",
    medicine: "Amlodipine",
    dosage: "5 mg",
    time: "1:00 PM",
    status: "delayed",
    note: "Logged 45 minutes late",
  },
  { id: "d4", medicine: "Vitamin D3", dosage: "60,000 IU", time: "2:00 PM", status: "taken" },
  { id: "d5", medicine: "Amlodipine", dosage: "5 mg", time: "6:00 PM", status: "missed" },
  { id: "d6", medicine: "Metformin", dosage: "500 mg", time: "8:00 PM", status: "upcoming" },
];

export const adherence = {
  todayPercent: 67,
  todayTaken: 4,
  todayTotal: 6,
  weekPercent: 82,
};

export const interactionWarnings: InteractionWarning[] = [
  {
    id: "w1",
    medicines: ["Atorvastatin", "Amlodipine"],
    severity: "moderate",
    summary:
      "Taking these together may increase atorvastatin levels in the blood, which can raise the chance of muscle-related side effects.",
    source: "MedTrack interaction checker",
  },
];

export const recentActivity: ActivityEntry[] = [
  {
    id: "a1",
    title: "Vitamin D3 — dose taken",
    detail: "60,000 IU logged at 2:05 PM",
    timeAgo: "4 h ago",
    kind: "taken",
  },
  {
    id: "a2",
    title: "Amlodipine — dose missed",
    detail: "5 mg scheduled for 6:00 PM",
    timeAgo: "40 m ago",
    kind: "missed",
  },
  {
    id: "a3",
    title: "Vitamin D3 — medication added",
    detail: "Weekly schedule, Wednesdays",
    timeAgo: "Yesterday",
    kind: "added",
  },
  {
    id: "a4",
    title: "Metformin — schedule updated",
    detail: "Evening dose moved to 8:00 PM",
    timeAgo: "2 days ago",
    kind: "updated",
  },
];

export type MedicationStatus = "active" | "refill_due" | "paused" | "completed";

export type MedicationItem = {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  form: "Tablet" | "Capsule" | "Injection" | "Liquid" | "Drops";
  frequency: string;
  timing: string;
  condition: string;
  prescribedBy: string;
  nextDose: string;
  status: MedicationStatus;
  refillInfo: {
    pillsRemaining: number;
    totalPills: number;
    daysLeft: number;
  };
  instructions: string;
  startDate: string;
};

export const initialMedicationsList: MedicationItem[] = [
  {
    id: "med-1",
    name: "Metformin",
    genericName: "Metformin Hydrochloride",
    dosage: "500 mg",
    form: "Tablet",
    frequency: "Twice daily",
    timing: "After breakfast and dinner",
    condition: "Type 2 Diabetes",
    prescribedBy: "Dr. Sharma (Endocrinologist)",
    nextDose: "Today, 8:00 PM",
    status: "active",
    refillInfo: { pillsRemaining: 24, totalPills: 60, daysLeft: 12 },
    instructions: "Take with or immediately after food to reduce stomach upset. Do not crush.",
    startDate: "15 Jan 2026",
  },
  {
    id: "med-2",
    name: "Amlodipine",
    genericName: "Amlodipine Besylate",
    dosage: "5 mg",
    form: "Tablet",
    frequency: "Once daily",
    timing: "Morning (8:00 AM)",
    condition: "Hypertension / Blood Pressure",
    prescribedBy: "Dr. Patel (Cardiologist)",
    nextDose: "Tomorrow, 8:00 AM",
    status: "active",
    refillInfo: { pillsRemaining: 4, totalPills: 30, daysLeft: 4 },
    instructions: "Take around the same time each morning with a glass of water. Avoid grapefruit juice.",
    startDate: "02 Feb 2026",
  },
  {
    id: "med-3",
    name: "Atorvastatin",
    genericName: "Atorvastatin Calcium",
    dosage: "10 mg",
    form: "Tablet",
    frequency: "Once daily",
    timing: "Night at bedtime (9:00 PM)",
    condition: "High Cholesterol",
    prescribedBy: "Dr. Patel (Cardiologist)",
    nextDose: "Today, 9:00 PM",
    status: "refill_due",
    refillInfo: { pillsRemaining: 2, totalPills: 30, daysLeft: 2 },
    instructions: "Take at bedtime with or without food. Report any unexplained muscle soreness.",
    startDate: "10 Dec 2025",
  },
  {
    id: "med-4",
    name: "Vitamin D3",
    genericName: "Cholecalciferol",
    dosage: "60,000 IU",
    form: "Capsule",
    frequency: "Once weekly",
    timing: "Wednesday with lunch (2:00 PM)",
    condition: "Vitamin D Deficiency",
    prescribedBy: "Dr. Sharma (General Medicine)",
    nextDose: "Wednesday, 2:00 PM",
    status: "active",
    refillInfo: { pillsRemaining: 6, totalPills: 8, daysLeft: 42 },
    instructions: "Take with the largest meal of the day containing healthy fats for optimal absorption.",
    startDate: "01 Feb 2026",
  },
  {
    id: "med-5",
    name: "Omeprazole",
    genericName: "Omeprazole Delayed-Release",
    dosage: "20 mg",
    form: "Capsule",
    frequency: "Once daily (As needed)",
    timing: "30 minutes before breakfast",
    condition: "Acid Reflux / GERD",
    prescribedBy: "Dr. Mehta (Gastroenterologist)",
    nextDose: "As needed",
    status: "paused",
    refillInfo: { pillsRemaining: 15, totalPills: 20, daysLeft: 15 },
    instructions: "Take 30 to 60 minutes before first meal of the day. Swallow whole with water.",
    startDate: "18 Nov 2025",
  },
  {
    id: "med-6",
    name: "Amoxicillin",
    genericName: "Amoxicillin Trihydrate",
    dosage: "500 mg",
    form: "Capsule",
    frequency: "Three times daily",
    timing: "Every 8 hours with food",
    condition: "Bacterial Throat Infection",
    prescribedBy: "Dr. Gupta (ENT Specialist)",
    nextDose: "Course completed",
    status: "completed",
    refillInfo: { pillsRemaining: 0, totalPills: 21, daysLeft: 0 },
    instructions: "Completed 7-day antibiotic course on 14 Feb 2026.",
    startDate: "07 Feb 2026",
  },
];

export type AppointmentStatus = "upcoming" | "completed" | "rescheduled" | "cancelled";

export type AppointmentItem = {
  id: string;
  doctorName: string;
  specialty: string;
  hospitalOrClinic: string;
  type: string;
  dateDisplay: string;
  dateKey: string;
  time: string;
  mode: "In-Person" | "Video Consultation";
  location: string;
  status: AppointmentStatus;
  notes?: string;
};

export const upcomingAppointmentsList: AppointmentItem[] = [
  {
    id: "apt-1",
    doctorName: "Dr. Sharma",
    specialty: "Endocrinologist",
    hospitalOrClinic: "City Diabetes & Endocrine Center",
    type: "Follow-up consultation & HbA1c review",
    dateDisplay: "Monday, 31 August 2026",
    dateKey: "2026-08-31",
    time: "10:30 AM",
    mode: "In-Person",
    location: "Suite 402, 4th Floor, City Diabetes Center, MG Road",
    status: "upcoming",
    notes: "Please bring your recent fasting blood sugar log and HbA1c report.",
  },
  {
    id: "apt-2",
    doctorName: "Dr. Patel",
    specialty: "Cardiologist",
    hospitalOrClinic: "Apollo Heart Institute",
    type: "BP & Lipid Profile Review",
    dateDisplay: "Thursday, 3 September 2026",
    dateKey: "2026-09-03",
    time: "4:00 PM",
    mode: "Video Consultation",
    location: "MedTrack Secure Video Call (Link active 10m before appointment)",
    status: "upcoming",
    notes: "Routine 6-month checkup on Amlodipine and Atorvastatin dosage tolerance.",
  },
  {
    id: "apt-3",
    doctorName: "Dr. Mehta",
    specialty: "Gastroenterologist",
    hospitalOrClinic: "Metro Health Specialty Clinic",
    type: "Routine Gastro & Reflux Evaluation",
    dateDisplay: "Friday, 11 September 2026",
    dateKey: "2026-09-11",
    time: "11:15 AM",
    mode: "In-Person",
    location: "Cabin 3B, Metro Health Clinic, Park Avenue",
    status: "upcoming",
    notes: "Reviewing Omeprazole response and dietary recommendations.",
  },
  {
    id: "apt-4",
    doctorName: "Dr. Gupta",
    specialty: "ENT Specialist",
    hospitalOrClinic: "Sunrise Clinic",
    type: "Post-infection Throat Follow-up",
    dateDisplay: "Saturday, 15 August 2026",
    dateKey: "2026-08-15",
    time: "2:30 PM",
    mode: "In-Person",
    location: "Sunrise ENT Care, East Wing",
    status: "completed",
    notes: "Antibiotic course completed successfully. Throat cleared.",
  },
];

export type DayScheduleItem = {
  id: string;
  medicine: string;
  dosage: string;
  time: string;
  status: DoseStatus;
  instruction: string;
  condition: string;
  note?: string;
};

export type DaySchedule = {
  dateKey: string;
  dayLabel: string;
  dayOfWeek: string;
  dayNum: string;
  monthYear: string;
  fullDateStr: string;
  doses: DayScheduleItem[];
  appointments: AppointmentItem[];
};

export const multiDaySchedules: DaySchedule[] = [
  {
    dateKey: "2026-08-28",
    dayLabel: "Yesterday",
    dayOfWeek: "Fri",
    dayNum: "28",
    monthYear: "August 2026",
    fullDateStr: "Friday, 28 August 2026",
    doses: [
      {
        id: "d28-1",
        medicine: "Metformin",
        dosage: "500 mg",
        time: "8:00 AM",
        status: "taken",
        instruction: "Take with or just after breakfast",
        condition: "Type 2 Diabetes",
      },
      {
        id: "d28-2",
        medicine: "Atorvastatin",
        dosage: "10 mg",
        time: "9:00 AM",
        status: "taken",
        instruction: "Take with water",
        condition: "High Cholesterol",
      },
      {
        id: "d28-3",
        medicine: "Amlodipine",
        dosage: "5 mg",
        time: "1:00 PM",
        status: "taken",
        instruction: "Take with lunch",
        condition: "Hypertension",
      },
      {
        id: "d28-4",
        medicine: "Metformin",
        dosage: "500 mg",
        time: "8:00 PM",
        status: "taken",
        instruction: "Take with or just after dinner",
        condition: "Type 2 Diabetes",
      },
    ],
    appointments: [],
  },
  {
    dateKey: "2026-08-29",
    dayLabel: "Today",
    dayOfWeek: "Sat",
    dayNum: "29",
    monthYear: "August 2026",
    fullDateStr: "Saturday, 29 August 2026",
    doses: [
      {
        id: "d29-1",
        medicine: "Metformin",
        dosage: "500 mg",
        time: "8:00 AM",
        status: "taken",
        instruction: "Take with or just after breakfast",
        condition: "Type 2 Diabetes",
      },
      {
        id: "d29-2",
        medicine: "Atorvastatin",
        dosage: "10 mg",
        time: "9:00 AM",
        status: "taken",
        instruction: "Take with water",
        condition: "High Cholesterol",
      },
      {
        id: "d29-3",
        medicine: "Amlodipine",
        dosage: "5 mg",
        time: "1:00 PM",
        status: "delayed",
        instruction: "Take with lunch",
        condition: "Hypertension",
        note: "Logged 45 minutes late",
      },
      {
        id: "d29-4",
        medicine: "Vitamin D3",
        dosage: "60,000 IU",
        time: "2:00 PM",
        status: "taken",
        instruction: "Weekly capsule with meal",
        condition: "Vitamin D Deficiency",
      },
      {
        id: "d29-5",
        medicine: "Amlodipine",
        dosage: "5 mg",
        time: "6:00 PM",
        status: "missed",
        instruction: "Evening dose",
        condition: "Hypertension",
        note: "Missed scheduled timing",
      },
      {
        id: "d29-6",
        medicine: "Metformin",
        dosage: "500 mg",
        time: "8:00 PM",
        status: "upcoming",
        instruction: "Take with or just after dinner",
        condition: "Type 2 Diabetes",
      },
    ],
    appointments: [],
  },
  {
    dateKey: "2026-08-30",
    dayLabel: "Tomorrow",
    dayOfWeek: "Sun",
    dayNum: "30",
    monthYear: "August 2026",
    fullDateStr: "Sunday, 30 August 2026",
    doses: [
      {
        id: "d30-1",
        medicine: "Metformin",
        dosage: "500 mg",
        time: "8:00 AM",
        status: "upcoming",
        instruction: "Take with or just after breakfast",
        condition: "Type 2 Diabetes",
      },
      {
        id: "d30-2",
        medicine: "Atorvastatin",
        dosage: "10 mg",
        time: "9:00 AM",
        status: "upcoming",
        instruction: "Take with water",
        condition: "High Cholesterol",
      },
      {
        id: "d30-3",
        medicine: "Amlodipine",
        dosage: "5 mg",
        time: "1:00 PM",
        status: "upcoming",
        instruction: "Take with lunch",
        condition: "Hypertension",
      },
      {
        id: "d30-4",
        medicine: "Metformin",
        dosage: "500 mg",
        time: "8:00 PM",
        status: "upcoming",
        instruction: "Take with or just after dinner",
        condition: "Type 2 Diabetes",
      },
    ],
    appointments: [],
  },
  {
    dateKey: "2026-08-31",
    dayLabel: "Mon",
    dayOfWeek: "Mon",
    dayNum: "31",
    monthYear: "August 2026",
    fullDateStr: "Monday, 31 August 2026",
    doses: [
      {
        id: "d31-1",
        medicine: "Metformin",
        dosage: "500 mg",
        time: "8:00 AM",
        status: "upcoming",
        instruction: "Take with or just after breakfast",
        condition: "Type 2 Diabetes",
      },
      {
        id: "d31-2",
        medicine: "Atorvastatin",
        dosage: "10 mg",
        time: "9:00 AM",
        status: "upcoming",
        instruction: "Take with water",
        condition: "High Cholesterol",
      },
      {
        id: "d31-3",
        medicine: "Amlodipine",
        dosage: "5 mg",
        time: "1:00 PM",
        status: "upcoming",
        instruction: "Take with lunch",
        condition: "Hypertension",
      },
      {
        id: "d31-4",
        medicine: "Metformin",
        dosage: "500 mg",
        time: "8:00 PM",
        status: "upcoming",
        instruction: "Take with or just after dinner",
        condition: "Type 2 Diabetes",
      },
    ],
    appointments: [upcomingAppointmentsList[0]],
  },
  {
    dateKey: "2026-09-01",
    dayLabel: "Tue",
    dayOfWeek: "Tue",
    dayNum: "01",
    monthYear: "September 2026",
    fullDateStr: "Tuesday, 1 September 2026",
    doses: [
      {
        id: "d01-1",
        medicine: "Metformin",
        dosage: "500 mg",
        time: "8:00 AM",
        status: "upcoming",
        instruction: "Take with or just after breakfast",
        condition: "Type 2 Diabetes",
      },
      {
        id: "d01-2",
        medicine: "Atorvastatin",
        dosage: "10 mg",
        time: "9:00 AM",
        status: "upcoming",
        instruction: "Take with water",
        condition: "High Cholesterol",
      },
      {
        id: "d01-3",
        medicine: "Amlodipine",
        dosage: "5 mg",
        time: "1:00 PM",
        status: "upcoming",
        instruction: "Take with lunch",
        condition: "Hypertension",
      },
      {
        id: "d01-4",
        medicine: "Metformin",
        dosage: "500 mg",
        time: "8:00 PM",
        status: "upcoming",
        instruction: "Take with or just after dinner",
        condition: "Type 2 Diabetes",
      },
    ],
    appointments: [],
  },
  {
    dateKey: "2026-09-02",
    dayLabel: "Wed",
    dayOfWeek: "Wed",
    dayNum: "02",
    monthYear: "September 2026",
    fullDateStr: "Wednesday, 2 September 2026",
    doses: [
      {
        id: "d02-1",
        medicine: "Metformin",
        dosage: "500 mg",
        time: "8:00 AM",
        status: "upcoming",
        instruction: "Take with or just after breakfast",
        condition: "Type 2 Diabetes",
      },
      {
        id: "d02-2",
        medicine: "Atorvastatin",
        dosage: "10 mg",
        time: "9:00 AM",
        status: "upcoming",
        instruction: "Take with water",
        condition: "High Cholesterol",
      },
      {
        id: "d02-3",
        medicine: "Amlodipine",
        dosage: "5 mg",
        time: "1:00 PM",
        status: "upcoming",
        instruction: "Take with lunch",
        condition: "Hypertension",
      },
      {
        id: "d02-4",
        medicine: "Vitamin D3",
        dosage: "60,000 IU",
        time: "2:00 PM",
        status: "upcoming",
        instruction: "Weekly dose with lunch",
        condition: "Vitamin D Deficiency",
      },
      {
        id: "d02-5",
        medicine: "Metformin",
        dosage: "500 mg",
        time: "8:00 PM",
        status: "upcoming",
        instruction: "Take with or just after dinner",
        condition: "Type 2 Diabetes",
      },
    ],
    appointments: [],
  },
  {
    dateKey: "2026-09-03",
    dayLabel: "Thu",
    dayOfWeek: "Thu",
    dayNum: "03",
    monthYear: "September 2026",
    fullDateStr: "Thursday, 3 September 2026",
    doses: [
      {
        id: "d03-1",
        medicine: "Metformin",
        dosage: "500 mg",
        time: "8:00 AM",
        status: "upcoming",
        instruction: "Take with or just after breakfast",
        condition: "Type 2 Diabetes",
      },
      {
        id: "d03-2",
        medicine: "Atorvastatin",
        dosage: "10 mg",
        time: "9:00 AM",
        status: "upcoming",
        instruction: "Take with water",
        condition: "High Cholesterol",
      },
      {
        id: "d03-3",
        medicine: "Amlodipine",
        dosage: "5 mg",
        time: "1:00 PM",
        status: "upcoming",
        instruction: "Take with lunch",
        condition: "Hypertension",
      },
      {
        id: "d03-4",
        medicine: "Metformin",
        dosage: "500 mg",
        time: "8:00 PM",
        status: "upcoming",
        instruction: "Take with or just after dinner",
        condition: "Type 2 Diabetes",
      },
    ],
    appointments: [upcomingAppointmentsList[1]],
  },
];

export type AdherenceTimeframe = "7days" | "30days" | "month";

export type DailyAdherencePoint = {
  day: string;
  date: string;
  percent: number;
  taken: number;
  total: number;
  missed: number;
};

export type MedicationAdherenceStat = {
  id: string;
  name: string;
  dosage: string;
  percent: number;
  taken: number;
  total: number;
  missed: number;
  status: "optimal" | "moderate" | "needs_attention";
};

export type DoseHistoryEntry = {
  id: string;
  medicine: string;
  dosage: string;
  dateDisplay: string;
  time: string;
  status: DoseStatus;
  note?: string;
};

export type AdherenceDataset = {
  timeframe: AdherenceTimeframe;
  overallPercent: number;
  streakDays: number;
  bestStreakDays: number;
  dosesTaken: number;
  dosesTotal: number;
  dosesMissed: number;
  dailyTrend: DailyAdherencePoint[];
  medicationStats: MedicationAdherenceStat[];
  doseHistory: DoseHistoryEntry[];
  missedDoses: DoseHistoryEntry[];
};

export const adherenceByTimeframe: Record<AdherenceTimeframe, AdherenceDataset> = {
  "7days": {
    timeframe: "7days",
    overallPercent: 82,
    streakDays: 12,
    bestStreakDays: 21,
    dosesTaken: 24,
    dosesTotal: 28,
    dosesMissed: 4,
    dailyTrend: [
      { day: "Mon", date: "24 Aug", percent: 100, taken: 4, total: 4, missed: 0 },
      { day: "Tue", date: "25 Aug", percent: 80, taken: 4, total: 5, missed: 1 },
      { day: "Wed", date: "26 Aug", percent: 100, taken: 5, total: 5, missed: 0 },
      { day: "Thu", date: "27 Aug", percent: 75, taken: 3, total: 4, missed: 1 },
      { day: "Fri", date: "28 Aug", percent: 100, taken: 4, total: 4, missed: 0 },
      { day: "Sat", date: "29 Aug", percent: 80, taken: 4, total: 5, missed: 1 },
      { day: "Sun", date: "30 Aug", percent: 82, taken: 4, total: 5, missed: 1 },
    ],
    medicationStats: [
      { id: "m1", name: "Metformin", dosage: "500 mg", percent: 90, taken: 13, total: 14, missed: 1, status: "optimal" },
      { id: "m2", name: "Amlodipine", dosage: "5 mg", percent: 85, taken: 6, total: 7, missed: 1, status: "optimal" },
      { id: "m3", name: "Atorvastatin", dosage: "10 mg", percent: 72, taken: 5, total: 7, missed: 2, status: "moderate" },
      { id: "m4", name: "Vitamin D3", dosage: "60,000 IU", percent: 100, taken: 1, total: 1, missed: 0, status: "optimal" },
    ],
    doseHistory: [
      { id: "h1", medicine: "Metformin", dosage: "500 mg", dateDisplay: "Today · 8:00 AM", time: "8:00 AM", status: "taken" },
      { id: "h2", medicine: "Atorvastatin", dosage: "10 mg", dateDisplay: "Today · 9:00 AM", time: "9:00 AM", status: "taken" },
      { id: "h3", medicine: "Amlodipine", dosage: "5 mg", dateDisplay: "Today · 1:00 PM", time: "1:00 PM", status: "delayed", note: "Logged 45 min late" },
      { id: "h4", medicine: "Vitamin D3", dosage: "60,000 IU", dateDisplay: "Today · 2:00 PM", time: "2:00 PM", status: "taken" },
      { id: "h5", medicine: "Amlodipine", dosage: "5 mg", dateDisplay: "Today · 6:00 PM", time: "6:00 PM", status: "missed" },
      { id: "h6", medicine: "Metformin", dosage: "500 mg", dateDisplay: "Yesterday · 8:00 PM", time: "8:00 PM", status: "taken" },
      { id: "h7", medicine: "Amlodipine", dosage: "5 mg", dateDisplay: "Yesterday · 1:00 PM", time: "1:00 PM", status: "taken" },
      { id: "h8", medicine: "Atorvastatin", dosage: "10 mg", dateDisplay: "27 Aug · 9:00 AM", time: "9:00 AM", status: "missed" },
    ],
    missedDoses: [
      { id: "md1", medicine: "Amlodipine", dosage: "5 mg", dateDisplay: "Today · 6:00 PM", time: "6:00 PM", status: "missed", note: "Missed evening dose" },
      { id: "md2", medicine: "Atorvastatin", dosage: "10 mg", dateDisplay: "Thursday, 27 Aug · 9:00 AM", time: "9:00 AM", status: "missed", note: "Forgot morning routine" },
      { id: "md3", medicine: "Metformin", dosage: "500 mg", dateDisplay: "Tuesday, 25 Aug · 8:00 PM", time: "8:00 PM", status: "missed", note: "Travel delay" },
      { id: "md4", medicine: "Atorvastatin", dosage: "10 mg", dateDisplay: "Sunday, 23 Aug · 9:00 AM", time: "9:00 AM", status: "missed", note: "Late waking" },
    ],
  },
  "30days": {
    timeframe: "30days",
    overallPercent: 86,
    streakDays: 12,
    bestStreakDays: 21,
    dosesTaken: 103,
    dosesTotal: 120,
    dosesMissed: 17,
    dailyTrend: [
      { day: "Week 1", date: "1-7 Aug", percent: 88, taken: 25, total: 28, missed: 3 },
      { day: "Week 2", date: "8-14 Aug", percent: 92, taken: 26, total: 28, missed: 2 },
      { day: "Week 3", date: "15-21 Aug", percent: 82, taken: 23, total: 28, missed: 5 },
      { day: "Week 4", date: "22-28 Aug", percent: 84, taken: 29, total: 36, missed: 7 },
    ],
    medicationStats: [
      { id: "m1", name: "Metformin", dosage: "500 mg", percent: 92, taken: 55, total: 60, missed: 5, status: "optimal" },
      { id: "m2", name: "Amlodipine", dosage: "5 mg", percent: 87, taken: 26, total: 30, missed: 4, status: "optimal" },
      { id: "m3", name: "Atorvastatin", dosage: "10 mg", percent: 78, taken: 23, total: 30, missed: 7, status: "moderate" },
      { id: "m4", name: "Vitamin D3", dosage: "60,000 IU", percent: 100, taken: 4, total: 4, missed: 0, status: "optimal" },
    ],
    doseHistory: [
      { id: "h1", medicine: "Metformin", dosage: "500 mg", dateDisplay: "Today · 8:00 AM", time: "8:00 AM", status: "taken" },
      { id: "h2", medicine: "Atorvastatin", dosage: "10 mg", dateDisplay: "Today · 9:00 AM", time: "9:00 AM", status: "taken" },
      { id: "h3", medicine: "Amlodipine", dosage: "5 mg", dateDisplay: "Today · 1:00 PM", time: "1:00 PM", status: "delayed" },
      { id: "h4", medicine: "Vitamin D3", dosage: "60,000 IU", dateDisplay: "Today · 2:00 PM", time: "2:00 PM", status: "taken" },
      { id: "h5", medicine: "Amlodipine", dosage: "5 mg", dateDisplay: "Today · 6:00 PM", time: "6:00 PM", status: "missed" },
    ],
    missedDoses: [
      { id: "md1", medicine: "Amlodipine", dosage: "5 mg", dateDisplay: "Today · 6:00 PM", time: "6:00 PM", status: "missed" },
      { id: "md2", medicine: "Atorvastatin", dosage: "10 mg", dateDisplay: "Thursday, 27 Aug · 9:00 AM", time: "9:00 AM", status: "missed" },
      { id: "md3", medicine: "Metformin", dosage: "500 mg", dateDisplay: "Tuesday, 25 Aug · 8:00 PM", time: "8:00 PM", status: "missed" },
    ],
  },
  "month": {
    timeframe: "month",
    overallPercent: 84,
    streakDays: 12,
    bestStreakDays: 21,
    dosesTaken: 81,
    dosesTotal: 96,
    dosesMissed: 15,
    dailyTrend: [
      { day: "Aug 1-8", date: "Week 1", percent: 86, taken: 24, total: 28, missed: 4 },
      { day: "Aug 9-16", date: "Week 2", percent: 89, taken: 25, total: 28, missed: 3 },
      { day: "Aug 17-24", date: "Week 3", percent: 80, taken: 22, total: 28, missed: 6 },
      { day: "Aug 25-31", date: "Week 4", percent: 83, taken: 20, total: 24, missed: 4 },
    ],
    medicationStats: [
      { id: "m1", name: "Metformin", dosage: "500 mg", percent: 89, taken: 43, total: 48, missed: 5, status: "optimal" },
      { id: "m2", name: "Amlodipine", dosage: "5 mg", percent: 83, taken: 20, total: 24, missed: 4, status: "optimal" },
      { id: "m3", name: "Atorvastatin", dosage: "10 mg", percent: 75, taken: 18, total: 24, missed: 6, status: "moderate" },
      { id: "m4", name: "Vitamin D3", dosage: "60,000 IU", percent: 100, taken: 4, total: 4, missed: 0, status: "optimal" },
    ],
    doseHistory: [
      { id: "h1", medicine: "Metformin", dosage: "500 mg", dateDisplay: "Today · 8:00 AM", time: "8:00 AM", status: "taken" },
      { id: "h2", medicine: "Atorvastatin", dosage: "10 mg", dateDisplay: "Today · 9:00 AM", time: "9:00 AM", status: "taken" },
      { id: "h3", medicine: "Amlodipine", dosage: "5 mg", dateDisplay: "Today · 1:00 PM", time: "1:00 PM", status: "delayed" },
      { id: "h4", medicine: "Vitamin D3", dosage: "60,000 IU", dateDisplay: "Today · 2:00 PM", time: "2:00 PM", status: "taken" },
    ],
    missedDoses: [
      { id: "md1", medicine: "Amlodipine", dosage: "5 mg", dateDisplay: "Today · 6:00 PM", time: "6:00 PM", status: "missed" },
      { id: "md2", medicine: "Atorvastatin", dosage: "10 mg", dateDisplay: "Thursday, 27 Aug · 9:00 AM", time: "9:00 AM", status: "missed" },
    ],
  },
};

export type DrugInteractionSeverity = "none" | "low" | "moderate" | "high";

export type DrugInteractionRule = {
  id: string;
  medicines: [string, string];
  severity: DrugInteractionSeverity;
  title: string;
  summary: string;
  mechanism?: string;
  precaution: string;
  additionalInfo?: string;
  clinicalSource: string;
};

export type MockSelectableMedication = {
  id: string;
  name: string;
  genericName: string;
  category: string;
  commonlyUsedFor: string;
  isPrescribed?: boolean;
};

export type RecentInteractionCheck = {
  id: string;
  date: string;
  medicines: string[];
  severity: DrugInteractionSeverity;
  summary: string;
  checkedAt: string;
};

export type DrugInteractionEvaluation = {
  hasInteraction: boolean;
  maxSeverity: DrugInteractionSeverity;
  pairs: DrugInteractionRule[];
  medicinesChecked: string[];
  evaluatedAt: string;
};

export const selectableMedicationsList: MockSelectableMedication[] = [
  {
    id: "med-metformin",
    name: "Metformin",
    genericName: "Metformin Hydrochloride",
    category: "Biguanide / Antidiabetic",
    commonlyUsedFor: "Type 2 Diabetes",
    isPrescribed: true,
  },
  {
    id: "med-amlodipine",
    name: "Amlodipine",
    genericName: "Amlodipine Besylate",
    category: "Calcium Channel Blocker",
    commonlyUsedFor: "Hypertension / High BP",
    isPrescribed: true,
  },
  {
    id: "med-atorvastatin",
    name: "Atorvastatin",
    genericName: "Atorvastatin Calcium",
    category: "HMG-CoA Reductase Inhibitor / Statin",
    commonlyUsedFor: "High Cholesterol",
    isPrescribed: true,
  },
  {
    id: "med-vitamind3",
    name: "Vitamin D3",
    genericName: "Cholecalciferol",
    category: "Vitamin Supplement",
    commonlyUsedFor: "Bone Health & Vitamin D Deficiency",
    isPrescribed: true,
  },
  {
    id: "med-ibuprofen",
    name: "Ibuprofen",
    genericName: "Ibuprofen (NSAID)",
    category: "Nonsteroidal Anti-inflammatory Drug",
    commonlyUsedFor: "Pain & Inflammation Relief",
  },
  {
    id: "med-aspirin",
    name: "Aspirin",
    genericName: "Acetylsalicylic Acid",
    category: "Antiplatelet / Analgesic",
    commonlyUsedFor: "Cardiovascular Protection & Pain",
  },
  {
    id: "med-warfarin",
    name: "Warfarin",
    genericName: "Warfarin Sodium",
    category: "Anticoagulant / Blood Thinner",
    commonlyUsedFor: "Blood Clot Prevention & DVT",
  },
  {
    id: "med-lisinopril",
    name: "Lisinopril",
    genericName: "Lisinopril",
    category: "ACE Inhibitor",
    commonlyUsedFor: "High Blood Pressure & Heart Failure",
  },
  {
    id: "med-omeprazole",
    name: "Omeprazole",
    genericName: "Omeprazole Magnesium",
    category: "Proton Pump Inhibitor (PPI)",
    commonlyUsedFor: "Acid Reflux & GERD",
  },
  {
    id: "med-paracetamol",
    name: "Paracetamol",
    genericName: "Acetaminophen",
    category: "Analgesic / Antipyretic",
    commonlyUsedFor: "Mild Pain & Fever",
  },
];

export const mockInteractionRules: DrugInteractionRule[] = [
  {
    id: "rule-metformin-ibuprofen",
    medicines: ["Metformin", "Ibuprofen"],
    severity: "moderate",
    title: "Metformin + Ibuprofen (NSAID)",
    summary:
      "Concomitant use of NSAIDs like ibuprofen may decrease renal blood flow and impair metformin clearance, potentially raising the risk of lactic acidosis or hypoglycemic episodes.",
    mechanism: "NSAID-induced decrease in glomerular filtration rate affecting renal excretion of metformin.",
    precaution:
      "Consult your healthcare professional before taking regular NSAIDs. Consider alternative pain relief like paracetamol if advised.",
    additionalInfo: "Ensure adequate hydration and monitor for dizziness, unusual fatigue, or abdominal discomfort.",
    clinicalSource: "MedTrack Clinical Drug Safety Database (Demo)",
  },
  {
    id: "rule-atorvastatin-amlodipine",
    medicines: ["Atorvastatin", "Amlodipine"],
    severity: "moderate",
    title: "Atorvastatin + Amlodipine",
    summary:
      "Co-administration may mildly increase systemic concentrations of atorvastatin due to CYP3A4 pathway overlap, slightly increasing the possibility of muscle-related symptoms (myopathy).",
    mechanism: "Mild inhibition of hepatic CYP3A4 metabolism by amlodipine.",
    precaution:
      "Routine clinical monitoring of muscle aches, cramps, or unexplained fatigue is advised. Do not adjust doses without medical consultation.",
    additionalInfo: "This combination is frequently co-prescribed with routine safety checks.",
    clinicalSource: "MedTrack Clinical Drug Safety Database (Demo)",
  },
  {
    id: "rule-warfarin-aspirin",
    medicines: ["Warfarin", "Aspirin"],
    severity: "high",
    title: "Warfarin + Aspirin (Anticoagulant + Antiplatelet)",
    summary:
      "Combining anticoagulant therapy (Warfarin) with antiplatelet therapy (Aspirin) significantly elevates the risk of major gastrointestinal and systemic bleeding events.",
    mechanism: "Synergistic impairment of hemostasis via dual inhibition of coagulation factors and platelet aggregation.",
    precaution:
      "Requires strict specialist supervision, regular INR blood monitoring, and gastroprotective therapy if clinically mandated.",
    additionalInfo: "Seek immediate medical attention if you notice unusual bruising, black stools, or persistent bleeding.",
    clinicalSource: "MedTrack Clinical Drug Safety Database (Demo)",
  },
  {
    id: "rule-ibuprofen-aspirin",
    medicines: ["Ibuprofen", "Aspirin"],
    severity: "moderate",
    title: "Ibuprofen + Aspirin (Dual NSAIDs)",
    summary:
      "Ibuprofen may competitively block the irreversible antiplatelet effect of low-dose cardioprotective aspirin and increase the risk of gastric mucosal irritation.",
    mechanism: "Competitive binding at the platelet COX-1 active site.",
    precaution:
      "Take immediate-release aspirin at least 30 minutes before or 8 hours after ibuprofen if both are prescribed.",
    clinicalSource: "MedTrack Clinical Drug Safety Database (Demo)",
  },
  {
    id: "rule-lisinopril-ibuprofen",
    medicines: ["Lisinopril", "Ibuprofen"],
    severity: "moderate",
    title: "Lisinopril + Ibuprofen",
    summary:
      "NSAIDs like ibuprofen may attenuate the antihypertensive effect of ACE inhibitors (lisinopril) and increase the risk of renal deterioration.",
    mechanism: "Inhibition of vasodilatory renal prostaglandins by NSAIDs.",
    precaution:
      "Monitor blood pressure periodically and ensure kidney function tests are up to date.",
    clinicalSource: "MedTrack Clinical Drug Safety Database (Demo)",
  },
  {
    id: "rule-warfarin-ibuprofen",
    medicines: ["Warfarin", "Ibuprofen"],
    severity: "high",
    title: "Warfarin + Ibuprofen",
    summary:
      "Ibuprofen damages gastric mucosa and inhibits platelet aggregation, creating a high risk of upper GI bleeding when combined with warfarin.",
    mechanism: "Mucosal irritation plus antiplatelet effect combined with systemic anticoagulation.",
    precaution:
      "Avoid concurrent use unless strictly supervised by your anticoagulant clinic. Use paracetamol for analgesia.",
    clinicalSource: "MedTrack Clinical Drug Safety Database (Demo)",
  },
  {
    id: "rule-omeprazole-aspirin",
    medicines: ["Omeprazole", "Aspirin"],
    severity: "low",
    title: "Omeprazole + Aspirin",
    summary:
      "Omeprazole provides gastric mucosal protection against aspirin-induced gastrointestinal erosion. Low interaction risk.",
    precaution:
      "Take omeprazole before meals as directed by your physician.",
    clinicalSource: "MedTrack Clinical Drug Safety Database (Demo)",
  },
];

export const recentInteractionChecksList: RecentInteractionCheck[] = [
  {
    id: "rc-1",
    date: "Today · 11:30 AM",
    medicines: ["Metformin", "Ibuprofen"],
    severity: "moderate",
    summary: "Potential risk of renal stress and lactic acidosis with frequent NSAID use.",
    checkedAt: "Today",
  },
  {
    id: "rc-2",
    date: "Yesterday · 3:15 PM",
    medicines: ["Amlodipine", "Atorvastatin"],
    severity: "moderate",
    summary: "Mildly increased statin systemic concentration; routine muscle monitoring advised.",
    checkedAt: "Yesterday",
  },
  {
    id: "rc-3",
    date: "26 Aug · 9:00 AM",
    medicines: ["Metformin", "Amlodipine"],
    severity: "none",
    summary: "No significant adverse interaction found. Standard co-prescription.",
    checkedAt: "26 Aug",
  },
  {
    id: "rc-4",
    date: "23 Aug · 5:45 PM",
    medicines: ["Warfarin", "Aspirin"],
    severity: "high",
    summary: "Significantly elevated major bleeding risk requiring strict specialist monitoring.",
    checkedAt: "23 Aug",
  },
];

export function checkMockDrugInteractions(selectedMeds: string[]): DrugInteractionEvaluation {
  const normalized = selectedMeds.map((m) => m.trim().toLowerCase());
  const foundPairs: DrugInteractionRule[] = [];

  for (const rule of mockInteractionRules) {
    const med1 = rule.medicines[0].toLowerCase();
    const med2 = rule.medicines[1].toLowerCase();

    if (normalized.includes(med1) && normalized.includes(med2)) {
      foundPairs.push(rule);
    }
  }

  let maxSeverity: DrugInteractionSeverity = "none";
  if (foundPairs.some((p) => p.severity === "high")) {
    maxSeverity = "high";
  } else if (foundPairs.some((p) => p.severity === "moderate")) {
    maxSeverity = "moderate";
  } else if (foundPairs.some((p) => p.severity === "low")) {
    maxSeverity = "low";
  }

  return {
    hasInteraction: foundPairs.length > 0,
    maxSeverity,
    pairs: foundPairs,
    medicinesChecked: selectedMeds,
    evaluatedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };
}

export type HistoryFilterStatus = "all" | "taken" | "missed" | "delayed" | "skipped";

export type DetailedHistoryEntry = {
  id: string;
  dateKey: string;
  dateGroupTitle: string;
  dateDisplay: string;
  time: string;
  loggedTime?: string;
  medicine: string;
  genericName: string;
  dosage: string;
  form: string;
  condition: string;
  doctorName: string;
  clinicName: string;
  status: DoseStatus | "skipped";
  instruction: string;
  notes?: string;
};

export const historyOverviewStats = {
  totalPrescriptions: 4,
  dosesTaken: 103,
  dosesMissed: 17,
  adherenceRate: 86,
};

export const detailedMedicationHistoryList: DetailedHistoryEntry[] = [
  // Today (29 Aug 2026)
  {
    id: "hist-29-1",
    dateKey: "2026-08-29",
    dateGroupTitle: "Today — Saturday, 29 August 2026",
    dateDisplay: "29 Aug 2026",
    time: "8:00 AM",
    loggedTime: "8:04 AM",
    medicine: "Metformin",
    genericName: "Metformin Hydrochloride",
    dosage: "500 mg",
    form: "Tablet",
    condition: "Type 2 Diabetes",
    doctorName: "Dr. Sharma",
    clinicName: "City Diabetes Center",
    status: "taken",
    instruction: "Take with or just after breakfast",
    notes: "Taken on time with oats meal",
  },
  {
    id: "hist-29-2",
    dateKey: "2026-08-29",
    dateGroupTitle: "Today — Saturday, 29 August 2026",
    dateDisplay: "29 Aug 2026",
    time: "9:00 AM",
    loggedTime: "9:02 AM",
    medicine: "Atorvastatin",
    genericName: "Atorvastatin Calcium",
    dosage: "10 mg",
    form: "Tablet",
    condition: "High Cholesterol",
    doctorName: "Dr. Patel",
    clinicName: "Apollo Heart Institute",
    status: "taken",
    instruction: "Take with water",
    notes: "Taken with water",
  },
  {
    id: "hist-29-3",
    dateKey: "2026-08-29",
    dateGroupTitle: "Today — Saturday, 29 August 2026",
    dateDisplay: "29 Aug 2026",
    time: "1:00 PM",
    loggedTime: "1:45 PM",
    medicine: "Amlodipine",
    genericName: "Amlodipine Besylate",
    dosage: "5 mg",
    form: "Tablet",
    condition: "Hypertension",
    doctorName: "Dr. Patel",
    clinicName: "Apollo Heart Institute",
    status: "delayed",
    instruction: "Take with lunch",
    notes: "Logged 45 minutes late due to meeting",
  },
  {
    id: "hist-29-4",
    dateKey: "2026-08-29",
    dateGroupTitle: "Today — Saturday, 29 August 2026",
    dateDisplay: "29 Aug 2026",
    time: "2:00 PM",
    loggedTime: "2:05 PM",
    medicine: "Vitamin D3",
    genericName: "Cholecalciferol",
    dosage: "60,000 IU",
    form: "Capsule",
    condition: "Vitamin D Deficiency",
    doctorName: "Dr. Sharma",
    clinicName: "City Diabetes Center",
    status: "taken",
    instruction: "Weekly capsule with meal",
    notes: "Weekly Saturday dosage",
  },
  {
    id: "hist-29-5",
    dateKey: "2026-08-29",
    dateGroupTitle: "Today — Saturday, 29 August 2026",
    dateDisplay: "29 Aug 2026",
    time: "6:00 PM",
    medicine: "Amlodipine",
    genericName: "Amlodipine Besylate",
    dosage: "5 mg",
    form: "Tablet",
    condition: "Hypertension",
    doctorName: "Dr. Patel",
    clinicName: "Apollo Heart Institute",
    status: "missed",
    instruction: "Evening dose with water",
    notes: "Missed scheduled timing window",
  },
  {
    id: "hist-29-6",
    dateKey: "2026-08-29",
    dateGroupTitle: "Today — Saturday, 29 August 2026",
    dateDisplay: "29 Aug 2026",
    time: "8:00 PM",
    medicine: "Metformin",
    genericName: "Metformin Hydrochloride",
    dosage: "500 mg",
    form: "Tablet",
    condition: "Type 2 Diabetes",
    doctorName: "Dr. Sharma",
    clinicName: "City Diabetes Center",
    status: "upcoming",
    instruction: "Take with or just after dinner",
    notes: "Scheduled for tonight",
  },

  // Yesterday (28 Aug 2026)
  {
    id: "hist-28-1",
    dateKey: "2026-08-28",
    dateGroupTitle: "Yesterday — Friday, 28 August 2026",
    dateDisplay: "28 Aug 2026",
    time: "8:00 AM",
    loggedTime: "8:01 AM",
    medicine: "Metformin",
    genericName: "Metformin Hydrochloride",
    dosage: "500 mg",
    form: "Tablet",
    condition: "Type 2 Diabetes",
    doctorName: "Dr. Sharma",
    clinicName: "City Diabetes Center",
    status: "taken",
    instruction: "Take with breakfast",
  },
  {
    id: "hist-28-2",
    dateKey: "2026-08-28",
    dateGroupTitle: "Yesterday — Friday, 28 August 2026",
    dateDisplay: "28 Aug 2026",
    time: "9:00 AM",
    loggedTime: "9:00 AM",
    medicine: "Atorvastatin",
    genericName: "Atorvastatin Calcium",
    dosage: "10 mg",
    form: "Tablet",
    condition: "High Cholesterol",
    doctorName: "Dr. Patel",
    clinicName: "Apollo Heart Institute",
    status: "taken",
    instruction: "Take with water",
  },
  {
    id: "hist-28-3",
    dateKey: "2026-08-28",
    dateGroupTitle: "Yesterday — Friday, 28 August 2026",
    dateDisplay: "28 Aug 2026",
    time: "1:00 PM",
    loggedTime: "1:15 PM",
    medicine: "Amlodipine",
    genericName: "Amlodipine Besylate",
    dosage: "5 mg",
    form: "Tablet",
    condition: "Hypertension",
    doctorName: "Dr. Patel",
    clinicName: "Apollo Heart Institute",
    status: "taken",
    instruction: "Take with lunch",
  },
  {
    id: "hist-28-4",
    dateKey: "2026-08-28",
    dateGroupTitle: "Yesterday — Friday, 28 August 2026",
    dateDisplay: "28 Aug 2026",
    time: "8:00 PM",
    loggedTime: "8:10 PM",
    medicine: "Metformin",
    genericName: "Metformin Hydrochloride",
    dosage: "500 mg",
    form: "Tablet",
    condition: "Type 2 Diabetes",
    doctorName: "Dr. Sharma",
    clinicName: "City Diabetes Center",
    status: "taken",
    instruction: "Take with dinner",
  },

  // Thursday, 27 Aug 2026
  {
    id: "hist-27-1",
    dateKey: "2026-08-27",
    dateGroupTitle: "Thursday, 27 August 2026",
    dateDisplay: "27 Aug 2026",
    time: "8:00 AM",
    loggedTime: "8:15 AM",
    medicine: "Metformin",
    genericName: "Metformin Hydrochloride",
    dosage: "500 mg",
    form: "Tablet",
    condition: "Type 2 Diabetes",
    doctorName: "Dr. Sharma",
    clinicName: "City Diabetes Center",
    status: "taken",
    instruction: "Take with breakfast",
  },
  {
    id: "hist-27-2",
    dateKey: "2026-08-27",
    dateGroupTitle: "Thursday, 27 August 2026",
    dateDisplay: "27 Aug 2026",
    time: "9:00 AM",
    medicine: "Atorvastatin",
    genericName: "Atorvastatin Calcium",
    dosage: "10 mg",
    form: "Tablet",
    condition: "High Cholesterol",
    doctorName: "Dr. Patel",
    clinicName: "Apollo Heart Institute",
    status: "missed",
    instruction: "Take with water",
    notes: "Forgot morning routine",
  },
  {
    id: "hist-27-3",
    dateKey: "2026-08-27",
    dateGroupTitle: "Thursday, 27 August 2026",
    dateDisplay: "27 Aug 2026",
    time: "1:00 PM",
    loggedTime: "1:05 PM",
    medicine: "Amlodipine",
    genericName: "Amlodipine Besylate",
    dosage: "5 mg",
    form: "Tablet",
    condition: "Hypertension",
    doctorName: "Dr. Patel",
    clinicName: "Apollo Heart Institute",
    status: "taken",
    instruction: "Take with lunch",
  },
  {
    id: "hist-27-4",
    dateKey: "2026-08-27",
    dateGroupTitle: "Thursday, 27 August 2026",
    dateDisplay: "27 Aug 2026",
    time: "8:00 PM",
    loggedTime: "8:00 PM",
    medicine: "Metformin",
    genericName: "Metformin Hydrochloride",
    dosage: "500 mg",
    form: "Tablet",
    condition: "Type 2 Diabetes",
    doctorName: "Dr. Sharma",
    clinicName: "City Diabetes Center",
    status: "taken",
    instruction: "Take with dinner",
  },

  // Wednesday, 26 Aug 2026
  {
    id: "hist-26-1",
    dateKey: "2026-08-26",
    dateGroupTitle: "Wednesday, 26 August 2026",
    dateDisplay: "26 Aug 2026",
    time: "8:00 AM",
    loggedTime: "8:00 AM",
    medicine: "Metformin",
    genericName: "Metformin Hydrochloride",
    dosage: "500 mg",
    form: "Tablet",
    condition: "Type 2 Diabetes",
    doctorName: "Dr. Sharma",
    clinicName: "City Diabetes Center",
    status: "taken",
    instruction: "Take with breakfast",
  },
  {
    id: "hist-26-2",
    dateKey: "2026-08-26",
    dateGroupTitle: "Wednesday, 26 August 2026",
    dateDisplay: "26 Aug 2026",
    time: "9:00 AM",
    loggedTime: "9:05 AM",
    medicine: "Atorvastatin",
    genericName: "Atorvastatin Calcium",
    dosage: "10 mg",
    form: "Tablet",
    condition: "High Cholesterol",
    doctorName: "Dr. Patel",
    clinicName: "Apollo Heart Institute",
    status: "taken",
    instruction: "Take with water",
  },
  {
    id: "hist-26-3",
    dateKey: "2026-08-26",
    dateGroupTitle: "Wednesday, 26 August 2026",
    dateDisplay: "26 Aug 2026",
    time: "1:00 PM",
    loggedTime: "1:00 PM",
    medicine: "Amlodipine",
    genericName: "Amlodipine Besylate",
    dosage: "5 mg",
    form: "Tablet",
    condition: "Hypertension",
    doctorName: "Dr. Patel",
    clinicName: "Apollo Heart Institute",
    status: "taken",
    instruction: "Take with lunch",
  },
  {
    id: "hist-26-4",
    dateKey: "2026-08-26",
    dateGroupTitle: "Wednesday, 26 August 2026",
    dateDisplay: "26 Aug 2026",
    time: "8:00 PM",
    loggedTime: "8:00 PM",
    medicine: "Metformin",
    genericName: "Metformin Hydrochloride",
    dosage: "500 mg",
    form: "Tablet",
    condition: "Type 2 Diabetes",
    doctorName: "Dr. Sharma",
    clinicName: "City Diabetes Center",
    status: "taken",
    instruction: "Take with dinner",
  },

  // Tuesday, 25 Aug 2026
  {
    id: "hist-25-1",
    dateKey: "2026-08-25",
    dateGroupTitle: "Tuesday, 25 August 2026",
    dateDisplay: "25 Aug 2026",
    time: "8:00 AM",
    loggedTime: "8:20 AM",
    medicine: "Metformin",
    genericName: "Metformin Hydrochloride",
    dosage: "500 mg",
    form: "Tablet",
    condition: "Type 2 Diabetes",
    doctorName: "Dr. Sharma",
    clinicName: "City Diabetes Center",
    status: "taken",
    instruction: "Take with breakfast",
  },
  {
    id: "hist-25-2",
    dateKey: "2026-08-25",
    dateGroupTitle: "Tuesday, 25 August 2026",
    dateDisplay: "25 Aug 2026",
    time: "9:00 AM",
    loggedTime: "9:00 AM",
    medicine: "Atorvastatin",
    genericName: "Atorvastatin Calcium",
    dosage: "10 mg",
    form: "Tablet",
    condition: "High Cholesterol",
    doctorName: "Dr. Patel",
    clinicName: "Apollo Heart Institute",
    status: "taken",
    instruction: "Take with water",
  },
  {
    id: "hist-25-3",
    dateKey: "2026-08-25",
    dateGroupTitle: "Tuesday, 25 August 2026",
    dateDisplay: "25 Aug 2026",
    time: "1:00 PM",
    loggedTime: "1:30 PM",
    medicine: "Amlodipine",
    genericName: "Amlodipine Besylate",
    dosage: "5 mg",
    form: "Tablet",
    condition: "Hypertension",
    doctorName: "Dr. Patel",
    clinicName: "Apollo Heart Institute",
    status: "taken",
    instruction: "Take with lunch",
  },
  {
    id: "hist-25-4",
    dateKey: "2026-08-25",
    dateGroupTitle: "Tuesday, 25 August 2026",
    dateDisplay: "25 Aug 2026",
    time: "8:00 PM",
    medicine: "Metformin",
    genericName: "Metformin Hydrochloride",
    dosage: "500 mg",
    form: "Tablet",
    condition: "Type 2 Diabetes",
    doctorName: "Dr. Sharma",
    clinicName: "City Diabetes Center",
    status: "missed",
    instruction: "Take with dinner",
    notes: "Travel delay",
  },
];

export type PatientProfile = {
  id: string;
  firstName: string;
  fullName: string;
  initials: string;
  email: string;
  phone: string;
  dob: string;
  gender: "Male" | "Female" | "Other" | "Prefer not to say";
  bloodGroup: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  primaryPhysician: string;
  primaryClinic: string;
  accountType: string;
  memberSince: string;
};

export type PatientPreferences = {
  preferredReminderMethod: "push" | "sms" | "email";
  morningReminderTime: string;
  eveningReminderTime: string;
  advanceRefillDays: number;
  enableMedicationReminders: boolean;
  enableAppointmentReminders: boolean;
  enableRefillReminders: boolean;
  enableInteractionAlerts: boolean;
  enableDailyAdherenceDigest: boolean;
  enableTwoFactorAuth: boolean;
};

export const defaultPatientProfile: PatientProfile = {
  id: "PT-89420",
  firstName: "Alex",
  fullName: "Alex Fernandes",
  initials: "AF",
  email: "alex.fernandes@example.com",
  phone: "+1 (555) 349-8201",
  dob: "1984-03-14",
  gender: "Male",
  bloodGroup: "O+",
  address: "742 Evergreen Terrace, Springfield, OR 97477",
  emergencyContactName: "Elena Fernandes (Spouse)",
  emergencyContactPhone: "+1 (555) 349-8202",
  primaryPhysician: "Dr. Sharma",
  primaryClinic: "City Diabetes & Endocrine Center",
  accountType: "Patient Account",
  memberSince: "January 2025",
};

export const defaultPatientPreferences: PatientPreferences = {
  preferredReminderMethod: "push",
  morningReminderTime: "08:00",
  eveningReminderTime: "20:00",
  advanceRefillDays: 7,
  enableMedicationReminders: true,
  enableAppointmentReminders: true,
  enableRefillReminders: true,
  enableInteractionAlerts: true,
  enableDailyAdherenceDigest: false,
  enableTwoFactorAuth: true,
};






