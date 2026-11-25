"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, FileText, Download, CheckCircle, Star, ArrowRight, ShieldCheck, Zap, Globe, Award } from "lucide-react";

interface HeroProps {
  onScrollToStudio: () => void;
  onOpenPricing: () => void;
}

export default function Hero({ onScrollToStudio, onOpenPricing }: HeroProps) {
  const [activeTab, setActiveTab] = useState<"cv" | "cover" | "statement">("cv");

  const previewSnippets = {
    cv: {
      type: "ATS CV / Resume",
      tag: "98% ATS Match Rate",
      person: "TUNDE BALOGUN",
      sub: "B.Sc UNILAG • NYSC Completed • Lagos / Remote",
      headline: "Backend & Systems Engineer (Fintech Experience)",
      bullets: [
        "Architected high-throughput payment settlement microservice processing ₦120M+ daily.",
        "Reduced transaction fail-rate from 4.2% to 0.18% using resilient Kafka event pipelines.",
        "Graduated 1st Class Honours; led 2024 Pan-African Youth Hackathon winning team.",
      ],
      formats: "PDF & MS Word (.docx) Ready",
    },
    cover: {
      type: "Targeted Cover Letter",
      tag: "Tailored for Moniepoint / Paystack",
      person: "CHIOMA EZE",
      sub: "Addressed to: People & Culture Team, Paystack Lagos",
      headline: "Application for Product Growth & Strategy Associate",
      bullets: [
        "Demonstrated track record scaling digital banking adoption across 5 Nigerian states.",
        "Spearheaded user research cohort uncovering critical friction in merchant onboarding.",
        "Ready to bring relentless execution and localized fintech intuition to your sprint cycles.",
      ],
      formats: "1-Click PDF & MS Word Export",
    },
    statement: {
      type: "Scholarship & MSc Statement",
      tag: "UK Chevening & Canada Approved",
      person: "AMINA BELLO",
      sub: "Target: MSc Global Health & Innovation, Univ. of Leeds",
      headline: "Statement of Purpose & Long-Term Africa Vision",
      bullets: [
        "Bridged healthcare disparities in northern Nigeria via community tele-triage pilot.",
        "Clear 5-year post-study roadmap to return and scale digital clinic frameworks in West Africa.",
        "Structured rigorously around Chevening leadership, networking, and home-country impact criteria.",
      ],
      formats: "Standard Academic Word & PDF",
    },
  };

  const currentPreview = previewSnippets[activeTab];

  return (
    <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden bg-grid-pattern">
      {/* Radiant ambient glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-600/15 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-5 w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold mb-6 shadow-lg shadow-emerald-950/40 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Built for Nigerian Youths, NYSC Members & Global Aspirants</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12]">
            Write Your Next Chapter.
            <br />
            <span className="emerald-gradient-text">
              Land 6-Figure Jobs & Global Masters.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Stop losing out to automated recruiter filters. Generate tailored,{" "}
            <span className="text-white font-medium">ATS-beating CVs</span>, persuasive{" "}
            <span className="text-white font-medium">Cover Letters</span>, and winning{" "}
            <span className="text-white font-medium">Personal Statements</span>—instantly
            downloadable in <strong className="text-emerald-400 font-bold">PDF</strong> and{" "}
            <strong className="text-emerald-400 font-bold">Microsoft Word (.docx)</strong>.
          </p>

          {/* Pricing pills highlight */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
            <div className="px-3.5 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Weekly Pass: <strong>₦7,000</strong> / week</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-semibold flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Monthly Pro: <strong>₦20,000</strong> / month</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-200 uppercase">Save ~30%</span>
            </div>
          </div>

          {/* Primary CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onScrollToStudio}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3 border border-emerald-300/30 group"
            >
              <Sparkles className="w-5 h-5 text-emerald-200 group-hover:rotate-12 transition-transform" />
              <span>Generate My Document in 60s</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#pricing"
              onClick={onOpenPricing}
              className="w-full sm:w-auto px-7 py-4 rounded-xl font-semibold text-base text-slate-200 glass-panel hover:bg-white/10 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 border border-white/15"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>See Subscription Plans (₦7k / ₦20k)</span>
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Dual Export: <strong>PDF & MS Word</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>98% ATS Pass on Taleo & Workday</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Tailored for Nigeria, UK, US & Canada</span>
            </div>
          </div>
        </div>

        {/* Dynamic Interactive Hero Document Preview Deck */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="glass-panel-elevated rounded-2xl p-4 sm:p-6 shadow-2xl relative border border-emerald-500/30">
            {/* Top switcher tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                <button
                  onClick={() => setActiveTab("cv")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === "cv"
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  1. ATS CV / Resume
                </button>
                <button
                  onClick={() => setActiveTab("cover")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === "cover"
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  2. Targeted Cover Letter
                </button>
                <button
                  onClick={() => setActiveTab("statement")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === "statement"
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  3. Personal Statement (Scholarship/Visa)
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  {currentPreview.tag}
                </span>
              </div>
            </div>

            {/* Document sheet mockup */}
            <div className="mt-5 rounded-xl bg-white text-slate-900 p-5 sm:p-8 shadow-inner font-sans relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                    {currentPreview.person}
                  </h3>
                  <p className="text-xs font-medium text-slate-500">{currentPreview.sub}</p>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200 text-xs font-semibold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{currentPreview.formats}</span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-bold text-emerald-800 uppercase tracking-wide">
                  {currentPreview.headline}
                </h4>
                <div className="mt-2.5 space-y-2">
                  {currentPreview.bullets.map((b, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom live indicator */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  Passed Nigerian Graduate Trainee & Remote screening standards
                </span>
                <button
                  onClick={onScrollToStudio}
                  className="font-bold text-emerald-700 hover:text-emerald-800 underline flex items-center gap-1"
                >
                  Generate yours in Studio &rarr;
                </button>
              </div>
            </div>

            {/* Quick action bar */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>AI API Engine: GPT-4o + Nigerian Career Benchmarks</span>
              </div>
              <button
                onClick={onScrollToStudio}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <span>Launch Interactive Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
