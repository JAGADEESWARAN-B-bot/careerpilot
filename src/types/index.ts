export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  degree: string;
  department: string;
  graduationYear: number;
  experienceLevel: string;
  preferredRoles: string[];
  preferredLocations: string[];
  technicalSkills: string[];
  softSkills: string[];
  bio: string;
  profileCompletion: number;
  projects: {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    link?: string;
  }[];
  internships: {
    id: string;
    role: string;
    organization: string;
    duration: string;
    highlights: string;
  }[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  workType: 'Remote' | 'Hybrid' | 'On-site';
  experienceLevel: string;
  salaryRange: string;
  department: string;
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
  responsibilities: string[];
  postedDaysAgo: number;
  isSaved?: boolean;
}

export interface JobMatchScore {
  jobId: string;
  percentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  skillsScore: number;
  experienceScore: number;
  educationScore: number;
  explanation: string;
}

export interface ResumeAnalysis {
  id: string;
  fileName: string;
  timestamp: number;
  candidateName: string;
  overallScore: number;
  atsScore: number;
  summary: string;
  extractedSkills: string[];
  strengths: string[];
  missingSkills: string[];
  improvementSuggestions: string[];
  recommendedCareers: string[];
  isGemini?: boolean;
}

export interface PriorityAction {
  skill: string;
  priority: 'High' | 'Medium' | 'Low';
  reason: string;
  estimatedTimeToLearn: string;
}

export interface SkillGapAnalysis {
  targetRole: string;
  userSkills: string[];
  requiredSkills: string[];
  matchedSkills: string[];
  needsImprovementSkills: string[];
  missingSkills: string[];
  matchScore: number;
  priorityActions: PriorityAction[];
  recommendedResources: {
    title: string;
    provider: string;
    type: string;
    url: string;
    isFree: boolean;
  }[];
  recommendedProjects: {
    title: string;
    description: string;
    keySkills: string[];
    complexity: 'Beginner' | 'Intermediate' | 'Advanced';
  }[];
}

export interface RoadmapModule {
  id: string;
  title: string;
  duration: string;
  topics: string[];
  practicalExercise: string;
  resourceName: string;
  resourceUrl: string;
  isCompleted: boolean;
}

export interface RoadmapStage {
  stageNumber: number;
  stageTitle: string;
  stageSubtitle: string;
  modules: RoadmapModule[];
}

export interface LearningRoadmap {
  id: string;
  role: string;
  description: string;
  stages: RoadmapStage[];
  createdAt: number;
}

export interface InterviewEvaluation {
  technicalScore: number; // 0-10
  clarityScore: number;   // 0-10
  relevanceScore: number; // 0-10
  overallScore: number;   // 0-100
  feedback: string;
  strengths: string[];
  areasToImprove: string[];
  idealAnswer: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: string;
  sampleAnswerHints: string[];
  userAnswer?: string;
  evaluation?: InterviewEvaluation;
}

export interface InterviewSession {
  id: string;
  role: string;
  difficulty: string;
  timestamp: number;
  questions: InterviewQuestion[];
  averageScore: number;
}

export interface CareerPathDetail {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  averageSalary: string;
  growthRate: string;
  typicalResponsibilities: string[];
  essentialSkills: string[];
  portfolioProjects: string[];
  recommendedCertifications: string[];
}
