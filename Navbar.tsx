"use client";

import { useState, useEffect } from "react";
import { Sparkles, Menu, X, ArrowRight, ShieldCheck, Download, ChevronRight } from "lucide-react";

interface NavbarProps {
  onOpenPricingModal?: () => void;
  onOpenStudio?: () => void;
}

export default function Navbar({ onOpenPricingModal, onOpenStudio }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "AI Studio", href: "#studio" },
    { name: "Document Types", href: "#documents" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Benefits", href: "#benefits" },
    { name: "Success Stories", href: "#testimonials" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#060a11]/85 backdrop-blur-md border-b border-white/10 shadow-2xl py-3"
            : "bg-transparent py-5"
        }`}
      >
        {/* Top notification banner for Nigerian youth */}
        <div className="hidden sm:flex items-center justify-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-950/40 border-b border-emerald-500/20 py-1.5 px-4 mb-2">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            🇳🇬 NIGERIA 2025/2026 COHORT
          </span>
          <span>
            Graduate Trainee, Tech & UK/Canada Master&apos;s admissions are open. Build your documents today!
          </span>
          <span className="text-emerald-300 font-semibold underline cursor-pointer" onClick={onOpenStudio}>
            Try AI Free &rarr;
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-5 h-5 text-emerald-100" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                  Next Chapter
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </span>
                <span className="text-[10px] font-medium tracking-wider text-emerald-400 uppercase">
                  AI Career Studio • NG
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 relative group py-1"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full rounded-full" />
                </a>
              ))}
            </nav>

            {/* CTA action buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="#pricing"
                className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>₦7,000/wk</span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-400">₦20k/mo</span>
              </a>

              <a
                href="#studio"
                onClick={onOpenStudio}
                className="relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 shadow-lg shadow-emerald-600/30 hover:shadow-emerald-500/50 hover:brightness-110 active:scale-[0.98] transition-all duration-200 border border-emerald-400/30"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Create Document</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                className="p-2 text-slate-300 hover:text-white rounded-lg bg-white/5 border border-white/10"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xl pt-24 px-6 flex flex-col gap-6 sm:hidden animate-in fade-in duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-semibold text-slate-200 hover:text-emerald-400 flex items-center justify-between py-2 border-b border-white/5"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
            ))}
          </nav>

          <div className="mt-4 flex flex-col gap-3">
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-300 flex items-center justify-between">
              <span>Weekly Pass: ₦7,000</span>
              <span className="font-bold text-white">Monthly: ₦20,000</span>
            </div>
            <a
              href="#studio"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-xl font-bold text-center text-white bg-gradient-to-r from-emerald-600 to-teal-500 shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch AI Studio (PDF / Word)</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
