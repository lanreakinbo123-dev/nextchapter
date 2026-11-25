"use client";

import { XCircle, CheckCircle2, Zap, TrendingUp, Sparkles, ArrowRight } from "lucide-react";

interface BenefitsProps {
  onScrollToStudio: () => void;
}

export default function Benefits({ onScrollToStudio }: BenefitsProps) {
  const painPoints = [
    "Using colorful 2-column Canva templates that get instantly rejected by Taleo & Workday parsers",
    "Writing vague duties ('responsible for data entry') with zero metrics or business impact",
    "Sending generic 'Dear Sir/Madam' cover letters that Nigerian HR trash within 4 seconds",
    "Struggling to translate NYSC community projects into corporate executive leadership points",
    "Paying ₦30,000 to ₦60,000 to unverified LinkedIn 'CV writers' who take 10 days to reply",
  ];

  const advantages = [
    "Clean, Harvard & Stanford-backed 1-page layouts with 98% ATS parse compliance",
    "AI injects quantifiable results: revenue in Naira (₦), efficiency gains (%), and user scale",
    "Hyper-targeted Cover Letters addressing company pain points and specific hiring leads",
    "Structured academic personal statements that meet UK Chevening and Canada visa scrutiny",
    "Unlimited generations and instant PDF & MS Word (.docx) downloads from ₦7,000/week",
  ];

  return (
    <section id="benefits" className="py-20 sm:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            The Next Chapter Difference
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Stop Sending Resumes Into A Black Hole
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Over 80% of Nigerian CVs are never seen by human recruiters because of broken formatting and weak language. Here is how Next Chapter flips the odds in your favour.
          </p>
        </div>

        {/* Side-by-side comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Old way */}
          <div className="rounded-2xl bg-red-950/20 border border-red-500/20 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                  The Outdated Job Hunt
                </span>
                <span className="text-xs px-2.5 py-1 rounded bg-red-500/20 text-red-300 font-semibold border border-red-500/30">
                  High Rejection Rate
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-200 mb-6">
                Why Ordinary Resumes Get Discarded
              </h3>

              <div className="space-y-4">
                {painPoints.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-red-500/20 text-xs text-red-300/80 italic">
              Result: Months of ghosting, lost graduate trainee cycles, and endless frustration.
            </div>
          </div>

          {/* Next Chapter Way */}
          <div className="rounded-2xl glass-panel-elevated border border-emerald-500/40 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  The Next Chapter Edge
                </span>
                <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/30 text-emerald-200 font-semibold border border-emerald-400/40">
                  98% ATS Pass Rate
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                Fast-Track To Interview Callbacks
              </h3>

              <div className="space-y-4">
                {advantages.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-emerald-300 font-semibold">
                Result: 3.9x more interviews within 14 days
              </span>
              <button
                onClick={onScrollToStudio}
                className="text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Build Yours Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
