"use client";

import { PortalLayout } from "@/components/portal-layout";
import { LayoutDashboard, BookOpen, GraduationCap, Calendar } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/student", icon: <LayoutDashboard className="size-5" /> },
  { label: "Homework", href: "/student#homework", icon: <BookOpen className="size-5" /> },
  { label: "Grades", href: "/student#grades", icon: <GraduationCap className="size-5" /> },
  { label: "Timetable", href: "/student#timetable", icon: <Calendar className="size-5" /> },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalLayout navItems={navItems} portalName="Student Portal" portalColor="text-orange-500">
      {children}
    </PortalLayout>
  );
}
