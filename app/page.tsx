"use client";

import { useRef } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SocialProof from "../components/SocialProof";
import DocumentStudio from "../components/DocumentStudio";
import FeaturesShowcase from "../components/FeaturesShowcase";
import HowItWorks from "../components/HowItWorks";
import Benefits from "../components/Benefits";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import LeadMagnet from "../components/LeadMagnet";
import Faq from "../components/Faq";
import CtaSection from "../components/CtaSection";
import Footer from "../components/Footer";

export default function Home() {
  const scrollToStudio = () => {
    const el = document.getElementById("studio");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToPricing = () => {
    const el = document.getElementById("pricing");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-[#060a11] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Sticky Navbar */}
      <Navbar onOpenPricingModal={scrollToPricing} onOpenStudio={scrollToStudio} />

      {/* Hero Section */}
      <Hero onScrollToStudio={scrollToStudio} onOpenPricing={scrollToPricing} />

      {/* Social Proof & Metrics */}
      <SocialProof />

      {/* Interactive AI Document Studio (CV, Cover Letter, Personal Statement, PDF & Word Export) */}
      <DocumentStudio />

      {/* 3 Core Document Pillars & Tech Features */}
      <FeaturesShowcase onScrollToStudio={scrollToStudio} />

      {/* 3-Step Workflow */}
      <HowItWorks onScrollToStudio={scrollToStudio} />

      {/* Before vs After Benefits */}
      <Benefits onScrollToStudio={scrollToStudio} />

      {/* Testimonials from Nigerian Youths */}
      <Testimonials />

      {/* Subscription Pricing (Weekly ₦7,000 / Monthly ₦20,000 + Checkout Simulation) */}
      <Pricing onScrollToStudio={scrollToStudio} />

      {/* Free Lead Magnet Guide */}
      <LeadMagnet />

      {/* Frequently Asked Questions */}
      <Faq />

      {/* Final Conversion CTA */}
      <CtaSection onScrollToStudio={scrollToStudio} onOpenPricing={scrollToPricing} />

      {/* Footer */}
      <Footer />
    </main>
  );
}
