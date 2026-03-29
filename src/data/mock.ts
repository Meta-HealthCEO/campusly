// ============================================================
// CAMPUSLY MOCK DATA
// ============================================================

// --- Types ---
export interface Child {
  id: string;
  name: string;
  grade: string;
  avatar: string;
  walletBalance: number;
  nextPaymentDue: string;
  nextPaymentAmount: number;
}

export interface Transaction {
  id: string;
  childId: string;
  type: "load" | "purchase" | "fee";
  description: string;
  amount: number;
  date: string;
  balance: number;
}

export interface Fee {
  id: string;
  childId: string;
  description: string;
  amount: number;
  dueDate: string;
  status: "paid" | "due" | "overdue";
  term: string;
  category: string;
}

export interface Subject {
  id: string;
  name: string;
  grade: number;
  trend: number[];
  teacherComment: string;
  teacher: string;
}

export interface Homework {
  id: string;
  subject: string;
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded";
  grade?: number;
  teacherComment?: string;
  rubric?: string;
  childId: string;
}

export interface TuckShopItem {
  id: string;
  name: string;
  price: number;
  category: string;
  emoji: string;
  popular?: boolean;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  attendance: number;
  avgGrade: number;
  status: "good" | "warning" | "alert";
  statusNote?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "payment" | "grade" | "attendance" | "general";
}

export interface TimetableEntry {
  day: string;
  periods: { time: string; subject: string; room: string }[];
}

export interface ReportCard {
  term: string;
  year: number;
  subjects: Subject[];
  attendance: { present: number; absent: number; late: number };
  behaviourPoints: number;
  meritPoints: number;
  teacherComment: string;
}

// --- School ---
export const school = {
  name: "Greenfield Primary School",
  location: "Sandton",
  totalStudents: 847,
  totalStaff: 62,
};

// --- Children ---
export const children: Child[] = [
  {
    id: "emma",
    name: "Emma Schoeman",
    grade: "Grade 4",
    avatar: "ES",
    walletBalance: 350,
    nextPaymentDue: "2026-04-01",
    nextPaymentAmount: 4500,
  },
  {
    id: "jack",
    name: "Jack Schoeman",
    grade: "Grade 1",
    avatar: "JS",
    walletBalance: 180,
    nextPaymentDue: "2026-04-01",
    nextPaymentAmount: 4500,
  },
];

// --- Transactions ---
export const transactions: Transaction[] = [
  { id: "t1", childId: "emma", type: "purchase", description: "Tuck Shop - Sandwich & Juice", amount: -40, date: "2026-03-28", balance: 350 },
  { id: "t2", childId: "emma", type: "load", description: "Wallet Top-up", amount: 200, date: "2026-03-27", balance: 390 },
  { id: "t3", childId: "emma", type: "purchase", description: "Tuck Shop - Chips", amount: -10, date: "2026-03-26", balance: 190 },
  { id: "t4", childId: "emma", type: "fee", description: "Extramurals - March", amount: -850, date: "2026-03-15", balance: 200 },
  { id: "t5", childId: "emma", type: "load", description: "Wallet Top-up", amount: 500, date: "2026-03-10", balance: 1050 },
  { id: "t6", childId: "jack", type: "purchase", description: "Tuck Shop - Juice Box", amount: -15, date: "2026-03-28", balance: 180 },
  { id: "t7", childId: "jack", type: "load", description: "Wallet Top-up", amount: 100, date: "2026-03-25", balance: 195 },
  { id: "t8", childId: "jack", type: "purchase", description: "Tuck Shop - Cookie", amount: -8, date: "2026-03-24", balance: 95 },
  { id: "t9", childId: "emma", type: "purchase", description: "Tuck Shop - Water", amount: -10, date: "2026-03-25", balance: 180 },
  { id: "t10", childId: "jack", type: "load", description: "Wallet Top-up", amount: 50, date: "2026-03-20", balance: 103 },
];

