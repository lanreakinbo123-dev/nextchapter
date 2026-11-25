export type CvTemplateId = "sidebar" | "navy" | "serif" | "banded" | "clean" | "compact";

export interface CvExperience {
  title: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface CvEducation {
  institution: string;
  course: string;
  qualification: string;
  period: string;
}

export interface CvCertification {
  org: string;
  name: string;
  period: string;
}

export interface CvData {
  fullName: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  website: string;
  profile: string;
  skills: string[];
  experience: CvExperience[];
  education: CvEducation[];
  certifications: CvCertification[];
}

export interface CvTemplateMeta {
  id: CvTemplateId;
  name: string;
  description: string;
  twoColumn: boolean;
}

export const CV_TEMPLATES: CvTemplateMeta[] = [
  {
    id: "sidebar",
    name: "Executive Sidebar",
    description: "Two-column with a light gray sidebar holding contact, skills, education & certifications.",
    twoColumn: true,
  },
  {
    id: "navy",
    name: "Navy Header",
    description: "Two-column with a deep navy header band and gold contact accents.",
    twoColumn: true,
  },
  {
    id: "serif",
    name: "Modern Serif",
    description: "Two-column with an elegant centered serif name and classic type.",
    twoColumn: true,
  },
  {
    id: "banded",
    name: "Banded Sections",
    description: "Full-width gray section bands with a two-column experience grid.",
    twoColumn: true,
  },
  {
    id: "clean",
    name: "Clean One-Page",
    description: "Classic single-column ATS layout with generous whitespace.",
    twoColumn: false,
  },
  {
    id: "compact",
    name: "Accent Compact",
    description: "Single-column with an emerald accent bar and tight spacing.",
    twoColumn: false,
  },
];
