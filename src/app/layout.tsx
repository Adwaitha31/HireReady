import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "HireReady — Know Your Interview Readiness in 2 Minutes",
  description:
    "AI-powered interview readiness assessment. Get your personalized score across Technical Skills, Resume, Communication & Portfolio — with an actionable improvement roadmap.",
  keywords: [
    "interview readiness",
    "career assessment",
    "resume analysis",
    "job preparation",
    "AI career coach",
  ],
  openGraph: {
    title: "HireReady — AI Interview Readiness Score",
    description:
      "Get your interview readiness score in under 2 minutes. Free AI-powered assessment.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
