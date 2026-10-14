import React, { useState } from 'react';
import { careerPaths } from '../data/mockData';
import { CareerPathDetail } from '../types';
import { SkillTag } from '../components/StatusNotice';
import { TrendingUp, ArrowRight, X, Briefcase, Award } from 'lucide-react';

interface CareerExplorerPageProps {
  onNavigate: (route: string) => void;
}

export const CareerExplorerPage: React.FC<CareerExplorerPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeCareer, setActiveCareer] = useState<CareerPathDetail | null>(null);

  const categories = ['All', 'Artificial Intelligence', 'Data & Analytics', 'Software Engineering', 'Infrastructure & DevOps'];

  const filtered = selectedCategory === 'All'
    ? careerPaths
    : careerPaths.filter((c) => c.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="space-y-8 pb-16">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Technical Career Explorer</h1>
        <p className="text-sm text-slate-500">
          Detailed competencies, compensation benchmarks, and portfolio suggestions across 9 key engineering roles.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
              selectedCategory === cat
                ? 'bg-brand-900 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Career Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((career) => (
          <div
            key={career.id}
            onClick={() => setActiveCareer(career)}
            className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-brand-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-brand-700">{career.category}</span>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
                  {career.growthRate}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900">{career.title}</h3>
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{career.shortDescription}</p>

              <div className="rounded-lg bg-slate-50 p-2 text-xs font-semibold text-slate-700 border border-slate-100">
                💰 {career.averageSalary}
              </div>

              <div className="flex flex-wrap gap-1 pt-1">
                {career.essentialSkills.slice(0, 4).map((s) => (
                  <SkillTag key={s} skill={s} />
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-bold text-brand-800">
              <span>View Deep Dive</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Deep Dive Modal */}
      {activeCareer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8 space-y-6">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase text-brand-700">{activeCareer.category}</span>
                <h2 className="text-2xl font-black text-slate-900">{activeCareer.title}</h2>
                <div className="mt-1 flex items-center gap-3 text-xs text-slate-500 font-semibold">
                  <span>{activeCareer.averageSalary}</span>
                  <span>•</span>
                  <span>Growth: {activeCareer.growthRate}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveCareer(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Role Overview</h4>
                <p className="leading-relaxed text-slate-600">{activeCareer.shortDescription}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">Key Responsibilities</h4>
                <ul className="space-y-1.5 pl-4 list-disc text-slate-600">
                  {activeCareer.typicalResponsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">Essential Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeCareer.essentialSkills.map((s) => (
                    <SkillTag key={s} skill={s} />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">Representative Portfolio Projects</h4>
                <ul className="space-y-1.5 pl-4 list-disc text-slate-600">
                  {activeCareer.portfolioProjects.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">Recommended Certifications</h4>
                <ul className="space-y-1 pl-4 list-disc text-slate-600">
                  {activeCareer.recommendedCertifications.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                onClick={() => setActiveCareer(null)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActiveCareer(null);
                  onNavigate('skill-gap');
                }}
                className="rounded-xl bg-brand-900 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-800 transition"
              >
                Analyze Skill Gap for this Role →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
