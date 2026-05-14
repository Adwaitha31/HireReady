"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import type { AssessmentResult, DimensionScore, WeeklyAction } from "@/types/assessment";
import ArchetypeCard from "@/components/ArchetypeCard";

// Lazy-load chart (avoids SSR issues with recharts)
const SkillRadarChart = dynamic(() => import("@/components/SkillRadarChart"), { ssr: false });

interface ResultsProps {
  result: AssessmentResult;
  userName: string;
  onRetake: () => void;
}

// ─── Confetti ─────────────────────────────────────────────────────────────────
function useConfetti(score: number) {
  useEffect(() => {
    if (score < 65) return;
    const colors = ["#6172f8", "#a855f7", "#00f5a0", "#00d2ff", "#f59e0b"];

    // Gracefully skip if canvas-confetti isn't installed yet
    import("canvas-confetti")
      .then((mod) => {
        const confetti = mod.default;
        const end = Date.now() + 2000;
        const frame = () => {
          confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors, disableForReducedMotion: true });
          confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors, disableForReducedMotion: true });
          if (Date.now() < end) requestAnimationFrame(frame);
        };
        setTimeout(frame, 600);
      })
      .catch(() => { /* canvas-confetti not installed yet — skip silently */ });
  }, [score]);
}

// ─── Score Ring ───────────────────────────────────────────────────────────────
function ScoreRing({ score, grade }: { score: number; grade: string }) {
  const [animScore, setAnimScore] = useState(0);
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animScore / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const step = score / 60;
      const interval = setInterval(() => {
        start += step;
        if (start >= score) { setAnimScore(score); clearInterval(interval); }
        else setAnimScore(Math.round(start));
      }, 16);
      return () => clearInterval(interval);
    }, 400);
    return () => clearTimeout(timer);
  }, [score]);

  const gradeColor = ({ A: "#00f5a0", B: "#6172f8", C: "#f59e0b", D: "#f87171", F: "#ef4444" } as Record<string,string>)[grade] || "#6172f8";

  const getScoreColor = (s: number) => {
    if (s >= 85) return ["#00f5a0", "#00d2ff"];
    if (s >= 70) return ["#6172f8", "#a855f7"];
    if (s >= 55) return ["#f59e0b", "#f97316"];
    return ["#f87171", "#ef4444"];
  };
  const [c1, c2] = getScoreColor(score);

  return (
    <div className="relative flex items-center justify-center w-56 h-56 mx-auto">
      <div className="absolute inset-0 rounded-full opacity-20 blur-2xl" style={{ background: `radial-gradient(circle, ${c1}, transparent)` }} />
      <svg width="224" height="224" className="absolute" style={{ transform: "rotate(-90deg)" }}>
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
        </defs>
        <circle cx="112" cy="112" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
        <circle cx="112" cy="112" r={radius} fill="none" stroke="url(#scoreGrad)" strokeWidth="12"
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.05s linear" }} />
      </svg>
      <div className="relative text-center z-10">
        <div className="font-display font-black leading-none" style={{ fontSize: "64px", color: c1, lineHeight: 1 }}>{animScore}</div>
        <div className="font-display font-bold text-2xl mt-1" style={{ color: gradeColor }}>Grade {grade}</div>
      </div>
    </div>
  );
}

