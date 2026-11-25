"use client";

import Image from "next/image";
import { Star, Quote, CheckCircle, MapPin, Building, GraduationCap } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Femi Adebayo",
      role: "Backend Engineer @ Moniepoint",
      location: "Yaba, Lagos",
      avatar: "https://images.pexels.com/photos/19568392/pexels-photo-19568392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200",
      type: "ATS CV & Cover Letter",
      salary: "₦850k / month offer",
      quote:
        "I was applying for tech roles for 6 months with zero callbacks using a fancy Canva resume. Next Chapter rebuilt my CV in 2 minutes, highlighted my payment APIs in numbers, and gave me an MS Word version. Within 12 days, I had interviews with 2 fintechs and signed with Moniepoint!",
    },
    {
      name: "Blessing Okafor",
      role: "Chevening Scholar @ Univ. of Leeds",
      location: "Abuja ➔ United Kingdom",
      avatar: "https://images.pexels.com/photos/8199174/pexels-photo-8199174.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200",
      type: "Personal Statement for UK",
      salary: "Fully Funded £35,000 Award",
      quote:
        "The hardest part of Chevening is explaining your Nigerian grassroots impact without sounding generic. The AI studio structured my community health initiative into an irresistible narrative that directly matched the Chevening leadership pillars. I got the fully funded scholarship on my first attempt!",
    },
    {
      name: "Chidi Nwachukwu",
      role: "Graduate Trainee @ Access Bank",
      location: "Port Harcourt / Lagos",
      avatar: "https://images.pexels.com/photos/7793169/pexels-photo-7793169.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200",
      type: "NYSC Trainee CV & Letter",
      salary: "Secured Bank Trainee Seat",
      quote:
        "As an NYSC corp member, my biggest worry was 'I don't have enough corporate experience'. Next Chapter transformed my PPA accounting tasks into high-value banking competencies. The ₦7,000 weekly subscription is the best investment I made all year.",
    },
    {
      name: "Kemi Solanke",
      role: "Remote Operations Associate",
      location: "Ibadan (US Dollar Remote)",
      avatar: "https://images.pexels.com/photos/10375901/pexels-photo-10375901.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200",
      type: "Cover Letter & ATS CV",
      salary: "$1,800 / month remote",
      quote:
        "International recruiters scan with Workday and Lever. Next Chapter scored my CV at 97% ATS match and generated a tailored cover letter explaining why an ambitious Nigerian candidate is their best hire. I now work remotely from Ibadan earning in USD.",
    },
  ];

  return (
    <section id="testimonials" className="py-20 sm:py-28 relative bg-[#070c14] border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-emerald-400" />
            Verified Success Stories
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Nigerian Youths Crushing Their Next Chapter
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Real stories from young graduates, tech talents, and scholarship winners who traded rejection emails for dream offers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="rounded-2xl glass-panel p-6 sm:p-8 border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-slate-700 group-hover:text-emerald-500/20 transition-colors">
                <Quote className="w-10 h-10" />
              </div>

              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {t.salary}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-white/10">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400/50 shadow-md"
                />
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-1.5">
                    {t.name}
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </h4>
                  <p className="text-xs font-medium text-emerald-300">{t.role}</p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-500" /> {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
