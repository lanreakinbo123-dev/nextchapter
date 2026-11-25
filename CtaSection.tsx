"use client";

import { Sparkles, ArrowRight, Download, CheckCircle, ShieldCheck } from "lucide-react";

interface CtaSectionProps {
  onScrollToStudio: () => void;
  onOpenPricing: () => void;
}

export default function CtaSection({ onScrollToStudio, onOpenPricing }: CtaSectionProps) {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl glass-panel-elevated p-8 sm:p-16 border border-emerald-500/40 relative text-center overflow-hidden shadow-2xl">
          {/* Ambient lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Your Next Career Breakthrough</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Stop Getting Ghosted.
              <br />
              <span className="emerald-gradient-text">Start Getting Hired.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Join thousands of Nigerian youths securing top roles in Lagos, remote USD positions, and UK/Canada master&apos;s admissions with Next Chapter.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-300">
              <span className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10">
                Weekly: <strong className="text-white">₦7,000</strong>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-bold">
                Monthly: <strong className="text-white">₦20,000</strong> (Save ₦8,000)
              </span>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onScrollToStudio}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 shadow-xl shadow-emerald-500/40 hover:shadow-emerald-500/60 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 border border-emerald-400/40"
              >
                <Sparkles className="w-5 h-5 text-emerald-200" />
                <span>Launch AI Document Studio</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="#pricing"
                onClick={onOpenPricing}
                className="w-full sm:w-auto px-7 py-4 rounded-xl font-bold text-base text-slate-200 glass-panel hover:bg-white/10 transition-all flex items-center justify-center gap-2 border border-white/15"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>View Plans & Subscribe</span>
              </a>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> PDF & MS Word (.docx) downloads
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> Cancel anytime
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Secure Nigerian payments
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
