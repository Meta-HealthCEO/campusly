"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Receipt, CreditCard, CalendarClock, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { fees } from "@/data/mock";
import { formatCurrency, formatDate } from "@/lib/utils";

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const statusStyles: Record<string, string> = {
  paid: "bg-green-100 text-green-700 hover:bg-green-100",
  due: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  overdue: "bg-red-100 text-red-700 hover:bg-red-100",
};

export default function FeesPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [paidFeeDesc, setPaidFeeDesc] = useState("");
  const [paidFeeAmount, setPaidFeeAmount] = useState(0);

  const unpaidFees = fees.filter((f) => f.status !== "paid");
  const paidFees = fees.filter((f) => f.status === "paid");
  const outstandingTotal = unpaidFees.reduce((sum, f) => sum + f.amount, 0);

  // Group fees by term
  const feesByTerm = fees.reduce<Record<string, typeof fees>>((acc, fee) => {
    if (!acc[fee.term]) acc[fee.term] = [];
    acc[fee.term].push(fee);
    return acc;
  }, {});

  const handlePayNow = (description: string, amount: number) => {
    setPaidFeeDesc(description);
    setPaidFeeAmount(amount);
    setShowSuccess(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div {...fadeIn}>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Fees</h1>
        <p className="text-muted-foreground mt-1">
          View and manage school fee payments.
        </p>
      </motion.div>

      {/* Outstanding Balance Summary */}
      <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.1 }}>
        <Card className="bg-gradient-to-br from-[#F97316] to-[#ea580c] text-white">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-100">Outstanding Balance</p>
                <p className="text-4xl font-bold mt-1 md:text-5xl">
                  {formatCurrency(outstandingTotal)}
                </p>
                <p className="text-sm text-orange-200 mt-2">
                  {unpaidFees.length} payment{unpaidFees.length !== 1 ? "s" : ""} due
                </p>
              </div>
              <div className="hidden md:block">
                <Receipt className="size-16 text-orange-200/40" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs: Upcoming / History / By Term */}
      <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.15 }}>
        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
            <TabsTrigger value="byterm">By Term</TabsTrigger>
          </TabsList>

          {/* Upcoming Payments */}
          <TabsContent value="upcoming" className="mt-4 space-y-3">
            {unpaidFees.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  All fees are paid. You&apos;re up to date!
                </CardContent>
              </Card>
            ) : (
              unpaidFees.map((fee) => (
                <Card key={fee.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-semibold">{fee.description}</h3>
                          <Badge className={statusStyles[fee.status]} variant="secondary">
                            {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                          <span>Due: {formatDate(fee.dueDate)}</span>
                          <span>&middot;</span>
                          <span>{fee.category}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-lg font-bold">{formatCurrency(fee.amount)}</p>
                        <Button
                          size="sm"
                          className="mt-1 bg-[#2563EB] hover:bg-[#1d4ed8]"
                          onClick={() => handlePayNow(fee.description, fee.amount)}
                        >
                          Pay Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Payment History */}
          <TabsContent value="history" className="mt-4 space-y-3">
            {paidFees.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No payment history yet.
                </CardContent>
              </Card>
            ) : (
              paidFees.map((fee) => (
                <Card key={fee.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-semibold">{fee.description}</h3>
                          <Badge className={statusStyles.paid} variant="secondary">
                            Paid
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                          <span>Paid: {formatDate(fee.dueDate)}</span>
                          <span>&middot;</span>
                          <span>{fee.category}</span>
                        </div>
                      </div>
                      <p className="text-lg font-bold shrink-0">
                        {formatCurrency(fee.amount)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Fee Breakdown by Term */}
          <TabsContent value="byterm" className="mt-4 space-y-6">
            {Object.entries(feesByTerm).map(([term, termFees]) => (
              <div key={term}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {term}
                </h3>
                <div className="space-y-2">
                  {termFees.map((fee) => (
                    <Card key={fee.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-medium">{fee.description}</span>
                              <Badge className={statusStyles[fee.status]} variant="secondary">
                                {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {fee.category} &middot; Due: {formatDate(fee.dueDate)}
                            </p>
                          </div>
                          <p className="text-sm font-bold shrink-0">
                            {formatCurrency(fee.amount)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Setup Debit Order CTA */}
      <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.2 }}>
        <Card className="border-dashed">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#2563EB]/10">
                <CalendarClock className="size-6 text-[#2563EB]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Setup Debit Order</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Never miss a payment. Set up a recurring debit order and fees will be
                  collected automatically each month.
                </p>
                <Button className="mt-4 bg-[#2563EB] hover:bg-[#1d4ed8]">
                  Setup Debit Order
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-center">Payment Successful!</DialogTitle>
          </DialogHeader>
          <div className="py-6 space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 className="size-16 text-[#10B981]" />
            </div>
            <p className="text-lg font-semibold">
              {formatCurrency(paidFeeAmount)} paid
            </p>
            <p className="text-sm text-muted-foreground">{paidFeeDesc}</p>
            <Button
              className="w-full bg-[#10B981] hover:bg-[#0d9668]"
              onClick={() => setShowSuccess(false)}
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
