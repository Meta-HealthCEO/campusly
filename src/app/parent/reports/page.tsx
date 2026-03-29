"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileBarChart, Download, Award, Star, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { children, emmaSubjects, jackSubjects, emmaReportCard } from "@/data/mock";
import type { Subject, ReportCard } from "@/data/mock";

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

function gradeColor(grade: number): string {
  if (grade >= 80) return "text-[#10B981]";
  if (grade >= 60) return "text-yellow-600";
  return "text-red-500";
}

function gradeBg(grade: number): string {
  if (grade >= 80) return "bg-green-100 text-green-700";
  if (grade >= 60) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
}

// Build a simple report card for Jack from his subjects
const jackReportCard: ReportCard = {
  term: "Term 1",
  year: 2026,
  subjects: jackSubjects,
  attendance: { present: 47, absent: 3, late: 2 },
  behaviourPoints: 40,
  meritPoints: 8,
  teacherComment:
    "Jack is settling in well to Grade 1. He is a friendly and enthusiastic learner. He should continue practising his reading at home. Well done, Jack!",
};

export default function ReportsPage() {
  const [selectedChild, setSelectedChild] = useState(children[0].id);
  const [downloaded, setDownloaded] = useState(false);

  const isEmma = selectedChild === "emma";
  const report = isEmma ? emmaReportCard : jackReportCard;
  const subjects = isEmma ? emmaSubjects : jackSubjects;
  const child = children.find((c) => c.id === selectedChild) ?? children[0];

  const totalAttendance =
    report.attendance.present + report.attendance.absent + report.attendance.late;
  const presentPercent = Math.round(
    (report.attendance.present / totalAttendance) * 100
  );

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div {...fadeIn} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Reports</h1>
          <p className="text-muted-foreground mt-1">
            Academic reports and performance tracking.
          </p>
        </div>
        <Button
          variant="outline"
          className="gap-2"
          onClick={handleDownload}
        >
          <Download className="size-4" />
          {downloaded ? "Downloaded!" : "Download PDF"}
        </Button>
      </motion.div>

      {/* Child Selector */}
      <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.05 }}>
        <Tabs value={selectedChild} onValueChange={setSelectedChild}>
          <TabsList>
            {children.map((c) => (
              <TabsTrigger key={c.id} value={c.id} className="gap-2">
                <Avatar className="size-5">
                  <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                    {c.avatar}
                  </AvatarFallback>
                </Avatar>
                {c.name.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Report Card Header */}
      <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.1 }}>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <Avatar className="size-14 bg-primary/10 text-primary">
                <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                  {child.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-bold">{child.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {child.grade} &middot; {report.term} {report.year}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Subject Grades Table */}
      <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.15 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileBarChart className="size-5" />
              Subject Grades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {/* Table header */}
              <div className="hidden md:grid md:grid-cols-[1fr_80px_1fr] gap-4 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <span>Subject</span>
                <span className="text-center">Grade</span>
                <span>Teacher Comment</span>
              </div>
              {subjects.map((subject, index) => (
                <div key={subject.id}>
                  {index > 0 && <Separator />}
                  <div className="py-3 md:grid md:grid-cols-[1fr_80px_1fr] md:gap-4 md:items-center">
                    <div>
                      <p className="text-sm font-medium">{subject.name}</p>
                      <p className="text-xs text-muted-foreground md:hidden mt-0.5">
                        {subject.teacher}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-1 md:mt-0 md:justify-center">
                      <Badge className={`${gradeBg(subject.grade)} font-bold`} variant="secondary">
                        {subject.grade}%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 md:mt-0">
                      {subject.teacherComment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Attendance Summary */}
      <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle>Attendance Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-[#10B981]">{presentPercent}%</span>
              <span className="text-sm text-muted-foreground">attendance rate</span>
            </div>
            <Progress value={presentPercent} className="h-3" />
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#10B981]">
                  {report.attendance.present}
                </p>
                <p className="text-xs text-muted-foreground">Present</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-500">
                  {report.attendance.absent}
                </p>
                <p className="text-xs text-muted-foreground">Absent</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-500">
                  {report.attendance.late}
                </p>
                <p className="text-xs text-muted-foreground">Late</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Behaviour & Merit Points */}
      <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.25 }}>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#2563EB]/10">
                <Award className="size-6 text-[#2563EB]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Behaviour Points</p>
                <p className="text-2xl font-bold">{report.behaviourPoints}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#F97316]/10">
                <Star className="size-6 text-[#F97316]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Merit Points</p>
                <p className="text-2xl font-bold">{report.meritPoints}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Teacher Comment */}
      <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.3 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="size-5" />
              Teacher&apos;s Comment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground italic">
              &ldquo;{report.teacherComment}&rdquo;
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
