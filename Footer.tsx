"use client";

import { Sparkles, Heart, Globe, Mail, Phone, MapPin, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-[#05080e] text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <Sparkles className="w-5 h-5 text-emerald-100" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">Next Chapter</span>
            </a>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              The AI career copilot built specifically for Nigerian youths, NYSC corps members, and global scholarship applicants. Create ATS-beating CVs, Cover Letters, and Personal Statements ready to download in PDF and Microsoft Word (.docx).
            </p>

            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300 inline-flex items-center gap-2">
              <span className="text-sm">🇳🇬</span>
              <span>Made with pride in Lagos & Abuja for Nigerian youth everywhere.</span>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              AI Document Studio
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#studio" className="hover:text-emerald-400 transition-colors">
                  ATS CV / Resume Builder
                </a>
              </li>
              <li>
                <a href="#studio" className="hover:text-emerald-400 transition-colors">
                  Targeted Cover Letter Maker
                </a>
              </li>
              <li>
                <a href="#studio" className="hover:text-emerald-400 transition-colors">
                  Chevening & MSc Statement
                </a>
              </li>
              <li>
                <a href="#studio" className="hover:text-emerald-400 transition-colors">
                  Download as MS Word (.docx)
                </a>
              </li>
              <li>
                <a href="#studio" className="hover:text-emerald-400 transition-colors">
                  Download as Clean PDF
                </a>
              </li>
            </ul>
          </div>

          {/* Target Tracks */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Career Tracks
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#documents" className="hover:text-emerald-400 transition-colors">
                  NYSC Graduate Trainee
                </a>
              </li>
              <li>
                <a href="#documents" className="hover:text-emerald-400 transition-colors">
                  Lagos Fintech & Banking
                </a>
              </li>
              <li>
                <a href="#documents" className="hover:text-emerald-400 transition-colors">
                  Remote USD Tech Roles
                </a>
              </li>
              <li>
                <a href="#documents" className="hover:text-emerald-400 transition-colors">
                  UK Master&apos;s Admissions
                </a>
              </li>
              <li>
                <a href="#documents" className="hover:text-emerald-400 transition-colors">
                  Canada Study Permit Letters
                </a>
              </li>
            </ul>
          </div>

          {/* Subscriptions & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Plans & Pricing
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#pricing" className="hover:text-emerald-400 transition-colors">
                  Weekly Pass: <strong>₦7,000</strong>
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-emerald-400 transition-colors">
                  Monthly Pro: <strong>₦20,000</strong> (Save ₦8k)
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">
                  Payment FAQs (Paystack/Transfer)
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">
                  Money-Back Guarantee
                </a>
              </li>
              <li className="pt-2 text-slate-500">
                hello@nextchapter.ng
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Next Chapter Technologies Ltd. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#pricing" className="hover:text-slate-300 transition-colors">
              Pricing Terms
            </a>
            <a href="#faq" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-300 transition-all flex items-center gap-1"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
