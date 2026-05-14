import Groq from "groq-sdk";
import type { UserProfile, AssessmentResult, DimensionScore } from "@/types/assessment";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

function getGrade(score: number): "A" | "B" | "C" | "D" | "F" {
  if (score >= 85) return "A";
  if (score >= 70) return "B";
  if (score >= 55) return "C";
  if (score >= 40) return "D";
  return "F";
}

function getLevel(score: number): AssessmentResult["level"] {
  if (score >= 85) return "Expert";
  if (score >= 70) return "Interview-Ready";
  if (score >= 55) return "Almost Ready";
  if (score >= 40) return "Needs Work";
  return "Beginner";
}

function getTagline(score: number, name: string): string {
  const first = name.split(" ")[0];
  if (score >= 85) return `${first}, you're primed to ace your next interview! 🚀`;
  if (score >= 70) return `${first}, you're almost there — a few tweaks and you're unstoppable!`;
  if (score >= 55) return `${first}, solid foundation — let's sharpen the edges together.`;
  if (score >= 40) return `${first}, you've got potential — here's exactly what to work on.`;
  return `${first}, every expert started here. Your personalized plan starts now.`;
}

export async function generateAssessment(profile: UserProfile): Promise<AssessmentResult> {
  const prompt = `You are an expert career coach specializing in interview preparation across all industries. Analyze this candidate profile and return a structured JSON assessment tailored to their specific domain.

CANDIDATE PROFILE:
- Name: ${profile.name}
- Target Role: ${profile.targetRole}
- Domain / Field: ${profile.domain || "tech"}
- Experience Level: ${profile.experienceLevel}
- Primary Skills: ${profile.primarySkills.join(", ") || "Not specified"}
- Domain Proficiency Level: ${profile.domainProficiency}
- Has Relevant Certifications: ${profile.hasCertifications}
- Has Live/Public Work: ${profile.hasLiveProjects} (${profile.projectCount} projects/samples)
- Has Blog/Articles/Content: ${profile.hasBlog}
- Portfolio URL: ${profile.portfolioUrl || "Not provided"}
- Portfolio Analysis: ${profile.portfolioData?.summary || "Not analyzed"}
${profile.portfolioData?.type === "github" ? `- GitHub Stats: ${profile.portfolioData.publicRepos} public repos, ${profile.portfolioData.followers} followers, ${profile.portfolioData.totalStars} total stars, Top languages: ${profile.portfolioData.topLanguages?.join(", ")}` : ""}
- Presentation Comfort (1-5): ${profile.presentationComfort}
- English Speaking Confident: ${profile.hasSpokenEnglish}
- Has Given Mock Interviews: ${profile.hasGivenMockInterview}
- Resume Last Updated: ${profile.resumeLastUpdated}

IMPORTANT: This candidate is in the "${profile.domain || "tech"}" domain. Evaluate them against standards for ${profile.targetRole} roles in that field — NOT against generic software engineering standards. For example, if they are in marketing, assess marketing-relevant skills, not coding. Tailor ALL feedback, scores, and action items to their specific domain.

RESUME CONTENT (extracted):
${profile.resumeText ? profile.resumeText.substring(0, 2000) : "No resume provided"}

Respond ONLY with a valid JSON object (no markdown, no code blocks, no extra text) with this exact structure:
{
  "technical": {
    "score": 72,
    "strengths": ["specific strength 1", "specific strength 2"],
    "gaps": ["specific gap 1", "specific gap 2"],
    "topAction": "single most important action to take this week"
  },
  "resume": {
    "score": 65,
    "strengths": ["specific strength 1", "specific strength 2"],
    "gaps": ["specific gap 1", "specific gap 2"],
    "topAction": "single most important action to take this week"
  },
  "communication": {
    "score": 60,
    "strengths": ["specific strength 1", "specific strength 2"],
    "gaps": ["specific gap 1", "specific gap 2"],
    "topAction": "single most important action to take this week"
  },
  "portfolio": {
    "score": 55,
    "strengths": ["specific strength 1", "specific strength 2"],
    "gaps": ["specific gap 1", "specific gap 2"],
    "topAction": "single most important action to take this week"
  },
  "weeklyPlan": [
    { "day": "Day 1-2", "task": "specific actionable task", "duration": "2 hrs", "category": "technical", "priority": "high", "resource": "https://leetcode.com" },
    { "day": "Day 3", "task": "specific actionable task", "duration": "1 hr", "category": "resume", "priority": "high" },
    { "day": "Day 4", "task": "specific actionable task", "duration": "1.5 hrs", "category": "communication", "priority": "medium" },
    { "day": "Day 5", "task": "specific actionable task", "duration": "2 hrs", "category": "portfolio", "priority": "high" },
    { "day": "Day 6", "task": "specific actionable task", "duration": "1 hr", "category": "technical", "priority": "medium" },
    { "day": "Day 7", "task": "specific actionable task", "duration": "30 min", "category": "communication", "priority": "low" }
  ],
  "topPriority": "the single most impactful thing they should do first",
  "estimatedReadyInDays": 30,
  "resumeInsights": ["resume insight 1", "resume insight 2", "resume insight 3"],
  "hiddenStrengths": ["hidden strength 1", "hidden strength 2"],
  "archetype": {
    "name": "The Raw Diamond",
    "emoji": "💎",
    "tagline": "Rough edges, brilliant potential",
    "description": "2-3 sentence personalized description of this candidate's profile pattern, their standout trait, and what makes them uniquely positioned for success",
    "color": "#a855f7"
  }
}

For the archetype, choose ONE that best fits the candidate's profile pattern. Examples (but you can create unique ones):
- 💎 The Raw Diamond — strong core skills, needs polish
- 🚀 The Launchpad — almost ready, just needs the final push
- ⚡ The Silent Genius — technically brilliant, communication gap
- 🎯 The Sharp Shooter — extremely focused and specialized
- 🌱 The Rising Star — early stage with exceptional trajectory
- 🏆 The Interview Champion — strong across all dimensions
- 🦁 The Bold Beginner — fearless attitude, building foundation
- 🔮 The Hidden Gem — underrated, undervalued, about to shine
- 🎨 The Creative Force — unique perspective, nontraditional background
- 📊 The Analytical Mind — data-driven, methodical, precise
Create a fitting archetype color (hex code) that reflects their personality.

Be specific, personalized, and encouraging. Reference their actual skills and target role. Make tasks truly actionable.`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a career assessment expert. Always respond with valid JSON only — no markdown, no code blocks, no extra text before or after the JSON object.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    });

    const text = completion.choices[0]?.message?.content?.trim() || "";

    // Strip any accidental markdown fences
    const jsonText = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const parsed = JSON.parse(jsonText);

    const dimensionConfig = {
      technical: { name: "Technical Skills", icon: "⚡", color: "#6172f8" },
      resume: { name: "Resume Quality", icon: "📄", color: "#00f5a0" },
      communication: { name: "Communication", icon: "🗣️", color: "#f59e0b" },
      portfolio: { name: "Portfolio", icon: "💼", color: "#a855f7" },
    };

    const dimensions: AssessmentResult["dimensions"] = {} as AssessmentResult["dimensions"];

    for (const key of ["technical", "resume", "communication", "portfolio"] as const) {
      const d = parsed[key];
      dimensions[key] = {
        name: dimensionConfig[key].name,
        score: Math.min(100, Math.max(0, Number(d.score))),
        grade: getGrade(Number(d.score)),
        icon: dimensionConfig[key].icon,
        color: dimensionConfig[key].color,
        strengths: d.strengths || [],
        gaps: d.gaps || [],
        topAction: d.topAction || "",
      } as DimensionScore;
    }

    const overallScore = Math.round(
      dimensions.technical.score * 0.35 +
        dimensions.resume.score * 0.25 +
        dimensions.communication.score * 0.2 +
        dimensions.portfolio.score * 0.2
    );

    return {
      overallScore,
      grade: getGrade(overallScore),
      level: getLevel(overallScore),
      tagline: getTagline(overallScore, profile.name),
      archetype: parsed.archetype || {
        name: "The Rising Star",
        emoji: "🌱",
        tagline: "Building your path to success",
        description: "You have a unique combination of skills and drive. With focused effort on the right areas, you're on track to stand out in interviews.",
        color: "#6172f8",
      },
      dimensions,
      weeklyPlan: parsed.weeklyPlan || [],
      topPriority: parsed.topPriority || "",
      estimatedReadyInDays: Number(parsed.estimatedReadyInDays) || 30,
      resumeInsights: parsed.resumeInsights || [],
      hiddenStrengths: parsed.hiddenStrengths || [],
    };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Groq API error:", msg);
    throw new Error(`Assessment failed: ${msg}`);
  }
}
