import React from 'react';
import { Compass, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-900 border border-brand-200">
        <Compass className="h-8 w-8 text-brand-700" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900">404 — Destination Not Found</h1>
      <p className="max-w-md text-sm text-slate-500">
        The requested career page or route does not exist. AI CareerPilot routing is active.
      </p>
      <button
        onClick={() => onNavigate('dashboard')}
        className="inline-flex items-center gap-2 rounded-xl bg-brand-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-brand-800 transition"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Dashboard</span>
      </button>
    </div>
  );
};
