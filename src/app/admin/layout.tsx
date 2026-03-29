"use client";

import { PortalLayout } from "@/components/portal-layout";
import { LayoutDashboard, DollarSign, Users, UserCog } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="size-5" /> },
  { label: "Finance", href: "/admin", icon: <DollarSign className="size-5" /> },
  { label: "Students", href: "/admin", icon: <Users className="size-5" /> },
  { label: "Staff", href: "/admin", icon: <UserCog className="size-5" /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalLayout navItems={navItems} portalName="Admin Portal" portalColor="text-purple-600">
      {children}
    </PortalLayout>
  );
}
