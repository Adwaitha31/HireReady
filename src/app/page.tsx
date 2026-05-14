"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Landing from "@/components/Landing";
import ResumeUpload from "@/components/ResumeUpload";
import AssessmentForm from "@/components/AssessmentForm";
import AnalyzingScreen from "@/components/AnalyzingScreen";
import Results from "@/components/Results";
import ProgressHeader from "@/components/ProgressHeader";
import type { AssessmentStep, UserProfile, AssessmentResult } from "@/types/assessment";

const defaultProfile: Partial<UserProfile> = {
  name: "",
  targetRole: "",
  domain: "tech",
  primarySkills: [],
  domainProficiency: "basic",
  hasCertifications: false,
  hasSpokenEnglish: true,
  presentationComfort: 3,
  hasGivenMockInterview: false,
  portfolioUrl: "",
  hasLiveProjects: false,
  projectCount: 0,
  hasBlog: false,
  resumeLastUpdated: "this-month",
  resumeText: "",
};

const FORM_STEPS = ["basic", "technical", "communication", "portfolio"] as const;

function getStepNumber(step: AssessmentStep): number {
  const map: Record<AssessmentStep, number> = {
    landing: 0,
    upload: 1,
    "form-basic": 2,
    "form-technical": 3,
    "form-communication": 4,
    "form-portfolio": 5,
    analyzing: 5,
    results: 5,
  };
  return map[step];
}

function getStepLabel(step: AssessmentStep): string {
  const map: Record<AssessmentStep, string> = {
    landing: "Welcome",
    upload: "Resume",
    "form-basic": "About You",
    "form-technical": "Technical Skills",
    "form-communication": "Communication",
    "form-portfolio": "Portfolio",
    analyzing: "Analyzing...",
    results: "Results",
  };
  return map[step];
}

export default function HomePage() {
  const [step, setStep] = useState<AssessmentStep>("landing");
  const [profile, setProfile] = useState<Partial<UserProfile>>(defaultProfile);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [error, setError] = useState("");

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const handleStart = () => setStep("upload");

  const handleResumeComplete = (text: string) => {
    updateProfile({ resumeText: text });
    setStep("form-basic");
  };

  const handleFormNext = () => {
    const formStepIndex = FORM_STEPS.indexOf(
      step.replace("form-", "") as (typeof FORM_STEPS)[number]
    );
    if (formStepIndex < FORM_STEPS.length - 1) {
      setStep(`form-${FORM_STEPS[formStepIndex + 1]}` as AssessmentStep);
    } else {
      handleSubmit();
    }
  };

  const handleFormBack = () => {
    const formStepIndex = FORM_STEPS.indexOf(
      step.replace("form-", "") as (typeof FORM_STEPS)[number]
    );
    if (formStepIndex === 0) {
      setStep("upload");
    } else {
      setStep(`form-${FORM_STEPS[formStepIndex - 1]}` as AssessmentStep);
    }
  };

  const handleSubmit = async () => {
    setStep("analyzing");
    setError("");
    try {
      // Step 1: Analyze portfolio URL (GitHub API or URL check)
      let updatedProfile = { ...profile };
      if (profile.portfolioUrl && profile.portfolioUrl.trim() !== "") {
        try {
          const portRes = await fetch("/api/analyze-portfolio", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: profile.portfolioUrl }),
          });
          const portData = await portRes.json();
          updatedProfile = { ...updatedProfile, portfolioData: portData };
        } catch {
          // Portfolio analysis failed — continue without it
        }
      }

      // Step 2: Run AI assessment with enriched profile
      const res = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
      setStep("results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep("form-portfolio");
    }
  };

  const handleRetake = () => {
    setProfile(defaultProfile);
    setResult(null);
    setError("");
    setStep("landing");
  };

  const showHeader = step !== "landing" && step !== "results" && step !== "analyzing";

  return (
    <div className="relative min-h-screen">
      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Progress header */}
      {showHeader && (
        <ProgressHeader
          currentStep={getStepNumber(step)}
          totalSteps={5}
          stepLabel={getStepLabel(step)}
        />
      )}

      {/* Main content */}
      <main className={showHeader ? "pt-32 pb-16" : ""}>
        <AnimatePresence mode="wait">
          {step === "landing" && (
            <Landing key="landing" onStart={handleStart} />
          )}

          {step === "upload" && (
            <div key="upload" className="min-h-screen flex items-center justify-center">
              <ResumeUpload
                onComplete={handleResumeComplete}
                onSkip={() => setStep("form-basic")}
              />
            </div>
          )}

          {step.startsWith("form-") && (
            <div key={step} className="min-h-screen flex items-center justify-center py-8">
              {error && (
                <div
                  className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-sm z-50"
                  style={{
                    background: "rgba(248,113,113,0.15)",
                    border: "1px solid rgba(248,113,113,0.3)",
                    color: "#f87171",
                  }}
                >
                  ⚠️ {error}
                </div>
              )}
              <AssessmentForm
                step={step.replace("form-", "") as "basic" | "technical" | "communication" | "portfolio"}
                profile={profile}
                onUpdate={updateProfile}
                onNext={handleFormNext}
                onBack={handleFormBack}
              />
            </div>
          )}

          {step === "analyzing" && <AnalyzingScreen key="analyzing" />}

          {step === "results" && result && (
            <Results
              key="results"
              result={result}
              userName={profile.name || "You"}
              onRetake={handleRetake}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
