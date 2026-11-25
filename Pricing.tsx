"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import {
  Check,
  Zap,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Building,
  Smartphone,
  Lock,
  ArrowRight,
  Download,
  CheckCircle2,
  X,
  RefreshCw,
} from "lucide-react";

interface PricingProps {
  onScrollToStudio: () => void;
}

export default function Pricing({ onScrollToStudio }: PricingProps) {
  const [selectedPlan, setSelectedPlan] = useState<"weekly" | "monthly">("monthly");
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<"weekly" | "monthly">("monthly");

  // Checkout form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"paystack" | "flutterwave" | "transfer">("paystack");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleOpenCheckout = (plan: "weekly" | "monthly") => {
    setCheckoutPlan(plan);
    setCheckoutModalOpen(true);
    setIsSuccess(false);
    setErrorMsg("");
  };

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setErrorMsg("Please enter your full name and email address.");
      return;
    }

    setIsProcessing(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: checkoutPlan,
          fullName: name,
          email,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Payment simulation failed");

      setIsProcessing(false);
      setIsSuccess(true);
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      setIsProcessing(false);
      setErrorMsg(err.message || "Failed to process transaction. Please try again.");
    }
  };

  return (
    <section id="pricing" className="py-20 sm:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <CreditCard className="w-3.5 h-3.5" />
            Simple & Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Invest in Your Next Career Leap
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            No hidden fees. Instant access to AI document generation, ATS optimizations, and dual PDF & MS Word (.docx) downloads. Cancel anytime.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Weekly Pass Card */}
          <div className="rounded-2xl glass-panel p-6 sm:p-8 border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between relative group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  Sprint Pass
                </span>
                <span className="text-xs px-2.5 py-1 rounded bg-white/10 text-slate-300 font-medium">
                  7-Day Access
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Weekly Pass</h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6">
                Ideal for active job hunters with immediate deadlines or upcoming graduate trainee submissions.
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-white/10">
                <span className="text-4xl sm:text-5xl font-extrabold text-white">₦7,000</span>
                <span className="text-sm text-slate-400 font-medium">/ week</span>
              </div>

              {/* Features list */}
              <div className="space-y-3.5">
                {[
                  "Unlimited AI CV & Resume Generations",
                  "Unlimited Targeted Cover Letters",
                  "Academic & Scholarship Personal Statement Generator",
                  "Dual Instant Download: PDF & MS Word (.docx)",
                  "ATS Keyword Matcher & Score Gauge",
                  "NYSC & Nigerian University Grade Templates",
                  "Cancel Anytime in 1 Click",
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4">
              <a
                href="https://paystack.shop/pay/20knk7t8-x"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl font-bold text-sm text-slate-200 hover:text-white glass-panel hover:bg-white/10 border border-white/20 hover:border-emerald-500/50 transition-all flex items-center justify-center gap-2 active:scale-95 inline-flex"
              >
                <span>Get Weekly Pass (₦7,000)</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Monthly Pro Card (Best Value) */}
          <div className="rounded-2xl glass-panel-elevated p-6 sm:p-8 border-2 border-emerald-500/60 shadow-2xl shadow-emerald-500/10 flex flex-col justify-between relative group">
            {/* Best Value badge */}
            <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[11px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1">
              <Zap className="w-3 h-3 fill-white" />
              <span>Most Popular • Save ₦8,000</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                  Full Career Accelerator
                </span>
                <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  Save ~30%
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Monthly Pro</h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6">
                Best for comprehensive job hunts, multiple company customizations, and study abroad scholarship rounds.
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-white/10">
                <span className="text-4xl sm:text-5xl font-extrabold text-white">₦20,000</span>
                <span className="text-sm text-slate-400 font-medium">/ month</span>
                <span className="text-xs line-through text-slate-500 ml-1">₦28,000</span>
              </div>

              {/* Features list */}
              <div className="space-y-3.5">
                {[
                  "Everything in Weekly Pass",
                  "30 Days of Continuous AI Tailoring & Updates",
                  "Tailor Resumes for 50+ Unique Job Postings",
                  "UK Chevening, Commonwealth & Canadian Visa Templates",
                  "Priority AI Generation Speed & Advanced Formatting",
                  "Export Unlimited Editable .docx & Printable PDFs",
                  "WhatsApp Career Community & Feedback Access",
                  "Money-Back Guarantee: First 48 Hours",
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-100 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4">
              <a
                href="https://paystack.shop/pay/sib3xbc6ly"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 shadow-xl shadow-emerald-500/40 hover:shadow-emerald-500/60 hover:brightness-110 transition-all flex items-center justify-center gap-2 border border-emerald-300/40 active:scale-95 inline-flex"
              >
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>Get Monthly Pro (₦20,000)</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="text-center mt-2.5 text-[11px] text-slate-400">
                Supported: Nigerian Debit Cards, Bank Transfer & USSD
              </div>
            </div>
          </div>
        </div>

        {/* Security / Payment method reassurance */}
        <div className="mt-12 text-center text-xs text-slate-400 flex flex-wrap items-center justify-center gap-6">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" /> 256-Bit Bank-Grade Encryption
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Paystack & Flutterwave Verified
          </span>
          <span className="flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-emerald-400" /> Instant Bank Transfer / USSD Supported
          </span>
        </div>
      </div>

      {/* Checkout Modal Simulation */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg glass-panel-elevated rounded-2xl p-6 sm:p-8 border border-emerald-500/40 relative shadow-2xl">
            {/* Close button */}
            <button
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSuccess ? (
              <form onSubmit={handleProcessPayment} className="space-y-4">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Subscribe to Next Chapter</h3>
                    <p className="text-xs text-slate-400">Instant activation for Nigerian youth</p>
                  </div>
                </div>

                {/* Plan Selector inside modal */}
                <div className="grid grid-cols-2 gap-3 p-1.5 rounded-xl bg-black/40 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setCheckoutPlan("weekly")}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                      checkoutPlan === "weekly"
                        ? "bg-emerald-600 text-white shadow-md"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Weekly: ₦7,000
                  </button>
                  <button
                    type="button"
                    onClick={() => setCheckoutPlan("monthly")}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                      checkoutPlan === "monthly"
                        ? "bg-emerald-600 text-white shadow-md"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Monthly: ₦20,000 (Best)
                  </button>
                </div>

                {/* Order Summary box */}
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-emerald-300">
                      {checkoutPlan === "monthly" ? "Monthly Pro Subscription" : "Weekly Sprint Pass"}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Unlimited CVs, Cover Letters & Personal Statements (PDF & Word)
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-extrabold text-white">
                      {checkoutPlan === "monthly" ? "₦20,000" : "₦7,000"}
                    </div>
                    <div className="text-[10px] text-emerald-400">NGN / Nigerian Naira</div>
                  </div>
                </div>

                {/* Form fields */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Babatunde Adekunle"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. babatunde@email.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Payment Gateway method */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Select Nigerian Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("paystack")}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all text-center ${
                        paymentMethod === "paystack"
                          ? "border-emerald-500 bg-emerald-500/20 text-white"
                          : "border-white/10 bg-white/5 text-slate-400"
                      }`}
                    >
                      <CreditCard className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
                      Paystack Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("flutterwave")}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all text-center ${
                        paymentMethod === "flutterwave"
                          ? "border-emerald-500 bg-emerald-500/20 text-white"
                          : "border-white/10 bg-white/5 text-slate-400"
                      }`}
                    >
                      <Smartphone className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
                      Flutterwave
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("transfer")}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all text-center ${
                        paymentMethod === "transfer"
                          ? "border-emerald-500 bg-emerald-500/20 text-white"
                          : "border-white/10 bg-white/5 text-slate-400"
                      }`}
                    >
                      <Building className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
                      Bank Transfer
                    </button>
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-2.5 rounded-lg bg-red-900/40 border border-red-500/40 text-red-300 text-xs">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 shadow-xl shadow-emerald-500/30 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 border border-emerald-400/40 disabled:opacity-60"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-emerald-200" />
                      <span>Connecting to Gateway...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-emerald-200" />
                      <span>
                        Pay {checkoutPlan === "monthly" ? "₦20,000" : "₦7,000"} & Activate
                      </span>
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-slate-400">
                  Instant activation. Cancel or downgrade anytime in your dashboard.
                </p>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-300">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-black text-white">Subscription Activated!</h3>
                <p className="text-sm text-slate-300 max-w-sm mx-auto">
                  Welcome to Next Chapter {checkoutPlan === "monthly" ? "Monthly Pro" : "Weekly Pass"}. Your account ({email}) is now unlocked for unlimited AI CV, Cover Letter, and Personal Statement exports in PDF & MS Word.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setCheckoutModalOpen(false);
                      onScrollToStudio();
                    }}
                    className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Launch AI Studio Now</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
