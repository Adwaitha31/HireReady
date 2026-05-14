"use client";
import { motion } from "framer-motion";
import type { Archetype } from "@/types/assessment";

export default function ArchetypeCard({ archetype }: { archetype: Archetype }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl p-6 text-center"
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      style={{
        background: `linear-gradient(135deg, ${archetype.color}18 0%, ${archetype.color}08 100%)`,
        border: `1px solid ${archetype.color}35`,
      }}
    >
      {/* Glow orb behind */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${archetype.color}, transparent 70%)`,
        }}
      />

      {/* Badge */}
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4"
        style={{
          background: `${archetype.color}20`,
          border: `1px solid ${archetype.color}40`,
          color: archetype.color,
        }}
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        ✨ YOUR INTERVIEW ARCHETYPE
      </motion.div>

      {/* Emoji */}
      <motion.div
        className="text-7xl mb-3 leading-none"
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        {archetype.emoji}
      </motion.div>

      {/* Name */}
      <h3
        className="font-display font-black text-2xl md:text-3xl mb-1"
        style={{ color: archetype.color }}
      >
        {archetype.name}
      </h3>

      {/* Tagline */}
      <p className="text-sm font-semibold mb-3" style={{ color: `${archetype.color}cc` }}>
        &ldquo;{archetype.tagline}&rdquo;
      </p>

      {/* Description */}
      <p className="text-sm leading-relaxed max-w-sm mx-auto" style={{ color: "#8b8ba7" }}>
        {archetype.description}
      </p>

      {/* Share nudge */}
      <p className="text-xs mt-4" style={{ color: `${archetype.color}80` }}>
        Share your archetype on LinkedIn 👆
      </p>
    </motion.div>
  );
}