// --- Fees ---
export const fees: Fee[] = [
  { id: "f1", childId: "emma", description: "Tuition - March", amount: 4500, dueDate: "2026-04-01", status: "due", term: "Term 1", category: "Tuition" },
  { id: "f2", childId: "emma", description: "Extramurals - Term 1", amount: 850, dueDate: "2026-03-15", status: "paid", term: "Term 1", category: "Extramurals" },
  { id: "f3", childId: "emma", description: "School Camp", amount: 1200, dueDate: "2026-04-15", status: "due", term: "Term 1", category: "Activities" },
  { id: "f4", childId: "emma", description: "Tuition - February", amount: 4500, dueDate: "2026-03-01", status: "paid", term: "Term 1", category: "Tuition" },
  { id: "f5", childId: "emma", description: "Stationery Pack", amount: 650, dueDate: "2026-02-01", status: "paid", term: "Term 1", category: "Supplies" },
  { id: "f6", childId: "jack", description: "Tuition - March", amount: 4500, dueDate: "2026-04-01", status: "due", term: "Term 1", category: "Tuition" },
  { id: "f7", childId: "jack", description: "Tuition - February", amount: 4500, dueDate: "2026-03-01", status: "paid", term: "Term 1", category: "Tuition" },
  { id: "f8", childId: "jack", description: "Art Supplies", amount: 350, dueDate: "2026-02-15", status: "paid", term: "Term 1", category: "Supplies" },
  { id: "f9", childId: "emma", description: "Tuition - April", amount: 4500, dueDate: "2026-05-01", status: "due", term: "Term 2", category: "Tuition" },
  { id: "f10", childId: "jack", description: "Extramurals - Term 1", amount: 600, dueDate: "2026-03-15", status: "overdue", term: "Term 1", category: "Extramurals" },
];

// --- Subjects (Emma - Grade 4) ---
export const emmaSubjects: Subject[] = [
  { id: "s1", name: "Mathematics", grade: 78, trend: [72, 75, 70, 78, 82, 78], teacherComment: "Emma shows strong problem-solving skills. Keep practicing long division.", teacher: "Mrs. van der Merwe" },
  { id: "s2", name: "English Home Language", grade: 85, trend: [80, 82, 85, 83, 88, 85], teacherComment: "Excellent creative writing. Reading comprehension is improving nicely.", teacher: "Mrs. van der Merwe" },
  { id: "s3", name: "Afrikaans FAL", grade: 68, trend: [60, 63, 65, 68, 70, 68], teacherComment: "Good progress this term. Vocabulary is growing.", teacher: "Juf. Botha" },
  { id: "s4", name: "Natural Sciences", grade: 82, trend: [78, 80, 75, 82, 84, 82], teacherComment: "Very curious learner. Excellent project on the water cycle.", teacher: "Mr. Ndlovu" },
  { id: "s5", name: "Social Sciences", grade: 74, trend: [70, 72, 68, 74, 76, 74], teacherComment: "Good participation in class discussions.", teacher: "Mrs. van der Merwe" },
  { id: "s6", name: "Technology", grade: 88, trend: [82, 85, 86, 88, 90, 88], teacherComment: "Outstanding design skills. A natural problem solver.", teacher: "Mr. Pillay" },
  { id: "s7", name: "Life Skills", grade: 90, trend: [88, 85, 90, 88, 92, 90], teacherComment: "A role model in the classroom. Excellent teamwork.", teacher: "Mrs. van der Merwe" },
  { id: "s8", name: "Creative Arts", grade: 92, trend: [88, 90, 92, 91, 94, 92], teacherComment: "Exceptional artistic talent. Beautiful portfolio work.", teacher: "Ms. September" },
];

