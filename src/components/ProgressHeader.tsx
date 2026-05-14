"use client";
import { motion } from "framer-motion";

interface ProgressHeaderProps {
  currentStep: number;
  totalSteps: number;
  stepLabel: string;
}

const steps = [
  { label: "Resume", icon: "📎" },
  { label: "About", icon: "👤" },
  { label: "Skills", icon: "⚡" },
  { label: "Comms", icon: "🗣️" },
  { label: "Portfolio", icon: "💼" },
];

export default function ProgressHeader({ currentStep, totalSteps, stepLabel }: ProgressHeaderProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: "rgba(10, 10, 15, 0.85)", backdropFilter: "blur(16px)" }}
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-2xl mx-auto px-4 py-4">
        {/* Brand + step label */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-lg gradient-text">HireReady</span>
          </div>
          <span className="text-xs font-medium" style={{ color: "#8b8ba7" }}>
            Step {currentStep} of {totalSteps} · {stepLabel}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #6172f8, #a855f7)" }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Step dots */}
        <div className="flex justify-between mt-2">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-300"
                style={{
                  background:
                    i < currentStep - 1
                      ? "linear-gradient(135deg, #00f5a0, #00d2ff)"
                      : i === currentStep - 1
                      ? "linear-gradient(135deg, #6172f8, #a855f7)"
                      : "rgba(255,255,255,0.08)",
                  boxShadow: i === currentStep - 1 ? "0 0 12px rgba(97,114,248,0.5)" : "none",
                }}
              >
                {i < currentStep - 1 ? "✓" : s.icon}
              </div>
              <span
                className="text-xs hidden sm:block"
                style={{
                  color: i === currentStep - 1 ? "#c7d7fe" : "#8b8ba7",
                  fontSize: "10px",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.header>
  );
}
