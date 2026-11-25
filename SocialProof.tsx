"use client";

import { Building2, TrendingUp, Users, CheckCircle2, Award } from "lucide-react";

export default function SocialProof() {
  const employers = [
    { name: "Moniepoint", role: "Fintech Unicorn", flag: "🇳🇬" },
    { name: "Paystack / Stripe", role: "Payments Leader", flag: "🌍" },
    { name: "Flutterwave", role: "Global Payments", flag: "🌍" },
    { name: "Access Bank", role: "Banking Trainee", flag: "🇳🇬" },
    { name: "KPMG Nigeria", role: "Audit & Advisory", flag: "🇳🇬" },
    { name: "University of Leeds", role: "MSc Admissions", flag: "🇬🇧" },
    { name: "Chevening Scholars", role: "UK FCDO Fellowship", flag: "🇬🇧" },
    { name: "Toronto Tech", role: "Remote USD Engineers", flag: "🇨🇦" },
  ];

  const metrics = [
    {
      value: "45,000+",
      label: "Documents Created",
      sub: "CVs, Cover Letters & Statements across Nigeria",
    },
    {
      value: "3.9x",
      label: "More Interview Calls",
      sub: "Vs standard Canva/graphic template resumes",
    },
    {
      value: "98.4%",
      label: "ATS Clearance Score",
      sub: "Benchmarked on Taleo, Workday & Greenhouse",
    },
    {
      value: "₦14.2M",
      label: "Avg First-Year Offer",
      sub: "Tech, banking & remote USD conversions",
    },
  ];

  return (
    <section className="py-14 border-y border-white/5 bg-[#0b1018]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs uppercase tracking-widest text-slate-400 font-semibold mb-6">
          Empowering Nigerian youth landing offers at top African fintechs, banks & global universities
        </p>

        {/* Logo cloud chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {employers.map((emp) => (
            <div
              key={emp.name}
              className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.06] transition-all flex items-center gap-2 group"
            >
              <span className="text-sm">{emp.flag}</span>
              <span className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-emerald-300 transition-colors">
                {emp.name}
              </span>
              <span className="text-[10px] text-slate-500 hidden md:inline">({emp.role})</span>
            </div>
          ))}
        </div>

        {/* Metrics Grid */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl glass-panel border border-white/10 hover:border-emerald-500/30 transition-all text-center relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/15 transition-all" />
              <div className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight group-hover:scale-105 transition-transform duration-300">
                <span className="emerald-gradient-text">{m.value}</span>
              </div>
              <div className="mt-2 text-sm sm:text-base font-bold text-slate-200">{m.label}</div>
              <div className="mt-1 text-xs text-slate-400">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
