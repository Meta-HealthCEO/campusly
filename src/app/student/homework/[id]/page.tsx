"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, ArrowLeft, Clock, CheckCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { homework } from "@/data/mock";

export default function HomeworkDetailPage() {
  const params = useParams();
  const hw = homework.find((h) => h.id === params.id);
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  if (!hw) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <FileText className="size-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold">Homework not found</h2>
        <p className="text-muted-foreground mt-1">This assignment doesn&apos;t exist.</p>
        <Link href="/student">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="size-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  const due = new Date(hw.dueDate);
  const today = new Date();
  const daysUntil = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Back Button */}
      <Link href="/student">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="size-4 mr-2" />
          Back to Dashboard
        </Button>
      </Link>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {hw.subject}
          </span>
          {hw.status === "pending" && !submitted && (
            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
          )}
          {(hw.status === "submitted" || submitted) && hw.status !== "graded" && (
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">Submitted</Badge>
          )}
          {hw.status === "graded" && (
            <Badge className="bg-green-100 text-green-800 border-green-200">Graded</Badge>
          )}
        </div>
        <h1 className="text-2xl font-bold mt-2">{hw.title}</h1>
      </div>

      {/* Due Date */}
      <Card>
        <CardContent className="flex items-center gap-3">
          <Clock className="size-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Due Date</p>
            <p className="font-medium">
              {due.toLocaleDateString("en-ZA", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="ml-auto">
            {hw.status === "graded" ? (
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle className="size-3 mr-1" />
                Complete
              </Badge>
            ) : hw.status === "submitted" || submitted ? (
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                <CheckCircle className="size-3 mr-1" />
                Submitted
              </Badge>
            ) : daysUntil > 0 ? (
              <Badge variant="outline">
                {daysUntil} day{daysUntil !== 1 ? "s" : ""} remaining
              </Badge>
            ) : (
              <Badge className="bg-red-100 text-red-800 border-red-200">Overdue</Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="size-5" />
            Description
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{hw.description}</p>
        </CardContent>
      </Card>

      {/* Rubric (if exists) */}
      {hw.rubric && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Rubric</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {hw.rubric.split(" | ").map((criterion, i) => {
                const parts = criterion.match(/^(.+?)\s*\((\d+%)\)$/);
                return (
                  <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                    <span className="text-sm font-medium">{parts ? parts[1] : criterion}</span>
                    {parts && (
                      <Badge variant="outline" className="font-mono">
                        {parts[2]}
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submission Area (pending) */}
      {hw.status === "pending" && !submitted && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Submit Your Work</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 transition-colors ${
                dragOver
                  ? "border-orange-400 bg-orange-50"
                  : "border-muted-foreground/25 hover:border-muted-foreground/50"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
              }}
            >
              <Upload className="size-10 text-muted-foreground mb-3" />
              <p className="font-medium">Drag files here or click to browse</p>
              <p className="text-sm text-muted-foreground mt-1">PDF, images, or documents up to 10MB</p>
            </div>
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => setSubmitted(true)}
            >
              <Upload className="size-4 mr-2" />
              Submit
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Submitted confirmation (after clicking submit) */}
      {hw.status === "pending" && submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-green-200 bg-green-50">
            <CardContent className="flex flex-col items-center text-center py-8">
              <CheckCircle className="size-12 text-green-600 mb-3" />
              <h3 className="text-lg font-semibold text-green-800">Homework Submitted!</h3>
              <p className="text-sm text-green-700 mt-1">
                Your work has been submitted successfully. Your teacher will review it soon.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Submitted status (data says submitted) */}
      {hw.status === "submitted" && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="flex flex-col items-center text-center py-8">
            <CheckCircle className="size-12 text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold text-blue-800">Submitted</h3>
            <p className="text-sm text-blue-700 mt-1">
              Your work has been submitted and is awaiting grading by your teacher.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Graded */}
      {hw.status === "graded" && (
        <>
          <Card>
            <CardContent className="flex flex-col items-center text-center py-8">
              <div className="flex size-20 items-center justify-center rounded-full bg-green-100 mb-4">
                <span className="text-3xl font-bold text-green-700">{hw.grade}%</span>
              </div>
              <h3 className="text-lg font-semibold">Your Grade</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {hw.grade && hw.grade >= 75
                  ? "Great work!"
                  : hw.grade && hw.grade >= 50
                  ? "Good effort, keep improving!"
                  : "Keep practising, you'll get there!"}
              </p>
            </CardContent>
          </Card>

          {hw.teacherComment && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Teacher&apos;s Comment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm italic leading-relaxed">&ldquo;{hw.teacherComment}&rdquo;</p>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </motion.div>
  );
}
