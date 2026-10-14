import React, { useState } from 'react';
import { ResumeAnalysis } from '../types';
import { sampleResumes } from '../data/mockData';
import { analyzeResumeAI } from '../lib/gemini';
import { StatusNotice, SkillTag } from '../components/StatusNotice';
import { Sparkles, FileText, CheckCircle2, AlertTriangle, ArrowRight, Trash2, Upload } from 'lucide-react';

interface ResumeAnalyzerPageProps {
  pastAnalyses: ResumeAnalysis[];
  currentAnalysis: ResumeAnalysis | null;
  onSaveAnalysis: (analysis: ResumeAnalysis) => void;
  onDeleteAnalysis: (id: string) => void;
  onSelectAnalysis: (analysis: ResumeAnalysis) => void;
}

export const ResumeAnalyzerPage: React.FC<ResumeAnalyzerPageProps> = ({
  pastAnalyses,
  currentAnalysis,
  onSaveAnalysis,
  onDeleteAnalysis,
  onSelectAnalysis,
}) => {
  const [resumeText, setResumeText] = useState(sampleResumes[0].text);
  const [targetRole, setTargetRole] = useState('AI Engineer');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'input' | 'report'>(currentAnalysis ? 'report' : 'input');

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;
    setIsAnalyzing(true);
    setNotice(null);
    try {
      const result = await analyzeResumeAI(resumeText, targetRole);
      onSaveAnalysis(result.analysis);
      setNotice(result.notice);
      setActiveTab('report');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">AI Resume Analyzer</h1>
          <p className="text-sm text-slate-500">
            Scan your resume for ATS keyword alignment, technical strengths, and high-impact improvement areas.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-xl bg-slate-200/60 p-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('input')}
            className={`rounded-lg px-4 py-2 transition ${
              activeTab === 'input' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Resume Input
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`rounded-lg px-4 py-2 transition ${
              activeTab === 'report' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Audit Report {currentAnalysis ? '✓' : ''}
          </button>
        </div>
      </div>

      {notice && <StatusNotice message={notice} />}

      {activeTab === 'input' ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Input */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Target Role Screening
                </span>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold focus:outline-none focus:border-brand-500"
                >
                  <option value="AI Engineer">AI Engineer</option>
                  <option value="Data Scientist">Data Scientist</option>
                  <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                  <option value="Full-Stack Developer">Full-Stack Developer</option>
                  <option value="Python Developer">Python Developer</option>
                  <option value="Cloud & DevOps Engineer">Cloud & DevOps Engineer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Resume Markdown or Plain Text
                </label>
                <textarea
                  rows={12}
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste candidate resume text or markdown here..."
                  className="w-full rounded-xl border border-slate-200 p-4 font-mono text-xs leading-relaxed focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !resumeText.trim()}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-900 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-brand-800 disabled:opacity-50 transition"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>{isAnalyzing ? 'Analyzing with AI...' : `Analyze for ${targetRole}`}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Tools */}
          <div className="space-y-6">
            {/* Preloaded Profiles */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Preloaded Candidate Profiles</h3>
              <p className="text-xs text-slate-500">Load sample profiles for instant testing:</p>
              <div className="space-y-2">
                {sampleResumes.map((sample) => (
                  <button
                    key={sample.label}
                    onClick={() => setResumeText(sample.text)}
                    className="w-full text-left rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition"
                  >
                    📄 {sample.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Past Audits */}
            {pastAnalyses.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Saved Audits ({pastAnalyses.length})</h3>
                <div className="space-y-2">
                  {pastAnalyses.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-xl border border-slate-100 p-2.5 text-xs hover:bg-slate-50"
                    >
                      <button
                        onClick={() => {
                          onSelectAnalysis(item);
                          setActiveTab('report');
                        }}
                        className="text-left font-medium text-slate-900 hover:text-brand-700 truncate max-w-[150px]"
                      >
                        {item.candidateName} ({item.overallScore}%)
                      </button>
                      <button
                        onClick={() => onDeleteAnalysis(item.id)}
                        className="text-slate-400 hover:text-red-600 p-1"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Report View */
        <div className="space-y-6">
          {!currentAnalysis ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-slate-400" />
              <h3 className="mt-2 text-sm font-bold text-slate-900">No active audit report</h3>
              <p className="mt-1 text-xs text-slate-500">
                Go to the input tab and click 'Analyze' to generate a full evaluation report.
              </p>
              <button
                onClick={() => setActiveTab('input')}
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-brand-900 px-4 py-2 text-xs font-bold text-white"
              >
                Go to Input
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Gauges */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Overall Match</span>
                    <h3 className="text-sm font-bold text-slate-900">Benchmark Competency</h3>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-2xl font-black text-brand-900 border border-brand-200">
                    {currentAnalysis.overallScore}%
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">ATS Readiness</span>
                    <h3 className="text-sm font-bold text-slate-900">Keyword & Formatting Score</h3>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-2xl font-black text-emerald-800 border border-emerald-200">
                    {currentAnalysis.atsScore}%
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-slate-900">Executive Recruiter Verdict</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{currentAnalysis.summary}</p>
              </div>

              {/* Extracted Skills */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Extracted Technical Skills ({currentAnalysis.extractedSkills.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentAnalysis.extractedSkills.map((skill) => (
                    <SkillTag key={skill} skill={skill} matched={true} />
                  ))}
                </div>
              </div>

              {/* Strengths & Missing Skills */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Candidate Strengths</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {currentAnalysis.strengths.map((str, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Critical Missing Skills</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {currentAnalysis.missingSkills.map((mis, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{mis}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Suggestions */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Actionable Improvement Suggestions</h3>
                <div className="space-y-2">
                  {currentAnalysis.improvementSuggestions.map((sug, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3 text-xs text-slate-800">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-900 font-bold text-white text-[10px]">
                        {i + 1}
                      </span>
                      <span>{sug}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Matches */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Recommended Career Alignments</h3>
                <div className="flex flex-wrap gap-2">
                  {currentAnalysis.recommendedCareers.map((c) => (
                    <span
                      key={c}
                      className="rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-bold text-cyan-900"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
