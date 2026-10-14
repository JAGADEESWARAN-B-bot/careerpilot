import React from 'react';
import { Compass, Briefcase, FileText, CheckCircle2, Map, Mic, Globe, Settings, User } from 'lucide-react';
import { isGeminiConfigured } from '../lib/gemini';
import { isSupabaseConfigured } from '../lib/supabase';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenAuth: () => void;
  userEmail?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenAuth,
  userEmail
}) => {
  const hasGemini = isGeminiConfigured();
  const hasSupabase = isSupabaseConfigured();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Compass },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'skill-gap', label: 'Skill Gap', icon: CheckCircle2 },
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'interview', label: 'Interview', icon: Mic },
    { id: 'explorer', label: 'Careers', icon: Globe },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div
          onClick={() => onNavigate('landing')}
          className="flex cursor-pointer items-center gap-3 transition hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-900 text-white shadow-md">
            <Compass className="h-5 w-5 text-cyan-400" />
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900">
              AI CareerPilot
            </span>
            <span className="hidden text-xs text-brand-700 sm:block">
              Smart Job & Skill Matching
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active
                    ? 'bg-brand-50 text-brand-900 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? 'text-brand-700' : 'text-slate-500'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions & Status Pills */}
        <div className="flex items-center gap-3">
          {/* AI Pill */}
          <div
            className={`hidden items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold sm:flex ${
              hasGemini
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${hasGemini ? 'bg-emerald-500' : 'bg-amber-500'}`}
            />
            {hasGemini ? 'Gemini 3.5' : 'Local AI'}
          </div>

          <button
            onClick={() => onNavigate('settings')}
            className={`rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 ${
              currentRoute === 'settings' ? 'bg-slate-100 text-slate-900' : ''
            }`}
            title="Settings & Deployment"
          >
            <Settings className="h-5 w-5" />
          </button>

          {userEmail ? (
            <button
              onClick={() => onNavigate('profile')}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-100"
            >
              <User className="h-3.5 w-3.5 text-brand-800" />
              <span className="max-w-[120px] truncate">{userEmail.split('@')[0]}</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="rounded-lg bg-brand-900 px-3.5 py-1.5 text-xs font-bold text-white shadow hover:bg-brand-800 transition"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
