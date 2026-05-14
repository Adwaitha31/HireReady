"use client";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="font-display font-black text-4xl gradient-text mb-4">404</h1>
        <p className="text-lg mb-2" style={{ color: "#c7d7fe" }}>Page not found</p>
        <p className="text-sm mb-8" style={{ color: "#8b8ba7" }}>
          Looks like this page doesn&apos;t exist. Let&apos;s get you back on track.
        </p>
        <a href="/" className="btn-primary px-8 py-3 inline-block rounded-xl font-semibold text-sm">
          ← Back to HireReady
        </a>
      </motion.div>
    </div>
  );
}
