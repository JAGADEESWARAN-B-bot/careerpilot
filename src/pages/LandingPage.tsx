import React from 'react';
import { ArrowRight, Sparkles, Target, FileText, CheckCircle2, TrendingUp, Layers, HelpCircle } from 'lucide-react';
import { careerPaths } from '../data/mockData';

interface LandingPageProps {
  onNavigate: (route: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-brand-900 via-indigo-900 to-slate-950 px-6 py-20 text-center text-white shadow-xl sm:px-12 sm:py-28">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-white/10 px-4 py-1.5 text-xs font-semibold text-cyan-300 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI-Driven Career Matching & Skill Intelligence</span>
          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Your AI-Powered Career Journey <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300">Starts Here</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base text-slate-300 sm:text-lg">
            Bridge academic learning with market requirements. Match your competencies against verified tech roles, analyze resumes with ATS metrics, bridge skill gaps, and practice AI mock interviews.
          </p>

          <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
            <button
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg hover:bg-cyan-300 transition"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => onNavigate('explorer')}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/20 transition backdrop-blur"
            >
              <span>Explore 9 Tech Careers</span>
            </button>
          </div>
        </div>
      </section>

      {/* Core Platform Features */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Core Platform Capabilities
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Engineered specifically for Computer Science, AI, and Software Engineering candidates
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div
            onClick={() => onNavigate('jobs')}
            className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-brand-300"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">Smart Job Matching</h3>
            <p className="mt-2 text-sm text-slate-600">
              Transparent match score percentage calculated from real skills (60%), experience (20%), and degree relevance (20%).
            </p>
          </div>

          <div
            onClick={() => onNavigate('resume')}
            className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-brand-300"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">AI Resume Analyzer</h3>
            <p className="mt-2 text-sm text-slate-600">
              Scan candidate resumes with Gemini 3.5 Flash or local ATS rubric. Review candidate strengths, missing skills, and suggestions.
            </p>
          </div>

          <div
            onClick={() => onNavigate('skill-gap')}
            className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-brand-300"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">AI Skill Gap Analyzer</h3>
            <p className="mt-2 text-sm text-slate-600">
              Compare your current competencies against live role benchmarks. Prioritize high-impact learning items with estimated timelines.
            </p>
          </div>

          <div
            onClick={() => onNavigate('roadmap')}
            className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-brand-300"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">Personalized Roadmaps</h3>
            <p className="mt-2 text-sm text-slate-600">
              Three-stage curricula covering Foundations, Machine Learning Core, and Production Generative AI with interactive checkboxes.
            </p>
          </div>

          <div
            onClick={() => onNavigate('interview')}
            className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-brand-300"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">AI Mock Interview</h3>
            <p className="mt-2 text-sm text-slate-600">
              Practice real technical interview questions with instant evaluation of technical depth, clarity, and model exemplar answers.
            </p>
          </div>

          <div
            onClick={() => onNavigate('explorer')}
            className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-brand-300"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">Career Explorer</h3>
            <p className="mt-2 text-sm text-slate-600">
              Explore 9 technical paths with typical responsibilities, compensation benchmarks, essential skills, and portfolio projects.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          How AI CareerPilot Works
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-900 font-bold text-white">
              1
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Build Your Profile</h4>
              <p className="mt-1 text-sm text-slate-600">
                Input your degree, department, project portfolio, and technical skills.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-900 font-bold text-white">
              2
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Audit & Match</h4>
              <p className="mt-1 text-sm text-slate-600">
                Scan your resume or browse opportunities with instant transparent % match scores.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-900 font-bold text-white">
              3
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Close Gaps & Interview</h4>
              <p className="mt-1 text-sm text-slate-600">
                Follow milestone roadmaps and rehearse real technical interviews with AI coaching.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Careers */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              High-Growth Career Paths
            </h2>
            <p className="text-sm text-slate-500">Benchmark roles for modern software and AI professionals</p>
          </div>
          <button
            onClick={() => onNavigate('explorer')}
            className="text-sm font-semibold text-brand-700 hover:text-brand-900"
          >
            View All (9) →
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {careerPaths.slice(0, 3).map((path) => (
            <div
              key={path.id}
              onClick={() => onNavigate('explorer')}
              className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-brand-700">{path.category}</span>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
                  {path.growthRate}
                </span>
              </div>
              <h3 className="mt-2 text-base font-bold text-slate-900">{path.title}</h3>
              <p className="mt-1 text-xs text-slate-500 line-clamp-2">{path.shortDescription}</p>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-700">
                {path.averageSalary}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="rounded-3xl border border-slate-200 bg-white p-8">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-brand-800" />
          <h2 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
        </div>
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-slate-100 p-4">
            <h4 className="font-bold text-slate-900">How is the Job Match Score calculated?</h4>
            <p className="mt-1 text-sm text-slate-600">
              The score is calculated transparently using 3 weighted pillars: Technical Skills Match (60%), Experience Level fit (20%), and Degree relevance (20%). We never guarantee employment.
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 p-4">
            <h4 className="font-bold text-slate-900">What happens if Gemini API is not configured?</h4>
            <p className="mt-1 text-sm text-slate-600">
              AI CareerPilot has a built-in deterministic local evaluation engine that parses keywords, computes ATS scores, and scores interview responses without crashing or blocking the UI.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
