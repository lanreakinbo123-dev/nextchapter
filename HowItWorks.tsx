"use client";

import { Sparkles, ArrowRight, UploadCloud, Cpu, Download, CheckCircle } from "lucide-react";

interface HowItWorksProps {
  onScrollToStudio: () => void;
}

export default function HowItWorks({ onScrollToStudio }: HowItWorksProps) {
  const steps = [
    {
      num: "01",
      title: "Choose Document & Share Your Target",
      desc: "Pick CV, Cover Letter, or Personal Statement. Enter your target company (e.g. Moniepoint, KPMG, Univ of Leeds) and paste your raw experience or NYSC background.",
      icon: UploadCloud,
    },
    {
      num: "02",
      title: "AI Optimizes for ATS & Human Eyes",
      desc: "Our specialized model injects top-percentile action verbs, translates raw tasks into quantifiable business results, and embeds high-match recruiter keywords.",
      icon: Cpu,
    },
    {
      num: "03",
      title: "Download in PDF & MS Word (.docx)",
      desc: "Export instantly in the exact file format required by your recruiter. Edit freely, apply immediately, and track multiple job submissions.",
      icon: Download,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 relative bg-[#090e17]/80 border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Simple 3-Step Process
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            From Blank Page to Job Offer in 60 Seconds
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            No design skills needed. No spending hours tweaking margins in Google Docs or paying ₦35,000 to unreliable resume writers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl glass-panel p-7 sm:p-8 border border-white/10 hover:border-emerald-500/30 transition-all group"
              >
                {/* Step number badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl sm:text-4xl font-black text-emerald-500/40 group-hover:text-emerald-400 transition-colors">
                    {step.num}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 flex items-center justify-center text-slate-300 group-hover:text-emerald-300 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Quick action bar */}
        <div className="mt-12 text-center">
          <button
            onClick={onScrollToStudio}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30 active:scale-95 transition-all"
          >
            <span>Try It Live In The Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
