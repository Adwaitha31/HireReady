// ─── Assessment Types ────────────────────────────────────────────────────────

export type Domain =
  | "tech"
  | "design"
  | "marketing"
  | "management"
  | "finance"
  | "data-science"
  | "product"
  | "law"
  | "healthcare"
  | "other";

export interface PortfolioData {
  type: "github" | "url" | "none";
  username?: string;
  publicRepos?: number;
  followers?: number;
  totalStars?: number;
  topLanguages?: string[];
  topRepos?: { name: string; stars: number; language: string; description: string }[];
  bio?: string;
  isLive?: boolean;
  domain?: string;
  summary: string;
}

export interface UserProfile {
  name: string;
  targetRole: string;
  domain: Domain;
  experienceLevel: "fresher" | "0-1" | "1-3" | "3-5" | "5+";
  resumeText: string;
  portfolioData?: PortfolioData;
  // Skills (domain-specific)
  primarySkills: string[];
  // Technical / Domain-specific
  domainProficiency: "none" | "basic" | "intermediate" | "advanced";
  hasCertifications: boolean;
  // Communication
  hasSpokenEnglish: boolean;
  presentationComfort: 1 | 2 | 3 | 4 | 5;
  hasGivenMockInterview: boolean;
  // Portfolio
  portfolioUrl: string;
  hasLiveProjects: boolean;
  projectCount: number;
  hasBlog: boolean;
  // Resume quick fields
  hasQuantifiedAchievements: boolean;
  resumeLastUpdated: "this-week" | "this-month" | "3-6months" | "6plus";
}

export interface DimensionScore {
  name: string;
  score: number;
  grade: "A" | "B" | "C" | "D" | "F";
  icon: string;
  color: string;
  strengths: string[];
  gaps: string[];
  topAction: string;
}

export interface WeeklyAction {
  day: string;
  task: string;
  duration: string;
  category: "technical" | "resume" | "communication" | "portfolio";
  priority: "high" | "medium" | "low";
  resource?: string;
}

export interface Archetype {
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  color: string;
}

export interface AssessmentResult {
  overallScore: number;
  grade: "A" | "B" | "C" | "D" | "F";
  level: "Expert" | "Interview-Ready" | "Almost Ready" | "Needs Work" | "Beginner";
  tagline: string;
  archetype: Archetype;
  dimensions: {
    technical: DimensionScore;
    resume: DimensionScore;
    communication: DimensionScore;
    portfolio: DimensionScore;
  };
  weeklyPlan: WeeklyAction[];
  topPriority: string;
  estimatedReadyInDays: number;
  resumeInsights: string[];
  hiddenStrengths: string[];
}

export type AssessmentStep =
  | "landing"
  | "upload"
  | "form-basic"
  | "form-technical"
  | "form-communication"
  | "form-portfolio"
  | "analyzing"
  | "results";

// ─── Domain Config ────────────────────────────────────────────────────────────

export const DOMAIN_CONFIG: Record<
  Domain,
  {
    label: string;
    icon: string;
    technicalLabel: string;
    proficiencyLabel: string;
    proficiencyOptions: { value: string; label: string }[];
    suggestedSkills: string[];
    portfolioLabel: string;
    portfolioPlaceholder: string;
  }
