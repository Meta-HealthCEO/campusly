"use client";

import { PortalLayout } from "@/components/portal-layout";
import { LayoutDashboard, Wallet, Receipt, FileBarChart } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/parent", icon: <LayoutDashboard className="size-5" /> },
  { label: "Wallet", href: "/parent/wallet", icon: <Wallet className="size-5" /> },
  { label: "Fees", href: "/parent/fees", icon: <Receipt className="size-5" /> },
  { label: "Reports", href: "/parent/reports", icon: <FileBarChart className="size-5" /> },
];

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalLayout navItems={navItems} portalName="Parent Portal">
      {children}
    </PortalLayout>
  );
}
