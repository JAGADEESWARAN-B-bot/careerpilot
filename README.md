# AI CareerPilot — Smart Job & Skill Matching Platform

An AI-powered, full-stack career acceleration platform engineered for Computer Science, AI & Data Science students, and early-career software professionals. Features intelligent resume parsing, transparent skills-to-job matching, automated gap analysis, structured learning roadmaps, and an interactive AI mock interview terminal.

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
   - Interactive module checkboxes with persistent Room database tracking.
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
   - Ready for web deployment or export to GitHub and Vercel.

---

## 🛠️ Technology Stack

- **Android App**: Kotlin, Jetpack Compose, Material Design 3, Room Database, Coroutines & Flow, Retrofit / OkHttp
- **AI Engine**: Google Gemini 3.5 Flash (`v1beta/models/gemini-3.5-flash:generateContent`)
- **Cloud Database (Ready)**: Supabase PostgreSQL with Row Level Security (RLS)
- **Deployment Targets**: Android APK / Streaming Emulator, Vercel Serverless (Web export)

---

## 📁 Project Folder Structure

```
.
├── .env.example                     # Environment variable placeholders
├── metadata.json                    # AI Studio platform identification
├── app/
│   ├── build.gradle.kts             # Gradle build configuration & dependencies
│   └── src/main/
│       ├── AndroidManifest.xml      # Permissions and launcher activity
│       ├── java/com/example/
│       │   ├── MainActivity.kt      # Main host activity, Scaffold, and router
│       │   ├── ai/
│       │   │   └── GeminiCareerService.kt   # Gemini REST API & fallback logic
│       │   ├── data/
│       │   │   ├── SampleData.kt            # Curated jobs, benchmarks, roadmaps
│       │   │   ├── CareerPilotRepository.kt # Repository bridging Room & AI
│       │   │   └── local/
│       │   │       └── CareerPilotDatabase.kt # Room database, DAOs & entities
│       │   ├── model/
│       │   │   └── Models.kt                # Domain data models
│       │   └── ui/
│       │       ├── CareerPilotViewModel.kt  # MVI / MVVM StateFlow manager
│       │       ├── components/
│       │       │   └── CommonComponents.kt   # Top bar, nav, score badges, chips
│       │       ├── screens/
│       │       │   ├── LandingScreen.kt
│       │       │   ├── DashboardScreen.kt
│       │       │   ├── ProfileScreen.kt
│       │       │   ├── ResumeAnalyzerScreen.kt
│       │       │   ├── JobMatchingScreen.kt
│       │       │   ├── SkillGapScreen.kt
│       │       │   ├── RoadmapScreen.kt
│       │       │   ├── MockInterviewScreen.kt
│       │       │   ├── CareerExplorerScreen.kt
│       │       │   └── SettingsScreen.kt
│       │       └── theme/
│       │           ├── Color.kt             # Deep Blue, Cyan, Violet palette
│       │           └── Theme.kt             # Material 3 typography & styling
├── supabase/
│   └── schema.sql                   # 9-table SQL schema with RLS policies
└── README.md
```

---

## 🔐 Environment Variables & Secrets

In `.env.example`:
```env
# Google Gemini AI API key for resume analysis, skill gap, and mock interview
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE

# For Supabase Web / Cloud deployment
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Configuring in Google AI Studio
1. Open the **Secrets** panel in Google AI Studio.
2. Add a new secret named `GEMINI_API_KEY` and paste your Gemini API key.
3. The app automatically injects this via `BuildConfig.GEMINI_API_KEY` at build time.
4. If no key is set, the application operates gracefully with intelligent local rule-based evaluations.

---

## 🗄️ Supabase Database Setup

1. Log into your [Supabase Console](https://supabase.com).
2. Create a new project.
3. Navigate to the **SQL Editor** in the left sidebar.
4. Copy the entire contents of `supabase/schema.sql` and run the script.
5. The 9 tables will be provisioned with proper UUIDs, constraints, and Row Level Security:
   - `profiles`
   - `user_skills`
   - `resumes`
   - `resume_analyses`
   - `jobs`
   - `saved_jobs`
   - `learning_roadmaps`
   - `roadmap_progress`
   - `mock_interviews`

---

## 🚀 Building & Running

### Android Build
To build the application in this environment or locally via Gradle:
```bash
gradle :app:assembleDebug
```

---

## 🌐 Vercel Web Deployment Guide

To deploy the web portfolio version of AI CareerPilot to Vercel:

1. **Export Code to GitHub**:
   - Push the codebase to a GitHub repository:
     ```bash
     git init
     git add .
     git commit -m "Initial commit of AI CareerPilot"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/ai-careerpilot.git
     git push -u origin main
     ```
2. **Import to Vercel**:
   - Log into [Vercel](https://vercel.com) and click **Add New > Project**.
   - Select your GitHub repository.
3. **Environment Variables**:
   - In Vercel Project Settings > **Environment Variables**, add:
     - `VITE_SUPABASE_URL`: Your Supabase Project URL
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase public Anon key
     - `GEMINI_API_KEY`: Your Gemini API key
4. **Deploy**:
   - Click **Deploy**. Vercel will build the frontend and deploy serverless functions.
5. **Configure Supabase Auth Redirects**:
   - In Supabase Dashboard > Authentication > URL Configuration, add your Vercel deployment URL (e.g. `https://ai-careerpilot.vercel.app`) to **Redirect URLs**.

---

## 💡 Troubleshooting & Common Issues

- **Missing Gemini Key**: If `GEMINI_API_KEY` is not present, the app displays a clear setup message and switches automatically to local ATS parsing and rubric matching without crashing.
- **Database Persistence**: On Android, all changes (profile updates, bookmarks, roadmap module progress) persist automatically on device through SQLite/Room.
