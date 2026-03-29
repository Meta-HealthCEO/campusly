"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Watch, ShieldCheck, AlertTriangle, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { children, transactions } from "@/data/mock";
import { formatCurrency, formatDate } from "@/lib/utils";

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const presetAmounts = [50, 100, 200, 500];

export default function WalletPage() {
  const [selectedChild, setSelectedChild] = useState(children[0].id);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loadedAmount, setLoadedAmount] = useState(0);
  const [dailyLimit, setDailyLimit] = useState(true);
  const [lowBalanceAlert, setLowBalanceAlert] = useState(true);

  const child = children.find((c) => c.id === selectedChild) ?? children[0];
  const childTransactions = transactions.filter((t) => t.childId === selectedChild);

  const handleLoadMoney = (amount: number) => {
    setLoadedAmount(amount);
    setShowSuccess(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div {...fadeIn}>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Wallet</h1>
        <p className="text-muted-foreground mt-1">
          Manage your children&apos;s digital wallets.
        </p>
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

      {/* Balance Display */}
      <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.1 }}>
        <Card className="bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] text-white">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-100">Current Balance</p>
                <p className="text-4xl font-bold mt-1 md:text-5xl">
                  {formatCurrency(child.walletBalance)}
                </p>
                <p className="text-sm text-blue-200 mt-2">{child.name} &middot; {child.grade}</p>
              </div>
              <div className="hidden md:block">
                <Wallet className="size-16 text-blue-200/40" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Load Money */}
      <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.15 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpCircle className="size-5 text-[#10B981]" />
              Load Money
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Select an amount to load into {child.name.split(" ")[0]}&apos;s wallet.
            </p>
            <div className="flex flex-wrap gap-3">
              {presetAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  className="h-12 min-w-[80px] text-base font-semibold hover:border-[#10B981] hover:text-[#10B981]"
                  onClick={() => handleLoadMoney(amount)}
                >
                  R{amount}
                </Button>
              ))}
              <Button
                variant="outline"
                className="h-12 min-w-[80px] text-base hover:border-[#F97316] hover:text-[#F97316]"
                onClick={() => handleLoadMoney(250)}
              >
                Custom
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Transaction History */}
      <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            {childTransactions.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                No transactions yet.
              </p>
            ) : (
              <div className="space-y-0">
                {childTransactions.map((tx, index) => (
                  <div key={tx.id}>
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
                            tx.amount > 0
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {tx.amount > 0 ? (
                            <ArrowUpCircle className="size-4" />
                          ) : (
                            <ArrowDownCircle className="size-4" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{tx.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(tx.date)}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-sm font-semibold ${
                          tx.amount > 0 ? "text-[#10B981]" : "text-red-500"
                        }`}
                      >
                        {tx.amount > 0 ? "+" : ""}
                        {formatCurrency(Math.abs(tx.amount))}
                      </span>
                    </div>
                    {index < childTransactions.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Wristband Section */}
      <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.25 }}>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#F97316]/10">
                <Watch className="size-6 text-[#F97316]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Tap-to-Pay Wristband</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Link a Campusly wristband so {child.name.split(" ")[0]} can pay at the
                  tuck shop with a simple tap. Safe, fast, and no cash needed.
                </p>
                <Button className="mt-4 bg-[#F97316] hover:bg-[#ea6c0e]">
                  Link Wristband
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Spending Limits & Alerts */}
      <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.3 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="size-5" />
              Controls & Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-blue-100">
                  <ShieldCheck className="size-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Daily Tuck Shop Limit</p>
                  <p className="text-xs text-muted-foreground">
                    R100/day spending cap
                  </p>
                </div>
              </div>
              <Switch checked={dailyLimit} onCheckedChange={setDailyLimit} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-yellow-100">
                  <AlertTriangle className="size-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Low Balance Alerts</p>
                  <p className="text-xs text-muted-foreground">
                    Notify when balance drops below R50
                  </p>
                </div>
              </div>
              <Switch checked={lowBalanceAlert} onCheckedChange={setLowBalanceAlert} />
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
            <div className="text-6xl">🎉</div>
            <p className="text-lg font-semibold">
              {formatCurrency(loadedAmount)} loaded into {child.name.split(" ")[0]}&apos;s
              wallet
            </p>
            <p className="text-sm text-muted-foreground">
              New balance: {formatCurrency(child.walletBalance + loadedAmount)}
            </p>
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
