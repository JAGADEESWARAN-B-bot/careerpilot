import React, { useState } from 'react';
import { UserProfile } from '../types';
import { isGeminiConfigured } from '../lib/gemini';
import { isSupabaseConfigured } from '../lib/supabase';
import { Sparkles, Database, Terminal, Shield, CheckCircle2, AlertTriangle, Copy, Check } from 'lucide-react';

interface SettingsPageProps {
  userProfile: UserProfile;
  onResetData: () => void;
  onSignOut: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  userProfile,
  onResetData,
  onSignOut,
}) => {
  const [copiedSql, setCopiedSql] = useState(false);
  const [showSql, setShowSql] = useState(false);

  const hasGemini = isGeminiConfigured();
  const hasSupabase = isSupabaseConfigured();

  const handleCopySql = () => {
    navigator.clipboard.writeText(`-- AI CareerPilot Supabase Schema
-- Run in Supabase SQL Editor:
-- Tables: profiles, user_skills, resumes, resume_analyses, jobs, saved_jobs, learning_roadmaps, roadmap_progress, mock_interviews.
-- See full script in /supabase/schema.sql`);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-16">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Settings & Cloud Deployment</h1>
        <p className="text-sm text-slate-500">
          Verify backend integrations, view database schemas, and configure Vercel edge deployment.
        </p>
      </div>

      {/* Account Info Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-slate-900">Signed In Account</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-800">{userProfile.fullName}</p>
            <p className="text-xs text-slate-500">{userProfile.email}</p>
          </div>
          <button
            onClick={onSignOut}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Gemini AI API Status Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-brand-700" />
            <h3 className="text-base font-bold text-slate-900">Google Gemini AI Engine</h3>
          </div>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
              hasGemini ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}
          >
            {hasGemini ? 'Configured ✓' : 'Not Configured'}
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {hasGemini
            ? 'Gemini 3.5 Flash is active and powering real-time resume audits, skill gap breakdowns, and interview evaluations.'
            : 'To enable live Gemini calls on Vercel, navigate to Project Settings > Environment Variables in your Vercel Dashboard, and add VITE_GEMINI_API_KEY. Until then, deterministic local keyword & ATS scoring runs automatically.'}
        </p>
      </div>

      {/* Supabase Cloud Database */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-cyan-700" />
            <h3 className="text-base font-bold text-slate-900">Supabase PostgreSQL & RLS</h3>
          </div>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
              hasSupabase ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-brand-50 text-brand-800 border border-brand-200'
            }`}
          >
            {hasSupabase ? 'Connected ✓' : 'Schema Ready'}
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          The complete 9-table schema with UUID primary keys, foreign keys, and Row Level Security (RLS) is generated at <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">/supabase/schema.sql</code>.
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setShowSql(!showSql)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100"
          >
            {showSql ? 'Hide SQL Overview' : 'View Tables & Security Policies'}
          </button>
          <button
            onClick={handleCopySql}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100"
          >
            {copiedSql ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copiedSql ? 'Copied Reference!' : 'Copy Script Path'}</span>
          </button>
        </div>

        {showSql && (
          <div className="rounded-xl bg-slate-900 p-4 font-mono text-[11px] text-cyan-300 leading-relaxed overflow-x-auto">
            <pre>{`-- 9 Tables with Row Level Security (RLS) in /supabase/schema.sql:
1. profiles (id, full_name, email, degree, department, grad_year, rls)
2. user_skills (id, user_id, skill_name, category, proficiency, rls)
3. resumes (id, user_id, file_name, parsed_text, rls)
4. resume_analyses (id, user_id, target_role, overall_score, ats_score, rls)
5. jobs (id, title, company, location, required_skills, public_read)
6. saved_jobs (id, user_id, job_id, rls)
7. learning_roadmaps (id, user_id, role_title, stages_json, rls)
8. roadmap_progress (id, user_id, module_id, is_completed, rls)
9. mock_interviews (id, user_id, target_role, average_score, rls)`}</pre>
          </div>
        )}
      </div>

      {/* Vercel 404 Prevention Guide */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Terminal className="h-5 w-5 text-slate-800" />
          <h3 className="text-base font-bold text-slate-900">Vercel 404 NOT_FOUND Resolution</h3>
        </div>

        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <p>
            If you ever see <code className="bg-red-50 text-red-700 px-1 py-0.5 rounded font-bold">404: NOT_FOUND</code> on Vercel, the verified causes and fixes are:
          </p>
          <ul className="space-y-1.5 list-disc pl-4 text-slate-600">
            <li>
              <strong>Missing Vite configuration:</strong> Ensured <code className="bg-slate-100 px-1 py-0.5 rounded">package.json</code> and <code className="bg-slate-100 px-1 py-0.5 rounded">vite.config.ts</code> output into <code className="bg-slate-100 px-1 py-0.5 rounded">dist</code>.
            </li>
            <li>
              <strong>Client-side SPA Routing:</strong> Configured <code className="bg-slate-100 px-1 py-0.5 rounded">vercel.json</code> with rewrite rule <code className="bg-slate-100 px-1 py-0.5 rounded">{`{"source": "/(.*)", "destination": "/index.html"}`}</code> so page refreshes and direct URLs never 404.
            </li>
            <li>
              <strong>Root Directory:</strong> Ensure the Vercel Root Directory is set to project root (<code className="bg-slate-100 px-1 py-0.5 rounded">.</code>) and Framework Preset is set to <strong>Vite</strong>.
            </li>
          </ul>
        </div>
      </div>

      {/* Reset Data */}
      <div className="rounded-2xl border border-red-100 bg-red-50/30 p-6 space-y-3">
        <h3 className="text-sm font-bold text-red-950">Danger Zone</h3>
        <p className="text-xs text-red-800">
          Reset all stored profile modifications, completed roadmaps, and interview transcripts to default baseline.
        </p>
        <button
          onClick={onResetData}
          className="rounded-xl border border-red-200 bg-white px-4 py-2 text-xs font-bold text-red-700 hover:bg-red-50 transition"
        >
          Reset to CS (AI & DS) Baseline
        </button>
      </div>
    </div>
  );
};
