"use client";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import type { AssessmentResult } from "@/types/assessment";

interface RadarChartProps {
  dimensions: AssessmentResult["dimensions"];
}

export default function SkillRadarChart({ dimensions }: RadarChartProps) {
  const data = [
    { subject: "Technical", value: dimensions.technical.score, fullMark: 100 },
    { subject: "Resume", value: dimensions.resume.score, fullMark: 100 },
    { subject: "Portfolio", value: dimensions.portfolio.score, fullMark: 100 },
    { subject: "Communication", value: dimensions.communication.score, fullMark: 100 },
  ];

  return (
    <motion.div
      className="glass rounded-2xl p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h3 className="text-sm font-semibold mb-1" style={{ color: "#8b8ba7" }}>
        📡 SKILL RADAR
      </h3>
      <p className="text-xs mb-4" style={{ color: "#8b8ba7" }}>
        Your readiness across all 4 dimensions
      </p>

      <ResponsiveContainer width="100%" height={240}>
        <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
          <defs>
            <linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6172f8" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#a855f7" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <PolarGrid
            stroke="rgba(255,255,255,0.06)"
            gridType="polygon"
          />
          <PolarAngleAxis
            dataKey="subject"
            tick={{
              fill: "#8b8ba7",
              fontSize: 12,
              fontFamily: "Inter, sans-serif",
            }}
          />
          <Radar
            name="Score"
            dataKey="value"
            stroke="#6172f8"
            strokeWidth={2}
            fill="url(#radarGrad)"
            dot={{ fill: "#6172f8", strokeWidth: 2, r: 4 }}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        {data.map((d) => (
          <div key={d.subject} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "#6172f8" }}
            />
            <span className="text-xs" style={{ color: "#8b8ba7" }}>
              {d.subject}: <span style={{ color: "#c7d7fe" }}>{d.value}</span>
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
