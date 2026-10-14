import React from 'react';
import { LearningRoadmap } from '../types';
import { CheckCircle2, Clock, Code, ExternalLink, MapPin } from 'lucide-react';

interface RoadmapPageProps {
  roadmap: LearningRoadmap;
  onToggleModule: (moduleId: string) => void;
}

export const RoadmapPage: React.FC<RoadmapPageProps> = ({ roadmap, onToggleModule }) => {
  const totalModules = roadmap.stages.reduce((acc, stage) => acc + stage.modules.length, 0);
  const completedModules = roadmap.stages.reduce(
    (acc, stage) => acc + stage.modules.filter((m) => m.isCompleted).length,
    0
  );
  const roadmapPercent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-brand-900 to-indigo-900 p-6 text-white shadow-md sm:p-8 space-y-4">
        <div>
          <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
            Personalized Learning Plan
          </span>
          <h1 className="text-2xl font-black sm:text-3xl">{roadmap.role}</h1>
          <p className="mt-1 text-xs text-slate-300 max-w-2xl">{roadmap.description}</p>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex justify-between text-xs font-semibold text-slate-200">
            <span>Curriculum Progress</span>
            <span>
              {completedModules} of {totalModules} Modules ({roadmapPercent}%)
            </span>
          </div>
          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-cyan-400 transition-all duration-500"
              style={{ width: `${roadmapPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stages List */}
      <div className="space-y-8">
        {roadmap.stages.map((stage) => (
          <div
            key={stage.stageNumber}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-900 font-bold text-white text-xs">
                {stage.stageNumber}
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">{stage.stageTitle}</h2>
                <p className="text-xs text-slate-500">{stage.stageSubtitle}</p>
              </div>
            </div>

            <div className="space-y-4">
              {stage.modules.map((mod) => (
                <div
                  key={mod.id}
                  className={`rounded-xl border p-4 transition ${
                    mod.isCompleted
                      ? 'border-emerald-200 bg-emerald-50/30'
                      : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={mod.isCompleted}
                      onChange={() => onToggleModule(mod.id)}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-900 focus:ring-brand-500 cursor-pointer"
                    />

                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                        <h4
                          onClick={() => onToggleModule(mod.id)}
                          className={`cursor-pointer text-sm font-bold ${
                            mod.isCompleted ? 'text-emerald-950 line-through' : 'text-slate-900'
                          }`}
                        >
                          {mod.title}
                        </h4>
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                          <Clock className="h-3 w-3" />
                          {mod.duration}
                        </span>
                      </div>

                      {/* Topics */}
                      <p className="text-xs text-slate-600">
                        <span className="font-semibold text-slate-700">Topics: </span>
                        {mod.topics.join(' • ')}
                      </p>

                      {/* Practical Lab */}
                      <div className="flex items-start gap-1.5 text-xs text-slate-700">
                        <Code className="h-3.5 w-3.5 text-brand-700 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong className="text-slate-900">Lab: </strong>
                          {mod.practicalExercise}
                        </span>
                      </div>

                      {/* Resource */}
                      <div className="pt-1">
                        <a
                          href={mod.resourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-900"
                        >
                          <span>{mod.resourceName}</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
