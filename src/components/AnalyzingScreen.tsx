"use client";
import { motion } from "framer-motion";

export default function AnalyzingScreen() {
  const steps = [
    { icon: "📄", label: "Reading your resume..." },
    { icon: "⚡", label: "Evaluating technical skills..." },
    { icon: "🗣️", label: "Assessing communication profile..." },
    { icon: "💼", label: "Scoring portfolio presence..." },
    { icon: "🧠", label: "Generating personalized plan..." },
    { icon: "✨", label: "Crafting your readiness report..." },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10">
      <motion.div
        className="text-center max-w-md w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated logo */}
        <div className="relative w-32 h-32 mx-auto mb-10">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(135deg, #6172f8, #a855f7)",
              opacity: 0.2,
            }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full"
            style={{
              background: "linear-gradient(135deg, #6172f8, #a855f7)",
              opacity: 0.3,
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.2 }}
          />
          <div
            className="absolute inset-4 rounded-full flex items-center justify-center text-4xl"
            style={{
              background: "linear-gradient(135deg, #6172f8, #a855f7)",
              boxShadow: "0 0 40px rgba(97,114,248,0.5)",
            }}
          >
            🧠
          </div>
          {/* Spinning ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent"
            style={{ borderTopColor: "#6172f8", borderRightColor: "#a855f7" }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>

        <h2 className="font-display font-bold text-3xl mb-3 gradient-text">
          Analyzing Your Profile
        </h2>
        <p className="text-sm mb-10" style={{ color: "#8b8ba7" }}>
          Our AI is working its magic...
        </p>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              className="glass flex items-center gap-3 px-5 py-3 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.4, duration: 0.4 }}
            >
              <span className="text-xl">{s.icon}</span>
              <span className="text-sm flex-1 text-left" style={{ color: "#c7d7fe" }}>
                {s.label}
              </span>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.4 + 0.3 }}
              >
                <motion.div
                  className="w-4 h-4 rounded-full"
                  style={{ background: "linear-gradient(135deg, #00f5a0, #00d2ff)" }}
                  animate={{ scale: [0.8, 1.1, 1] }}
                  transition={{ delay: i * 0.4 + 0.3, duration: 0.4 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div
          className="mt-8 h-1.5 rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #6172f8, #a855f7, #00f5a0)" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: steps.length * 0.4 + 0.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
