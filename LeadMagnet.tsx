"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { BookOpen, Sparkles, CheckCircle2, ArrowRight, Gift, Send, Check } from "lucide-react";

export default function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("Graduate Trainee / Tech");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          careerInterest: interest,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg("Failed to claim guide. Please try again.");
    }
  };

  return (
    <section className="py-16 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl glass-panel-elevated p-8 sm:p-12 border border-emerald-500/30 relative overflow-hidden">
          {/* Radiant glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Gift className="w-3.5 h-3.5 text-emerald-400" />
                Free Resource For Nigerian Youths
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Get the 2025 Nigerian Youth Career & Graduate Trainee Playbook
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                Includes 50+ ATS-tested action verbs for Nigerian banking/tech roles, real sample cover letters for Moniepoint & Access Bank, plus a 15% discount voucher for Next Chapter Pro.
              </p>

              <div className="flex flex-wrap gap-4 text-xs text-slate-300 pt-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free PDF guide
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Graduate Trainee questions
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant email delivery
                </span>
              </div>
            </div>

            <div className="md:col-span-5">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-3 glass-panel p-5 rounded-2xl border border-white/10">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. yourname@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Career Goal</label>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Graduate Trainee / Banking" className="bg-slate-900">
                        Graduate Trainee / Nigerian Banking
                      </option>
                      <option value="Fintech & Tech Roles" className="bg-slate-900">
                        Fintech / Software / UIUX / Product
                      </option>
                      <option value="UK Chevening & Study Abroad" className="bg-slate-900">
                        UK / Canada Master&apos;s & Scholarships
                      </option>
                      <option value="Remote USD Jobs" className="bg-slate-900">
                        Remote International USD Roles
                      </option>
                    </select>
                  </div>

                  {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-600/30 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "Sending..." : "Send Me The Free Playbook"}</span>
                  </button>
                </form>
              ) : (
                <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">Playbook On The Way!</h4>
                  <p className="text-xs text-slate-300">
                    We&apos;ve sent the 2025 Career Playbook and your discount code to <span className="text-emerald-300 font-semibold">{email}</span>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
