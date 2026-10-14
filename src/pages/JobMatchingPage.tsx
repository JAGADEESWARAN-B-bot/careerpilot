import React, { useState } from 'react';
import { Job, JobMatchScore, UserProfile } from '../types';
import { calculateJobMatch } from '../data/mockData';
import { MatchBadge, SkillTag } from '../components/StatusNotice';
import { Search, MapPin, Building, Bookmark, BookmarkCheck, CheckCircle2, X } from 'lucide-react';

interface JobMatchingPageProps {
  jobs: Job[];
  userProfile: UserProfile;
  savedJobIds: string[];
  onToggleSaveJob: (jobId: string) => void;
}

export const JobMatchingPage: React.FC<JobMatchingPageProps> = ({
  jobs,
  userProfile,
  savedJobIds,
  onToggleSaveJob,
}) => {
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [experienceFilter, setExperienceFilter] = useState('All');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);

  // Calculate scores dynamically
  const scoredJobs: { job: Job; score: JobMatchScore }[] = jobs.map((job) => ({
    job: { ...job, isSaved: savedJobIds.includes(job.id) },
    score: calculateJobMatch(userProfile, job),
  }));

  const filtered = scoredJobs.filter(({ job }) => {
    const query = search.toLowerCase();
    const matchesSearch =
      !search ||
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.requiredSkills.some((s) => s.toLowerCase().includes(query));

    const matchesLoc =
      locationFilter === 'All' ||
      (locationFilter === 'Remote' && job.workType === 'Remote') ||
      (locationFilter === 'Hybrid' && job.workType === 'Hybrid') ||
      job.location.toLowerCase().includes(locationFilter.toLowerCase());

    const matchesExp =
      experienceFilter === 'All' ||
      job.experienceLevel.toLowerCase().includes(experienceFilter.toLowerCase());

    const matchesSaved = !showSavedOnly || job.isSaved;

    return matchesSearch && matchesLoc && matchesExp && matchesSaved;
  });

  const sorted = filtered.sort((a, b) => b.score.percentage - a.score.percentage);

  const handleApply = (jobId: string) => {
    if (!appliedJobIds.includes(jobId)) {
      setAppliedJobIds([...appliedJobIds, jobId]);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Smart Job Matching</h1>
        <p className="text-sm text-slate-500">
          Ranked opportunities based on your skills, experience tier, and academic degree.
        </p>
      </div>

      {/* Filter and Search Box */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, company, or skills (e.g. PyTorch, FastAPI, React)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">Location:</span>
            {['All', 'Remote', 'Hybrid', 'Bangalore', 'Hyderabad'].map((loc) => (
              <button
                key={loc}
                onClick={() => setLocationFilter(loc)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                  locationFilter === loc
                    ? 'bg-brand-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-bold transition ${
                showSavedOnly
                  ? 'border-brand-300 bg-brand-50 text-brand-900'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {showSavedOnly ? <BookmarkCheck className="h-3.5 w-3.5 text-brand-700" /> : <Bookmark className="h-3.5 w-3.5" />}
              <span>Saved Only ({savedJobIds.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Job Cards List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
          <span>Displaying {sorted.length} matching jobs</span>
          <span>Sorted by Match Score %</span>
        </div>

        {sorted.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
            <p className="font-bold text-slate-800">No matching jobs found.</p>
            <p className="mt-1 text-xs">Try clearing search terms or location filters.</p>
          </div>
        ) : (
          sorted.map(({ job, score }) => {
            const isApplied = appliedJobIds.includes(job.id);
            return (
              <div
                key={job.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md space-y-4"
              >
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3
                        onClick={() => setSelectedJob(job)}
                        className="cursor-pointer text-base font-bold text-slate-900 hover:text-brand-800"
                      >
                        {job.title}
                      </h3>
                      <MatchBadge score={score.percentage} />
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-semibold text-slate-700">
                        <Building className="h-3.5 w-3.5" />
                        {job.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {job.location}
                      </span>
                      <span className="rounded bg-slate-100 px-2 py-0.5 font-medium text-slate-700">
                        {job.salaryRange}
                      </span>
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-600">
                        {job.experienceLevel}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleSaveJob(job.id)}
                      className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 hover:text-brand-900"
                      title={job.isSaved ? 'Remove Bookmark' : 'Save Job'}
                    >
                      {job.isSaved ? (
                        <BookmarkCheck className="h-4 w-4 text-brand-700" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="rounded-xl border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-900 hover:bg-brand-100"
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* Transparent Match Explanation */}
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 text-xs text-slate-700">
                  <span className="font-bold text-brand-900">Match Insight: </span>
                  {score.explanation}
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-bold text-slate-400 mr-1">Skills:</span>
                  {job.requiredSkills.map((skill) => {
                    const isMatched = score.matchedSkills.includes(skill);
                    return <SkillTag key={skill} skill={skill} matched={isMatched} />;
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8 space-y-6">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase text-brand-700">{selectedJob.company}</span>
                <h2 className="text-xl font-bold text-slate-900">{selectedJob.title}</h2>
                <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                  <span>{selectedJob.location}</span>
                  <span>•</span>
                  <span>{selectedJob.salaryRange}</span>
                  <span>•</span>
                  <span>{selectedJob.experienceLevel}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">About the Role</h4>
                <p className="leading-relaxed text-slate-600">{selectedJob.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">Key Responsibilities</h4>
                <ul className="space-y-1.5 pl-4 list-disc text-slate-600">
                  {selectedJob.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedJob.requiredSkills.map((s) => (
                    <SkillTag key={s} skill={s} />
                  ))}
                </div>
              </div>

              {appliedJobIds.includes(selectedJob.id) && (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-semibold text-emerald-800">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Application submitted with verified candidate profile credentials!</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                onClick={() => setSelectedJob(null)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => handleApply(selectedJob.id)}
                disabled={appliedJobIds.includes(selectedJob.id)}
                className="rounded-xl bg-brand-900 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-800 disabled:opacity-60 transition"
              >
                {appliedJobIds.includes(selectedJob.id) ? 'Applied ✓' : 'Apply with Profile'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