// --- Subjects (Jack - Grade 1) ---
export const jackSubjects: Subject[] = [
  { id: "s9", name: "Mathematics", grade: 72, trend: [65, 68, 70, 72, 74, 72], teacherComment: "Jack is getting the hang of addition and subtraction.", teacher: "Mrs. Khumalo" },
  { id: "s10", name: "English Home Language", grade: 70, trend: [62, 65, 68, 70, 72, 70], teacherComment: "Reading is coming along. Practice reading at home helps a lot.", teacher: "Mrs. Khumalo" },
  { id: "s11", name: "Afrikaans FAL", grade: 65, trend: [58, 60, 62, 65, 66, 65], teacherComment: "Building vocabulary steadily.", teacher: "Juf. Botha" },
  { id: "s12", name: "Life Skills", grade: 85, trend: [80, 82, 84, 85, 86, 85], teacherComment: "Very well-behaved. Plays nicely with others.", teacher: "Mrs. Khumalo" },
  { id: "s13", name: "Natural Sciences", grade: 75, trend: [70, 72, 73, 75, 76, 75], teacherComment: "Enjoys learning about animals.", teacher: "Mrs. Khumalo" },
  { id: "s14", name: "Social Sciences", grade: 68, trend: [62, 64, 66, 68, 70, 68], teacherComment: "Good class participation.", teacher: "Mrs. Khumalo" },
  { id: "s15", name: "Technology", grade: 78, trend: [72, 74, 76, 78, 80, 78], teacherComment: "Enjoys building activities.", teacher: "Mrs. Khumalo" },
  { id: "s16", name: "Creative Arts", grade: 88, trend: [82, 84, 86, 88, 90, 88], teacherComment: "Very creative drawings!", teacher: "Mrs. Khumalo" },
];

// --- Homework ---
export const homework: Homework[] = [
  {
    id: "hw1",
    subject: "Mathematics",
    title: "Long Division Worksheet",
    description: "Complete exercises 1-20 on page 45 of your textbook. Show all working out. Remember to check your answers by multiplying.",
    dueDate: "2026-04-02",
    status: "pending",
    childId: "emma",
    rubric: "Accuracy (40%) | Working shown (30%) | Presentation (20%) | Checking (10%)",
  },
  {
    id: "hw2",
    subject: "English Home Language",
    title: "Creative Writing: My Best Holiday",
    description: "Write a 300-word essay about your favourite holiday memory. Include descriptive language, dialogue, and at least 3 paragraphs. Use the planning sheet provided.",
    dueDate: "2026-04-03",
    status: "pending",
    childId: "emma",
  },
  {
    id: "hw3",
    subject: "Natural Sciences",
    title: "Water Cycle Diagram",
    description: "Draw and label a complete water cycle diagram. Include evaporation, condensation, precipitation, and collection. Color neatly.",
    dueDate: "2026-03-28",
    status: "submitted",
    childId: "emma",
  },
  {
    id: "hw4",
    subject: "Afrikaans FAL",
    title: "Begripstoets Voorbereiding",
    description: "Lees die storie op bladsy 30 en beantwoord die vrae. Skryf volsinne.",
    dueDate: "2026-03-25",
    status: "graded",
    grade: 76,
    teacherComment: "Goeie werk, Emma! Let op jou spelling van moeilike woorde.",
    childId: "emma",
  },
  {
    id: "hw5",
    subject: "Technology",
    title: "Bridge Design Project",
    description: "Design a bridge using only paper and glue. Draw your design plan first, listing all materials needed. The bridge must hold at least 500g.",
    dueDate: "2026-03-20",
    status: "graded",
    grade: 92,
    teacherComment: "Excellent design! Your bridge held 750g - one of the strongest in the class.",
    childId: "emma",
    rubric: "Design plan (25%) | Construction (25%) | Strength test (25%) | Presentation (25%)",
  },
];

