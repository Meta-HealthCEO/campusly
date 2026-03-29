"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, CheckCircle, GraduationCap, MessageSquare, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { adminStats, feeCollectionTrend, attendanceByGrade, paymentMethods } from "@/data/mock";
import { formatCurrency } from "@/lib/utils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import type { PieLabelRenderProps } from "recharts";

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const statCards = [
  {
    title: "Total Students",
    value: adminStats.totalStudents.toLocaleString(),
    icon: <Users className="size-5 text-blue-600" />,
    bgColor: "bg-blue-50",
  },
  {
    title: "Fee Collection Rate",
    value: `${adminStats.feeCollectionRate}%`,
    icon: <TrendingUp className="size-5 text-green-600" />,
    bgColor: "bg-green-50",
  },
  {
    title: "Attendance Rate",
    value: `${adminStats.attendanceRate}%`,
    icon: <CheckCircle className="size-5 text-purple-600" />,
    bgColor: "bg-purple-50",
  },
  {
    title: "Staff Count",
    value: adminStats.staffCount.toLocaleString(),
    icon: <GraduationCap className="size-5 text-orange-600" />,
    bgColor: "bg-orange-50",
  },
];

const financialCards = [
  {
    title: "Collected This Month",
    value: formatCurrency(adminStats.collectedThisMonth),
    color: "text-green-600",
  },
  {
    title: "Outstanding",
    value: formatCurrency(adminStats.outstanding),
    color: "text-red-500",
  },
  {
    title: "Projected Next Month",
    value: formatCurrency(adminStats.projectedNextMonth),
    color: "text-blue-600",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div {...fadeIn}>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Overview of school performance and finances.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.1 }}>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {statCards.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${stat.bgColor}`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Financial Summary */}
      <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.15 }}>
        <h2 className="text-lg font-semibold mb-4">Financial Summary</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {financialCards.map((card) => (
            <Card key={card.title}>
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">{card.title}</p>
                <p className={`text-2xl font-bold mt-1 ${card.color}`}>{card.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Charts Section */}
      {/* Fee Collection Trend - Full Width */}
      <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle>Fee Collection Trend</CardTitle>
            <CardDescription>Monthly collected vs target amounts</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={feeCollectionTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(v: number) => `R${(v / 1000000).toFixed(1)}M`} />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="collected"
                  stroke="#2563EB"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Collected"
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#9CA3AF"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4 }}
                  name="Target"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Bar Chart & Pie Chart Side by Side */}
      <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.25 }}>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Attendance by Grade */}
          <Card>
            <CardHeader>
              <CardTitle>Attendance by Grade</CardTitle>
              <CardDescription>Average attendance rate per grade</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceByGrade}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="grade" tick={{ fontSize: 12 }} />
                  <YAxis domain={[80, 100]} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Bar dataKey="rate" fill="#2563EB" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Distribution of payment types</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={paymentMethods}
                    dataKey="value"
                    nameKey="method"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={(props: PieLabelRenderProps) => `${(props as PieLabelRenderProps & { method: string }).method}: ${props.value}%`}
                  >
                    {paymentMethods.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.3 }}>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            className="h-auto flex-col gap-2 py-4 hover:border-purple-500 hover:text-purple-600"
          >
            <MessageSquare className="size-5" />
            <span className="text-xs font-medium">Send Bulk SMS</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto flex-col gap-2 py-4 hover:border-blue-500 hover:text-blue-600"
          >
            <FileText className="size-5" />
            <span className="text-xs font-medium">Generate Reports</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto flex-col gap-2 py-4 hover:border-green-500 hover:text-green-600"
          >
            <Users className="size-5" />
            <span className="text-xs font-medium">Manage Staff</span>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
