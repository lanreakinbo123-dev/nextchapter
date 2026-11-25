"use client";

import { FileText, Award, BookOpen, Download, ShieldCheck, Cpu, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

interface FeaturesShowcaseProps {
  onScrollToStudio: () => void;
}

export default function FeaturesShowcase({ onScrollToStudio }: FeaturesShowcaseProps) {
  const documentPillars = [
    {
      title: "ATS-Engineered Nigerian CV",
      desc: "Built specifically to beat the automated parsers used by Access Bank, KPMG, Flutterwave, and global tech giants.",
      badge: "Passes Taleo & Workday",
      highlights: [
        "Properly formats NYSC, Nigerian university honors & CGPAs",
        "Converts casual tasks into quantified revenue/metric bullets",
        "Zero two-column parsing bugs that get Canva resumes discarded",
        "Dual download: Instant PDF & Editable MS Word (.docx)",
      ],
      icon: FileText,
      gradient: "from-emerald-500/20 to-teal-500/10",
      border: "border-emerald-500/30",
    },
    {
      title: "Targeted Cover Letter Engine",
      desc: "No more generic 'Dear Sir/Madam'. Generate compelling, role-specific letters that hook Nigerian HR heads and remote international managers.",
      badge: "High Response Rate",
      highlights: [
        "Analyzes target company culture and pain points",
        "Matches your exact background to job description requirements",
        "Strong executive opening and confident call-to-action closing",
        "Formatted to standard 1-page business layout in PDF & Word",
      ],
      icon: Sparkles,
      gradient: "from-teal-500/20 to-cyan-500/10",
      border: "border-teal-500/30",
    },
    {
      title: "Scholarship & Visa Personal Statement",
      desc: "Structured specifically for UK Chevening, Commonwealth, Erasmus Mundus, and Canadian Study Permit letters of intent.",
      badge: "Chevening & Masters Ready",
      highlights: [
        "Crafts authentic leadership & home-country development narratives",
        "Aligns academic curiosity with specific university research labs",
        "Zero cliché openings; compelling personal storytelling",
        "Meets strict 500-word and 1,000-word academic thresholds",
      ],
      icon: Award,
      gradient: "from-emerald-600/20 to-amber-500/10",
      border: "border-emerald-500/30",
    },
  ];

  const techFeatures = [
    {
      icon: Download,
      title: "Dual Format: PDF & MS Word (.docx)",
      desc: "Some Nigerian recruiters insist on editable .docx files; international remote jobs want clean PDFs. You get both instantly.",
    },
    {
      icon: Cpu,
      title: "Nigerian Context & Currency Aware",
      desc: "Our AI understands NYSC PPAs, CDS projects, Nigerian university grades, and correctly formats Naira (₦) & USD metrics.",
    },
    {
      icon: ShieldCheck,
      title: "98% ATS Keyword Optimization",
      desc: "Injects high-intent keywords extracted from top Nigerian bank and tech job descriptions without keyword stuffing.",
    },
    {
      icon: BookOpen,
      title: "Live In-Browser Refinement",
      desc: "Edit, tweak, switch color accents, or re-generate specific paragraphs on the fly before exporting.",
    },
  ];

  return (
    <section id="documents" className="py-20 sm:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            3-in-1 Career Powerhouse
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Engineered For Every Stage of Your Career
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Whether you are applying for your first Graduate Trainee role in Lagos, landing remote USD clients, or heading to the UK on scholarship.
          </p>
        </div>

        {/* 3 Core Document Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {documentPillars.map((doc, idx) => {
            const Icon = doc.icon;
            return (
              <div
                key={idx}
                className={`rounded-2xl glass-panel p-6 sm:p-8 border ${doc.border} flex flex-col justify-between hover:translate-y-[-4px] transition-all duration-300 relative overflow-hidden group`}
              >
                <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl ${doc.gradient} rounded-bl-full pointer-events-none -z-10 group-hover:scale-110 transition-transform`} />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {doc.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{doc.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">{doc.desc}</p>

                  <div className="space-y-3 pt-4 border-t border-white/10">
                    {doc.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    onClick={onScrollToStudio}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-emerald-300 hover:text-white bg-white/5 hover:bg-emerald-600 border border-emerald-500/30 hover:border-emerald-500 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Generate this document</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {techFeatures.map((feat, idx) => {
            const FeatIcon = feat.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl glass-panel border border-white/5 hover:border-emerald-500/20 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                  <FeatIcon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">{feat.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
