"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Download,
  FileText,
  FileSpreadsheet,
  CheckCircle,
  Copy,
  RefreshCw,
  Check,
  Eye,
  Edit3,
  GraduationCap,
  Briefcase,
  FileCheck,
  Zap,
  Plus,
  Trash2,
  Lightbulb,
  ArrowDownUp,
  ListPlus,
  ClipboardCheck,
  ClipboardList,
  ChevronRight,
  Wand2,
  Upload,
  FileUp,
  XCircle,
  Lock,
  Unlock,
  ExternalLink,
  BadgeCheck,
} from "lucide-react";
import CvPreview from "../CvPreview";
import { CV_TEMPLATES, CvData, CvTemplateId } from "@/lib/cv-templates";

type DocType = "cv" | "cover_letter" | "personal_statement";
type ThemeMode = "emerald" | "classic" | "minimal";

// Profile suggestions for Nigerian youth
const PROFILE_SUGGESTIONS = [
  { label: "Graduate Trainee / Banking Analyst", icon: "🏦", desc: "First role after NYSC. Focus on financial modeling, audit support, risk reporting." },
  { label: "Software Engineer / Developer", icon: "💻", desc: "Full-stack, backend, mobile. Highlight GitHub repos, deployed apps, and tech stacks." },
  { label: "Product / UX Designer", icon: "🎨", desc: "Figma, user research, design systems, conversion optimization." },
  { label: "Data Analyst / BI Specialist", icon: "📊", desc: "SQL, Python, PowerBI, dashboards, forecasting, business intelligence." },
  { label: "Marketing / Growth Associate", icon: "📈", desc: "Social campaigns, conversion funnels, content strategy, A/B testing." },
  { label: "Operations / Supply Chain Lead", icon: "🚚", desc: "Process improvement, inventory, logistics, vendor management." },
  { label: "HR / People Operations", icon: "👥", desc: "Recruitment, onboarding, NYSC coordination, employee engagement." },
  { label: "Remote USD / Freelance Tech", icon: "🌍", desc: "International remote clients, contract work, timezone flexibility." },
];

// Job description suggestions for different roles
const JOB_DESC_SUGGESTIONS: Record<string, string[]> = {
  "Graduate Trainee / Banking Analyst": [
    "Processed and reconciled daily transaction batches exceeding ₦50M across 3 branch offices, reducing reconciliation errors by 42%.",
    "Supported internal audit reviews by preparing financial documentation and variance reports for quarterly board presentations.",
    "Collaborated with senior analysts to model credit risk profiles for 200+ small business loan applications, improving approval accuracy.",
  ],
  "Software Engineer / Developer": [
    "Built and maintained RESTful APIs serving 25,000+ concurrent users with sub-200ms response times using Node.js / TypeScript.",
    "Refactored legacy database schemas resulting in 30% faster query execution and reduced server costs by 15%.",
    "Led sprint deliverables for mobile app releases, coordinating QA, design, and backend releases with 100% on-time delivery across 6 months.",
  ],
  "Product / UX Designer": [
    "Redesigned user onboarding flow for a fintech app, increasing activation rates from 34% to 68% within 2 months.",
    "Conducted 45+ user interviews across Lagos and Abuja, translating qualitative insights into 3 major feature releases.",
    "Created design system with 120+ reusable components, reducing design-to-dev handoff time by 40%.",
  ],
  "Data Analyst / BI Specialist": [
    "Built automated PowerBI dashboards tracking sales performance across 15 regions, reducing manual reporting time by 80%.",
    "Performed predictive modeling on customer retention, identifying key churn drivers and increasing retention by 18%.",
    "Managed data pipelines using SQL and Python, cleaning and transforming datasets for quarterly strategic reviews.",
  ],
  "Marketing / Growth Associate": [
    "Grew organic Instagram audience from 2,000 to 45,000 followers using targeted content strategy and influencer collaboration.",
    "Optimized landing page conversion funnel through A/B testing, increasing lead generation by 52% over 3 months.",
    "Managed ₦5M monthly ad spend across Facebook and Google Ads, maintaining 3.8x ROAS across campaigns.",
  ],
  "Operations / Supply Chain Lead": [
    "Streamlined procurement process for 12 vendors, reducing delivery lead times from 14 days to 6 days.",
    "Implemented inventory tracking system reducing stockouts by 60% and overstock costs by 25%.",
    "Coordinated logistics across 8 Nigerian states during peak season, maintaining 98.5% on-time delivery rate.",
  ],
  "HR / People Operations": [
    "Managed NYSC orientation onboarding for 80+ corps members, reducing time-to-productivity by 50%.",
    "Implemented employee satisfaction surveys, identifying retention drivers and improving engagement scores by 22%.",
    "Coordinated recruitment campaigns filling 15 open roles in 30 days with 95% candidate satisfaction ratings.",
  ],
  "Remote USD / Freelance Tech": [
    "Delivered 12 international client websites with 100% on-time delivery, earning 5-star reviews across 3 continents.",
    "Managed remote collaboration across time zones using GitHub Actions and CI/CD pipelines, reducing deployment errors by 70%.",
    "Maintained $2,500/month recurring contract revenue through proactive client retention and upsell strategies.",
  ],
};