// ─── Dimension Card ───────────────────────────────────────────────────────────
function DimensionCard({ dim, index }: { dim: DimensionScore; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div className="glass rounded-2xl overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.3 }} onClick={() => setExpanded(!expanded)} whileHover={{ scale: 1.01 }}>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{dim.icon}</span>
            <span className="font-semibold text-sm">{dim.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-xl" style={{ color: dim.color }}>{dim.score}</span>
            <span className="text-xs px-2 py-1 rounded-lg font-bold" style={{ background: `${dim.color}18`, color: dim.color }}>{dim.grade}</span>
            <span style={{ color: "#8b8ba7", fontSize: "12px" }}>{expanded ? "▲" : "▼"}</span>
          </div>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <motion.div className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${dim.color}88, ${dim.color})` }}
            initial={{ width: "0%" }} animate={{ width: `${dim.score}%` }}
            transition={{ delay: index * 0.1 + 0.5, duration: 1, ease: "easeOut" }} />
        </div>
        <p className="text-xs mt-3" style={{ color: "#8b8ba7" }}>💡 {dim.topAction}</p>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="px-5 pb-5 pt-1 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <div className="text-xs font-semibold mb-2" style={{ color: "#00f5a0" }}>✅ Strengths</div>
                  <ul className="space-y-1">{dim.strengths.map((s, i) => <li key={i} className="text-xs" style={{ color: "#8b8ba7" }}>• {s}</li>)}</ul>
                </div>
                <div>
                  <div className="text-xs font-semibold mb-2" style={{ color: "#f87171" }}>🎯 Improve</div>
                  <ul className="space-y-1">{dim.gaps.map((g, i) => <li key={i} className="text-xs" style={{ color: "#8b8ba7" }}>• {g}</li>)}</ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Weekly Plan ──────────────────────────────────────────────────────────────
function WeeklyPlan({ plan }: { plan: WeeklyAction[] }) {
  const categoryColors = { technical: "#6172f8", resume: "#00f5a0", communication: "#f59e0b", portfolio: "#a855f7" };
  const categoryIcons = { technical: "⚡", resume: "📄", communication: "🗣️", portfolio: "💼" };
  return (
    <div className="space-y-3">
      {plan.map((item, i) => (
        <motion.div key={i} className="glass p-4 rounded-xl flex gap-4 items-start"
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
          <div className="flex-shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center text-center"
            style={{ background: `${categoryColors[item.category]}15`, border: `1px solid ${categoryColors[item.category]}30` }}>
            <span className="text-xl">{categoryIcons[item.category]}</span>
            <span className="text-xs font-bold mt-0.5" style={{ color: categoryColors[item.category] }}>{item.day}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium leading-snug">{item.task}</p>
              <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                style={{ background: item.priority === "high" ? "rgba(248,113,113,0.15)" : "rgba(255,255,255,0.05)", color: item.priority === "high" ? "#f87171" : "#8b8ba7" }}>
                {item.priority}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs" style={{ color: "#8b8ba7" }}>⏱ {item.duration}</span>
              {item.resource && (
                <a href={item.resource} target="_blank" rel="noreferrer" className="text-xs" style={{ color: "#6172f8" }} onClick={(e) => e.stopPropagation()}>
                  → Resource
                </a>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Share ────────────────────────────────────────────────────────────────────
function ShareSection({ score, level, archetype }: { score: number; level: string; archetype: { name: string; emoji: string } }) {
  const [copied, setCopied] = useState(false);
  const handleShare = async () => {
    const text = `🎯 My HireReady Score: ${score}/100 (${level})\n${archetype.emoji} Interview Archetype: ${archetype.name}\n\nCheck yours 👉 ${window.location.origin}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* fallback */ }
  };
  return (
    <motion.button id="share-results-btn" onClick={handleShare}
      className="glass w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all"
      style={{ color: "#c7d7fe" }} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
      {copied ? "✅ Copied to clipboard!" : "🔗 Share my Archetype + Score"}
    </motion.button>
  );
}