// --- Tuck Shop Items ---
export const tuckShopItems: TuckShopItem[] = [
  { id: "ts1", name: "Cheese Sandwich", price: 25, category: "Sandwiches", emoji: "🥪", popular: true },
  { id: "ts2", name: "Ham & Cheese Roll", price: 30, category: "Sandwiches", emoji: "🌯" },
  { id: "ts3", name: "Peanut Butter Sandwich", price: 18, category: "Sandwiches", emoji: "🥜" },
  { id: "ts4", name: "Apple Juice Box", price: 15, category: "Drinks", emoji: "🧃", popular: true },
  { id: "ts5", name: "Water Bottle", price: 10, category: "Drinks", emoji: "💧" },
  { id: "ts6", name: "Chocolate Milk", price: 18, category: "Drinks", emoji: "🥛" },
  { id: "ts7", name: "Orange Juice", price: 15, category: "Drinks", emoji: "🍊" },
  { id: "ts8", name: "Packet of Chips", price: 10, category: "Snacks", emoji: "🍟", popular: true },
  { id: "ts9", name: "Chocolate Bar", price: 12, category: "Snacks", emoji: "🍫" },
  { id: "ts10", name: "Cookie", price: 8, category: "Snacks", emoji: "🍪" },
  { id: "ts11", name: "Fruit Salad Cup", price: 20, category: "Healthy", emoji: "🍓" },
  { id: "ts12", name: "Yoghurt", price: 15, category: "Healthy", emoji: "🥄" },
  { id: "ts13", name: "Banana", price: 5, category: "Healthy", emoji: "🍌" },
  { id: "ts14", name: "Muffin", price: 15, category: "Baked", emoji: "🧁", popular: true },
  { id: "ts15", name: "Vetkoek", price: 20, category: "Baked", emoji: "🫓" },
  { id: "ts16", name: "Popcorn", price: 8, category: "Snacks", emoji: "🍿" },
  { id: "ts17", name: "Dried Fruit Pack", price: 12, category: "Healthy", emoji: "🍇" },
  { id: "ts18", name: "Ice Lolly", price: 10, category: "Frozen", emoji: "🍦" },
  { id: "ts19", name: "Boerewors Roll", price: 35, category: "Hot Food", emoji: "🌭" },
  { id: "ts20", name: "Toasted Cheese", price: 22, category: "Hot Food", emoji: "🧀" },
];

// --- Class Students (for Teacher Portal) ---
export const classStudents: Student[] = [
  { id: "cs1", name: "Emma Schoeman", grade: "Grade 4", attendance: 96, avgGrade: 82, status: "good" },
  { id: "cs2", name: "Thabo Mokoena", grade: "Grade 4", attendance: 92, avgGrade: 75, status: "good" },
  { id: "cs3", name: "Aisha Patel", grade: "Grade 4", attendance: 98, avgGrade: 91, status: "good" },
  { id: "cs4", name: "Liam O'Brien", grade: "Grade 4", attendance: 78, avgGrade: 58, status: "alert", statusNote: "4 consecutive absences" },
  { id: "cs5", name: "Zanele Dlamini", grade: "Grade 4", attendance: 94, avgGrade: 85, status: "good" },
  { id: "cs6", name: "Pieter du Plessis", grade: "Grade 4", attendance: 90, avgGrade: 65, status: "warning", statusNote: "Grade dropping" },
  { id: "cs7", name: "Fatima Khan", grade: "Grade 4", attendance: 100, avgGrade: 94, status: "good" },
  { id: "cs8", name: "Noah Williams", grade: "Grade 4", attendance: 88, avgGrade: 70, status: "good" },
  { id: "cs9", name: "Lerato Molefe", grade: "Grade 4", attendance: 96, avgGrade: 88, status: "good" },
  { id: "cs10", name: "Chloe van Wyk", grade: "Grade 4", attendance: 86, avgGrade: 62, status: "warning", statusNote: "Improving trend" },
  { id: "cs11", name: "Sipho Nkosi", grade: "Grade 4", attendance: 94, avgGrade: 79, status: "good" },
  { id: "cs12", name: "Hannah Joubert", grade: "Grade 4", attendance: 92, avgGrade: 83, status: "good" },
];

// --- Notifications ---
export const notifications: Notification[] = [
  { id: "n1", title: "Fee Due Reminder", message: "Tuition for March (R4,500) is due on 1 April", time: "2h ago", read: false, type: "payment" },
  { id: "n2", title: "New Grade Posted", message: "Emma received 76% for Afrikaans Begripstoets", time: "5h ago", read: false, type: "grade" },
  { id: "n3", title: "Homework Graded", message: "Bridge Design Project: 92% - Excellent!", time: "1d ago", read: true, type: "grade" },
  { id: "n4", title: "Low Wallet Balance", message: "Jack's wallet balance is below R200", time: "2d ago", read: true, type: "payment" },
  { id: "n5", title: "Attendance Alert", message: "Emma was marked late on 26 March", time: "3d ago", read: true, type: "attendance" },
];

