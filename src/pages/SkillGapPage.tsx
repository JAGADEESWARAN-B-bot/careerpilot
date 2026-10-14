import React, { useState } from 'react';
import { UserProfile } from '../types';
import { benchmarkSkillsByRole, calculateSkillGap } from '../data/mockData';
import { SkillTag } from '../components/StatusNotice';
import { CheckCircle2, AlertTriangle, XCircle, ArrowRight, BookOpen, Code, Compass } from 'lucide-react';

interface SkillGapPageProps {
  userProfile: UserProfile;
  onNavigate: (route: string) => void;
}

export const SkillGapPage: React.FC<SkillGapPageProps> = ({ userProfile, onNavigate }) => {
  const roles = Object.keys(benchmarkSkillsByRole);
  const [selectedRole, setSelectedRole] = useState(roles[0]);

  const gapAnalysis = calculateSkillGap(userProfile.technicalSkills, selectedRole);

  return (
    <div className="space-y-8 pb-16">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">AI Skill Gap Analyzer</h1>
        <p className="text-sm text-slate-500">
          Compare your technical profile against verified industry benchmarks and prioritize what to learn next.
        </p>
      </div>

      {/* Role Picker Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          Target Role Benchmark
        </label>
        <div className="flex flex-wrap gap-2">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                selectedRole === role
                  ? 'bg-brand-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Top Match Gauge Card */}
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-brand-900 to-indigo-900 p-6 text-white shadow-md sm:p-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
            Benchmark Readiness
          </span>
          <h2 className="mt-1 text-2xl font-black">{selectedRole}</h2>
          <p className="mt-1 text-xs text-slate-300">
            {gapAnalysis.matchedSkills.length} verified competencies • {gapAnalysis.missingSkills.length} critical gaps identified
          </p>
        </div>

        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 text-3xl font-black text-cyan-300 border border-white/20 backdrop-blur">
          {gapAnalysis.matchScore}%
        </div>
      </div>

      {/* 3-Tier Breakdown */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Matched */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Matching Competencies ({gapAnalysis.matchedSkills.length})</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {gapAnalysis.matchedSkills.map((s) => (
              <SkillTag key={s} skill={s} matched={true} />
            ))}
          </div>
        </div>

        {/* To Improve */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-5 space-y-3">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <span>Skills to Deepen ({gapAnalysis.needsImprovementSkills.length})</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {gapAnalysis.needsImprovementSkills.map((s) => (
              <SkillTag key={s} skill={s} />
            ))}
          </div>
        </div>

        {/* Missing */}
        <div className="rounded-2xl border border-red-200 bg-red-50/40 p-5 space-y-3">
          <div className="flex items-center gap-2 text-red-800 font-bold text-sm">
            <XCircle className="h-4 w-4 text-red-600" />
            <span>Missing Benchmark Skills ({gapAnalysis.missingSkills.length})</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {gapAnalysis.missingSkills.map((s) => (
              <SkillTag key={s} skill={s} matched={false} />
            ))}
          </div>
        </div>
      </div>

      {/* Priority Action Plan */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">Priority Action Plan</h3>
        <div className="space-y-3">
          {gapAnalysis.priorityActions.map((action, i) => (
            <div
              key={i}
              className="flex flex-col justify-between gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{action.skill}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      action.priority === 'High'
                        ? 'bg-red-50 text-red-700'
                        : action.priority === 'Medium'
                        ? 'bg-amber-50 text-amber-800'
                        : 'bg-blue-50 text-blue-700'
                    }`}
                  >
                    {action.priority} Priority
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500">{action.reason}</p>
              </div>
              <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 self-start sm:self-auto">
                ⏱ {action.estimatedTimeToLearn}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Projects */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">Recommended Portfolio Projects</h3>
        <div className="space-y-3">
          {gapAnalysis.recommendedProjects.map((proj, i) => (
            <div key={i} className="rounded-xl border border-slate-100 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm">{proj.title}</h4>
                <span className="rounded bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-800">
                  {proj.complexity}
                </span>
              </div>
              <p className="text-xs text-slate-600">{proj.description}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {proj.keySkills.map((s) => (
                  <SkillTag key={s} skill={s} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA to Roadmap */}
      <div className="flex justify-end">
        <button
          onClick={() => onNavigate('roadmap')}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-900 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-brand-800 transition"
        >
          <span>Open Personalized Learning Roadmap</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
