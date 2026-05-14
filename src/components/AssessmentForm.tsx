"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import type { UserProfile, Domain, PortfolioData } from "@/types/assessment";
import { DOMAIN_CONFIG } from "@/types/assessment";

type FormStep = "basic" | "technical" | "communication" | "portfolio";

interface AssessmentFormProps {
  step: FormStep;
  profile: Partial<UserProfile>;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
}

// ─── Option Card ─────────────────────────────────────────────────────────────
function OptionCard({
  id,
  label,
  selected,
  onClick,
}: {
  id: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`option-card w-full text-left ${selected ? "selected" : ""}`}
    >
      <span
        className="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all"
        style={{
          borderColor: selected ? "#6172f8" : "rgba(255,255,255,0.2)",
          background: selected ? "#6172f8" : "transparent",
        }}
      >
        {selected && <span className="w-2 h-2 rounded-full bg-white" />}
      </span>
      {label}
    </button>
  );
}

// ─── Skill Tag Input ─────────────────────────────────────────────────────────
function SkillInput({
  skills,
  suggested,
  onChange,
}: {
  skills: string[];
  suggested: string[];
  onChange: (s: string[]) => void;
}) {
  const toggle = (skill: string) => {
    if (skills.includes(skill)) {
      onChange(skills.filter((s) => s !== skill));
    } else if (skills.length < 8) {
      onChange([...skills, skill]);
    }
  };

  const handleCustom = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const val = (e.target as HTMLInputElement).value.trim();
      if (val && !skills.includes(val) && skills.length < 8) {
        onChange([...skills, val]);
        (e.target as HTMLInputElement).value = "";
      }
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {suggested.map((s) => (
          <button
            key={s}
            id={`skill-${s.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
            onClick={() => toggle(s)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              background: skills.includes(s)
                ? "rgba(97,114,248,0.2)"
                : "rgba(255,255,255,0.05)",
              border: `1px solid ${skills.includes(s) ? "#6172f8" : "rgba(255,255,255,0.1)"}`,
              color: skills.includes(s) ? "#a5bcfd" : "#8b8ba7",
            }}
          >
            {skills.includes(s) ? "✓ " : "+ "}
            {s}
          </button>
        ))}
      </div>
      <input
        id="custom-skill-input"
        className="input-field"
        placeholder="Add your own skill (press Enter)..."
        onKeyDown={handleCustom}
      />
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span key={s} className="tag-pill flex items-center gap-1">
              {s}
              <button
                onClick={() => onChange(skills.filter((x) => x !== s))}
                style={{ color: "#6172f8", marginLeft: "2px", fontSize: "12px" }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Slider ──────────────────────────────────────────────────────────────────
function SliderInput({
  value,
  onChange,
  labels,
}: {
  value: number;
  onChange: (v: number) => void;
  labels: string[];
}) {
  return (
    <div className="space-y-3">
      <input
        id="comfort-slider"
        type="range"
        min={1}
        max={5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #6172f8 0%, #6172f8 ${(value - 1) * 25}%, rgba(255,255,255,0.1) ${(value - 1) * 25}%, rgba(255,255,255,0.1) 100%)`,
        }}
      />
      <div className="flex justify-between text-xs" style={{ color: "#8b8ba7" }}>
        {labels.map((l, i) => (
          <span key={i} style={{ color: i + 1 === value ? "#6172f8" : "#8b8ba7" }}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── GitHub Preview Card ──────────────────────────────────────────────────────
function GitHubPreview({ data }: { data: PortfolioData | null }) {
  if (!data || data.type === "none") return null;

  if (data.type === "github" && data.username) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-xl"
        style={{ background: "rgba(0,245,160,0.06)", border: "1px solid rgba(0,245,160,0.2)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-semibold" style={{ color: "#00f5a0" }}>✅ GitHub Analyzed</span>
          <span className="text-xs" style={{ color: "#8b8ba7" }}>@{data.username}</span>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-3">
          {[
            { label: "Repos", value: data.publicRepos ?? 0 },
            { label: "Followers", value: data.followers ?? 0 },
            { label: "Stars", value: data.totalStars ?? 0 },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-bold text-lg" style={{ color: "#c7d7fe" }}>{stat.value}</div>
              <div className="text-xs" style={{ color: "#8b8ba7" }}>{stat.label}</div>
            </div>
          ))}
        </div>
        {data.topLanguages && data.topLanguages.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {data.topLanguages.map((lang) => (
              <span key={lang} className="tag-pill text-xs">{lang}</span>
            ))}
          </div>
        )}
        {data.topRepos && data.topRepos.length > 0 && (
          <div className="space-y-1">
            {data.topRepos.slice(0, 3).map((repo) => (
              <div key={repo.name} className="flex items-center justify-between text-xs" style={{ color: "#8b8ba7" }}>
                <span style={{ color: "#c7d7fe" }}>📁 {repo.name}</span>
                <span>⭐ {repo.stars} · {repo.language}</span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    );
  }

  if (data.type === "url") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-3 rounded-xl text-sm"
        style={{
          background: data.isLive ? "rgba(0,245,160,0.06)" : "rgba(248,113,113,0.06)",
          border: `1px solid ${data.isLive ? "rgba(0,245,160,0.2)" : "rgba(248,113,113,0.2)"}`,
          color: data.isLive ? "#00f5a0" : "#f87171",
        }}
      >
        {data.isLive ? `✅ Portfolio live at ${data.domain}` : `⚠️ URL could not be reached`}
      </motion.div>
    );
  }

  return null;
}

// ─── Main Form Component ──────────────────────────────────────────────────────
export default function AssessmentForm({
  step,
  profile,
  onUpdate,
  onNext,
  onBack,
}: AssessmentFormProps) {
  const domain = profile.domain || "tech";
  const config = DOMAIN_CONFIG[domain];
  const [portfolioPreview, setPortfolioPreview] = useState<PortfolioData | null>(null);
  const [fetchingPortfolio, setFetchingPortfolio] = useState(false);

  const handlePortfolioBlur = useCallback(async (url: string) => {
    if (!url.trim()) { setPortfolioPreview(null); return; }
    setFetchingPortfolio(true);
    try {
      const res = await fetch("/api/analyze-portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data: PortfolioData = await res.json();
      setPortfolioPreview(data);
    } catch {
      setPortfolioPreview(null);
    } finally {
      setFetchingPortfolio(false);
    }
  }, []);

  const isValid = (): boolean => {
    if (step === "basic") return !!(profile.name && profile.targetRole && profile.experienceLevel && profile.domain);
    if (step === "technical") return !!(profile.domainProficiency && (profile.primarySkills?.length ?? 0) > 0);
    if (step === "communication") return profile.presentationComfort !== undefined;
    if (step === "portfolio") return profile.projectCount !== undefined;
    return true;
  };

  return (
    <motion.div
      key={step}
      className="max-w-xl mx-auto w-full px-4"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35 }}
    >
      {/* ─── BASIC INFO ─────────────────────────────────────────────── */}
      {step === "basic" && (
        <div className="space-y-6">
          <div>
            <h2 className="font-display font-bold text-3xl mb-2">About You</h2>
            <p style={{ color: "#8b8ba7" }}>Let&apos;s start with the basics</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#c7d7fe" }}>
                Your Name *
              </label>
              <input
                id="input-name"
                className="input-field"
                placeholder="e.g. Priya Sharma"
                value={profile.name || ""}
                onChange={(e) => onUpdate({ name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#c7d7fe" }}>
                Target Role *
              </label>
              <input
                id="input-target-role"
                className="input-field"
                placeholder="e.g. Software Engineer, UX Designer, Marketing Manager..."
                value={profile.targetRole || ""}
                onChange={(e) => onUpdate({ targetRole: e.target.value })}
              />
            </div>

            {/* Domain Selection */}
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: "#c7d7fe" }}>
                Your Field / Domain *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(DOMAIN_CONFIG) as Domain[]).map((d) => {
                  const cfg = DOMAIN_CONFIG[d];
                  return (
                    <button
                      key={d}
                      id={`domain-${d}`}
                      onClick={() => onUpdate({ domain: d, primarySkills: [] })}
                      className="flex items-center gap-2 px-3 py-3 rounded-xl text-sm text-left transition-all duration-200"
                      style={{
                        background:
                          profile.domain === d
                            ? "rgba(97,114,248,0.15)"
                            : "rgba(255,255,255,0.03)",
                        border: `1px solid ${profile.domain === d ? "#6172f8" : "rgba(255,255,255,0.08)"}`,
                        color: profile.domain === d ? "#a5bcfd" : "#8b8ba7",
                      }}
                    >
                      <span className="text-lg">{cfg.icon}</span>
                      <span className="font-medium">{cfg.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: "#c7d7fe" }}>
                Experience Level *
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { value: "fresher", label: "🎓 Fresher / Final Year Student" },
                  { value: "0-1", label: "💼 0–1 years experience" },
                  { value: "1-3", label: "🚀 1–3 years experience" },
                  { value: "3-5", label: "⭐ 3–5 years experience" },
                  { value: "5+", label: "🏆 5+ years experience" },
                ].map((opt) => (
                  <OptionCard
                    key={opt.value}
                    id={`exp-${opt.value}`}
                    label={opt.label}
                    selected={profile.experienceLevel === opt.value}
                    onClick={() =>
                      onUpdate({ experienceLevel: opt.value as UserProfile["experienceLevel"] })
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TECHNICAL / DOMAIN SKILLS ──────────────────────────────── */}
      {step === "technical" && (
        <div className="space-y-6">
          <div>
            <h2 className="font-display font-bold text-3xl mb-2">
              {config.icon} {config.technicalLabel}
            </h2>
            <p style={{ color: "#8b8ba7" }}>
              Tell us about your {DOMAIN_CONFIG[domain].label} knowledge
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: "#c7d7fe" }}>
              Select your skills (pick up to 8) *
            </label>
            <SkillInput
              skills={profile.primarySkills || []}
              suggested={config.suggestedSkills}
              onChange={(s) => onUpdate({ primarySkills: s })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: "#c7d7fe" }}>
              {config.proficiencyLabel} *
            </label>
            <div className="space-y-2">
              {config.proficiencyOptions.map((opt) => (
                <OptionCard
                  key={opt.value}
                  id={`proficiency-${opt.value}`}
                  label={opt.label}
                  selected={profile.domainProficiency === opt.value}
                  onClick={() =>
                    onUpdate({
                      domainProficiency: opt.value as UserProfile["domainProficiency"],
                    })
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: "#c7d7fe" }}>
              Relevant certifications or courses?
            </label>
            <div className="grid grid-cols-2 gap-2">
              <OptionCard
                id="cert-yes"
                label="✅ Yes, I have certifications"
                selected={profile.hasCertifications === true}
                onClick={() => onUpdate({ hasCertifications: true })}
              />
              <OptionCard
                id="cert-no"
                label="❌ Not yet"
                selected={profile.hasCertifications === false}
                onClick={() => onUpdate({ hasCertifications: false })}
              />
            </div>
          </div>
        </div>
      )}

      {/* ─── COMMUNICATION ──────────────────────────────────────────── */}
      {step === "communication" && (
        <div className="space-y-6">
          <div>
            <h2 className="font-display font-bold text-3xl mb-2">🗣️ Communication</h2>
            <p style={{ color: "#8b8ba7" }}>How do you present yourself?</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-4" style={{ color: "#c7d7fe" }}>
              Presentation & speaking comfort *
            </label>
            <SliderInput
              value={profile.presentationComfort || 3}
              onChange={(v) =>
                onUpdate({ presentationComfort: v as UserProfile["presentationComfort"] })
              }
              labels={["Very shy", "Nervous", "OK", "Confident", "Excellent"]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: "#c7d7fe" }}>
              English speaking confidence
            </label>
            <div className="grid grid-cols-2 gap-2">
              <OptionCard
                id="english-yes"
                label="✅ Comfortable speaking English"
                selected={profile.hasSpokenEnglish === true}
                onClick={() => onUpdate({ hasSpokenEnglish: true })}
              />
              <OptionCard
                id="english-no"
                label="🔄 Need practice"
                selected={profile.hasSpokenEnglish === false}
                onClick={() => onUpdate({ hasSpokenEnglish: false })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: "#c7d7fe" }}>
              Have you done mock interviews?
            </label>
            <div className="grid grid-cols-2 gap-2">
              <OptionCard
                id="mock-yes"
                label="✅ Yes — multiple rounds"
                selected={profile.hasGivenMockInterview === true}
                onClick={() => onUpdate({ hasGivenMockInterview: true })}
              />
              <OptionCard
                id="mock-no"
                label="❌ Not yet"
                selected={profile.hasGivenMockInterview === false}
                onClick={() => onUpdate({ hasGivenMockInterview: false })}
              />
            </div>
          </div>
        </div>
      )}

      {/* ─── PORTFOLIO ──────────────────────────────────────────────── */}
      {step === "portfolio" && (
        <div className="space-y-6">
          <div>
            <h2 className="font-display font-bold text-3xl mb-2">💼 Portfolio</h2>
            <p style={{ color: "#8b8ba7" }}>Your work, projects & online presence</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#c7d7fe" }}>
              {config.portfolioLabel} (optional)
            </label>
            <input
              id="input-portfolio"
              className="input-field"
              placeholder={config.portfolioPlaceholder}
              value={profile.portfolioUrl || ""}
              onChange={(e) => onUpdate({ portfolioUrl: e.target.value })}
              onBlur={(e) => handlePortfolioBlur(e.target.value)}
            />
            <p className="text-xs mt-1" style={{ color: "#8b8ba7" }}>
              {fetchingPortfolio ? "🔍 Analyzing portfolio..." : "Paste URL and click away to analyze"}
            </p>
            <AnimatePresence>
              {portfolioPreview && !fetchingPortfolio && (
                <div className="mt-3">
                  <GitHubPreview data={portfolioPreview} />
                </div>
              )}
            </AnimatePresence>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: "#c7d7fe" }}>
              Number of personal projects / work samples *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 0, label: "0 — Just starting" },
                { value: 1, label: "1–2 projects" },
                { value: 3, label: "3–5 projects" },
                { value: 6, label: "6+ projects" },
              ].map((opt) => (
                <OptionCard
                  key={opt.value}
                  id={`projects-${opt.value}`}
                  label={opt.label}
                  selected={profile.projectCount === opt.value}
                  onClick={() => onUpdate({ projectCount: opt.value })}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: "#c7d7fe" }}>
              Do you have any publicly visible / live work?
            </label>
            <div className="grid grid-cols-2 gap-2">
              <OptionCard
                id="live-yes"
                label="✅ Yes, publicly available"
                selected={profile.hasLiveProjects === true}
                onClick={() => onUpdate({ hasLiveProjects: true })}
              />
              <OptionCard
                id="live-no"
                label="❌ Only local / private"
                selected={profile.hasLiveProjects === false}
                onClick={() => onUpdate({ hasLiveProjects: false })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: "#c7d7fe" }}>
              Resume last updated
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "this-week", label: "This week" },
                { value: "this-month", label: "This month" },
                { value: "3-6months", label: "3–6 months ago" },
                { value: "6plus", label: "6+ months ago" },
              ].map((opt) => (
                <OptionCard
                  key={opt.value}
                  id={`resume-updated-${opt.value}`}
                  label={opt.label}
                  selected={profile.resumeLastUpdated === opt.value}
                  onClick={() =>
                    onUpdate({
                      resumeLastUpdated: opt.value as UserProfile["resumeLastUpdated"],
                    })
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: "#c7d7fe" }}>
              Blog / Articles / LinkedIn content?
            </label>
            <div className="grid grid-cols-2 gap-2">
              <OptionCard
                id="blog-yes"
                label="✅ Yes, I publish content"
                selected={profile.hasBlog === true}
                onClick={() => onUpdate({ hasBlog: true })}
              />
              <OptionCard
                id="blog-no"
                label="❌ Not yet"
                selected={profile.hasBlog === false}
                onClick={() => onUpdate({ hasBlog: false })}
              />
            </div>
          </div>
        </div>
      )}

      {/* ─── Navigation ─────────────────────────────────────────────── */}
      <div className="flex gap-3 mt-8">
        <button
          id="form-back-btn"
          onClick={onBack}
          className="flex-1 py-3 rounded-xl font-medium text-sm transition-all"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#8b8ba7",
          }}
        >
          ← Back
        </button>
        <button
          id="form-next-btn"
          onClick={onNext}
          disabled={!isValid()}
          className="btn-primary flex-2 py-3 px-8 rounded-xl font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
          style={{ flex: 2 }}
        >
          {step === "portfolio" ? "🚀 Get My Score" : "Continue →"}
        </button>
      </div>
    </motion.div>
  );
}