// --- Timetable (Emma - Grade 4) ---
export const timetable: TimetableEntry[] = [
  {
    day: "Monday",
    periods: [
      { time: "07:45", subject: "Mathematics", room: "4A" },
      { time: "08:30", subject: "English", room: "4A" },
      { time: "09:15", subject: "Break", room: "" },
      { time: "09:45", subject: "Afrikaans", room: "4A" },
      { time: "10:30", subject: "Natural Sciences", room: "Lab 1" },
      { time: "11:15", subject: "Break", room: "" },
      { time: "11:45", subject: "Life Skills", room: "4A" },
      { time: "12:30", subject: "Creative Arts", room: "Art Room" },
    ],
  },
  {
    day: "Tuesday",
    periods: [
      { time: "07:45", subject: "English", room: "4A" },
      { time: "08:30", subject: "Mathematics", room: "4A" },
      { time: "09:15", subject: "Break", room: "" },
      { time: "09:45", subject: "Technology", room: "4A" },
      { time: "10:30", subject: "Social Sciences", room: "4A" },
      { time: "11:15", subject: "Break", room: "" },
      { time: "11:45", subject: "Afrikaans", room: "4A" },
      { time: "12:30", subject: "Life Skills", room: "4A" },
    ],
  },
  {
    day: "Wednesday",
    periods: [
      { time: "07:45", subject: "Mathematics", room: "4A" },
      { time: "08:30", subject: "Natural Sciences", room: "Lab 1" },
      { time: "09:15", subject: "Break", room: "" },
      { time: "09:45", subject: "English", room: "4A" },
      { time: "10:30", subject: "Creative Arts", room: "Art Room" },
      { time: "11:15", subject: "Break", room: "" },
      { time: "11:45", subject: "Social Sciences", room: "4A" },
      { time: "12:30", subject: "Technology", room: "4A" },
    ],
  },
  {
    day: "Thursday",
    periods: [
      { time: "07:45", subject: "Afrikaans", room: "4A" },
      { time: "08:30", subject: "Mathematics", room: "4A" },
      { time: "09:15", subject: "Break", room: "" },
      { time: "09:45", subject: "Life Skills", room: "4A" },
      { time: "10:30", subject: "English", room: "4A" },
      { time: "11:15", subject: "Break", room: "" },
      { time: "11:45", subject: "Natural Sciences", room: "Lab 1" },
      { time: "12:30", subject: "Creative Arts", room: "Art Room" },
    ],
  },
  {
    day: "Friday",
    periods: [
      { time: "07:45", subject: "English", room: "4A" },
      { time: "08:30", subject: "Afrikaans", room: "4A" },
      { time: "09:15", subject: "Break", room: "" },
      { time: "09:45", subject: "Mathematics", room: "4A" },
      { time: "10:30", subject: "Technology", room: "4A" },
      { time: "11:15", subject: "Break", room: "" },
      { time: "11:45", subject: "Social Sciences", room: "4A" },
      { time: "12:30", subject: "Sport", room: "Field" },
    ],
  },
];

// --- Report Card ---
export const emmaReportCard: ReportCard = {
  term: "Term 1",
  year: 2026,
  subjects: emmaSubjects,
  attendance: { present: 48, absent: 2, late: 1 },
  behaviourPoints: 45,
  meritPoints: 12,
  teacherComment: "Emma is a delightful learner who consistently produces quality work. She is kind and helpful to her classmates and takes pride in her achievements. Keep up the excellent work, Emma!",
};

// --- Admin Dashboard Data ---
export const adminStats = {
  totalStudents: 847,
  feeCollectionRate: 87,
  attendanceRate: 94,
  staffCount: 62,
  collectedThisMonth: 1850000,
  outstanding: 275000,
  projectedNextMonth: 1920000,
};

export const feeCollectionTrend = [
  { month: "Oct", collected: 1620000, target: 1800000 },
  { month: "Nov", collected: 1750000, target: 1800000 },
  { month: "Dec", collected: 1680000, target: 1800000 },
  { month: "Jan", collected: 1820000, target: 1900000 },
  { month: "Feb", collected: 1780000, target: 1900000 },
  { month: "Mar", collected: 1850000, target: 1900000 },
];