// ─── Main Results ─────────────────────────────────────────────────────────────
export default function Results({ result, userName, onRetake }: ResultsProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "plan" | "insights">("overview");
  useConfetti(result.overallScore);

  const levelColors: Record<string, string> = {
    Expert: "#00f5a0", "Interview-Ready": "#6172f8",
    "Almost Ready": "#f59e0b", "Needs Work": "#f97316", Beginner: "#f87171",
  };

  return (
    <div className="min-h-screen py-12 px-4 relative z-10">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* ── Header ── */}
        <motion.div className="text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
            style={{ background: `${levelColors[result.level]}18`, color: levelColors[result.level], border: `1px solid ${levelColors[result.level]}40` }}>
            {result.level === "Expert" && "🏆"}{result.level === "Interview-Ready" && "🚀"}
            {result.level === "Almost Ready" && "⭐"}{result.level === "Needs Work" && "💪"}
            {result.level === "Beginner" && "🌱"} {result.level}
          </div>
          <h1 className="font-display font-black text-3xl md:text-4xl mb-2">
            {userName.split(" ")[0]}&apos;s{" "}
            <span className="gradient-text">Readiness Report</span>
          </h1>
          <p className="text-sm" style={{ color: "#8b8ba7" }}>{result.tagline}</p>
        </motion.div>

        {/* ── Score Ring ── */}
        <motion.div className="glass-strong p-8 rounded-3xl text-center"
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <ScoreRing score={result.overallScore} grade={result.grade} />
          <div className="mt-4 text-sm" style={{ color: "#8b8ba7" }}>
            Interview Readiness Score · Ready in ~{result.estimatedReadyInDays} days
          </div>
          {result.topPriority && (
            <div className="mt-5 p-4 rounded-xl text-left" style={{ background: "rgba(97,114,248,0.08)", border: "1px solid rgba(97,114,248,0.2)" }}>
              <div className="text-xs font-semibold mb-1" style={{ color: "#a5bcfd" }}>🎯 YOUR TOP PRIORITY RIGHT NOW</div>
              <p className="text-sm" style={{ color: "#c7d7fe" }}>{result.topPriority}</p>
            </div>
          )}
        </motion.div>

        {/* ── ARCHETYPE CARD (unique touch #1) ── */}
        <ArchetypeCard archetype={result.archetype} />

        {/* ── RADAR CHART (unique touch #2) ── */}
        <SkillRadarChart dimensions={result.dimensions} />

        {/* ── Tabs ── */}
        <div className="flex glass rounded-xl p-1" style={{ gap: "4px" }}>
          {(["overview", "plan", "insights"] as const).map((tab) => (
            <button key={tab} id={`tab-${tab}`} onClick={() => setActiveTab(tab)}
              className="flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200"
              style={{ background: activeTab === tab ? "linear-gradient(135deg, #6172f8, #a855f7)" : "transparent", color: activeTab === tab ? "white" : "#8b8ba7" }}>
              {tab === "overview" && "📊 "}{tab === "plan" && "📅 "}{tab === "insights" && "💡 "}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* ── Tab Content ── */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3">
              <h2 className="font-semibold text-sm" style={{ color: "#8b8ba7" }}>DIMENSION BREAKDOWN — click to expand</h2>
              {Object.values(result.dimensions).map((dim, i) => <DimensionCard key={dim.name} dim={dim} index={i} />)}
            </motion.div>
          )}

          {activeTab === "plan" && (
            <motion.div key="plan" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h2 className="font-semibold text-sm mb-4" style={{ color: "#8b8ba7" }}>YOUR 7-DAY ACTION PLAN — AI-personalized</h2>
              <WeeklyPlan plan={result.weeklyPlan} />
            </motion.div>
          )}

          {activeTab === "insights" && (
            <motion.div key="insights" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              {result.resumeInsights.length > 0 && (
                <div className="glass p-5 rounded-2xl">
                  <h3 className="font-semibold text-sm mb-4" style={{ color: "#00f5a0" }}>📄 Resume Deep-Dive</h3>
                  <ul className="space-y-3">
                    {result.resumeInsights.map((ins, i) => (
                      <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                        className="flex gap-3 text-sm" style={{ color: "#c7d7fe" }}>
                        <span style={{ color: "#00f5a0", flexShrink: 0 }}>→</span>{ins}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
              {result.hiddenStrengths.length > 0 && (
                <div className="glass p-5 rounded-2xl">
                  <h3 className="font-semibold text-sm mb-4" style={{ color: "#a855f7" }}>✨ Hidden Strengths</h3>
                  <ul className="space-y-3">
                    {result.hiddenStrengths.map((s, i) => (
                      <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 + 0.2 }}
                        className="flex gap-3 text-sm" style={{ color: "#c7d7fe" }}>
                        <span style={{ color: "#a855f7", flexShrink: 0 }}>💜</span>{s}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="glass p-5 rounded-2xl">
                <h3 className="font-semibold text-sm mb-4" style={{ color: "#6172f8" }}>⚖️ Score Weights</h3>
                <div className="space-y-2">
                  {[
                    { name: "Technical / Domain Skills", weight: "35%", score: result.dimensions.technical.score },
                    { name: "Resume Quality", weight: "25%", score: result.dimensions.resume.score },
                    { name: "Communication", weight: "20%", score: result.dimensions.communication.score },
                    { name: "Portfolio", weight: "20%", score: result.dimensions.portfolio.score },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-xs" style={{ color: "#8b8ba7" }}>
                      <span>{item.name}</span>
                      <span>{item.weight} weight · {item.score}/100</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Actions ── */}
        <div className="space-y-3 pb-8">
          <ShareSection score={result.overallScore} level={result.level} archetype={result.archetype} />
          <button id="retake-assessment-btn" onClick={onRetake}
            className="w-full py-3 rounded-xl text-sm font-medium transition-all"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#8b8ba7" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#c7d7fe")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8b8ba7")}>
            🔄 Retake Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
