-- ==============================================================================
-- AI CareerPilot — Smart Job & Skill Matching Platform
-- Supabase PostgreSQL Database Schema with Row Level Security (RLS)
-- Suitable for production deployment and B.Sc Computer Science (AI & DS) portfolio
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
-- Extends Supabase auth.users with educational background and target careers
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    degree TEXT DEFAULT 'Bachelor of Science',
    department TEXT DEFAULT 'Artificial Intelligence & Data Science',
    graduation_year INTEGER DEFAULT 2026,
    experience_level TEXT DEFAULT 'Final-Year Student / Entry-Level',
    preferred_work_location TEXT[] DEFAULT ARRAY['Remote', 'Bangalore', 'Hybrid'],
    preferred_job_roles TEXT[] DEFAULT ARRAY['AI Engineer', 'Data Scientist'],
    bio TEXT DEFAULT 'Final-year B.Sc Computer Science (AI & DS) student passionate about modern AI systems.',
    profile_completion INTEGER DEFAULT 90,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- 2. USER_SKILLS TABLE
-- Stores technical and soft skills mapped to users with proficiency tiers
CREATE TABLE IF NOT EXISTS public.user_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Language', 'Framework', 'AI/ML', 'Cloud/DevOps', 'Database', 'Soft Skill')),
    proficiency TEXT DEFAULT 'Intermediate' CHECK (proficiency IN ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, skill_name)
);

ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own skills"
    ON public.user_skills FOR ALL
    USING (auth.uid() = user_id);

-- 3. RESUMES TABLE
-- Uploaded resume documents and metadata
CREATE TABLE IF NOT EXISTS public.resumes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_url TEXT,
    parsed_text TEXT NOT NULL,
    file_size_bytes INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own uploaded resumes"
    ON public.resumes FOR ALL
    USING (auth.uid() = user_id);

-- 4. RESUME_ANALYSES TABLE
-- Stores Gemini AI audits and ATS compatibility scores
CREATE TABLE IF NOT EXISTS public.resume_analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    resume_id UUID REFERENCES public.resumes(id) ON DELETE SET NULL,
    target_role TEXT NOT NULL,
    overall_score INTEGER NOT NULL CHECK (overall_score BETWEEN 0 AND 100),
    ats_score INTEGER NOT NULL CHECK (ats_score BETWEEN 0 AND 100),
    summary TEXT NOT NULL,
    extracted_skills TEXT[] DEFAULT '{}',
    strengths TEXT[] DEFAULT '{}',
    missing_skills TEXT[] DEFAULT '{}',
    improvement_suggestions TEXT[] DEFAULT '{}',
    recommended_careers TEXT[] DEFAULT '{}',
    is_gemini_analyzed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.resume_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view and manage own resume analyses"
    ON public.resume_analyses FOR ALL
    USING (auth.uid() = user_id);

-- 5. JOBS TABLE
-- Curated verified jobs repository. Publicly readable, admin manageable.
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    work_type TEXT NOT NULL CHECK (work_type IN ('Remote', 'Hybrid', 'On-site')),
    experience_level TEXT NOT NULL,
    salary_range TEXT NOT NULL,
    department TEXT NOT NULL,
    description TEXT NOT NULL,
    required_skills TEXT[] NOT NULL,
    preferred_skills TEXT[] DEFAULT '{}',
    responsibilities TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated or public can browse active job listings
CREATE POLICY "Public can view active jobs"
    ON public.jobs FOR SELECT
    USING (is_active = true);

-- 6. SAVED_JOBS TABLE
-- Bookmarked jobs per user
CREATE TABLE IF NOT EXISTS public.saved_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
    saved_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, job_id)
);

ALTER TABLE public.saved_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage saved jobs"
    ON public.saved_jobs FOR ALL
    USING (auth.uid() = user_id);

-- 7. LEARNING_ROADMAPS TABLE
-- Master curriculums and custom AI-generated roadmaps
CREATE TABLE IF NOT EXISTS public.learning_roadmaps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    role_title TEXT NOT NULL,
    description TEXT NOT NULL,
    stages JSONB NOT NULL,
    is_template BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.learning_roadmaps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view templates and their own roadmaps"
    ON public.learning_roadmaps FOR SELECT
    USING (is_template = true OR auth.uid() = user_id);

CREATE POLICY "Users can create and edit their own roadmaps"
    ON public.learning_roadmaps FOR ALL
    USING (auth.uid() = user_id);

-- 8. ROADMAP_PROGRESS TABLE
-- Tracks completed milestones per user
CREATE TABLE IF NOT EXISTS public.roadmap_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    roadmap_id UUID REFERENCES public.learning_roadmaps(id) ON DELETE CASCADE,
    module_id TEXT NOT NULL,
    is_completed BOOLEAN DEFAULT true,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, module_id)
);

ALTER TABLE public.roadmap_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own roadmap progress"
    ON public.roadmap_progress FOR ALL
    USING (auth.uid() = user_id);

-- 9. MOCK_INTERVIEWS TABLE
-- Stores interactive interview sessions and AI rubric feedback
CREATE TABLE IF NOT EXISTS public.mock_interviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    target_role TEXT NOT NULL,
    difficulty_level TEXT NOT NULL,
    average_score INTEGER NOT NULL CHECK (average_score BETWEEN 0 AND 100),
    questions_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.mock_interviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view and save their own mock interviews"
    ON public.mock_interviews FOR ALL
    USING (auth.uid() = user_id);

-- Create performance indexes
CREATE INDEX IF NOT EXISTS idx_user_skills_user_id ON public.user_skills(user_id);
CREATE INDEX IF NOT EXISTS idx_resume_analyses_user_id ON public.resume_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_jobs_user_id ON public.saved_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_jobs_required_skills ON public.jobs USING GIN(required_skills);
CREATE INDEX IF NOT EXISTS idx_roadmap_progress_user ON public.roadmap_progress(user_id);
