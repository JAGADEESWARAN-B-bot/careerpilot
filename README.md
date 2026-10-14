# AI CareerPilot — Smart Job & Skill Matching Platform

An AI-powered, full-stack career acceleration platform engineered for Computer Science, AI & Data Science students, and early-career software professionals. Features intelligent resume parsing, transparent skills-to-job matching, automated gap analysis, structured learning roadmaps, and an interactive AI mock interview terminal.

---

## 🛠️ Vercel 404 NOT_FOUND Resolution

### The Root Cause
When accessing the deployed site on Vercel, the edge router returned:
```
This page doesn’t exist. It may have been moved, removed, or never existed. 404 NOT_FOUND
Error reference: bom1::b6sxp-1791969899727-f6c8f654597d
```

**Why this happened**:
1. **Missing Web Application Manifest & Entry Point**: The project root lacked `package.json`, `index.html`, and `vite.config.ts`.
2. **Missing Build Artifacts & Output Directory**: Vercel expects a static bundle in `dist/` (for Vite), but no build output directory existed.
3. **Missing SPA Rewrites in `vercel.json`**: Client-side single page applications (SPAs) require an edge rewrite rule (`/(.*) -> /index.html`) so that deep URLs and page refreshes do not trigger edge network 404s.

### How It Was Fixed:
1. **Created complete React 18 + TypeScript + Vite + Tailwind CSS frontend** in `src/` matching all CareerPilot features.
2. **Created `vercel.json`** specifying the Vite framework preset, `dist` output directory, and SPA rewrite:
   ```json
   {
     "framework": "vite",
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "cleanUrls": true,
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```
3. **Created `api/gemini.ts`** for serverless server-side AI execution.
4. **Compiled and Verified**: Executed `npm run build` (`tsc && vite build`) generating the production bundle in `dist/` with zero errors.

---

## 🌟 Main Features

1. **Smart Job & Skill Matching**
   - Curated technical roles (AI Engineer, Data Scientist, ML Engineer, Full-Stack, Backend, etc.).
   - Transparent skills-matching algorithm showing exact match % broken down across Skills (60%), Experience (20%), and Degree (20%).
   - Search by role and required skills; filter by location (Remote, Hybrid, On-site).
   - Instant local bookmarking/saving with persistence.

2. **AI Resume Analyzer**
   - Parses technical resumes and scans against live role requirements.
   - Calculates candidate ATS compatibility scores and overall benchmark alignment.
   - Identifies candidate strengths with metrics, missing critical tools, and concrete suggestions.
   - Dual-mode architecture: Real-time **Gemini 3.5 Flash** analysis when configured, and deterministic local ATS evaluation fallback.

3. **AI Skill Gap Analyzer**
   - Select any target role to compare current student skills against industry benchmarks.
   - Three-tier breakdown: Matching Competencies, Skills to Deepen, and Critical Missing Skills.
   - Priority Action Plan detailing learning timeframes, recommended documentation, and practical portfolio project ideas.

4. **Personalized Learning Roadmaps**
   - Milestone-driven curricula: Stage 1 (Foundations), Stage 2 (Core ML/DL Engineering), and Stage 3 (Generative AI, LLMs & Production MLOps).
   - Interactive module checkboxes with persistent state tracking.
   - Practical hands-on lab exercises and direct links to official documentation.

5. **AI Mock Interview Terminal**
   - Role and difficulty-tailored technical questioning (Entry-Level / Fresher to Senior).
   - Evaluates candidate answers across Technical Depth (0-10), Clarity (0-10), and Relevance (0-10).
   - Delivers evaluator strengths, areas to improve, and model exemplar answers.
   - Preserves session transcripts and average scores.

6. **Career Explorer**
   - Deep-dive guides for 9 technical tracks with typical responsibilities, compensation ranges, essential skills, and portfolio project suggestions.

7. **Supabase & Vercel Production Readiness**
   - Complete 9-table PostgreSQL schema (`/supabase/schema.sql`) with Row Level Security (RLS) policies.
   - Serverless API handler in `/api/gemini.ts`.

---

## 📁 Project Folder Structure

```
.
├── index.html                       # HTML application entry point
├── package.json                     # NPM dependencies & build scripts
├── vite.config.ts                   # Vite build configuration (outDir: dist)
├── tsconfig.json                    # TypeScript compiler configuration
├── tailwind.config.js               # Tailwind design system tokens
├── vercel.json                      # Vercel deployment framework & rewrite rules
├── .env.example                     # Environment variable placeholders
├── dist/                            # Production build output
├── api/
│   └── gemini.ts                    # Vercel serverless function for AI
├── src/
│   ├── main.tsx                     # React DOM root render
│   ├── App.tsx                      # Root component, router & state manager
│   ├── index.css                    # Tailwind CSS directives
│   ├── types/
│   │   └── index.ts                 # Domain TypeScript interfaces
│   ├── lib/
│   │   ├── gemini.ts                # Gemini API client & local fallback
│   │   └── supabase.ts              # Supabase client with safe initialization
│   ├── data/
│   │   └── mockData.ts              # Curated datasets, jobs, roadmaps, benchmarks
│   ├── components/
│   │   ├── Navbar.tsx               # Header navigation & AI status indicator
│   │   ├── Footer.tsx               # Platform footer & tech stack
│   │   └── StatusNotice.tsx         # Reusable badges, notices & tags
│   └── pages/
│       ├── LandingPage.tsx          # Hero, how it works, FAQs
│       ├── DashboardPage.tsx        # Overview, metrics & quick accelerators
│       ├── ProfilePage.tsx          # Technical skills & education editor
│       ├── ResumeAnalyzerPage.tsx   # ATS & Gemini resume scanner
│       ├── JobMatchingPage.tsx      # Job search, match score & apply
│       ├── SkillGapPage.tsx         # Competency benchmark & action plan
│       ├── RoadmapPage.tsx          # 3-stage milestone curriculum
│       ├── InterviewPage.tsx        # Q&A interview coach with rubric
│       ├── CareerExplorerPage.tsx   # 9 technical career deep dives
│       ├── SettingsPage.tsx         # Supabase & Vercel deployment docs
│       ├── AuthModal.tsx            # Sign in / Sign up dialog
│       └── NotFoundPage.tsx         # 404 fallback page
├── supabase/
│   └── schema.sql                   # 9-table PostgreSQL schema with RLS
└── app/                             # Android Jetpack Compose codebase
```

---

## 🚀 Building & Deploying

### Local Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
```
Build output is generated into `dist/`.

### Vercel Deployment Settings
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Root Directory**: `.` (leave as root)

### Environment Variables on Vercel:
Add the following in Vercel **Project Settings > Environment Variables**:
- `GEMINI_API_KEY`: Your Google Gemini API key
- `VITE_GEMINI_API_KEY`: (Optional) Your Gemini API key for client-side direct calls
- `VITE_SUPABASE_URL`: Your Supabase Project URL (`https://your-project.supabase.co`)
- `VITE_SUPABASE_ANON_KEY`: Your Supabase public anonymous API key
