"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  AlertTriangle,
  CalendarDays,
  BookOpen,
  ClipboardCheck,
  Save,
  Plus,
  CheckCircle,
  Clock,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { classStudents, homework, emmaSubjects } from "@/data/mock";

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const subjects = emmaSubjects.map((s) => s.name);

// Pre-populated grades per student, keyed by student id
// Realistic spreads based on each student's avgGrade
function generateStudentGrades(avgGrade: number): Record<string, number> {
  const offsets = [-4, 7, -10, 3, 8, -6, 12, -2];
  const grades: Record<string, number> = {};
  subjects.forEach((subj, i) => {
    const raw = avgGrade + offsets[i % offsets.length];
    grades[subj] = Math.max(30, Math.min(100, raw));
  });
  return grades;
}

const initialGrades: Record<string, Record<string, number>> = {};
classStudents.forEach((s) => {
  initialGrades[s.id] = generateStudentGrades(s.avgGrade);
});

export default function TeacherDashboard() {
  const defaultTab = "overview";

  // ---- Attendance state ----
  const [selectedPeriod, setSelectedPeriod] = useState(1);
  const [attendanceMap, setAttendanceMap] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    classStudents.forEach((s) => {
      // Liam O'Brien (cs4) unchecked by default
      map[s.id] = s.id !== "cs4";
    });
    return map;
  });

  // ---- Grades state ----
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [grades, setGrades] = useState(initialGrades);

  // ---- Homework state ----
  const [hwSubject, setHwSubject] = useState("");
  const [hwTitle, setHwTitle] = useState("");
  const [hwDescription, setHwDescription] = useState("");
  const [hwDueDate, setHwDueDate] = useState("");

  // ---- Computed stats ----
  const classAverage = Math.round(
    classStudents.reduce((sum, s) => sum + s.avgGrade, 0) / classStudents.length
  );
  const attendanceRate = Math.round(
    classStudents.reduce((sum, s) => sum + s.attendance, 0) / classStudents.length
  );
  const studentsNeedingAttention = classStudents.filter(
    (s) => s.status === "alert" || s.status === "warning"
  );

  function toggleAttendance(studentId: string) {
    setAttendanceMap((prev) => ({ ...prev, [studentId]: !prev[studentId] }));
  }

  function updateGrade(studentId: string, subject: string, value: string) {
    const num = parseInt(value, 10);
    if (isNaN(num)) return;
    setGrades((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], [subject]: Math.max(0, Math.min(100, num)) },
    }));
  }

  // Submission counts per homework (mock: based on id seed)
  const submissionCounts: Record<string, number> = {
    hw1: 8,
    hw2: 5,
    hw3: 11,
    hw4: 12,
    hw5: 12,
  };

  return (
    <Tabs defaultValue={defaultTab} className="space-y-6">
      <motion.div {...fadeIn}>
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="grades">Grades</TabsTrigger>
          <TabsTrigger value="homework">Homework</TabsTrigger>
        </TabsList>
      </motion.div>

      {/* ========== OVERVIEW TAB ========== */}
      <TabsContent value="overview" className="space-y-8">
        {/* Header */}
        <motion.div {...fadeIn}>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Good morning, Mrs. van der Merwe
          </h1>
          <p className="text-muted-foreground mt-1">
            Grade 4A &middot; {classStudents.length} Students
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.1 }}>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <TrendingUp className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Class Average</p>
                    <p className="text-2xl font-bold">{classAverage}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Users className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Attendance Rate</p>
                    <p className="text-2xl font-bold">{attendanceRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    <AlertTriangle className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Need Attention</p>
                    <p className="text-2xl font-bold">{studentsNeedingAttention.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Student List */}
        <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="size-5" />
                Student Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="pb-3 pr-4 font-medium">Student</th>
                      <th className="pb-3 pr-4 font-medium">Attendance</th>
                      <th className="pb-3 pr-4 font-medium">Avg Grade</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classStudents.map((student, i) => (
                      <motion.tr
                        key={student.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.04 }}
                        className="border-b last:border-0"
                      >
                        <td className="py-3 pr-4 font-medium">{student.name}</td>
                        <td className="py-3 pr-4">{student.attendance}%</td>
                        <td className="py-3 pr-4">{student.avgGrade}%</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`inline-block size-2.5 rounded-full ${
                                student.status === "good"
                                  ? "bg-emerald-500"
                                  : student.status === "warning"
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                              }`}
                            />
                            {student.statusNote && (
                              <span className="text-xs text-muted-foreground">
                                {student.statusNote}
                              </span>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Performance Alerts */}
        {studentsNeedingAttention.length > 0 && (
          <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.3 }}>
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-700">
                  <AlertTriangle className="size-5" />
                  Performance Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {studentsNeedingAttention.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-start gap-3 rounded-lg border p-3"
                  >
                    <span
                      className={`mt-0.5 inline-block size-2.5 shrink-0 rounded-full ${
                        student.status === "alert" ? "bg-red-500" : "bg-amber-500"
                      }`}
                    />
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {student.statusNote} &middot; Avg: {student.avgGrade}% &middot;
                        Attendance: {student.attendance}%
                      </p>
                    </div>
                    <Badge
                      variant={student.status === "alert" ? "destructive" : "secondary"}
                      className="ml-auto shrink-0"
                    >
                      {student.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </TabsContent>

      {/* ========== ATTENDANCE TAB ========== */}
      <TabsContent value="attendance" className="space-y-6">
        <motion.div {...fadeIn}>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Attendance</h1>
          <p className="text-muted-foreground mt-1">Mark attendance for your class.</p>
        </motion.div>

        {/* Date display */}
        <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.1 }}>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <CalendarDays className="size-5 text-muted-foreground" />
                <span className="font-medium">Monday, 29 March 2026</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Period Selector */}
        <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.15 }}>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
              >
                Period {period}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Attendance Grid */}
        <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardCheck className="size-5" />
                Period {selectedPeriod} Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div className="space-y-0" variants={stagger} initial="initial" animate="animate">
                {classStudents.map((student, i) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.03 }}
                  >
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={`attendance-${student.id}`}
                          checked={attendanceMap[student.id]}
                          onCheckedChange={() => toggleAttendance(student.id)}
                        />
                        <Label
                          htmlFor={`attendance-${student.id}`}
                          className="cursor-pointer font-medium"
                        >
                          {student.name}
                        </Label>
                      </div>
                      <Badge variant={attendanceMap[student.id] ? "secondary" : "destructive"}>
                        {attendanceMap[student.id] ? "Present" : "Absent"}
                      </Badge>
                    </div>
                    {i < classStudents.length - 1 && <Separator />}
                  </motion.div>
                ))}
              </motion.div>
              <div className="mt-6 flex justify-end">
                <Button className="gap-2">
                  <Save className="size-4" />
                  Save Attendance
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </TabsContent>

      {/* ========== GRADES TAB ========== */}
      <TabsContent value="grades" className="space-y-6">
        <motion.div {...fadeIn}>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Grades</h1>
          <p className="text-muted-foreground mt-1">Enter and manage student grades.</p>
        </motion.div>

        {/* Subject Selector */}
        <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.1 }}>
          <div className="flex items-center gap-3">
            <Label>Subject</Label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subj) => (
                  <SelectItem key={subj} value={subj}>
                    {subj}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Grades Table */}
        <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="size-5" />
                {selectedSubject} Grades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="pb-3 pr-4 font-medium">Student</th>
                      <th className="pb-3 pr-4 font-medium w-[120px]">Grade (%)</th>
                      <th className="pb-3 font-medium">Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classStudents.map((student, i) => {
                      const grade = grades[student.id]?.[selectedSubject] ?? 0;
                      const level =
                        grade >= 80
                          ? "Outstanding"
                          : grade >= 70
                          ? "Meritorious"
                          : grade >= 60
                          ? "Substantial"
                          : grade >= 50
                          ? "Adequate"
                          : grade >= 40
                          ? "Elementary"
                          : "Not Achieved";
                      const levelColor =
                        grade >= 80
                          ? "text-emerald-600"
                          : grade >= 70
                          ? "text-blue-600"
                          : grade >= 60
                          ? "text-sky-600"
                          : grade >= 50
                          ? "text-amber-600"
                          : grade >= 40
                          ? "text-orange-600"
                          : "text-red-600";
                      return (
                        <motion.tr
                          key={student.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.25, delay: i * 0.03 }}
                          className="border-b last:border-0"
                        >
                          <td className="py-3 pr-4 font-medium">{student.name}</td>
                          <td className="py-3 pr-4">
                            <Input
                              type="number"
                              min={0}
                              max={100}
                              value={grade}
                              onChange={(e) =>
                                updateGrade(student.id, selectedSubject, e.target.value)
                              }
                              className="h-8 w-20"
                            />
                          </td>
                          <td className={`py-3 text-xs font-medium ${levelColor}`}>{level}</td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 flex justify-end">
                <Button className="gap-2">
                  <Save className="size-4" />
                  Save Grades
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </TabsContent>

      {/* ========== HOMEWORK TAB ========== */}
      <TabsContent value="homework" className="space-y-6">
        <motion.div {...fadeIn}>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Homework</h1>
          <p className="text-muted-foreground mt-1">
            Create assignments and track submissions.
          </p>
        </motion.div>

        {/* Create Assignment Form */}
        <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.1 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="size-5" />
                Create Assignment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Select value={hwSubject} onValueChange={setHwSubject}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subj) => (
                        <SelectItem key={subj} value={subj}>
                          {subj}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hw-title">Title</Label>
                  <Input
                    id="hw-title"
                    placeholder="Assignment title"
                    value={hwTitle}
                    onChange={(e) => setHwTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hw-desc">Description</Label>
                <Textarea
                  id="hw-desc"
                  placeholder="Describe the assignment..."
                  rows={3}
                  value={hwDescription}
                  onChange={(e) => setHwDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2 max-w-xs">
                <Label htmlFor="hw-due">Due Date</Label>
                <Input
                  id="hw-due"
                  type="date"
                  value={hwDueDate}
                  onChange={(e) => setHwDueDate(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <Button className="gap-2">
                  <Plus className="size-4" />
                  Create Assignment
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Existing Assignments */}
        <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="size-5" />
                Assignments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0">
              {homework.map((hw, i) => (
                <motion.div
                  key={hw.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.06 }}
                >
                  <div className="flex items-start justify-between gap-4 py-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{hw.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {hw.subject}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                        {hw.description}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="size-3.5" />
                          Due:{" "}
                          {new Date(hw.dueDate).toLocaleDateString("en-ZA", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="size-3.5" />
                          {submissionCounts[hw.id] ?? 0} / {classStudents.length} submitted
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant={
                        hw.status === "graded"
                          ? "default"
                          : hw.status === "submitted"
                          ? "secondary"
                          : "outline"
                      }
                      className="shrink-0"
                    >
                      {hw.status === "graded"
                        ? "Graded"
                        : hw.status === "submitted"
                        ? "Submitted"
                        : "Pending"}
                    </Badge>
                  </div>
                  {i < homework.length - 1 && <Separator />}
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </TabsContent>
    </Tabs>
  );
}
