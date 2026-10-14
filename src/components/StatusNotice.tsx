import React from 'react';
import { Info, AlertTriangle, CheckCircle } from 'lucide-react';

interface StatusNoticeProps {
  type?: 'info' | 'warning' | 'success';
  title?: string;
  message: string;
}

export const StatusNotice: React.FC<StatusNoticeProps> = ({
  type = 'info',
  title,
  message,
}) => {
  const styles = {
    info: {
      bg: 'bg-brand-50 border-brand-200 text-brand-900',
      icon: <Info className="h-5 w-5 text-brand-700 flex-shrink-0" />,
    },
    warning: {
      bg: 'bg-amber-50 border-amber-200 text-amber-900',
      icon: <AlertTriangle className="h-5 w-5 text-amber-700 flex-shrink-0" />,
    },
    success: {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      icon: <CheckCircle className="h-5 w-5 text-emerald-700 flex-shrink-0" />,
    },
  }[type];

  return (
    <div className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${styles.bg}`}>
      {styles.icon}
      <div>
        {title && <h5 className="font-bold">{title}</h5>}
        <p className="mt-0.5 leading-relaxed">{message}</p>
      </div>
    </div>
  );
};

export const MatchBadge: React.FC<{ score: number; className?: string }> = ({ score, className = '' }) => {
  let color = 'bg-red-50 text-red-700 border-red-200';
  if (score >= 80) {
    color = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (score >= 65) {
    color = 'bg-amber-50 text-amber-800 border-amber-200';
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-bold ${color} ${className}`}
    >
      <span>⚡</span>
      <span>{score}% Match</span>
    </span>
  );
};

export const SkillTag: React.FC<{
  skill: string;
  matched?: boolean;
  onRemove?: () => void;
}> = ({ skill, matched, onRemove }) => {
  let style = 'bg-slate-100 text-slate-700 border-slate-200';
  if (matched === true) {
    style = 'bg-emerald-50 text-emerald-800 border-emerald-200';
  } else if (matched === false) {
    style = 'bg-red-50 text-red-800 border-red-200';
  }

  return (
    <span className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-medium ${style}`}>
      <span>{skill}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-0.5 rounded p-0.5 hover:bg-slate-200 hover:text-slate-900"
        >
          ×
        </button>
      )}
    </span>
  );
};
