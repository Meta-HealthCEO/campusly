"use client";

import { PortalLayout } from "@/components/portal-layout";
import { Store, ShoppingCart, BarChart3 } from "lucide-react";

const navItems = [
  { label: "Menu", href: "/tuckshop", icon: <Store className="size-5" /> },
  { label: "Cart", href: "/tuckshop", icon: <ShoppingCart className="size-5" /> },
  { label: "Sales", href: "/tuckshop", icon: <BarChart3 className="size-5" /> },
];

export default function TuckShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalLayout navItems={navItems} portalName="Tuck Shop" portalColor="text-orange-500">
      {children}
    </PortalLayout>
  );
}