> = {
  tech: {
    label: "Software / IT",
    icon: "💻",
    technicalLabel: "Coding & Technical Skills",
    proficiencyLabel: "DSA & Problem Solving",
    proficiencyOptions: [
      { value: "none", label: "🔴 Not started yet" },
      { value: "basic", label: "🟡 Basic — Arrays, Strings, Recursion" },
      { value: "intermediate", label: "🟠 Intermediate — Trees, Graphs, DP" },
      { value: "advanced", label: "🟢 Advanced — Competitive Level (300+ LeetCode)" },
    ],
    suggestedSkills: ["React", "Node.js", "Python", "Java", "C++", "SQL", "AWS", "TypeScript", "MongoDB", "Docker"],
    portfolioLabel: "GitHub / Project Links",
    portfolioPlaceholder: "https://github.com/username",
  },
  design: {
    label: "Design / UX",
    icon: "🎨",
    technicalLabel: "Design Skills & Tools",
    proficiencyLabel: "Design Proficiency",
    proficiencyOptions: [
      { value: "none", label: "🔴 Just getting started" },
      { value: "basic", label: "🟡 Basic — Wireframes, Canva" },
      { value: "intermediate", label: "🟠 Intermediate — Figma, user flows, prototyping" },
      { value: "advanced", label: "🟢 Advanced — Full design systems, user research" },
    ],
    suggestedSkills: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Prototyping", "User Research", "Wireframing", "Canva", "After Effects", "Sketch"],
    portfolioLabel: "Portfolio / Behance / Dribbble",
    portfolioPlaceholder: "https://behance.net/username",
  },
  marketing: {
    label: "Marketing",
    icon: "📣",
    technicalLabel: "Marketing Skills & Tools",
    proficiencyLabel: "Marketing Proficiency",
    proficiencyOptions: [
      { value: "none", label: "🔴 Just getting started" },
      { value: "basic", label: "🟡 Basic — Social media, content writing" },
      { value: "intermediate", label: "🟠 Intermediate — SEO, paid ads, analytics" },
      { value: "advanced", label: "🟢 Advanced — Full funnel, campaign management" },
    ],
    suggestedSkills: ["SEO", "Google Ads", "Meta Ads", "Content Writing", "Email Marketing", "HubSpot", "Analytics", "Copywriting", "Social Media", "CRM"],
    portfolioLabel: "Portfolio / LinkedIn / Blog",
    portfolioPlaceholder: "https://linkedin.com/in/username",
  },
  management: {
    label: "Management / MBA",
    icon: "📊",
    technicalLabel: "Business & Management Skills",
    proficiencyLabel: "Business Proficiency",
    proficiencyOptions: [
      { value: "none", label: "🔴 Just getting started" },
      { value: "basic", label: "🟡 Basic — Team coordination, MS Office" },
      { value: "intermediate", label: "🟠 Intermediate — Project management, strategy" },
      { value: "advanced", label: "🟢 Advanced — P&L ownership, leadership roles" },
    ],
    suggestedSkills: ["Project Management", "Excel", "PowerPoint", "Leadership", "Agile/Scrum", "Strategy", "Finance Basics", "Negotiation", "Operations", "CRM"],
    portfolioLabel: "LinkedIn / Case Studies",
    portfolioPlaceholder: "https://linkedin.com/in/username",
  },
  finance: {
    label: "Finance / Banking",
    icon: "💰",
    technicalLabel: "Finance & Analytical Skills",
    proficiencyLabel: "Finance Proficiency",
    proficiencyOptions: [
      { value: "none", label: "🔴 Just getting started" },
      { value: "basic", label: "🟡 Basic — Accounting, Excel" },
      { value: "intermediate", label: "🟠 Intermediate — Financial modelling, valuations" },
      { value: "advanced", label: "🟢 Advanced — CFA/CA level, investment analysis" },
    ],
    suggestedSkills: ["Financial Modelling", "Excel", "Valuation", "Accounting", "Bloomberg", "SQL", "Python", "Risk Analysis", "DCF", "Investment Banking"],
    portfolioLabel: "LinkedIn / Research Reports",
    portfolioPlaceholder: "https://linkedin.com/in/username",
  },
  "data-science": {
    label: "Data Science / AI",
    icon: "📈",
    technicalLabel: "Data & ML Skills",
    proficiencyLabel: "Data Proficiency",
    proficiencyOptions: [
      { value: "none", label: "🔴 Just getting started" },
      { value: "basic", label: "🟡 Basic — Python, statistics, Excel" },
      { value: "intermediate", label: "🟠 Intermediate — ML models, SQL, visualization" },
      { value: "advanced", label: "🟢 Advanced — Deep learning, production ML systems" },
    ],
    suggestedSkills: ["Python", "SQL", "TensorFlow", "PyTorch", "Pandas", "Scikit-learn", "Tableau", "R", "Spark", "NLP"],
    portfolioLabel: "Kaggle / GitHub / Research",
    portfolioPlaceholder: "https://kaggle.com/username",
  },
  product: {
    label: "Product Management",
    icon: "🚀",
    technicalLabel: "Product & Strategy Skills",
    proficiencyLabel: "PM Proficiency",
    proficiencyOptions: [
      { value: "none", label: "🔴 Just getting started" },
      { value: "basic", label: "🟡 Basic — User stories, roadmaps" },
      { value: "intermediate", label: "🟠 Intermediate — PRDs, metrics, A/B testing" },
      { value: "advanced", label: "🟢 Advanced — Full product lifecycle, go-to-market" },
    ],
    suggestedSkills: ["Product Strategy", "User Research", "JIRA", "Analytics", "A/B Testing", "Roadmapping", "SQL", "Wireframing", "OKRs", "Agile"],
    portfolioLabel: "LinkedIn / Case Studies",
    portfolioPlaceholder: "https://linkedin.com/in/username",
  },
  law: {
    label: "Law / Legal",
    icon: "⚖️",
    technicalLabel: "Legal Skills & Knowledge",
    proficiencyLabel: "Legal Proficiency",
    proficiencyOptions: [
      { value: "none", label: "🔴 Just getting started" },
      { value: "basic", label: "🟡 Basic — Contract drafting, legal research" },
      { value: "intermediate", label: "🟠 Intermediate — Litigation, corporate law" },
      { value: "advanced", label: "🟢 Advanced — Specialized practice, client management" },
    ],
    suggestedSkills: ["Contract Drafting", "Legal Research", "Litigation", "Corporate Law", "IPR", "Negotiation", "Due Diligence", "Compliance", "M&A", "Westlaw"],
    portfolioLabel: "LinkedIn / Published Work",
    portfolioPlaceholder: "https://linkedin.com/in/username",
  },
  healthcare: {
    label: "Healthcare / Medical",
    icon: "🏥",
    technicalLabel: "Clinical & Healthcare Skills",
    proficiencyLabel: "Healthcare Proficiency",
    proficiencyOptions: [
      { value: "none", label: "🔴 Just getting started" },
      { value: "basic", label: "🟡 Basic — Clinical knowledge, patient interaction" },
      { value: "intermediate", label: "🟠 Intermediate — Specialized clinical skills" },
      { value: "advanced", label: "🟢 Advanced — Research, specialized practice" },
    ],
    suggestedSkills: ["Patient Care", "Clinical Research", "Medical Writing", "EMR Systems", "Healthcare Management", "Pharmacology", "Data Analysis", "Public Health", "Telemedicine", "Compliance"],
    portfolioLabel: "LinkedIn / Research Papers",
    portfolioPlaceholder: "https://linkedin.com/in/username",
  },
  other: {
    label: "Other Field",
    icon: "🌐",
    technicalLabel: "Domain-Specific Skills",
    proficiencyLabel: "Domain Proficiency",
    proficiencyOptions: [
      { value: "none", label: "🔴 Just getting started" },
      { value: "basic", label: "🟡 Basic foundation" },
      { value: "intermediate", label: "🟠 Intermediate level" },
      { value: "advanced", label: "🟢 Advanced / Expert level" },
    ],
    suggestedSkills: ["Communication", "Leadership", "MS Office", "Problem Solving", "Research", "Teamwork", "Time Management", "Presentation", "Networking", "Writing"],
    portfolioLabel: "LinkedIn / Portfolio",
    portfolioPlaceholder: "https://linkedin.com/in/username",
  },
};
