"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, TrendingUp, Wallet, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { homework, emmaSubjects, timetable, children } from "@/data/mock";
import { useState } from "react";

const emmaHomework = homework.filter((h) => h.childId === "emma");
const pendingCount = emmaHomework.filter((h) => h.status === "pending").length;
const averageGrade = Math.round(
  emmaSubjects.reduce((sum, s) => sum + s.grade, 0) / emmaSubjects.length
);
const walletBalance = children[0].walletBalance;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 80;
  const height = 32;
  const padding = 2;

  const points = data
    .map((val, i) => {
      const x = padding + (i / (data.length - 1)) * (width - padding * 2);
      const y = height - padding - ((val - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} className="inline-block">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getGradeColor(grade: number) {
  if (grade >= 75) return "#22c55e";
  if (grade >= 60) return "#f97316";
  return "#ef4444";
}

function getGradeTextClass(grade: number) {
  if (grade >= 75) return "text-green-600";
  if (grade >= 60) return "text-orange-500";
  return "text-red-500";
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Get all unique times from the timetable
const allTimes = Array.from(
  new Set(timetable.flatMap((day) => day.periods.map((p) => p.time)))
).sort();

export default function StudentDashboard() {
  const today = new Date();
  const dayIndex = today.getDay();
  // Map Sunday=0 to Friday (4), Mon=1 to 0, etc.
  const defaultDay = dayIndex >= 1 && dayIndex <= 5 ? days[dayIndex - 1] : days[0];
  const [mobileDay, setMobileDay] = useState(defaultDay);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold tracking-tight">
          Hi Emma! <span className="inline-block animate-[wave_1.5s_ease-in-out_infinite]">👋</span>
        </h1>
        <p className="text-muted-foreground mt-1">Here&apos;s what&apos;s happening today</p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={item} className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              <BookOpen className="size-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Upcoming Homework</p>
              <p className="text-2xl font-bold">{pendingCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
              <TrendingUp className="size-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average Grade</p>
              <p className="text-2xl font-bold">{averageGrade}%</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Wallet className="size-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tuck Shop Balance</p>
              <p className="text-2xl font-bold">R{walletBalance}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Homework Section */}
      <motion.div variants={item} id="homework">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="size-5 text-orange-500" />
              Homework
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {emmaHomework.map((hw) => {
              const due = new Date(hw.dueDate);
              const daysUntil = Math.ceil(
                (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
              );

              return (
                <Link key={hw.id} href={`/student/homework/${hw.id}`}>
                  <div className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          {hw.subject}
                        </span>
                        {hw.status === "pending" && (
                          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                            Pending
                          </Badge>
                        )}
                        {hw.status === "submitted" && (
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                            Submitted
                          </Badge>
                        )}
                        {hw.status === "graded" && (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            Graded {hw.grade}%
                          </Badge>
                        )}
                      </div>
                      <p className="font-medium mt-1">{hw.title}</p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <Clock className="size-3" />
                        <span>
                          Due {due.toLocaleDateString("en-ZA", { day: "numeric", month: "short" })}
                          {hw.status === "pending" && daysUntil > 0 && ` (${daysUntil}d left)`}
                          {hw.status === "pending" && daysUntil <= 0 && " (Overdue)"}
                        </span>
                      </div>
                    </div>
                    <span className="text-muted-foreground ml-2">&rsaquo;</span>
                  </div>
                </Link>
              );
            })}
          </CardContent>
        </Card>
      </motion.div>

      {/* Grades Overview */}
      <motion.div variants={item} id="grades">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-5 text-orange-500" />
              Grades Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {emmaSubjects.map((subject) => (
                <div
                  key={subject.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{subject.name}</p>
                    <p className={`text-2xl font-bold ${getGradeTextClass(subject.grade)}`}>
                      {subject.grade}%
                    </p>
                  </div>
                  <MiniSparkline data={subject.trend} color={getGradeColor(subject.grade)} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Timetable */}
      <motion.div variants={item} id="timetable">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="size-5 text-orange-500" />
              Timetable
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Desktop: full weekly grid */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-2 text-muted-foreground font-medium border-b">
                      Time
                    </th>
                    {days.map((day) => (
                      <th
                        key={day}
                        className="text-left p-2 text-muted-foreground font-medium border-b"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allTimes.map((time) => (
                    <tr key={time}>
                      <td className="p-2 text-muted-foreground font-mono text-xs border-b whitespace-nowrap">
                        {time}
                      </td>
                      {timetable.map((dayEntry) => {
                        const period = dayEntry.periods.find((p) => p.time === time);
                        if (!period) {
                          return (
                            <td key={dayEntry.day} className="p-2 border-b">
                              &mdash;
                            </td>
                          );
                        }
                        const isBreak = period.subject === "Break";
                        return (
                          <td
                            key={dayEntry.day}
                            className={`p-2 border-b ${
                              isBreak
                                ? "bg-muted/50 text-muted-foreground italic"
                                : ""
                            }`}
                          >
                            <span className="font-medium">{period.subject}</span>
                            {!isBreak && period.room && (
                              <span className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                                <MapPin className="size-3" />
                                {period.room}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile: day tabs */}
            <div className="md:hidden">
              <Tabs value={mobileDay} onValueChange={setMobileDay}>
                <TabsList className="w-full">
                  {days.map((day) => (
                    <TabsTrigger key={day} value={day} className="flex-1 text-xs">
                      {day.slice(0, 3)}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {timetable.map((dayEntry) => (
                  <TabsContent key={dayEntry.day} value={dayEntry.day} className="mt-4 space-y-2">
                    {dayEntry.periods.map((period, idx) => {
                      const isBreak = period.subject === "Break";
                      return (
                        <div
                          key={idx}
                          className={`flex items-center gap-3 rounded-lg p-3 ${
                            isBreak
                              ? "bg-muted/50 text-muted-foreground italic"
                              : "border"
                          }`}
                        >
                          <span className="font-mono text-xs text-muted-foreground w-12 shrink-0">
                            {period.time}
                          </span>
                          <div className="flex-1">
                            <span className="font-medium">{period.subject}</span>
                            {!isBreak && period.room && (
                              <span className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                                <MapPin className="size-3" />
                                {period.room}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
