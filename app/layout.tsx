import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Next Chapter | AI CV, Cover Letter & Personal Statement Studio for Nigerian Youth",
  description:
    "Land high-paying jobs in Nigeria, UK, US, and Canada. Create ATS-beating CVs, targeted Cover Letters, and winning Personal Statements ready to download as PDF or MS Word (.docx). Plans start at ₦7,000/week and ₦20,000/month.",
  keywords: [
    "Nigerian CV builder",
    "Next Chapter AI",
    "ATS resume Nigeria",
    "Cover letter generator Lagos",
    "Chevening personal statement AI",
    "NYSC graduate trainee CV",
    "Tech resume builder Nigeria",
    "MS Word CV download",
    "PDF CV maker",
  ],
  authors: [{ name: "Next Chapter Career Technologies" }],
  openGraph: {
    title: "Next Chapter - Your Next Career Breakthrough Starts Here",
    description:
      "Craft ATS-optimized CVs, Cover Letters, and Personal Statements in 60 seconds. Download in PDF or MS Word.",
    url: "https://nextchapter.ng",
    siteName: "Next Chapter",
    locale: "en_NG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#060a11] text-slate-100 antialiased selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