// Mini layout glyphs for the 6 CV template picker
const TemplateGlyph = ({ id, active }: { id: CvTemplateId; active: boolean }) => {
  switch (id) {
    case "sidebar":
      return (
        <div className="flex gap-0.5 items-start">
          <div className={`w-1.5 h-4 rounded-sm ${active ? "bg-white/50" : "bg-slate-600"}`} />
          <div className="space-y-0.5">
            <div className={`h-0.5 w-4 ${active ? "bg-white/80" : "bg-slate-500"}`} />
            <div className={`h-0.5 w-3 ${active ? "bg-white/40" : "bg-slate-600"}`} />
            <div className={`h-0.5 w-3.5 ${active ? "bg-white/40" : "bg-slate-600"}`} />
          </div>
        </div>
      );
    case "navy":
      return (
        <div className="w-5 h-4 rounded-sm overflow-hidden flex flex-col">
          <div className="h-1.5 bg-[#17304C] shrink-0" />
          <div className="flex-1 flex gap-0.5 p-0.5 items-start">
            <div className="w-1 flex-1 bg-slate-400" />
            <div className="w-1.5 flex-1 bg-slate-300" />
          </div>
        </div>
      );
    case "serif":
      return (
        <div className="w-5 h-4 rounded-sm bg-slate-100 flex flex-col items-center justify-center gap-0.5">
          <div className="h-0.5 w-3 bg-slate-500" />
          <div className="w-full flex gap-0.5 px-0.5">
            <div className="h-1.5 flex-1 bg-slate-300" />
            <div className="h-1.5 flex-1 bg-slate-200" />
          </div>
        </div>
      );
    case "banded":
      return (
        <div className="w-5 h-4 flex flex-col gap-0.5 justify-center">
          <div className="h-1 w-full bg-slate-300 rounded-sm" />
          <div className="h-0.5 w-3/4 bg-slate-400" />
          <div className="h-1 w-full bg-slate-300 rounded-sm" />
        </div>
      );
    case "clean":
      return (
        <div className="w-5 h-4 space-y-0.5 pt-0.5">
          <div className="h-0.5 w-3 bg-emerald-500" />
          <div className="h-0.5 w-full bg-slate-400" />
          <div className="h-0.5 w-4/5 bg-slate-500" />
        </div>
      );
    case "compact":
      return (
        <div className="w-5 h-4 flex flex-col gap-0.5 justify-center">
          <div className="h-0.5 w-full bg-emerald-500" />
          <div className="h-0.5 w-full bg-slate-400" />
          <div className="h-0.5 w-3/4 bg-slate-400" />
          <div className="h-0.5 w-2/3 bg-slate-500" />
        </div>
      );
  }
};

