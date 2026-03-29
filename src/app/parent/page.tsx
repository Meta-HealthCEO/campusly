"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bell, CreditCard, Wallet, FileBarChart, Clock, BookOpen, ShoppingCart, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { children, notifications, activityFeed } from "@/data/mock";
import { formatCurrency, formatDate } from "@/lib/utils";

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const iconMap: Record<string, React.ReactNode> = {
  payment: <Wallet className="size-4" />,
  grade: <BookOpen className="size-4" />,
  purchase: <ShoppingCart className="size-4" />,
  attendance: <AlertCircle className="size-4" />,
};

export default function ParentDashboard() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div {...fadeIn} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Good morning, Parent
          </h1>
          <p className="text-muted-foreground mt-1">
            Here&apos;s what&apos;s happening with your children today.
          </p>
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </motion.div>

      {/* Child Overview Cards */}
      <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.1 }}>
        <h2 className="text-lg font-semibold mb-4">Your Children</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {children.map((child) => (
            <Card key={child.id} className="overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <Avatar className="size-12 bg-primary/10 text-primary">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {child.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{child.name}</h3>
                        <p className="text-sm text-muted-foreground">{child.grade}</p>
                      </div>
                    </div>
                    <Separator className="my-3" />
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Wallet Balance</p>
                        <p className="font-semibold text-[#10B981]">
                          {formatCurrency(child.walletBalance)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Next Payment</p>
                        <p className="font-semibold">
                          {formatDate(child.nextPaymentDue)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.2 }}>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          <Link href="/parent/fees">
            <Button
              variant="outline"
              className="h-auto w-full flex-col gap-2 py-4 hover:border-[#2563EB] hover:text-[#2563EB]"
            >
              <CreditCard className="size-5" />
              <span className="text-xs font-medium">Pay Fees</span>
            </Button>
          </Link>
          <Link href="/parent/wallet">
            <Button
              variant="outline"
              className="h-auto w-full flex-col gap-2 py-4 hover:border-[#F97316] hover:text-[#F97316]"
            >
              <Wallet className="size-5" />
              <span className="text-xs font-medium">Load Wallet</span>
            </Button>
          </Link>
          <Link href="/parent/reports">
            <Button
              variant="outline"
              className="h-auto w-full flex-col gap-2 py-4 hover:border-[#10B981] hover:text-[#10B981]"
            >
              <FileBarChart className="size-5" />
              <span className="text-xs font-medium">View Reports</span>
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Recent Activity Feed */}
      <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.3 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="size-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {activityFeed.map((item, index) => (
                <div key={item.id}>
                  <div className="flex items-start gap-3 py-3">
                    <div
                      className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full ${
                        item.icon === "payment"
                          ? "bg-green-100 text-green-600"
                          : item.icon === "grade"
                          ? "bg-blue-100 text-blue-600"
                          : item.icon === "purchase"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {iconMap[item.icon]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{item.text}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                    </div>
                  </div>
                  {index < activityFeed.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
