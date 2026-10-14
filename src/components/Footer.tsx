import React from 'react';
import { Compass, Github, Shield, Terminal } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 text-slate-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-900 text-white">
                <Compass className="h-4 w-4 text-cyan-400" />
              </div>
              <span className="text-base font-extrabold text-slate-900">AI CareerPilot</span>
            </div>
            <p className="text-sm text-slate-500">
              Smart Job & Skill Matching Platform designed for final-year Computer Science and AI & DS students.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Platform</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('jobs')} className="hover:text-brand-900">
                  Smart Job Matching
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resume')} className="hover:text-brand-900">
                  AI Resume Analyzer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('skill-gap')} className="hover:text-brand-900">
                  Skill Gap Analyzer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('roadmap')} className="hover:text-brand-900">
                  Learning Roadmaps
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Resources</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('interview')} className="hover:text-brand-900">
                  Mock Interview Prep
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explorer')} className="hover:text-brand-900">
                  Career Explorer (9 Tracks)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('settings')} className="hover:text-brand-900">
                  Supabase & Vercel Docs
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Deployment</h4>
            <div className="mt-4 space-y-3 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-slate-700" />
                <span>Vercel Edge Network Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-600" />
                <span>Supabase PostgreSQL + RLS</span>
              </div>
              <p className="pt-2 text-slate-400">
                Suitable for Academic Portfolios and Production Deployment.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} AI CareerPilot — Smart Job & Skill Matching Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
