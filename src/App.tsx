import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { ResumeAnalyzerPage } from './pages/ResumeAnalyzerPage';
import { JobMatchingPage } from './pages/JobMatchingPage';
import { SkillGapPage } from './pages/SkillGapPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { InterviewPage } from './pages/InterviewPage';
import { CareerExplorerPage } from './pages/CareerExplorerPage';
import { SettingsPage } from './pages/SettingsPage';
import { AuthModal } from './pages/AuthModal';
import { NotFoundPage } from './pages/NotFoundPage';
import { defaultUserProfile, sampleJobs, defaultRoadmapAI } from './data/mockData';
import { UserProfile, Job, LearningRoadmap, ResumeAnalysis } from './types';

export const App: React.FC = () => {
  // Sync router with window pathname
  const getInitialRoute = (): string => {
    const path = window.location.pathname.replace(/^\//, '');
    if (!path) return 'landing';
    const validRoutes = [
      'landing',
      'dashboard',
      'profile',
      'resume',
      'jobs',
      'skill-gap',
      'roadmap',
      'interview',
      'explorer',
      'settings'
    ];
    return validRoutes.includes(path) ? path : 'not-found';
  };

  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute());

  // Listen for browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(getInitialRoute());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route: string) => {
    const cleanRoute = route === 'landing' ? '/' : `/${route}`;
    window.history.pushState({}, '', cleanRoute);
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // State with LocalStorage persistence
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('careerpilot_profile');
    return saved ? JSON.parse(saved) : defaultUserProfile;
  });

  const [jobs, setJobs] = useState<Job[]>(sampleJobs);

  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('careerpilot_saved_jobs');
    return saved ? JSON.parse(saved) : ['job_02'];
  });

  const [roadmap, setRoadmap] = useState<LearningRoadmap>(() => {
    const saved = localStorage.getItem('careerpilot_roadmap');
    return saved ? JSON.parse(saved) : defaultRoadmapAI;
  });

  const [resumeAnalyses, setResumeAnalyses] = useState<ResumeAnalysis[]>(() => {
    const saved = localStorage.getItem('careerpilot_resumes');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeResumeAnalysis, setActiveResumeAnalysis] = useState<ResumeAnalysis | null>(null);

  const [userEmail, setUserEmail] = useState<string | undefined>('alex.chen@university.edu');
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Persistence handlers
  const handleSaveProfile = (updated: UserProfile) => {
    setUserProfile(updated);
    localStorage.setItem('careerpilot_profile', JSON.stringify(updated));
  };

  const handleToggleSaveJob = (jobId: string) => {
    const updated = savedJobIds.includes(jobId)
      ? savedJobIds.filter((id) => id !== jobId)
      : [...savedJobIds, jobId];
    setSavedJobIds(updated);
    localStorage.setItem('careerpilot_saved_jobs', JSON.stringify(updated));
  };

  const handleToggleRoadmapModule = (moduleId: string) => {
    const updatedStages = roadmap.stages.map((stage) => {
      const updatedModules = stage.modules.map((m) => {
        if (m.id === moduleId) {
          return { ...m, isCompleted: !m.isCompleted };
        }
        return m;
      });
      return { ...stage, modules: updatedModules };
    });
    const updatedRoadmap = { ...roadmap, stages: updatedStages };
    setRoadmap(updatedRoadmap);
    localStorage.setItem('careerpilot_roadmap', JSON.stringify(updatedRoadmap));
  };

  const handleSaveResumeAnalysis = (analysis: ResumeAnalysis) => {
    setActiveResumeAnalysis(analysis);
    const updated = [analysis, ...resumeAnalyses.filter((a) => a.id !== analysis.id)];
    setResumeAnalyses(updated);
    localStorage.setItem('careerpilot_resumes', JSON.stringify(updated));
  };

  const handleDeleteResumeAnalysis = (id: string) => {
    const updated = resumeAnalyses.filter((a) => a.id !== id);
    setResumeAnalyses(updated);
    localStorage.setItem('careerpilot_resumes', JSON.stringify(updated));
    if (activeResumeAnalysis?.id === id) {
      setActiveResumeAnalysis(null);
    }
  };

  const handleResetData = () => {
    localStorage.clear();
    setUserProfile(defaultUserProfile);
    setSavedJobIds(['job_02']);
    setRoadmap(defaultRoadmapAI);
    setResumeAnalyses([]);
    setActiveResumeAnalysis(null);
    navigateTo('dashboard');
  };

  const handleSignOut = () => {
    setUserEmail(undefined);
    navigateTo('landing');
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans">
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        onOpenAuth={() => setIsAuthOpen(true)}
        userEmail={userEmail}
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {currentRoute === 'landing' && <LandingPage onNavigate={navigateTo} />}

        {currentRoute === 'dashboard' && (
          <DashboardPage
            userProfile={userProfile}
            savedJobsCount={savedJobIds.length}
            roadmap={roadmap}
            resumeAnalyses={resumeAnalyses}
            onNavigate={navigateTo}
            onSelectResumeAnalysis={setActiveResumeAnalysis}
          />
        )}

        {currentRoute === 'profile' && (
          <ProfilePage userProfile={userProfile} onSaveProfile={handleSaveProfile} />
        )}

        {currentRoute === 'resume' && (
          <ResumeAnalyzerPage
            pastAnalyses={resumeAnalyses}
            currentAnalysis={activeResumeAnalysis}
            onSaveAnalysis={handleSaveResumeAnalysis}
            onDeleteAnalysis={handleDeleteResumeAnalysis}
            onSelectAnalysis={setActiveResumeAnalysis}
          />
        )}

        {currentRoute === 'jobs' && (
          <JobMatchingPage
            jobs={jobs}
            userProfile={userProfile}
            savedJobIds={savedJobIds}
            onToggleSaveJob={handleToggleSaveJob}
          />
        )}

        {currentRoute === 'skill-gap' && (
          <SkillGapPage userProfile={userProfile} onNavigate={navigateTo} />
        )}

        {currentRoute === 'roadmap' && (
          <RoadmapPage roadmap={roadmap} onToggleModule={handleToggleRoadmapModule} />
        )}

        {currentRoute === 'interview' && <InterviewPage />}

        {currentRoute === 'explorer' && <CareerExplorerPage onNavigate={navigateTo} />}

        {currentRoute === 'settings' && (
          <SettingsPage
            userProfile={userProfile}
            onResetData={handleResetData}
            onSignOut={handleSignOut}
          />
        )}

        {currentRoute === 'not-found' && <NotFoundPage onNavigate={navigateTo} />}
      </main>

      <Footer onNavigate={navigateTo} />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(email) => setUserEmail(email)}
      />
    </div>
  );
};

export default App;