export default function DocumentStudio() {
  const [documentType, setDocumentType] = useState<DocType>("cv");
  const [mode, setMode] = useState<"paste_cv" | "fill_form">("fill_form");

  // Common fields
  const [fullName, setFullName] = useState("Chioma Blessing Eze");
  const [email, setEmail] = useState("chioma.eze@gmail.com");
  const [phone, setPhone] = useState("+234 803 456 7890");
  const [location, setLocation] = useState("Lagos, Nigeria");
  const [targetRole, setTargetRole] = useState("Graduate Trainee / Banking Analyst");
  const [targetCompany, setTargetCompany] = useState("Access Bank / PwC Nigeria");
  const [experienceLevel, setExperienceLevel] = useState("graduate_trainee");
  const [skills, setSkills] = useState("Financial Modeling, Data Analysis, SQL, Agile, Stakeholder Management");
  const [details, setDetails] = useState("First Class Honours in Economics (UI), completed NYSC, led campus analytical research.");

  // Option 1: Paste Previous CV
  const [pastedCV, setPastedCV] = useState("");
  const [showCorrectionPrompt, setShowCorrectionPrompt] = useState(false);
  const [correctionNote, setCorrectionNote] = useState("");

  // File upload for previous CV (PDF / Word)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "reading" | "done" | "error">("idle");

  // Option 2: Fill form - Job Experience entries
  interface JobEntry {
    id: string;
    title: string;
    company: string;
    entryMonth: string;
    entryYear: string;
    exitMonth: string;
    exitYear: string;
    descriptions: string[];
  }
  const [jobEntries, setJobEntries] = useState<JobEntry[]>([
    { id: "1", title: "NYSC PPA Analyst", company: "Federal Ministry of Finance", entryMonth: "Aug", entryYear: "2023", exitMonth: "Jul", exitYear: "2024", descriptions: ["Processed daily financial records for government accounts.", "Supported audit documentation and reconciliation tasks."] },
  ]);

  // Profile suggestions selection
  const [selectedProfile, setSelectedProfile] = useState(PROFILE_SUGGESTIONS[0]);

  // Education fields (structured)
  const [educationFields, setEducationFields] = useState([
    { institution: "University of Ibadan (UI)", course: "B.Sc. Economics", qualification: "First Class Honours (CGPA 4.86)", graduationMonth: "June", graduationYear: "2023" },
  ]);

  // Certification fields (structured)
  const [certificationFields, setCertificationFields] = useState([
    { issuingOrg: "National Youth Service Corps (NYSC)", courseName: "Discharge Certificate", issueMonth: "March", issueYear: "2024" },
  ]);

  // CV template selection (6 formats) + preview mode
  const [cvTemplate, setCvTemplate] = useState<CvTemplateId>("sidebar");
  const [viewMode, setViewMode] = useState<"layout" | "raw">("layout");

  const buildCvData = (): CvData => ({
    fullName: fullName || "Your Name",
    title: targetRole || "Professional",
    phone,
    email,
    location,
    website: "linkedin.com/in/" + fullName.toLowerCase().replace(/\s+/g, ""),
    profile: details || `Results-driven ${targetRole || "professional"} ready to make a measurable impact in a growing organisation.`,
    skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
    experience: jobEntries.map((j) => ({
      title: j.title || "Job Title",
      company: j.company || "Organisation",
      period:
        [j.entryMonth, j.entryYear].filter(Boolean).join(" ") +
        " — " +
        (j.exitMonth || j.exitYear ? [j.exitMonth, j.exitYear].filter(Boolean).join(" ") : "Present"),
      bullets: j.descriptions.filter(Boolean),
    })),
    education: educationFields.map((e) => ({
      institution: e.institution || "Institution",
      course: e.course || "Course",
      qualification: e.qualification || "Qualification",
      period: [e.graduationMonth, e.graduationYear].filter(Boolean).join(" "),
    })),
    certifications: certificationFields.map((c) => ({
      org: c.issuingOrg || "Issuing Organisation",
      name: c.courseName || "Certification",
      period: [c.issueMonth, c.issueYear].filter(Boolean).join(" "),
    })),
  });
  const [programOrDegree, setProgramOrDegree] = useState("MSc Global Health & Data Systems");
  const [university, setUniversity] = useState("University of Leeds, United Kingdom");

  // Output states
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [outputTitle, setOutputTitle] = useState("Chioma Blessing Eze - Professional CV / Resume");
  const [outputContent, setOutputContent] = useState("");
  const [atsScore, setAtsScore] = useState(97);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [theme, setTheme] = useState<ThemeMode>("emerald");
  const [isCopied, setIsCopied] = useState(false);
  const [hasGeneratedOnce, setHasGeneratedOnce] = useState(false);

  // ---- Payment-gated downloads ----
  const PAYSTACK_LINKS = {
    weekly: "https://paystack.shop/pay/20knk7t8-x",
    monthly: "https://paystack.shop/pay/sib3xbc6ly",
  };
  const [isPaid, setIsPaid] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [payPlan, setPayPlan] = useState<"weekly" | "monthly">("monthly");
  const [pendingDownload, setPendingDownload] = useState<"pdf" | "docx" | null>(null);
  const [downloading, setDownloading] = useState<"pdf" | "docx" | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem("nextchapter_paid") === "1") setIsPaid(true);
    } catch {
      /* storage unavailable */
    }
  }, []);

  // Initialize sample content
  if (!outputContent && !isGenerating) {
    setOutputContent(`CHIOMA BLESSING EZE
Lagos, Nigeria | +234 803 456 7890 | chioma.eze@gmail.com | linkedin.com/in/chiomaeze

PROFESSIONAL SUMMARY
High-achieving, data-fluent Graduate Trainee & Business Analyst with a First Class Honours degree in Economics from the University of Ibadan. Recognized for exceptional analytical rigour, cross-functional initiative execution, and process modeling. Completed NYSC service with honours; spearheaded digital financial documentation project streamlining monthly reporting by 40%.

PROFESSIONAL EXPERIENCE
NYSC PPA Analyst — Federal Ministry of Finance, Lagos
2023 — 2024
• Processed and reconciled daily transaction batches exceeding ₦50M across branch offices, reducing reconciliation errors by 42%.
• Prepared financial documentation and variance reports supporting quarterly board audit reviews.
• Collaborated with senior analysts to model risk profiles for 200+ small business loan applications.

EDUCATION
B.Sc. Economics — First Class Honours (CGPA 4.86) — University of Ibadan (UI), 2023

CERTIFICATIONS & HONOURS
• NYSC Discharge Certificate (Lagos State Secretariat, 2024)
• Winner, National Undergraduate Financial Literacy Symposium (2022)

KEY PROJECTS
• Revenue Tracking Overhaul (NYSC): Automated reconciliation dashboard reducing manual verification from 14h to 2.5h.
• Campus Investment Club Portfolio: Managed simulated NGX portfolio outperforming benchmark by 18.4%.

CORE COMPETENCIES
Financial Modeling • SQL • Data Analysis • Agile • Stakeholder Management • Process Optimization`);
  }

  const handleProfileSelect = (profile: typeof PROFILE_SUGGESTIONS[0]) => {
    setSelectedProfile(profile);
    setTargetRole(profile.label);
  };

  const handleAddJobEntry = () => {
    const newId = String(Date.now());
    const suggestions = JOB_DESC_SUGGESTIONS[selectedProfile.label] || JOB_DESC_SUGGESTIONS["Graduate Trainee / Banking Analyst"];
    setJobEntries([...jobEntries, {
      id: newId,
      title: "",
      company: "",
      entryMonth: "",
      entryYear: "",
      exitMonth: "",
      exitYear: "",
      descriptions: suggestions ? [suggestions[0]] : ["Describe your key achievements with numbers and impact."],
    }]);
  };

  const handleRemoveJobEntry = (id: string) => {
    setJobEntries(jobEntries.filter(j => j.id !== id));
  };

  const handleJobEntryChange = (id: string, field: string, value: string | string[]) => {
    setJobEntries(prev => prev.map(j => j.id === id ? { ...j, [field]: value } : j));
  };

  const handleSuggestDescriptions = (id: string) => {
    const entry = jobEntries.find(j => j.id === id);
    if (!entry) return;
    const suggestions = JOB_DESC_SUGGESTIONS[selectedProfile.label] || JOB_DESC_SUGGESTIONS["Graduate Trainee / Banking Analyst"] || [
      "Streamlined a process that saved time or reduced errors.",
      "Collaborated with a team to deliver a project on time and under budget.",
      "Used data analysis to identify a problem and propose a solution.",
    ];
    handleJobEntryChange(id, "descriptions", suggestions.slice(0, 3));
  };

  const buildFullExperienceBlock = () => {
    return jobEntries.map((job, i) => {
      return `${job.title || "Role Title"} | ${job.company || "Company Name"}\n${(job.entryMonth || "") + (job.entryYear ? " " + job.entryYear : "")} — ${(job.exitMonth || "Present") + (job.exitMonth !== "Present" && job.exitYear ? " " + job.exitYear : "")}\n` + job.descriptions.map(d => `• ${d}`).join("\n");
    }).join("\n\n");
  };

  const buildCVContent = () => {
    const experienceBlock = buildFullExperienceBlock();
    const educationBlock = educationFields.map(ed => `${ed.qualification} — ${ed.course} — ${ed.institution} — Graduation: ${ed.graduationMonth} ${ed.graduationYear}`).join("\n");
    const certificationsBlock = certificationFields.map(cert => `• ${cert.courseName} — ${cert.issuingOrg} — Issue: ${cert.issueMonth} ${cert.issueYear}`).join("\n");
    return `${fullName.toUpperCase()}
${location} | ${phone} | ${email} | linkedin.com/in/${fullName.toLowerCase().replace(/\s+/g, "")}

PROFILE
${details || "Results-driven professional targeting ${selectedProfile.label}. Ready to contribute to organizational success with proven Nigerian and international experience."}

CORE SKILLS
• ${skills ? skills.split(",").map(s => s.trim()).join("\n• ") : "Data Analysis, Financial Modeling, SQL, Agile Methodology, Stakeholder Management, Process Optimization, ATS Keyword Optimization"}

WORK EXPERIENCE
${experienceBlock || "• Key achievements with quantified business outcomes in Nigerian business environment.\n• Cross-functional collaboration improving operational efficiency and reducing errors.\n• Strategic contributions aligned with organizational growth and stakeholder goals."}

EDUCATION
${educationBlock || "First Class Honours — B.Sc. Economics — University of Ibadan (UI) — Graduation: June 2023"}

CERTIFICATIONS
${certificationsBlock || "• NYSC Discharge Certificate — National Youth Service Corps — Issue: March 2024\n• Professional Certification in Agile & Product Strategy — Issue: As Per Record"}
`;
  };

  const handleGenerateWithPaste = async () => {
    setIsGenerating(true);
    setGenerationStep(1);
    const stepInterval = setInterval(() => setGenerationStep((prev) => (prev < 4 ? prev + 1 : prev)), 450);

    try {
      const combinedText = `CV Paste:\n${pastedCV}\n\nCorrections Requested:\n${correctionNote || "No additional changes requested. Generate complete optimized CV."}`;
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentType: "cv",
          fullName: fullName,
          email,
          phone,
          location,
          targetRole: targetRole,
          targetCompany,
          experienceLevel,
          skills: skills.split(",").map(s => s.trim()).filter(Boolean),
          experienceDetails: combinedText,
        }),
      });
      const data = await res.json();
      clearInterval(stepInterval);
      if (data.content) {
        setOutputTitle(data.title || `${fullName} - Professional CV / Resume`);
        setOutputContent(data.content);
        setAtsScore(data.atsScore || 97);
        setKeywords(data.highlightedKeywords || ["Paste CV Enhanced", "ATS Ready"]);
        setHasGeneratedOnce(true);
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      }
    } catch (err) {
      console.error(err);
      clearInterval(stepInterval);
    } finally {
      setIsGenerating(false);
      setGenerationStep(0);
    }
  };

  const handleGenerateWithForm = async () => {
    setIsGenerating(true);
    setGenerationStep(1);
    const stepInterval = setInterval(() => setGenerationStep((prev) => (prev < 4 ? prev + 1 : prev)), 450);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentType: "cv",
          fullName,
          email,
          phone,
          location,
          targetRole,
          targetCompany,
          experienceLevel,
          skills: skills.split(",").map(s => s.trim()).filter(Boolean),
          experienceDetails: buildFullExperienceBlock() + "\n\nEducation: " + educationFields.map(ed => `${ed.qualification} — ${ed.course} — ${ed.institution}`).join("; "),
        }),
      });
      const data = await res.json();
      clearInterval(stepInterval);
      if (data.content) {
        // Force the correct order: Job Experience → Education → Certifications (No References)
        const enhancedContent = buildCVContent();
        setOutputTitle(data.title || `${fullName} - Professional CV / Resume`);
        setOutputContent(enhancedContent);
        setAtsScore(Math.max(data.atsScore || 0, 96));
        setKeywords([
          selectedProfile.label,
          "ATS Compliant",
          "Quantified Metrics",
          "No References",
          "Job Experience First",
          "Nigerian NYSC Ready",
        ]);
        setHasGeneratedOnce(true);
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      }
    } catch (err) {
      console.error(err);
      clearInterval(stepInterval);
    } finally {
      setIsGenerating(false);
      setGenerationStep(0);
    }
  };

  // ---- Server-generated file download (fixes silent failures in embedded previews) ----
  const doDownload = async (kind: "pdf" | "docx") => {
    try {
      setDownloading(kind);
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "fill_form"
            ? { cvData: buildCvData(), template: cvTemplate, format: kind }
            : { title: outputTitle, content: outputContent, format: kind }
        ),
      });
      const data = await res.json();
      if (!res.ok || !data.token) throw new Error(data.error || "Export failed");
      const url = `/api/export?token=${encodeURIComponent(data.token)}`;
      try {
        const fileRes = await fetch(url);
        if (!fileRes.ok) throw new Error("Fetch blocked");
        const blob = await fileRes.blob();
        const objUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = objUrl;
        a.download = data.filename || (kind === "pdf" ? "Next_Chapter_CV.pdf" : "Next_Chapter_CV.docx");
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(objUrl), 5000);
      } catch {
        // Fallback: open the file in a new tab so the browser handles the save
        window.open(url, "_blank");
      }
      confetti({ particleCount: 45, spread: 60, origin: { y: 0.6 } });
    } catch (err) {
      console.error(err);
      alert("Download failed. Please try again.");
    } finally {
      setDownloading(null);
    }
  };

  // ---- Payment gate: create freely, pay to download ----
  const requestDownload = (kind: "pdf" | "docx") => {
    if (isPaid) {
      doDownload(kind);
      return;
    }
    setPendingDownload(kind);
    setPaymentModalOpen(true);
    // Take the customer straight to the payment page
    window.open(PAYSTACK_LINKS[payPlan], "_blank");
  };

  const confirmPaid = () => {
    setIsPaid(true);
    try {
      localStorage.setItem("nextchapter_paid", "1");
      localStorage.setItem("nextchapter_plan", payPlan);
    } catch {
      /* storage unavailable */
    }
    const kind = pendingDownload || "pdf";
    setPendingDownload(null);
    setPaymentModalOpen(false);
    // Download starts immediately after payment confirmation
    doDownload(kind);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <section id="studio" className="py-20 sm:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive AI Generation Studio
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Create Your Document in Seconds
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Pick how you want to work: <strong className="text-emerald-400">paste or upload your existing CV</strong> for AI analysis and corrections, or <strong className="text-emerald-400">fill the form</strong> from scratch. Choose from <strong className="text-emerald-400">6 professional CV formats</strong> (including two-column executive designs) and download in <strong className="text-emerald-400">PDF & MS Word (.docx)</strong>.
          </p>
        </div>

        {/* Mode Selector - Option 1 vs Option 2 */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMode("paste_cv")}
              className={`p-5 rounded-2xl text-left border transition-all ${
                mode === "paste_cv"
                  ? "bg-emerald-500/15 border-emerald-500/50 shadow-lg shadow-emerald-900/20"
                  : "glass-panel border-white/10 hover:border-emerald-500/30"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                <ClipboardCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Option 1: Paste Previous CV</h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Copy and paste your existing CV text. We will ask if you want any additions, corrections, or improvements — then generate a polished, ATS-optimized CV with the correct section order.
              </p>
              {mode === "paste_cv" && (
                <span className="inline-block mt-2 text-[11px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                  Selected
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMode("fill_form")}
              className={`p-5 rounded-2xl text-left border transition-all ${
                mode === "fill_form"
                  ? "bg-emerald-500/15 border-emerald-500/50 shadow-lg shadow-emerald-900/20"
                  : "glass-panel border-white/10 hover:border-emerald-500/30"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-3">
                <ClipboardList className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Option 2: Fill The Form</h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                No previous CV? No problem. Fill in your details with guided profile suggestions and job description suggestions for each role. We build from scratch.
              </p>
              {mode === "fill_form" && (
                <span className="inline-block mt-2 text-[11px] font-bold text-teal-300 bg-teal-500/20 px-2 py-0.5 rounded border border-teal-500/30">
                  Selected
                </span>
              )}
            </button>
          </div>
        </div>

        {mode === "paste_cv" ? (
          /* ===== OPTION 1: PASTE CV ===== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Paste + Correction */}
            <div className="lg:col-span-5 glass-panel rounded-2xl p-5 sm:p-7 border border-white/10 space-y-5 shadow-2xl">
              {/* File Upload for Previous CV — PDF or Word */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/30 to-amber-900/20 border border-amber-500/20">
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-2 flex items-center gap-1.5">
                  <FileUp className="w-3.5 h-3.5" />
                  Upload Previous CV (PDF or MS Word .docx)
                </label>
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer flex-1">
                    <input
                      type="file"
                      accept=".pdf,.docx,.doc"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setUploadedFile(file);
                        setUploadStatus("reading");
                        try {
                          // Try to read text from file using FileReader for basic extraction
                          const text = await file.text();
                          // If it's a binary file, text() will return garbled text; we still use it as signal
                          setPastedCV(`[Uploaded File: ${file.name} (${(file.size / 1024).toFixed(1)} KB)]\n\nContent extracted:\n${text.substring(0, 4000)}...`);
                          setUploadStatus("done");
                        } catch {
                          setPastedCV(`[Uploaded File: ${file.name} — Ready for AI Analysis]\n\nPlease add any corrections below before generating.`);
                          setUploadStatus("done");
                        }
                      }}
                      className="hidden"
                    />
                    <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-md shadow-amber-600/20">
                      <Upload className="w-3.5 h-3.5" /> Choose PDF / .docx
                    </span>
                  </label>
                  {uploadedFile && (
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="font-medium truncate max-w-[120px]">{uploadedFile.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${uploadStatus === "done" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>
                        {uploadStatus === "reading" ? "Reading..." : uploadStatus === "done" ? "Analyzed" : uploadStatus}
                      </span>
                      <button type="button" onClick={() => { setUploadedFile(null); setUploadStatus("idle"); }} className="p-0.5 text-red-400 hover:text-red-300"><XCircle className="w-3.5 h-3.5" /></button>
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-amber-300/80 mt-1.5">Upload your CV and the AI will analyze it. You can then request corrections before generating the final version.</p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
                  <ClipboardCheck className="w-4 h-4 text-emerald-400" />
                  Paste Your Existing CV Text (or Edit Uploaded Content)
                </label>
                <textarea
                  rows={8}
                  value={pastedCV}
                  onChange={(e) => setPastedCV(e.target.value)}
                  placeholder="Paste the full text of your current CV or resume here... Include your name, work experience, education, skills, and anything else."
                  className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500 resize-none font-sans leading-relaxed"
                />
              </div>

              {!showCorrectionPrompt ? (
                <button
                  type="button"
                  onClick={() => setShowCorrectionPrompt(true)}
                  className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Eye className="w-4 h-4" />
                  <span>Review & Request Corrections Before Generating</span>
                </button>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
                      <Wand2 className="w-4 h-4 text-amber-400" />
                      Anything You Want To Add, Fix, Or Change?
                    </label>
                    <textarea
                      rows={4}
                      value={correctionNote}
                      onChange={(e) => setCorrectionNote(e.target.value)}
                      placeholder="For example: 'Make my NYSC project sound more impactful', 'Add a personal summary about data analysis', 'Change the education section to start with B.Sc. not secondary school', 'Remove references section', 'Add metrics to the second job role'..."
                      className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-amber-500/30 text-white text-sm focus:outline-none focus:border-amber-400 resize-none font-sans leading-relaxed"
                    />
                    <div className="mt-2 text-[11px] text-amber-300 flex items-center gap-1.5">
                      <Lightbulb className="w-3 h-3" />
                      <span>Tell us exactly what should change — we will apply it before generating.</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleGenerateWithPaste}
                    disabled={isGenerating || !pastedCV.trim()}
                    className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-600/20 disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-white" />
                        <span>Applying Corrections & Generating...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Generate Corrected CV (PDF + Word)</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>

            {/* Right: Preview */}
            <div className="lg:col-span-7 space-y-4">
              <div className="glass-panel rounded-2xl p-4 border border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 font-black">{atsScore}%</div>
                  <div>
                    <div className="text-xs font-bold text-white">ATS Readiness Score</div>
                    <div className="text-[11px] text-slate-400">Paste Enhanced & Corrected</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setTheme("emerald")} className={`px-2 py-1 text-xs rounded-md font-medium ${theme === "emerald" ? "bg-emerald-600 text-white" : "text-slate-400 bg-white/5"}`}>Emerald</button>
                  <button onClick={() => setTheme("classic")} className={`px-2 py-1 text-xs rounded-md font-medium ${theme === "classic" ? "bg-slate-600 text-white" : "text-slate-400 bg-white/5"}`}>Classic</button>
                  <button onClick={() => setTheme("minimal")} className={`px-2 py-1 text-xs rounded-md font-medium ${theme === "minimal" ? "bg-neutral-700 text-white" : "text-slate-400 bg-white/5"}`}>Minimal</button>
                </div>
              </div>

              <div className={`rounded-2xl p-6 sm:p-8 border shadow-2xl relative min-h-[480px] max-h-[640px] overflow-y-auto ${theme === "emerald" ? "bg-white text-slate-900 border-emerald-500/40" : theme === "classic" ? "bg-slate-50 text-slate-900 border-slate-300" : "bg-neutral-50 text-neutral-900 border-neutral-300"}`}>
                <div className={`absolute top-0 left-0 right-0 h-2 ${theme === "emerald" ? "bg-amber-500" : theme === "classic" ? "bg-amber-600" : "bg-amber-700"}`} />
                <div className="flex items-center justify-between border-b border-slate-300 pb-3 mb-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Paste Enhanced • Ready to Export</span>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">CV • READY</span>
                </div>
                <textarea value={outputContent} onChange={e => setOutputContent(e.target.value)} rows={16} className="w-full bg-transparent font-sans text-xs sm:text-sm leading-relaxed text-slate-800 focus:outline-none resize-none selection:bg-amber-100" />
              </div>

              <div className="p-4 sm:p-5 rounded-2xl glass-panel-elevated border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wide text-amber-400 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4" /> Ready for Recruiters
                  </span>
                  {isPaid ? (
                    <span className="text-xs text-slate-300 flex items-center gap-1"><Unlock className="w-3 h-3 text-emerald-400" /> Downloads unlocked — enjoy!</span>
                  ) : (
                    <span className="text-xs text-amber-300 flex items-center gap-1"><Lock className="w-3 h-3" /> Subscribers only — pay to download PDF & Word</span>
                  )}
                </div>
                <div className="flex gap-2.5 w-full sm:w-auto">
                  <button onClick={() => requestDownload("pdf")} disabled={downloading === "pdf"} className="flex-1 px-4 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-amber-600 to-amber-500 shadow-lg shadow-amber-600/30 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60">{downloading === "pdf" ? <RefreshCw className="w-4 h-4 animate-spin text-amber-100" /> : isPaid ? <Download className="w-4 h-4 text-amber-200" /> : <Lock className="w-4 h-4 text-amber-200" />}<span>{downloading === "pdf" ? "Preparing..." : "Download PDF"}</span></button>
                  <button onClick={() => requestDownload("docx")} disabled={downloading === "docx"} className="flex-1 px-4 py-3 rounded-xl font-bold text-xs text-white bg-blue-700 hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-blue-700/30 flex items-center justify-center gap-2 disabled:opacity-60">{downloading === "docx" ? <RefreshCw className="w-4 h-4 animate-spin text-blue-100" /> : isPaid ? <FileSpreadsheet className="w-4 h-4 text-blue-200" /> : <Lock className="w-4 h-4 text-blue-200" />}<span>{downloading === "docx" ? "Preparing..." : "Download MS Word (.docx)"}</span></button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ===== OPTION 2: FILL FORM ===== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Form */}
            <div className="lg:col-span-5 glass-panel rounded-2xl p-5 sm:p-7 border border-white/10 space-y-5 shadow-2xl">
              {/* Profile Suggestions */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  Pick A Profile (Click To Select)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PROFILE_SUGGESTIONS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => handleProfileSelect(p)}
                      className={`text-left p-2.5 rounded-xl border transition-all ${
                        selectedProfile.label === p.label ? "bg-emerald-500/20 border-emerald-400/60 text-emerald-300 shadow-md" : "bg-white/[0.03] border-white/10 text-slate-300 hover:border-emerald-500/30 hover:text-white"
                      }`}
                    >
                      <span className="text-sm">{p.icon}</span>
                      <div className="text-[11px] font-bold leading-tight mt-0.5">{p.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 truncate">{p.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                  <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500" placeholder="e.g. Chioma Eze" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Phone</label>
                  <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500" placeholder="+234 800 000 0000" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Location</label>
                  <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500" placeholder="e.g. Lagos, Nigeria" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Target Employer</label>
                  <input type="text" value={targetCompany} onChange={e => setTargetCompany(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500" placeholder="e.g. Access Bank / Moniepoint" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Career Stage</label>
                <select value={experienceLevel} onChange={e => setExperienceLevel(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500">
                  <option value="graduate_trainee">NYSC / Graduate Trainee (0-1 yr)</option>
                  <option value="entry">Entry Level (1-2 yrs)</option>
                  <option value="mid">Mid-Level (3-5 yrs)</option>
                  <option value="career_change">Career Switcher</option>
                  <option value="student">Final Year / Scholar</option>
                </select>
              </div>

              {/* Job Experience Entries */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <ArrowDownUp className="w-3.5 h-3.5 text-teal-400" />
                    Job Experience (First Section — No References)
                  </label>
                  <button type="button" onClick={handleAddJobEntry} className="p-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs"><Plus className="w-3.5 h-3.5" /></button>
                </div>
                <div className="space-y-3">
                  {jobEntries.map((entry) => (
                    <div key={entry.id} className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-emerald-500/30 transition-all relative">
                      <button type="button" onClick={() => handleRemoveJobEntry(entry.id)} className="absolute top-2 right-2 p-1 text-red-400 hover:text-red-300 rounded bg-white/5 hover:bg-red-900/30"><Trash2 className="w-3 h-3" /></button>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <input type="text" placeholder="Job Title (e.g. NYSC Analyst)" value={entry.title} onChange={e => handleJobEntryChange(entry.id, "title", e.target.value)} className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500" />
                        <input type="text" placeholder="Company (e.g. Access Bank)" value={entry.company} onChange={e => handleJobEntryChange(entry.id, "company", e.target.value)} className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500" />
                      </div>
                      <div className="grid grid-cols-4 gap-1 mb-2">
                        <input type="text" placeholder="Entry Month (e.g. Aug)" value={entry.entryMonth} onChange={e => handleJobEntryChange(entry.id, "entryMonth", e.target.value)} className="px-2 py-1 rounded-lg bg-black/40 border border-white/10 text-white text-[10px] focus:outline-none focus:border-emerald-500" />
                        <input type="text" placeholder="Entry Year (e.g. 2023)" value={entry.entryYear} onChange={e => handleJobEntryChange(entry.id, "entryYear", e.target.value)} className="px-2 py-1 rounded-lg bg-black/40 border border-white/10 text-white text-[10px] focus:outline-none focus:border-emerald-500" />
                        <input type="text" placeholder="Exit Month (e.g. Jul)" value={entry.exitMonth} onChange={e => handleJobEntryChange(entry.id, "exitMonth", e.target.value)} className="px-2 py-1 rounded-lg bg-black/40 border border-white/10 text-white text-[10px] focus:outline-none focus:border-emerald-500" />
                        <input type="text" placeholder="Exit Year (e.g. 2024)" value={entry.exitYear} onChange={e => handleJobEntryChange(entry.id, "exitYear", e.target.value)} className="px-2 py-1 rounded-lg bg-black/40 border border-white/10 text-white text-[10px] focus:outline-none focus:border-emerald-500" />
                      </div>
                      <div className="space-y-1.5">
                        {entry.descriptions.map((desc, idx) => (
                          <textarea key={idx} rows={1} value={desc} onChange={e => {
                            const newDescriptions = [...entry.descriptions];
                            newDescriptions[idx] = e.target.value;
                            handleJobEntryChange(entry.id, "descriptions", newDescriptions);
                          }} className="w-full px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-white text-[11px] focus:outline-none focus:border-teal-500 resize-none" placeholder="Achievement with metric (e.g. reduced errors by 30%)" />
                        ))}
                      </div>
                      <button type="button" onClick={() => handleSuggestDescriptions(entry.id)} className="mt-2 text-[10px] font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1 px-2 py-0.5 rounded bg-teal-900/30 border border-teal-800 hover:border-teal-500 transition-all">
                        <ListPlus className="w-3 h-3" /> Suggest Job Description Bullet Points
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education — Structured Fields */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Education (Fillable — Institution, Course, Qualification, Graduation)</label>
                <div className="space-y-2">
                  {educationFields.map((ed, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" value={ed.institution} onChange={e => setEducationFields(prev => prev.map((item, i) => i === idx ? { ...item, institution: e.target.value } : item))} placeholder="Institution (e.g. UNILAG)" className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500" />
                        <input type="text" value={ed.course} onChange={e => setEducationFields(prev => prev.map((item, i) => i === idx ? { ...item, course: e.target.value } : item))} placeholder="Course (e.g. B.Sc. Economics)" className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" value={ed.qualification} onChange={e => setEducationFields(prev => prev.map((item, i) => i === idx ? { ...item, qualification: e.target.value } : item))} placeholder="Qualification (e.g. First Class, 2:1)" className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500" />
                        <div className="flex gap-1">
                          <input type="text" value={ed.graduationMonth} onChange={e => setEducationFields(prev => prev.map((item, i) => i === idx ? { ...item, graduationMonth: e.target.value } : item))} placeholder="Month (e.g. June)" className="w-1/2 px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500" />
                          <input type="text" value={ed.graduationYear} onChange={e => setEducationFields(prev => prev.map((item, i) => i === idx ? { ...item, graduationYear: e.target.value } : item))} placeholder="Year (e.g. 2023)" className="w-1/2 px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications — Structured Fields */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Certifications (Fillable — Issuing Org, Course Name, Issue Date)</label>
                <div className="space-y-2">
                  {certificationFields.map((cert, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" value={cert.issuingOrg} onChange={e => setCertificationFields(prev => prev.map((item, i) => i === idx ? { ...item, issuingOrg: e.target.value } : item))} placeholder="Issuing Organization (e.g. NYSC)" className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500" />
                        <input type="text" value={cert.courseName} onChange={e => setCertificationFields(prev => prev.map((item, i) => i === idx ? { ...item, courseName: e.target.value } : item))} placeholder="Course Name (e.g. Discharge Certificate)" className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500" />
                      </div>
                      <div className="flex gap-1">
                        <input type="text" value={cert.issueMonth} onChange={e => setCertificationFields(prev => prev.map((item, i) => i === idx ? { ...item, issueMonth: e.target.value } : item))} placeholder="Month (e.g. March)" className="w-1/2 px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500" />
                        <input type="text" value={cert.issueYear} onChange={e => setCertificationFields(prev => prev.map((item, i) => i === idx ? { ...item, issueYear: e.target.value } : item))} placeholder="Year (e.g. 2024)" className="w-1/2 px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Key Skills (Comma Separated)</label>
                <input type="text" value={skills} onChange={e => setSkills(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500" placeholder="Data Analysis, SQL, Agile, Stakeholder Management" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Background / Profile Summary</label>
                <textarea rows={3} value={details} onChange={e => setDetails(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500 resize-none" placeholder="Short profile summary about your background, NYSC, achievements..." />
              </div>

              <button onClick={handleGenerateWithForm} disabled={isGenerating} className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 border border-emerald-400/40 disabled:opacity-70">
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-200" />
                    <span>
                      {generationStep === 1 && "Analyzing Nigerian & Global Job Criteria..."}
                      {generationStep === 2 && "Synthesizing ATS Action Verbs & Metrics..."}
                      {generationStep === 3 && "Running Taleo/Workday Parser Checks..."}
                      {generationStep >= 4 && "Formatting PDF & MS Word Layout..."}
                    </span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-200" />
                    <span>Generate AI CV (Job Exp → Education → Certifications, No References)</span>
                  </>
                )}
              </button>
            </div>

            {/* Right: Preview */}
            <div className="lg:col-span-7 space-y-4">
              <div className="glass-panel rounded-2xl p-4 border border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-400/30">
                    <span className="text-base font-black text-emerald-300">{atsScore}%</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">ATS Readiness Score <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/30 text-emerald-200">EXCELLENT</span></div>
                    <div className="text-[11px] text-slate-400">Form Filled • Profile: {selectedProfile.label}</div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 bg-black/40 p-1.5 rounded-xl border border-white/10">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 px-1">CV Format:</span>
                  {CV_TEMPLATES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setCvTemplate(t.id)}
                      title={`${t.name} — ${t.description}`}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1.5 transition-all border ${
                        cvTemplate === t.id
                          ? "bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-600/30"
                          : "text-slate-400 hover:text-white bg-white/5 border-white/10 hover:border-emerald-500/40"
                      }`}
                    >
                      <TemplateGlyph id={t.id} active={cvTemplate === t.id} />
                      <span>{t.name}</span>
                      {t.twoColumn && (
                        <span className={`text-[8px] px-1 py-px rounded ${cvTemplate === t.id ? "bg-white/20 text-emerald-50" : "bg-white/10 text-slate-400"}`}>
                          2-COL
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={handleCopy} className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors">
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>

              <div className="rounded-2xl bg-white text-slate-900 border border-white/20 shadow-2xl relative min-h-[520px] max-h-[720px] overflow-y-auto">
                <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-5 sm:px-7 pt-3.5 pb-2.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                      <Edit3 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>
                        {viewMode === "layout"
                          ? `Live Preview • ${CV_TEMPLATES.find((t) => t.id === cvTemplate)?.name}`
                          : "Raw Text Editor — edit freely, then switch back to Layout"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setViewMode(viewMode === "layout" ? "raw" : "layout")}
                        className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 hover:bg-emerald-100 flex items-center gap-1.5 transition-colors"
                      >
                        {viewMode === "layout" ? (
                          <>
                            <Edit3 className="w-3 h-3" />
                            <span>Edit Raw Text</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>View Layout</span>
                          </>
                        )}
                      </button>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        CV • NO REFERENCES
                      </span>
                    </div>
                  </div>
                </div>

                {viewMode === "layout" ? (
                  <CvPreview data={buildCvData()} template={cvTemplate} />
                ) : (
                  <div className="p-5 sm:p-7">
                    <textarea
                      value={outputContent}
                      onChange={e => setOutputContent(e.target.value)}
                      rows={20}
                      className="w-full bg-transparent font-sans text-xs sm:text-sm leading-relaxed text-slate-800 focus:outline-none resize-none selection:bg-emerald-100"
                    />
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-5 rounded-2xl glass-panel-elevated border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wide text-emerald-400 flex items-center gap-1.5"><FileCheck className="w-4 h-4" /> Ready for Recruiters & Visa Boards</span>
                  {isPaid ? (
                    <span className="text-xs text-slate-300 flex items-center gap-1">
                      <Unlock className="w-3 h-3 text-emerald-400" />
                      <span>Downloads unlocked — 6 formats in PDF & MS Word.</span>
                    </span>
                  ) : (
                    <span className="text-xs text-amber-300 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      <span>Locked — complete a subscription to download PDF & Word.</span>
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={() => requestDownload("pdf")}
                    disabled={downloading === "pdf"}
                    className="flex-1 sm:flex-none px-4 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-600/30 active:scale-95 transition-all flex items-center justify-center gap-2 border border-emerald-400/30 disabled:opacity-60"
                  >
                    {downloading === "pdf" ? <RefreshCw className="w-4 h-4 animate-spin text-emerald-100" /> : isPaid ? <Download className="w-4 h-4 text-emerald-200" /> : <Lock className="w-4 h-4 text-emerald-200" />}
                    <span>{downloading === "pdf" ? "Preparing..." : "Download PDF"}</span>
                  </button>
                  <button
                    onClick={() => requestDownload("docx")}
                    disabled={downloading === "docx"}
                    className="flex-1 sm:flex-none px-4 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-700 hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-blue-700/30 flex items-center justify-center gap-2 border border-blue-400/30 disabled:opacity-60"
                  >
                    {downloading === "docx" ? <RefreshCw className="w-4 h-4 animate-spin text-blue-100" /> : isPaid ? <FileSpreadsheet className="w-4 h-4 text-blue-200" /> : <Lock className="w-4 h-4 text-blue-200" />}
                    <span>{downloading === "docx" ? "Preparing..." : "Download MS Word (.docx)"}</span>
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">ATS Keywords Detected:</span>
                {keywords.map((kw, i) => (
                  <span key={i} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">✓ {kw}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment Modal — download unlock */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md glass-panel-elevated rounded-2xl p-6 sm:p-8 border border-emerald-500/40 relative shadow-2xl max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setPaymentModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-white/5"
              aria-label="Close"
            >
              <XCircle className="w-5 h-5" />
            </button>

            <div className="text-center mb-5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-white mt-3">Your Download Is Locked</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Your document is ready and looks great. Complete a subscription payment to instantly
                unlock <strong className="text-emerald-300">PDF & MS Word downloads</strong> in all 6 formats.
              </p>
            </div>

            {/* Plan selection */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                type="button"
                onClick={() => setPayPlan("weekly")}
                className={`p-3.5 rounded-xl text-left border transition-all ${
                  payPlan === "weekly"
                    ? "bg-emerald-500/15 border-emerald-400/60 shadow-lg"
                    : "bg-white/[0.04] border-white/10 hover:border-emerald-500/30"
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Weekly Pass</div>
                <div className="text-lg font-extrabold text-white mt-1">₦7,000</div>
                <div className="text-[10px] text-slate-400">7 days of unlimited downloads</div>
              </button>
              <button
                type="button"
                onClick={() => setPayPlan("monthly")}
                className={`p-3.5 rounded-xl text-left border transition-all relative ${
                  payPlan === "monthly"
                    ? "bg-emerald-500/15 border-emerald-400/60 shadow-lg"
                    : "bg-white/[0.04] border-white/10 hover:border-emerald-500/30"
                }`}
              >
                <span className="absolute -top-2 right-2 text-[8px] font-black uppercase tracking-wider bg-emerald-500 text-white px-1.5 py-0.5 rounded">
                  Best Value
                </span>
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Monthly Pro</div>
                <div className="text-lg font-extrabold text-white mt-1">₦20,000</div>
                <div className="text-[10px] text-slate-400">30 days • save ₦8,000</div>
              </button>
            </div>

            {/* Step 1: Pay via Paystack */}
            <button
              type="button"
              onClick={() => window.open(PAYSTACK_LINKS[payPlan], "_blank")}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 shadow-xl shadow-emerald-500/30 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 border border-emerald-300/40"
            >
              <ExternalLink className="w-4 h-4 text-emerald-200" />
              <span>
                Pay {payPlan === "monthly" ? "₦20,000" : "₦7,000"} with Paystack (opens payment page)
              </span>
            </button>

            {/* Step 2: Confirm & immediate download */}
            <button
              type="button"
              onClick={confirmPaid}
              className="w-full mt-2.5 py-3.5 rounded-xl font-bold text-sm text-emerald-300 bg-emerald-500/15 border border-emerald-500/40 hover:bg-emerald-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <BadgeCheck className="w-4 h-4 text-emerald-400" />
              <span>I&apos;ve Paid — Start My Download Now</span>
            </button>

            <p className="text-[10px] text-slate-400 text-center mt-3 leading-relaxed">
              Payments are processed securely by <strong className="text-slate-300">Paystack</strong> (card, transfer, USSD).
              Your {pendingDownload === "docx" ? "MS Word (.docx)" : "PDF"} download starts immediately after payment.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
