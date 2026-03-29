# Campusly MVP — Design Spec

## Overview
Campusly is a modern school management system MVP. All mock data, no backend. Built with Next.js 15 App Router, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Recharts.

## Brand
- **Name:** Campusly
- **Tagline:** "Smart School. Happy Parents."
- **Colors:** Primary blue #2563EB, Accent orange #F97316, Success green #10B981, Dark #0F172A, Light bg #F8FAFC
- **Style:** Clean, modern, professional but friendly. Mobile-first. Revolut/Monzo style meets school.
- **Logo:** SVG — graduation cap + signal/wifi arc (connected school). Blue and orange.

## Routes & Features

### 1. Landing Page (/)
- Hero: "The all-in-one school platform parents actually love"
- Feature showcase cards, pricing section (per student/month), testimonials
- CTAs: "Book a Demo" + "Parent Login"
- Footer with links

### 2. Parent Portal (/parent)
- Dashboard: child overview cards (name, grade, balance, next payment)
- Quick actions: Pay Fees, Load Wallet, View Reports
- Recent activity feed, notifications bell with count

### 3. Wallet System (/parent/wallet)
- Balance display, "Load Money" with preset amounts (R50/100/200/500/custom)
- Mock payment with confetti, transaction history
- Wristband section, spending limits, low balance alerts

### 4. Fee Management (/parent/fees)
- Upcoming payments with status badges (Paid/Due/Overdue)
- Pay Now per item, payment history with receipts
- Debit order setup, fee breakdown per term, outstanding balance

### 5. Student Portal (/student)
- Dashboard: homework, grades, tuck shop balance
- Homework list with statuses, file upload submission
- Grades with trend sparklines, weekly timetable grid

### 6. Homework Detail (/student/homework/[id])
- Assignment brief, due date countdown, file upload
- Teacher comments, grade display, rubric

### 7. Teacher Portal (/teacher)
- Class overview with student stats
- Attendance capture (checkbox grid), grade capture (spreadsheet-style)
- Create homework form, performance alerts

### 8. Admin Dashboard (/admin)
- School overview stats, financial summary
- Charts: fee collection trend (line), attendance by grade (bar), payment methods (pie)
- Quick actions: Send Bulk SMS, Generate Reports, Manage Staff

### 9. Tuck Shop (/tuckshop)
- Menu grid with items and prices, cart system
- Wallet balance payment, NFC wristband scan mockup
- Daily sales summary, popular items chart

### 10. Reports (/parent/reports)
- Term report card, subject grades with teacher comments
- Attendance summary, behaviour/merit points
- Download PDF button

## Mock Data
- School: Greenfield Primary School, Sandton
- Parent's children: Emma Schoeman (Grade 4), Jack Schoeman (Grade 1)
- 8 subjects per child, 5 homework assignments, 20 tuck shop items
- Fee schedule per term, wallet balance R350
- Teacher: Mrs. van der Merwe (Grade 4)

## Navigation
- Role-based: landing links to Parent/Student/Teacher/Admin
- Each portal: sidebar nav (desktop) + bottom nav (mobile)
- Back buttons, breadcrumbs

## Tech
- Next.js 15 App Router, TypeScript, Tailwind CSS
- shadcn/ui, Framer Motion, Lucide React, Recharts
- PWA manifest, all mock data, no backend
- `npm run build` must succeed with zero errors
