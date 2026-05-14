# 🚀 HireReady — AI-Powered Interview Readiness Scorer
live now : https://hire-ready-a3azf2jmu-adwaitha31s-projects.vercel.app/

> **Know your Interview Readiness Score in under 2 minutes.**
> AI-driven assessment across 4 dimensions · Personalized archetype · 7-day action plan.

[![Live Demo](https://img.shields.io/badge/Live-Demo-6172f8?style=for-the-badge&logo=vercel)](https://hireready.vercel.app)
[![Demo Video](https://img.shields.io/badge/Demo-Video-a855f7?style=for-the-badge&logo=youtube)](https://drive.google.com/your-link-here)
[![Made with Groq](https://img.shields.io/badge/AI-Groq%20Llama%203.3-00f5a0?style=for-the-badge)](https://groq.com)

---

## 🎯 What is HireReady?

HireReady is a universal, AI-powered career intelligence tool that evaluates **any student's** interview readiness — from software engineers to marketing managers to lawyers — across **4 key dimensions** in under **2 minutes**.

It produces:
- An **overall score (0–100)** with a letter grade
- A unique **Interview Archetype** (e.g. "The Raw Diamond", "The Silent Genius")
- A **personalized 7-day action plan** with specific daily tasks
- **Domain-calibrated feedback** — not generic advice

---

## ✨ Key Features

| Feature | Description |
|---|---|
| ⏱️ **< 2 Min Flow** | Resume upload + 4-section form, engineered for speed |
| 🎭 **Interview Archetype** | AI assigns a unique personality type — highly shareable |
| 📡 **Skill Radar Chart** | Spider chart visualizing all 4 dimensions at a glance |
| 🎉 **Confetti Reveal** | Celebratory animation for scores ≥ 65 |
| 🌐 **10 Domains Supported** | Tech, Design, Marketing, Finance, Law, Healthcare & more |
| 🧠 **AI Score Engine** | Groq Llama 3.3 70B analyzes your full profile |
| 📄 **Resume Parsing** | PDF extraction → AI reads your actual achievements |
| 📅 **7-Day Action Plan** | Day-by-day tasks with time estimates and resources |
| 💡 **Hidden Strengths** | AI surfaces positives candidates don't realize they have |
| 🔗 **One-Click Share** | Copy archetype + score for LinkedIn in one click |

---

## 📊 Scoring Model

| Dimension | Weight | What We Measure |
|---|---|---|
| ⚡ **Technical / Domain Skills** | 35% | Proficiency, tools, certifications, depth |
| 📄 **Resume Quality** | 25% | ATS optimization, impact metrics, recency |
| 🗣️ **Communication** | 20% | Presentation comfort, English, mock interviews |
| 💼 **Portfolio Strength** | 20% | Live work, online presence, content creation |

---

## 🎭 Interview Archetypes

Each candidate receives a personalized archetype:

| Archetype | Profile Pattern |
|---|---|
| 💎 The Raw Diamond | Strong core skills, needs polish |
| 🚀 The Launchpad | Almost ready, needs final push |
| ⚡ The Silent Genius | Technically brilliant, communication gap |
| 🎯 The Sharp Shooter | Extremely focused and specialized |
| 🌱 The Rising Star | Early stage with exceptional trajectory |
| 🏆 The Interview Champion | Strong across all dimensions |
| 🦁 The Bold Beginner | Fearless attitude, building foundation |
| 🔮 The Hidden Gem | Underrated, undervalued, about to shine |

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Custom CSS |
| Animations | Framer Motion + canvas-confetti |
| Charts | Recharts (Radar Chart) |
| AI Engine | Groq (Llama 3.3 70B) |
| PDF Parsing | pdf-parse |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A Groq API key — [Get one free at console.groq.com](https://console.groq.com/keys) (no credit card, generous limits)

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/hireready.git
cd hireready

# Install dependencies
npm install

# Configure environment
echo "GROQ_API_KEY=your_key_here" > .env.local

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🔑 Environment Variables

```env
GROQ_API_KEY=gsk_your_groq_key_here
```

---

## 🌍 Deployment (Vercel)

```bash
npm install -g vercel
vercel --prod
```

Set `GROQ_API_KEY` in Vercel's environment variables dashboard.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── assess/route.ts          # AI scoring endpoint
│   │   └── parse-resume/route.ts   # PDF extraction endpoint
│   ├── globals.css                  # Design system & animations
│   ├── layout.tsx                   # Root layout + SEO metadata
│   ├── not-found.tsx               # 404 page
│   └── page.tsx                     # Main app state machine
├── components/
│   ├── Landing.tsx                  # Full marketing landing page
│   ├── ResumeUpload.tsx            # Drag-and-drop PDF uploader
│   ├── AssessmentForm.tsx          # 4-step multi-domain form
│   ├── AnalyzingScreen.tsx         # AI processing animation
│   ├── Results.tsx                  # Score + archetype + plan + insights
│   ├── ArchetypeCard.tsx           # Animated personality archetype card
│   ├── SkillRadarChart.tsx         # Spider chart component
│   └── ProgressHeader.tsx          # Sticky progress indicator
├── lib/
│   └── gemini.ts                    # Groq AI integration (Llama 3.3 70B)
└── types/
    └── assessment.ts                # TypeScript types + domain configs
```

---

## 🎬 Demo Video

📹 [Watch the 5-minute demo on Google Drive](https://drive.google.com/drive/folders/1PMM_Y0bZXQO6QD_N_CJyax3QnQe7MBmI?usp=drive_link)

---

## 💡 What Makes HireReady Unique

1. **Universal domain support** — Works for 10 different fields, not just CS
2. **Interview Archetype system** — Memorable, shareable personality type
3. **Resume + behavioral signal fusion** — Holistic scoring, not just resume parsing
4. **Hidden Strengths AI** — Surfaces positives candidates overlook
5. **Weighted scoring model** — Technically rigorous and defensible
6. **7-day micro-action plan** — Specific tasks with time estimates, not generic advice
7. **Confetti on reveal** — Delightful UX moment that users screenshot and share


