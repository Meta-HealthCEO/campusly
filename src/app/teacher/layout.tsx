"use client";

import { PortalLayout } from "@/components/portal-layout";
import { LayoutDashboard, ClipboardCheck, GraduationCap, BookOpen } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/teacher", icon: <LayoutDashboard className="size-5" /> },
  { label: "Attendance", href: "/teacher?tab=attendance", icon: <ClipboardCheck className="size-5" /> },
  { label: "Grades", href: "/teacher?tab=grades", icon: <GraduationCap className="size-5" /> },
  { label: "Homework", href: "/teacher?tab=homework", icon: <BookOpen className="size-5" /> },
];

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalLayout navItems={navItems} portalName="Teacher Portal" portalColor="text-emerald-600">
      {children}
    </PortalLayout>
  );
}
