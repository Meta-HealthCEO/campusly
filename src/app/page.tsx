"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Wallet,
  Receipt,
  BookOpen,
  UserCheck,
  BarChart3,
  MessageCircle,
  Check,
  ArrowRight,
  Menu,
  X,
  Star,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogoFull } from "@/components/logo";
import { testimonials, pricingPlans } from "@/data/mock";
import { formatCurrency } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

// ---------------------------------------------------------------------------
// Feature data
// ---------------------------------------------------------------------------
const features = [
  {
    icon: Wallet,
    title: "Digital Wallet & Tuck Shop",
    description:
      "Load your child's wallet instantly. No more lost lunch money. Real-time purchase alerts.",
    color: "text-[#2563EB]",
    bg: "bg-blue-50",
  },
  {
    icon: Receipt,
    title: "Fee Management",
    description:
      "Transparent fee tracking, automated reminders, and flexible payment options for every family.",
    color: "text-[#F97316]",
    bg: "bg-orange-50",
  },
  {
    icon: BookOpen,
    title: "Homework & Grades",
    description:
      "Track assignments, view grades in real time, and never miss a due date again.",
    color: "text-[#10B981]",
    bg: "bg-emerald-50",
  },
  {
    icon: UserCheck,
    title: "Attendance Tracking",
    description:
      "Instant notifications when your child arrives or is absent. Full attendance history at your fingertips.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: BarChart3,
    title: "Real-time Reports",
    description:
      "Beautiful dashboards for parents and administrators. Data-driven insights that actually make sense.",
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    icon: MessageCircle,
    title: "Parent Communication",
    description:
      "Direct messaging with teachers, school announcements, and event updates in one place.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
];

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/80 backdrop-blur-lg"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <LogoFull size={36} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-[#0F172A]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/parent">Login</Link>
          </Button>
          <Button
            asChild
            className="bg-[#2563EB] hover:bg-[#1d4ed8]"
          >
            <a href="#pricing">Book a Demo</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-border/60 bg-white md:hidden"
        >
          <div className="space-y-1 px-4 pb-4 pt-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[#0F172A]"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-3">
              <Button variant="outline" asChild className="w-full">
                <Link href="/parent">Login</Link>
              </Button>
              <Button asChild className="w-full bg-[#2563EB] hover:bg-[#1d4ed8]">
                <a href="#pricing">Book a Demo</a>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC]">
      {/* Subtle gradient blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#2563EB]/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-[400px] w-[400px] rounded-full bg-[#F97316]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pb-28 sm:pt-28 lg:px-8 lg:pb-36 lg:pt-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeUp} custom={0}>
            <Badge
              variant="secondary"
              className="mb-6 gap-1.5 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 px-4 py-1.5 text-sm font-medium text-[#2563EB]"
            >
              <Star className="size-3.5 fill-[#F97316] text-[#F97316]" />
              Trusted by 120+ South African schools
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-4xl font-extrabold tracking-tight text-[#0F172A] sm:text-5xl lg:text-6xl"
          >
            The all-in-one school platform parents{" "}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#3b82f6] bg-clip-text text-transparent">
              actually love
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl"
          >
            Smart School. Happy Parents.
          </motion.p>

          <motion.p
            variants={fadeUp}
            custom={3}
            className="mx-auto mt-2 max-w-2xl text-base leading-relaxed text-slate-500"
          >
            Fees, wallets, homework, attendance, communication &mdash; everything
            parents need in one beautiful app. Everything administrators need in
            one powerful dashboard.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={4}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              asChild
              className="h-12 rounded-xl bg-[#2563EB] px-8 text-base font-semibold shadow-lg shadow-[#2563EB]/25 hover:bg-[#1d4ed8]"
            >
              <a href="#pricing">
                Book a Demo
                <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-12 rounded-xl px-8 text-base font-semibold"
            >
              <Link href="/parent">Parent Login</Link>
            </Button>
          </motion.div>

          {/* Social proof numbers */}
          <motion.div
            variants={fadeUp}
            custom={5}
            className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-8"
          >
            {[
              { value: "120+", label: "Schools" },
              { value: "45k+", label: "Students" },
              { value: "98%", label: "Uptime" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-[#0F172A] sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Features
// ---------------------------------------------------------------------------
function Features() {
  return (
    <section id="features" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp} custom={0}>
            <Badge
              variant="secondary"
              className="mb-4 rounded-full border border-[#10B981]/20 bg-[#10B981]/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#10B981]"
            >
              Features
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl"
          >
            Everything your school needs.
            <br />
            Nothing it doesn&rsquo;t.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-4 text-lg text-slate-600"
          >
            Replace five disconnected tools with one elegant platform that
            parents, teachers, and administrators genuinely enjoy using.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.title} variants={fadeUp} custom={i}>
                <Card className="group h-full border-transparent bg-[#F8FAFC] shadow-none transition-all duration-300 hover:border-border hover:bg-white hover:shadow-md">
                  <CardHeader className="pb-0">
                    <div
                      className={`mb-3 inline-flex size-11 items-center justify-center rounded-xl ${feature.bg} ${feature.color} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="text-base font-semibold text-[#0F172A]">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm leading-relaxed text-slate-500">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------
function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#F8FAFC] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp} custom={0}>
            <Badge
              variant="secondary"
              className="mb-4 rounded-full border border-[#F97316]/20 bg-[#F97316]/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#F97316]"
            >
              Testimonials
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl"
          >
            Loved by schools across South Africa
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-4 text-lg text-slate-600"
          >
            Don&rsquo;t just take our word for it. Here&rsquo;s what our community has to say.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3"
        >
          {testimonials.map((t, i) => (
            <motion.div key={t.author} variants={fadeUp} custom={i}>
              <Card className="h-full border-transparent bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                <CardContent className="flex h-full flex-col pt-6">
                  <Quote className="mb-4 size-8 text-[#2563EB]/15" />
                  <p className="flex-1 text-sm leading-relaxed text-slate-600">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                    <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#3b82f6] text-xs font-bold text-white">
                      {t.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#0F172A]">
                        {t.author}
                      </div>
                      <div className="text-xs text-slate-500">
                        {t.role}, {t.school}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Pricing
// ---------------------------------------------------------------------------
function Pricing() {
  return (
    <section id="pricing" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp} custom={0}>
            <Badge
              variant="secondary"
              className="mb-4 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#2563EB]"
            >
              Pricing
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl"
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-4 text-lg text-slate-600"
          >
            No hidden fees. No surprises. Start free for 30&nbsp;days, then pick
            the plan that fits your school.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="mx-auto mt-16 grid max-w-5xl items-start gap-8 md:grid-cols-3"
        >
          {pricingPlans.map((plan, i) => (
            <motion.div key={plan.name} variants={fadeUp} custom={i}>
              <Card
                className={`relative h-full transition-all duration-300 ${
                  plan.highlighted
                    ? "border-[#2563EB] bg-white shadow-xl shadow-[#2563EB]/10 ring-1 ring-[#2563EB]/20 scale-[1.02] md:scale-105"
                    : "border-transparent bg-[#F8FAFC] shadow-none hover:border-border hover:bg-white hover:shadow-md"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-[#2563EB] px-3 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#0F172A]">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-slate-500">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold text-[#0F172A]">
                      R{plan.price}
                    </span>
                    <span className="ml-1 text-sm text-slate-500">
                      / {plan.period}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-slate-600"
                      >
                        <Check
                          className={`mt-0.5 size-4 shrink-0 ${
                            plan.highlighted
                              ? "text-[#2563EB]"
                              : "text-[#10B981]"
                          }`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.highlighted
                        ? "bg-[#2563EB] shadow-lg shadow-[#2563EB]/25 hover:bg-[#1d4ed8]"
                        : "bg-[#0F172A] hover:bg-[#1e293b]"
                    }`}
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// CTA
// ---------------------------------------------------------------------------
function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#0F172A] py-24 sm:py-32">
      {/* Accent glow */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-[#2563EB]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-[400px] w-[400px] rounded-full bg-[#F97316]/10 blur-3xl" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8"
      >
        <motion.h2
          variants={fadeUp}
          custom={0}
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          Ready to transform your school?
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={1}
          className="mx-auto mt-6 max-w-xl text-lg text-slate-400"
        >
          Join 120+ schools already using Campusly to simplify administration,
          delight parents, and empower teachers.
        </motion.p>
        <motion.div
          variants={fadeUp}
          custom={2}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            className="h-12 rounded-xl bg-[#2563EB] px-8 text-base font-semibold shadow-lg shadow-[#2563EB]/25 hover:bg-[#1d4ed8]"
          >
            Book a Demo
            <ArrowRight className="ml-2 size-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-xl border-slate-700 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
          >
            Contact Sales
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
function Footer() {
  const columns = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Integrations", href: "#" },
        { label: "Changelog", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Centre", href: "#" },
        { label: "Documentation", href: "#" },
        { label: "Status", href: "#" },
        { label: "Community", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "POPIA Compliance", href: "#" },
        { label: "Cookie Policy", href: "#" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-1">
            <LogoFull size={32} />
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              The all-in-one school platform parents actually love.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-[#0F172A]">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors hover:text-[#0F172A]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Campusly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
