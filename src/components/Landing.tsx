"use client";
import { motion } from "framer-motion";

interface LandingProps {
  onStart: () => void;
}

const stats = [
  { value: "<2 min", label: "Assessment Time" },
  { value: "4", label: "Dimensions Analyzed" },
  { value: "AI", label: "Powered by Groq" },
  { value: "Free", label: "Always Free" },
];

const dimensions = [
  { icon: "⚡", name: "Technical Skills", desc: "Domain knowledge, tools, certifications, proficiency level", color: "#6172f8" },
  { icon: "📄", name: "Resume Quality", desc: "Impact metrics, keyword density, recency, structure", color: "#00f5a0" },
  { icon: "🗣️", name: "Communication", desc: "Articulation, English confidence, mock interview experience", color: "#f59e0b" },
  { icon: "💼", name: "Portfolio Strength", desc: "Live projects, online presence, content creation", color: "#a855f7" },
];

const howItWorks = [
  { step: "01", icon: "📎", title: "Upload Resume", desc: "Drop your PDF — AI extracts skills, projects & achievements automatically", time: "30 sec" },
  { step: "02", icon: "✍️", title: "Quick Assessment", desc: "Answer 8 smart questions across 4 dimensions — no fluff, just signal", time: "60 sec" },
  { step: "03", icon: "🧠", title: "AI Analysis", desc: "Groq Llama 3.3 scores your profile against real hiring benchmarks for your domain", time: "15 sec" },
  { step: "04", icon: "🎯", title: "Get Your Score", desc: "Animated score reveal, your Interview Archetype, and a personalized 7-day plan", time: "instant" },
];

