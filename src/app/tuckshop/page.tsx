"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Wifi,
  Check,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { tuckShopItems, dailySales, children } from "@/data/mock";
import { formatCurrency } from "@/lib/utils";

const categories = [
  "All",
  "Sandwiches",
  "Drinks",
  "Snacks",
  "Healthy",
  "Baked",
  "Hot Food",
  "Frozen",
];

export default function TuckShopPage() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"tap" | "success">("tap");

  const walletBalance = children[0]?.walletBalance ?? 350;

  // ---- Cart helpers ----
  const addToCart = (itemId: string) => {
    setCart((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const incrementItem = (itemId: string) => {
    setCart((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const decrementItem = (itemId: string) => {
    setCart((prev) => {
      const qty = (prev[itemId] || 0) - 1;
      if (qty <= 0) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return { ...prev, [itemId]: qty };
    });
  };

  const removeItem = (itemId: string) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
  };

  const cartEntries = Object.entries(cart).map(([id, qty]) => {
    const item = tuckShopItems.find((i) => i.id === id)!;
    return { ...item, qty, subtotal: item.price * qty };
  });

  const cartTotal = cartEntries.reduce((sum, e) => sum + e.subtotal, 0);
  const cartCount = Object.values(cart).reduce((sum, q) => sum + q, 0);

  const canPay = walletBalance >= cartTotal && cartTotal > 0;

  const handlePay = () => {
    setPaymentStep("tap");
    setPaymentDialogOpen(true);
    setTimeout(() => setPaymentStep("success"), 2000);
  };

  const handlePaymentClose = (open: boolean) => {
    if (!open) {
      setPaymentDialogOpen(false);
      if (paymentStep === "success") {
        setCart({});
      }
    }
  };

  // ---- Menu filtering ----
  const filteredItems =
    selectedCategory === "All"
      ? tuckShopItems
      : tuckShopItems.filter((item) => item.category === selectedCategory);

  // ---- Sales stats ----
  const totalRevenue = dailySales.reduce((sum, s) => sum + s.revenue, 0);
  const totalItemsSold = dailySales.reduce((sum, s) => sum + s.qty, 0);
  const chartData = [...dailySales]
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 6);

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Store className="size-7 text-orange-500" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tuck Shop</h1>
          <p className="text-sm text-muted-foreground">
            Browse the menu, add to cart, and pay with your wristband
          </p>
        </div>
      </div>

      <Tabs defaultValue="menu">
        <TabsList className="w-full">
          <TabsTrigger value="menu" className="flex-1">
            <Store className="size-4 mr-1.5" />
            Menu
          </TabsTrigger>
          <TabsTrigger value="cart" className="flex-1">
            <ShoppingCart className="size-4 mr-1.5" />
            Cart{cartCount > 0 && ` (${cartCount})`}
          </TabsTrigger>
          <TabsTrigger value="sales" className="flex-1">
            Sales Summary
          </TabsTrigger>
        </TabsList>

        {/* ==================== MENU TAB ==================== */}
        <TabsContent value="menu" className="mt-4">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Menu grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="relative h-full flex flex-col items-center text-center p-4 hover:shadow-md transition-shadow">
                  {item.popular && (
                    <Badge className="absolute top-2 right-2 bg-orange-500 text-white">
                      Popular
                    </Badge>
                  )}
                  <span className="text-4xl mb-2">{item.emoji}</span>
                  <h3 className="font-medium text-sm leading-tight mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm font-semibold text-orange-600 mb-3">
                    {formatCurrency(item.price)}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-auto w-full"
                    onClick={() => addToCart(item.id)}
                  >
                    <Plus className="size-4 mr-1" />
                    Add to Cart
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* ==================== CART TAB ==================== */}
        <TabsContent value="cart" className="mt-4">
          {cartEntries.length === 0 ? (
            <Card className="p-8 text-center">
              <ShoppingCart className="size-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-1">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground">
                Add items from the Menu tab to get started
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Cart items */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cart Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {cartEntries.map((entry) => (
                    <div key={entry.id}>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-2xl flex-shrink-0">
                            {entry.emoji}
                          </span>
                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate">
                              {entry.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatCurrency(entry.price)} each
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Button
                            variant="outline"
                            size="icon-sm"
                            onClick={() => decrementItem(entry.id)}
                          >
                            <Minus className="size-3" />
                          </Button>
                          <span className="w-6 text-center text-sm font-medium">
                            {entry.qty}
                          </span>
                          <Button
                            variant="outline"
                            size="icon-sm"
                            onClick={() => incrementItem(entry.id)}
                          >
                            <Plus className="size-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => removeItem(entry.id)}
                          >
                            <Trash2 className="size-3" />
                          </Button>
                          <span className="w-20 text-right text-sm font-semibold">
                            {formatCurrency(entry.subtotal)}
                          </span>
                        </div>
                      </div>
                      <Separator className="mt-3" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Summary & pay */}
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cart Total</span>
                    <span className="font-bold text-lg">
                      {formatCurrency(cartTotal)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Current Balance
                    </span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(walletBalance)}
                    </span>
                  </div>

                  {canPay ? (
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                      onClick={handlePay}
                    >
                      <Wifi className="size-4 mr-2" />
                      Pay with Wallet
                    </Button>
                  ) : cartTotal > 0 ? (
                    <div className="rounded-lg bg-destructive/10 p-3 text-center text-sm text-destructive font-medium">
                      Insufficient Balance
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* ==================== SALES SUMMARY TAB ==================== */}
        <TabsContent value="sales" className="mt-4 space-y-4">
          {/* Date header */}
          <p className="text-sm text-muted-foreground">
            Today &mdash;{" "}
            {new Date().toLocaleDateString("en-ZA", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">
                  Total Revenue Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-orange-600">
                  {formatCurrency(totalRevenue)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">
                  Total Items Sold
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{totalItemsSold}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sales table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sales Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="pb-2 font-medium">Item</th>
                      <th className="pb-2 font-medium text-right">Qty Sold</th>
                      <th className="pb-2 font-medium text-right">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailySales.map((sale) => (
                      <tr key={sale.item} className="border-b last:border-0">
                        <td className="py-2">{sale.item}</td>
                        <td className="py-2 text-right">{sale.qty}</td>
                        <td className="py-2 text-right font-medium">
                          {formatCurrency(sale.revenue)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Popular items bar chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Popular Items by Quantity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="item"
                      tick={{ fontSize: 12 }}
                      interval={0}
                      angle={-20}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip
                      formatter={(value) => [`${value}`, "Quantity"]}
                    />
                    <Bar
                      dataKey="qty"
                      fill="#f97316"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ==================== PAYMENT DIALOG ==================== */}
      <Dialog open={paymentDialogOpen} onOpenChange={handlePaymentClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              NFC Wristband Payment
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-8">
            <AnimatePresence mode="wait">
              {paymentStep === "tap" ? (
                <motion.div
                  key="tap"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="flex items-center justify-center w-24 h-24 rounded-full bg-orange-100 mb-6"
                  >
                    <Wifi className="size-12 text-orange-500" />
                  </motion.div>
                  <p className="text-lg font-medium">Tap your wristband...</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Hold your wristband near the reader
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.1,
                    }}
                    className="flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6"
                  >
                    <Check className="size-12 text-green-600" />
                  </motion.div>
                  <p className="text-lg font-medium text-green-600">
                    Payment Successful!
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatCurrency(cartTotal)} deducted from wallet
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
