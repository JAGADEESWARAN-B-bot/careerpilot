import React from 'react';
import { UserProfile, LearningRoadmap, ResumeAnalysis } from '../types';
import { ArrowRight, BookOpen, Briefcase, CheckCircle2, FileText, Sparkles, User, Award } from 'lucide-react';
import { SkillTag } from '../components/StatusNotice';

interface DashboardPageProps {
  userProfile: UserProfile;
  savedJobsCount: number;
  roadmap: LearningRoadmap;
  resumeAnalyses: ResumeAnalysis[];
  onNavigate: (route: string) => void;
  onSelectResumeAnalysis: (analysis: ResumeAnalysis) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  userProfile,
  savedJobsCount,
  roadmap,
  resumeAnalyses,
  onNavigate,
  onSelectResumeAnalysis,
}) => {
  const totalModules = roadmap.stages.reduce((acc, stage) => acc + stage.modules.length, 0);
  const completedModules = roadmap.stages.reduce(
    (acc, stage) => acc + stage.modules.filter((m) => m.isCompleted).length,
    0
  );
  const roadmapPercent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  return (
    <div className="space-y-8 pb-16">
      {/* Welcome Banner */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-brand-900 via-indigo-900 to-brand-950 p-6 text-white shadow-lg sm:p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-cyan-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Academic Portfolio & Career Acceleration</span>
            </span>
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              Welcome back, {userProfile.fullName}!
            </h1>
            <p className="text-sm text-slate-300">
              {userProfile.degree} in {userProfile.department} • Graduating Class of {userProfile.graduationYear}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('profile')}
              className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur hover:bg-white/20 transition"
            >
              <User className="h-4 w-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Profile Completion Bar */}
        <div className="mt-8 border-t border-white/10 pt-4">
          <div className="flex justify-between text-xs font-semibold text-slate-300">
            <span>Profile Completion</span>
            <span>{userProfile.profileCompletion}%</span>
          </div>
          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-cyan-400 transition-all duration-500"
              style={{ width: `${userProfile.profileCompletion}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div
          onClick={() => onNavigate('profile')}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Target Roles</span>
            <Award className="h-4 w-4 text-brand-700" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">{userProfile.preferredRoles.length}</p>
          <p className="mt-1 text-xs text-slate-500">{userProfile.preferredRoles.join(', ')}</p>
        </div>

        <div
          onClick={() => onNavigate('jobs')}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Saved Jobs</span>
            <Briefcase className="h-4 w-4 text-violet-700" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">{savedJobsCount}</p>
          <p className="mt-1 text-xs text-slate-500">Bookmarked positions</p>
        </div>

        <div
          onClick={() => onNavigate('profile')}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Skills</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-700" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">{userProfile.technicalSkills.length}</p>
          <p className="mt-1 text-xs text-slate-500">Verified competencies</p>
        </div>

        <div
          onClick={() => onNavigate('roadmap')}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Roadmap</span>
            <BookOpen className="h-4 w-4 text-cyan-700" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">{roadmapPercent}%</p>
          <p className="mt-1 text-xs text-slate-500">{completedModules}/{totalModules} modules</p>
        </div>
      </div>

      {/* Career Accelerators Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Career Accelerators</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            onClick={() => onNavigate('resume')}
            className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-400 hover:shadow"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <FileText className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-sm font-bold text-slate-900 group-hover:text-brand-900">
              Scan Resume
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              ATS compatibility & AI strengths audit
            </p>
          </div>

          <div
            onClick={() => onNavigate('skill-gap')}
            className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-cyan-400 hover:shadow"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-sm font-bold text-slate-900 group-hover:text-cyan-900">
              Skill Gap
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Compare skills against live benchmark
            </p>
          </div>

          <div
            onClick={() => onNavigate('jobs')}
            className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-violet-400 hover:shadow"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
              <Briefcase className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-sm font-bold text-slate-900 group-hover:text-violet-900">
              Smart Jobs
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Match score ranked opportunities
            </p>
          </div>

          <div
            onClick={() => onNavigate('interview')}
            className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-amber-400 hover:shadow"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-sm font-bold text-slate-900 group-hover:text-amber-900">
              Mock Interview
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Technical Q&A with AI rubric feedback
            </p>
          </div>
        </div>
      </div>

      {/* Skills Overview */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Technical Competencies</h2>
            <p className="text-xs text-slate-500">Skills actively factored into job match algorithms</p>
          </div>
          <button
            onClick={() => onNavigate('profile')}
            className="text-xs font-semibold text-brand-700 hover:text-brand-900"
          >
            Manage Skills →
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {userProfile.technicalSkills.map((skill) => (
            <SkillTag key={skill} skill={skill} />
          ))}
        </div>
      </div>

      {/* Roadmap Progress Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Learning Roadmap Milestone</h2>
            <p className="text-xs text-slate-500">{roadmap.role}</p>
          </div>
          <span className="text-xs font-bold text-brand-800">
            {completedModules} of {totalModules} Completed
          </span>
        </div>

        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-brand-700 transition-all duration-500"
            style={{ width: `${roadmapPercent}%` }}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => onNavigate('roadmap')}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-900 px-4 py-2 text-xs font-bold text-white hover:bg-brand-800 transition"
          >
            <span>Continue Curriculum Modules</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Recent Resume Scans */}
      {resumeAnalyses.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Recent Resume Audits</h2>
            <button
              onClick={() => onNavigate('resume')}
              className="text-xs font-semibold text-brand-700 hover:text-brand-900"
            >
              All Audits →
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {resumeAnalyses.slice(0, 2).map((analysis) => (
              <div
                key={analysis.id}
                onClick={() => {
                  onSelectResumeAnalysis(analysis);
                  onNavigate('resume');
                }}
                className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-300"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{analysis.candidateName}</span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
                    {analysis.overallScore}% Score
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-500 line-clamp-2">{analysis.summary}</p>
                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
                  <span>ATS: {analysis.atsScore}%</span>
                  <span>{analysis.extractedSkills.length} skills found</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
