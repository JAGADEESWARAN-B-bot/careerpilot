import React, { useState } from 'react';
import { sampleInterviewQuestions } from '../data/mockData';
import { evaluateInterviewAI } from '../lib/gemini';
import { StatusNotice } from '../components/StatusNotice';
import { Send, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';
import { InterviewQuestion } from '../types';

export const InterviewPage: React.FC = () => {
  const roles = Object.keys(sampleInterviewQuestions);
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [difficulty, setDifficulty] = useState('Entry-Level / Fresher');
  const [questions, setQuestions] = useState<InterviewQuestion[]>(sampleInterviewQuestions[roles[0]]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const currentQ = questions[currentIndex];
  const evaluation = currentQ?.evaluation;

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    const newQs = sampleInterviewQuestions[role] || sampleInterviewQuestions[roles[0]];
    setQuestions(newQs);
    setCurrentIndex(0);
    setUserAnswer(newQs[0]?.userAnswer || '');
    setNotice(null);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setUserAnswer(questions[nextIdx]?.userAnswer || '');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      setUserAnswer(questions[prevIdx]?.userAnswer || '');
    }
  };

  const handleSubmit = async () => {
    if (!userAnswer.trim()) return;
    setIsEvaluating(true);
    setNotice(null);
    try {
      const result = await evaluateInterviewAI(selectedRole, difficulty, currentQ.question, userAnswer);
      const updated = [...questions];
      updated[currentIndex] = {
        ...currentQ,
        userAnswer,
        evaluation: result.evaluation,
      };
      setQuestions(updated);
      setNotice(result.notice);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleRestart = () => {
    handleRoleChange(selectedRole);
  };

  return (
    <div className="space-y-8 pb-16">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">AI Mock Interview Terminal</h1>
        <p className="text-sm text-slate-500">
          Interactive technical questions with structured evaluation of correctness, clarity, and system trade-offs.
        </p>
      </div>

      {notice && <StatusNotice message={notice} />}

      {/* Setup bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">Role:</span>
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => handleRoleChange(r)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  selectedRole === r
                    ? 'bg-brand-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold focus:outline-none"
            >
              <option value="Entry-Level / Fresher">Entry-Level / Fresher</option>
              <option value="Mid-Level">Mid-Level</option>
              <option value="Senior">Senior</option>
            </select>

            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Question Terminal */}
      {currentQ && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-900">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-xs font-medium text-slate-500">{currentQ.category}</span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-snug">{currentQ.question}</h3>

            {currentQ.sampleAnswerHints.length > 0 && (
              <div className="mt-4 rounded-xl bg-slate-50 p-4 border border-slate-100 space-y-1">
                <span className="text-xs font-bold text-brand-900">Suggested Focus Points:</span>
                <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                  {currentQ.sampleAnswerHints.map((hint, i) => (
                    <li key={i}>{hint}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Candidate Response
            </label>
            <textarea
              rows={6}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your technical explanation here (mention architecture, trade-offs, and edge cases)..."
              disabled={isEvaluating}
              className="w-full rounded-xl border border-slate-200 p-4 text-xs font-mono leading-relaxed focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Previous</span>
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === questions.length - 1}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              >
                <span>Next</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isEvaluating || !userAnswer.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-900 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-800 disabled:opacity-50 transition"
            >
              <Sparkles className="h-4 w-4" />
              <span>{isEvaluating ? 'Evaluating with AI...' : evaluation ? 'Re-evaluate Answer' : 'Submit for AI Feedback'}</span>
            </button>
          </div>
        </div>
      )}

      {/* AI Evaluation Report */}
      {evaluation && (
        <div className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">AI Evaluator Report</h3>
              <p className="text-xs text-slate-500">Graded against senior engineering rubrics</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-xl font-black text-emerald-800 border border-emerald-200">
              {evaluation.overallScore}%
            </div>
          </div>

          {/* Subscores */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-slate-50 p-3 text-center border border-slate-100">
              <span className="text-lg font-black text-brand-900">{evaluation.technicalScore}/10</span>
              <p className="text-[11px] font-semibold text-slate-500">Technical Depth</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 text-center border border-slate-100">
              <span className="text-lg font-black text-brand-900">{evaluation.clarityScore}/10</span>
              <p className="text-[11px] font-semibold text-slate-500">Structure & Clarity</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 text-center border border-slate-100">
              <span className="text-lg font-black text-brand-900">{evaluation.relevanceScore}/10</span>
              <p className="text-[11px] font-semibold text-slate-500">Relevance</p>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Evaluator Verdict</span>
            <p className="text-sm text-slate-700 leading-relaxed">{evaluation.feedback}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>What Went Well</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                {evaluation.strengths.map((str, i) => (
                  <li key={i}>{str}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-amber-100 bg-amber-50/30 p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span>Areas to Polish</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                {evaluation.areasToImprove.map((imp, i) => (
                  <li key={i}>{imp}</li>
                ))}
              </ul>
            </div>
          </div>

          {evaluation.idealAnswer && (
            <div className="rounded-xl border border-brand-100 bg-brand-50/40 p-4 space-y-1 text-xs">
              <span className="font-bold text-brand-900">Model Exemplar Key:</span>
              <p className="text-slate-700 leading-relaxed">{evaluation.idealAnswer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
