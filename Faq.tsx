"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Can I download my documents in both PDF and Microsoft Word (.docx)?",
      a: "Yes! Next Chapter natively supports dual export. With one click, you can download a pixel-perfect, ATS-compliant PDF for immediate online job applications, or download a fully editable Microsoft Word (.docx) file if a recruiter specifically asks for an editable document or if you want to make further custom adjustments on your laptop or phone.",
    },
    {
      q: "How does the subscription work, and what are the fees?",
      a: "We offer two straightforward plans built specifically for Nigerian youths: the Weekly Pass at ₦7,000/week (ideal for immediate job application sprints) and the Monthly Pro at ₦20,000/month (which saves you ₦8,000 / ~30% discount, ideal for ongoing job hunts, multiple company variations, and study abroad scholarship applications). Both plans give you full access to CV, Cover Letter, and Personal Statement AI generation with unlimited downloads. You can cancel at any time.",
    },
    {
      q: "Will my CV pass ATS scanners used by Nigerian banks and tech multinationals?",
      a: "Absolutely. Most Nigerian job portals and multinational recruiters use systems like Taleo, Workday, Lever, and Greenhouse. These parsers fail when resumes have multiple decorative columns, text boxes, tables, or unreadable fonts. Next Chapter formats all CVs following Stanford and Harvard 1-page standard ATS hierarchy with high-signal keywords, ensuring your resume gets 95%+ parse scores.",
    },
    {
      q: "How does the AI personalize for Nigerian education and NYSC experience?",
      a: "Unlike generic US/European AI tools that get confused by terms like 'NYSC', 'PPA', 'CDS Project', 'First Class/Second Class Upper', or Naira (₦) revenue metrics, Next Chapter is pre-trained and fine-tuned on the Nigerian corporate landscape. It knows how to present your university degree, National Service contributions, and local projects as high-impact business wins.",
    },
    {
      q: "Does the Personal Statement generator work for UK Chevening and Canada visas?",
      a: "Yes! Our Personal Statement generator is structured specifically around the rigorous criteria demanded by the UK Foreign Office (Chevening), Commonwealth, Erasmus Mundus, and Canadian study permit letters of explanation. It builds compelling narratives focusing on your leadership, networking, home-country development vision, and academic readiness.",
    },
    {
      q: "What payment methods do you accept in Nigeria?",
      a: "We support all standard Nigerian payment rails via Paystack and Flutterwave, including Mastercard, Visa, Verve debit cards, instant Bank Transfer (Kuda, GTBank, Access, Zenith, OPay, Moniepoint), and USSD codes. Transactions are processed securely in Nigerian Naira (₦).",
    },
    {
      q: "What if I am a fresh graduate with little or no formal work experience?",
      a: "That is where Next Chapter shines brightest. Our AI draws out transferable competencies from your final year undergraduate project, student association leadership, internships, SIWES, online certifications, and volunteer initiatives, converting them into powerful, quantifiable bullet points that make you stand out in Graduate Trainee pools.",
    },
  ];

  return (
    <section id="faq" className="py-20 sm:py-28 relative scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Everything You Need To Know
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Got questions about formats, pricing, or our AI? We have transparent answers.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-panel border border-white/10 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors"
                >
                  <span className="text-base sm:text-lg font-bold text-white leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
