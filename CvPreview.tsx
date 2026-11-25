"use client";

import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { CvData, CvTemplateId } from "@/lib/cv-templates";

interface Props {
  data: CvData;
  template: CvTemplateId;
}

const contactRows = (d: CvData) =>
  [
    { icon: Phone, text: d.phone },
    { icon: Mail, text: d.email },
    { icon: Globe, text: d.website },
    { icon: MapPin, text: d.location },
  ].filter((r) => r.text);

const SideHead = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[10px] font-bold tracking-[0.28em] text-slate-500 uppercase mb-1.5">{children}</div>
);

const MainHead = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[11px] font-bold tracking-[0.28em] text-slate-600 uppercase mb-2">{children}</div>
);

const Band = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-slate-100 text-slate-600 text-[10px] font-bold tracking-[0.28em] uppercase px-3 py-1.5 mb-2.5 mt-4 first:mt-0">
    {children}
  </div>
);

const CleanSection = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4 mb-2">
    <h3 className="text-[10px] font-bold tracking-[0.24em] text-slate-700 uppercase">{children}</h3>
    <div className="h-0.5 w-9 bg-emerald-600 mt-1" />
  </div>
);

const CompactHead = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-1.5 mt-3 mb-1.5">
    <span className="h-1.5 w-1.5 bg-emerald-500" />
    <h3 className="text-[9.5px] font-bold tracking-[0.2em] text-slate-700 uppercase">{children}</h3>
  </div>
);