export const attendanceByGrade = [
  { grade: "Grade R", rate: 92 },
  { grade: "Grade 1", rate: 94 },
  { grade: "Grade 2", rate: 96 },
  { grade: "Grade 3", rate: 95 },
  { grade: "Grade 4", rate: 93 },
  { grade: "Grade 5", rate: 91 },
  { grade: "Grade 6", rate: 90 },
  { grade: "Grade 7", rate: 88 },
];

export const paymentMethods = [
  { method: "EFT", value: 45, fill: "#2563EB" },
  { method: "Card", value: 30, fill: "#F97316" },
  { method: "Debit Order", value: 20, fill: "#10B981" },
  { method: "Cash", value: 5, fill: "#8B5CF6" },
];

// --- Daily Tuck Shop Sales ---
export const dailySales = [
  { item: "Cheese Sandwich", qty: 45, revenue: 1125 },
  { item: "Apple Juice Box", qty: 62, revenue: 930 },
  { item: "Packet of Chips", qty: 58, revenue: 580 },
  { item: "Muffin", qty: 34, revenue: 510 },
  { item: "Water Bottle", qty: 40, revenue: 400 },
  { item: "Cookie", qty: 38, revenue: 304 },
  { item: "Boerewors Roll", qty: 22, revenue: 770 },
  { item: "Chocolate Milk", qty: 28, revenue: 504 },
];

// --- Activity Feed ---
export const activityFeed = [
  { id: "a1", icon: "payment", text: "Wallet loaded with R200 for Emma", time: "Yesterday", color: "text-green-600" },
  { id: "a2", icon: "grade", text: "Emma graded 92% on Bridge Design", time: "2 days ago", color: "text-blue-600" },
  { id: "a3", icon: "purchase", text: "Tuck Shop: Sandwich & Juice (R40)", time: "2 days ago", color: "text-orange-600" },
  { id: "a4", icon: "attendance", text: "Emma marked late - 26 March", time: "3 days ago", color: "text-yellow-600" },
  { id: "a5", icon: "payment", text: "Extramurals fee R850 paid", time: "2 weeks ago", color: "text-green-600" },
  { id: "a6", icon: "grade", text: "Emma graded 76% on Afrikaans test", time: "2 weeks ago", color: "text-blue-600" },
  { id: "a7", icon: "purchase", text: "Tuck Shop: Juice Box (R15) for Jack", time: "2 days ago", color: "text-orange-600" },
];

// --- Pricing ---
export const pricingPlans = [
  {
    name: "Starter",
    price: 15,
    period: "per student / month",
    description: "Perfect for small schools getting started",
    features: ["Parent & student portals", "Fee management", "Basic reporting", "Email notifications", "Up to 200 students"],
    highlighted: false,
  },
  {
    name: "Professional",
    price: 25,
    period: "per student / month",
    description: "Everything you need to run a modern school",
    features: ["Everything in Starter", "Digital wallet & tuck shop", "Homework management", "Advanced analytics", "SMS notifications", "Up to 1,000 students", "Priority support"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: 40,
    period: "per student / month",
    description: "For large schools and school groups",
    features: ["Everything in Professional", "Multi-campus support", "Custom branding", "API access", "Dedicated account manager", "Unlimited students", "SLA guarantee"],
    highlighted: false,
  },
];

// --- Testimonials ---
export const testimonials = [
  {
    quote: "Campusly transformed how we manage fees. Collection rates went from 72% to 94% in just one term.",
    author: "Sarah Mitchell",
    role: "Principal",
    school: "Oakridge Preparatory",
  },
  {
    quote: "As a parent, I love being able to load my child's tuck shop wallet from my phone. No more lost lunch money!",
    author: "David Naidoo",
    role: "Parent",
    school: "Westbury Primary",
  },
  {
    quote: "The homework submission feature saved our teachers hours every week. It's genuinely made their lives easier.",
    author: "Thandi Mkhize",
    role: "Head of IT",
    school: "Riverside College",
  },
];