const domains = [
  "💻 Software / IT", "🎨 Design / UX", "📣 Marketing", "📊 Management",
  "💰 Finance", "📈 Data Science", "🚀 Product", "⚖️ Law", "🏥 Healthcare", "🌐 Other",
];

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="min-h-screen relative z-10">
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse inline-block" style={{ background: "#00f5a0" }} />
            <span style={{ color: "#00f5a0" }}>AI Career Intelligence · Powered by Groq</span>
          </motion.div>

          {/* Title */}
          <h1 className="font-display font-black mb-6 leading-none"
            style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)", lineHeight: 1.05 }}>
            Know Your{" "}
            <span className="gradient-text">Interview</span>
            <br />
            <span className="gradient-text">Readiness</span> Score
          </h1>

          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto" style={{ color: "#8b8ba7", lineHeight: 1.7 }}>
            Get a personalized readiness score across{" "}
            <strong style={{ color: "#c7d7fe" }}>4 key dimensions</strong> — with an
            AI-crafted action plan and your unique{" "}
            <strong style={{ color: "#a855f7" }}>Interview Archetype</strong> — in under{" "}
            <strong style={{ color: "#00f5a0" }}>2 minutes</strong>.
          </p>

          {/* CTA */}
          <motion.button
            id="start-assessment-btn"
            className="btn-primary text-lg px-10 py-4"
            onClick={onStart}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Start Free Assessment →
          </motion.button>

          <p className="mt-4 text-sm" style={{ color: "#8b8ba7" }}>
            No signup · No credit card · Takes less than 2 minutes
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-3xl w-full px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {stats.map((s, i) => (
            <div key={i} className="glass text-center p-4 rounded-2xl">
              <div className="font-display font-black text-3xl gradient-text mb-1">{s.value}</div>
              <div className="text-xs" style={{ color: "#8b8ba7" }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-2"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <p className="text-xs" style={{ color: "#8b8ba7" }}>Scroll to learn more</p>
          <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, rgba(97,114,248,0.5), transparent)" }} />
        </motion.div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-semibold mb-4" style={{ color: "#6172f8" }}>
              ⚡ HOW IT WORKS
            </div>
            <h2 className="font-display font-black text-3xl md:text-4xl">
              From zero to your score in{" "}
              <span className="gradient-text">under 2 minutes</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {howItWorks.map((step, i) => (
              <motion.div
                key={i}
                className="glass p-6 rounded-2xl relative overflow-hidden group"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Step number watermark */}
                <div
                  className="absolute top-4 right-4 font-display font-black text-5xl pointer-events-none select-none"
                  style={{ color: "rgba(97,114,248,0.07)" }}
                >
                  {step.step}
                </div>

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: "rgba(97,114,248,0.1)", border: "1px solid rgba(97,114,248,0.2)" }}
                >
                  {step.icon}
                </div>

                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display font-bold text-lg">{step.title}</h3>
                  <span
                    className="text-xs px-2 py-1 rounded-lg flex-shrink-0 ml-2"
                    style={{ background: "rgba(0,245,160,0.1)", color: "#00f5a0", border: "1px solid rgba(0,245,160,0.2)" }}
                  >
                    {step.time}
                  </span>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: "#8b8ba7" }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIMENSIONS ────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-semibold mb-4" style={{ color: "#a855f7" }}>
              📊 SCORING DIMENSIONS
            </div>
            <h2 className="font-display font-black text-3xl md:text-4xl">
              4 dimensions.{" "}
              <span className="gradient-text">One complete picture.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dimensions.map((d, i) => (
              <motion.div
                key={i}
                className="glass p-5 rounded-2xl flex items-start gap-4"
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div
                  className="text-2xl w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${d.color}18`, border: `1px solid ${d.color}30` }}
                >
                  {d.icon}
                </div>
                <div>
                  <div className="font-semibold text-sm mb-1" style={{ color: d.color }}>{d.name}</div>
                  <div className="text-xs leading-relaxed" style={{ color: "#8b8ba7" }}>{d.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOMAINS ───────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-semibold mb-4" style={{ color: "#00f5a0" }}>
              🌐 UNIVERSAL ASSESSMENT
            </div>
            <h2 className="font-display font-black text-3xl md:text-4xl mb-4">
              Not just for{" "}
              <span className="gradient-text">tech people</span>
            </h2>
            <p className="text-sm mb-8 max-w-xl mx-auto" style={{ color: "#8b8ba7" }}>
              HireReady adapts to your field. Whether you&apos;re a designer, finance analyst, or lawyer —
              your assessment is calibrated to your industry standards.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {domains.map((d, i) => (
                <motion.span
                  key={i}
                  className="glass px-4 py-2 rounded-full text-sm font-medium"
                  style={{ color: "#c7d7fe" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {d}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ARCHETYPE PREVIEW ─────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-black text-3xl md:text-4xl mb-4">
              Discover your{" "}
              <span className="gradient-text">Interview Archetype</span>
            </h2>
            <p className="text-sm mb-8 max-w-xl mx-auto" style={{ color: "#8b8ba7" }}>
              Our AI assigns you a unique personality type based on your profile pattern. Share it on LinkedIn and stand out.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {[
                { emoji: "💎", name: "The Raw Diamond", color: "#a855f7" },
                { emoji: "🚀", name: "The Launchpad", color: "#6172f8" },
                { emoji: "⚡", name: "The Silent Genius", color: "#f59e0b" },
                { emoji: "🏆", name: "The Champion", color: "#00f5a0" },
                { emoji: "🔮", name: "The Hidden Gem", color: "#ec4899" },
                { emoji: "🌱", name: "The Rising Star", color: "#00d2ff" },
              ].map((a, i) => (
                <motion.div
                  key={i}
                  className="glass p-4 rounded-xl text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  style={{ border: `1px solid ${a.color}25` }}
                >
                  <div className="text-3xl mb-2">{a.emoji}</div>
                  <div className="text-xs font-semibold" style={{ color: a.color }}>{a.name}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <motion.div
          className="max-w-2xl mx-auto text-center glass-strong p-10 rounded-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-5xl mb-4">🎯</div>
          <h2 className="font-display font-black text-3xl md:text-4xl mb-4">
            Ready to find out{" "}
            <span className="gradient-text">where you stand?</span>
          </h2>
          <p className="text-sm mb-8" style={{ color: "#8b8ba7" }}>
            Join thousands of students who got their score. It&apos;s free, fast, and actually useful.
          </p>
          <motion.button
            id="start-assessment-bottom-btn"
            className="btn-primary text-lg px-10 py-4"
            onClick={onStart}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Get My Readiness Score →
          </motion.button>
        </motion.div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer className="py-8 px-4 text-center border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="font-display font-black text-xl gradient-text mb-2">HireReady</div>
          <p className="text-xs" style={{ color: "#8b8ba7" }}>
            AI-powered interview readiness assessment · Built with ❤️ · Powered by Groq Llama 3.3
          </p>
          <p className="text-xs mt-2" style={{ color: "rgba(139,139,167,0.5)" }}>
            © 2026 HireReady · Free forever
          </p>
        </div>
      </footer>
    </div>
  );
}