function SidebarT({ d }: { d: CvData }) {
  return (
    <div className="font-sans text-slate-800">
      <div className="pt-8 pb-4 text-center px-6">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-[0.3em] text-slate-700 uppercase">{d.fullName}</h1>
        <p className="mt-2 text-[11px] tracking-[0.35em] text-slate-400 uppercase">{d.title}</p>
      </div>
      <div className="mx-4 border-t border-slate-300" />
      <div className="grid grid-cols-[34%_66%] min-h-[420px]">
        <div className="bg-slate-50 p-5 text-[10.5px] leading-relaxed">
          <SideHead>Contact</SideHead>
          {contactRows(d).map((r, i) => (
            <div key={i} className="flex items-center gap-2 py-0.5">
              <r.icon className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{r.text}</span>
            </div>
          ))}
          <div className="border-b border-dashed border-slate-300 my-3" />
          <SideHead>Skills</SideHead>
          <ul className="space-y-1">{d.skills.map((s, i) => <li key={i}>{s}</li>)}</ul>
          <div className="border-b border-dashed border-slate-300 my-3" />
          <SideHead>Education</SideHead>
          {d.education.map((e, i) => (
            <div key={i} className="mb-2.5">
              <div className="font-bold">{e.course}</div>
              <div className="font-semibold text-slate-700">{e.institution}</div>
              <div className="text-slate-500">{e.period}</div>
              {e.qualification && <div className="text-slate-600">{e.qualification}</div>}
            </div>
          ))}
          <div className="border-b border-dashed border-slate-300 my-3" />
          <SideHead>Certifications</SideHead>
          {d.certifications.map((c, i) => (
            <div key={i} className="mb-2">
              <div className="font-bold">{c.name}</div>
              <div className="text-slate-600">{c.org}</div>
              <div className="text-slate-500">{c.period}</div>
            </div>
          ))}
        </div>
        <div className="p-5 text-[11px] leading-relaxed border-l border-slate-200">
          <MainHead>Profile</MainHead>
          <p className="mb-4">{d.profile}</p>
          <div className="border-b border-dashed border-slate-300 mb-3" />
          <MainHead>Work Experience</MainHead>
          {d.experience.map((j, i) => (
            <div key={i} className="mb-4">
              <h4 className="font-bold text-slate-900 text-[12px]">{j.title}</h4>
              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                <span>{j.company}</span>
                <span>{j.period}</span>
              </div>
              <ul className="space-y-1 pl-4 list-disc text-slate-700">
                {j.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NavyT({ d }: { d: CvData }) {
  return (
    <div className="font-sans text-slate-800">
      <div className="bg-[#17304C] text-center py-7 px-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-[0.25em] text-white uppercase">{d.fullName}</h1>
        <p className="mt-2 text-[11px] tracking-[0.3em] text-[#D9B45B] uppercase">{d.title}</p>
      </div>
      <div className="grid grid-cols-[33%_67%] min-h-[420px]">
        <div className="p-5 text-[10.5px] leading-relaxed">
          <SideHead>Contact</SideHead>
          {contactRows(d).map((r, i) => (
            <div key={i} className="flex items-center gap-2 py-0.5">
              <span className="w-4 h-4 rounded-full bg-[#D9B45B]/25 text-[#8a6d2f] flex items-center justify-center shrink-0">
                <r.icon className="w-2.5 h-2.5" />
              </span>
              <span>{r.text}</span>
            </div>
          ))}
          <div className="mt-4" />
          <SideHead>Skills</SideHead>
          <ul className="space-y-1.5">{d.skills.map((s, i) => <li key={i}>{s}</li>)}</ul>
          <div className="mt-4" />
          <SideHead>Education</SideHead>
          {d.education.map((e, i) => (
            <div key={i} className="mb-2">
              <div className="font-bold">{e.qualification || e.course}</div>
              <div className="text-slate-600">{e.institution}</div>
              <div className="text-slate-500">{e.period}</div>
            </div>
          ))}
          <div className="mt-4" />
          <SideHead>Certifications</SideHead>
          {d.certifications.map((c, i) => (
            <div key={i} className="mb-2">
              <div className="font-bold">{c.name}</div>
              <div className="text-slate-600">{c.org}</div>
              <div className="text-slate-500">{c.period}</div>
            </div>
          ))}
        </div>
        <div className="p-5 text-[11px] leading-relaxed border-l border-slate-200">
          <MainHead>Summary</MainHead>
          <p className="mb-4">{d.profile}</p>
          <MainHead>Professional Experience</MainHead>
          {d.experience.map((j, i) => (
            <div key={i} className="mb-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-[12px]">{j.title}</h4>
                <span className="text-[10px] text-slate-500">{j.period}</span>
              </div>
              <div className="text-[10px] italic text-slate-500 mb-1">{j.company}</div>
              <ul className="space-y-1 pl-4 list-disc text-slate-700">
                {j.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SerifT({ d }: { d: CvData }) {
  const SerifHead = ({ children }: { children: React.ReactNode }) => (
    <div className="font-serif text-[11px] font-bold tracking-[0.3em] text-slate-700 uppercase mb-2 mt-4 first:mt-0">
      {children}
    </div>
  );
  return (
    <div className="text-slate-800">
      <div className="pt-8 pb-4 text-center px-6">
        <h1 className="font-serif text-3xl sm:text-4xl tracking-[0.25em] text-slate-900">{d.fullName.toUpperCase()}</h1>
      </div>
      <div className="mx-6 border-b border-slate-300 mb-5" />
      <div className="grid grid-cols-2 gap-8 px-6 min-h-[420px] text-[10.5px] leading-relaxed">
        <div>
          <SerifHead>Contact</SerifHead>
          {contactRows(d).map((r, i) => (
            <div key={i} className="flex items-center gap-2 py-0.5">
              <r.icon className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{r.text}</span>
            </div>
          ))}
          <SerifHead>Education</SerifHead>
          {d.education.map((e, i) => (
            <div key={i} className="mb-2.5">
              <div className="font-bold uppercase text-slate-800">{e.institution}</div>
              <div>{e.course}</div>
              <div className="text-slate-500">{e.period}</div>
              {e.qualification && <div className="text-slate-600">{e.qualification}</div>}
            </div>
          ))}
          <SerifHead>Skills</SerifHead>
          {d.skills.map((s, i) => (
            <div key={i} className="flex items-center gap-2 py-0.5">
              <span className="text-slate-400">→</span>
              <span>{s}</span>
            </div>
          ))}
          <SerifHead>Certification</SerifHead>
          {d.certifications.map((c, i) => (
            <div key={i} className="mb-2">
              <div className="font-bold">{c.name}</div>
              <div className="text-slate-600">{c.org}</div>
              <div className="text-slate-500">{c.period}</div>
            </div>
          ))}
        </div>
        <div>
          <SerifHead>About Me</SerifHead>
          <p>{d.profile}</p>
          <SerifHead>Work Experience</SerifHead>
          {d.experience.map((j, i) => (
            <div key={i} className="mb-4">
              <h4 className="font-bold uppercase text-slate-900 text-[11px]">{j.title}</h4>
              <div className="text-slate-500 text-[10px] mb-1">{j.company} ({j.period})</div>
              <ul className="space-y-1 pl-4 list-disc text-slate-700">
                {j.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BandedT({ d }: { d: CvData }) {
  const leftJobs = d.experience.filter((_, i) => i % 2 === 0);
  const rightJobs = d.experience.filter((_, i) => i % 2 === 1);
  const jobBlock = (j: CvData["experience"][number], key: number) => (
    <div key={key} className="mb-4">
      <h4 className="font-bold text-slate-900 text-[11px]">{j.title}</h4>
      <div className="flex items-center justify-between mb-0.5">
        <span className="text-[10px] text-slate-600">{j.company}</span>
        <span className="text-[9px] font-bold text-slate-500">{j.period}</span>
      </div>
      <ul className="space-y-0.5 pl-3.5 list-disc text-slate-700 text-[9.5px] leading-relaxed">
        {j.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
      </ul>
    </div>
  );
  return (
    <div className="font-sans text-slate-800 px-6 py-7">
      <h1 className="text-center text-2xl sm:text-3xl font-light tracking-[0.3em] text-slate-600 uppercase">{d.fullName}</h1>
      <p className="text-center text-[10px] tracking-[0.3em] text-slate-400 uppercase mt-1.5">{d.title}</p>

      <Band>Contact Info</Band>
      <div className="grid grid-cols-2 gap-2 text-[10.5px] mb-1">
        {contactRows(d).map((r, i) => (
          <div key={i} className="flex items-center gap-2">
            <r.icon className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>{r.text}</span>
          </div>
        ))}
      </div>

      <Band>Profile</Band>
      <p className="text-[10.5px] leading-relaxed">{d.profile}</p>

      <Band>Experience</Band>
      <div className="grid grid-cols-2 gap-6">
        <div>{leftJobs.map(jobBlock)}</div>
        <div>{rightJobs.map(jobBlock)}</div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <div>
          <Band>Education</Band>
          {d.education.map((e, i) => (
            <div key={i} className="mb-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[10.5px] text-slate-800">{e.qualification} — {e.course}</span>
                <span className="text-[9px] font-bold text-slate-500">{e.period}</span>
              </div>
              <div className="text-[10px] text-slate-600">{e.institution}</div>
            </div>
          ))}
        </div>
        <div>
          <Band>Skill</Band>
          <ul className="space-y-1 text-[10px]">
            {d.skills.map((s, i) => (
              <li key={i} className="flex gap-1.5">
                <span className="text-slate-400">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function CleanT({ d }: { d: CvData }) {
  return (
    <div className="font-sans text-slate-800 px-7 py-7">
      <div className="flex items-end justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{d.fullName}</h1>
          <p className="text-[11px] font-semibold text-emerald-700 tracking-wide uppercase mt-0.5">{d.title}</p>
        </div>
        <div className="text-[10px] text-slate-500 text-right leading-relaxed">
          <div>{d.phone}</div>
          <div>{d.email}</div>
          <div>{d.location}</div>
        </div>
      </div>
      <div className="h-px bg-slate-200 my-4" />

      <CleanSection>Profile</CleanSection>
      <p className="text-[10.5px] leading-relaxed">{d.profile}</p>

      <CleanSection>Core Skills</CleanSection>
      <ul className="columns-2 gap-6 text-[10.5px] list-disc pl-4 space-y-0.5">
        {d.skills.map((s, i) => <li key={i}>{s}</li>)}
      </ul>

      <CleanSection>Work Experience</CleanSection>
      {d.experience.map((j, i) => (
        <div key={i} className="mb-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 text-[11.5px]">{j.title}</h4>
            <span className="text-[9.5px] font-bold text-slate-400">{j.period}</span>
          </div>
          <div className="text-[10px] text-slate-500 mb-1">{j.company}</div>
          <ul className="space-y-0.5 pl-4 list-disc text-[10.5px] text-slate-700">
            {j.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
          </ul>
        </div>
      ))}

      <CleanSection>Education</CleanSection>
      {d.education.map((e, i) => (
        <div key={i} className="mb-2.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[11px] text-slate-900">{e.qualification} — {e.course}</span>
            <span className="text-[9.5px] font-bold text-slate-400">{e.period}</span>
          </div>
          <div className="text-[10.5px] text-slate-600">{e.institution}</div>
        </div>
      ))}

      <CleanSection>Certifications</CleanSection>
      {d.certifications.map((c, i) => (
        <div key={i} className="flex items-center justify-between text-[10.5px] mb-1">
          <span><span className="font-semibold text-slate-800">{c.name}</span> — {c.org}</span>
          <span className="text-slate-500">{c.period}</span>
        </div>
      ))}
    </div>
  );
}

function CompactT({ d }: { d: CvData }) {
  return (
    <div className="font-sans text-slate-800">
      <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600" />
      <div className="px-6 py-4">
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900">{d.fullName}</h1>
        <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-[0.22em]">{d.title}</p>
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {contactRows(d).map((r, i) => (
            <span key={i} className="inline-flex items-center gap-1 bg-slate-100 rounded px-2 py-0.5 text-[9.5px] text-slate-600">
              <r.icon className="w-2.5 h-2.5" />
              {r.text}
            </span>
          ))}
        </div>

        <CompactHead>Profile</CompactHead>
        <p className="text-[10px] leading-relaxed">{d.profile}</p>

        <CompactHead>Core Skills</CompactHead>
        <ul className="text-[10px] grid grid-cols-2 gap-x-4 gap-y-0.5">
          {d.skills.map((s, i) => (
            <li key={i} className="flex gap-1.5">
              <span className="text-emerald-600">▪</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>

        <CompactHead>Work Experience</CompactHead>
        {d.experience.map((j, i) => (
          <div key={i} className="mb-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-[11px]">{j.title}</h4>
              <span className="text-[9px] font-bold text-slate-400">{j.period}</span>
            </div>
            <div className="text-[9.5px] text-slate-500 mb-0.5">{j.company}</div>
            <ul className="space-y-0.5 pl-3.5 list-disc text-[9.5px] text-slate-700">
              {j.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
            </ul>
          </div>
        ))}

        <CompactHead>Education</CompactHead>
        {d.education.map((e, i) => (
          <div key={i} className="flex items-center justify-between text-[10px] mb-1">
            <span><span className="font-semibold text-slate-800">{e.qualification} — {e.course}</span>, {e.institution}</span>
            <span className="text-slate-500">{e.period}</span>
          </div>
        ))}

        <CompactHead>Certifications</CompactHead>
        {d.certifications.map((c, i) => (
          <div key={i} className="flex items-center justify-between text-[10px] mb-1">
            <span><span className="font-semibold text-slate-800">{c.name}</span>, {c.org}</span>
            <span className="text-slate-500">{c.period}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CvPreview({ data, template }: Props) {
  switch (template) {
    case "sidebar":
      return <SidebarT d={data} />;
    case "navy":
      return <NavyT d={data} />;
    case "serif":
      return <SerifT d={data} />;
    case "banded":
      return <BandedT d={data} />;
    case "clean":
      return <CleanT d={data} />;
    case "compact":
      return <CompactT d={data} />;
  }
}
