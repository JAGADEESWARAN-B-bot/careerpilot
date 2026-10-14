package com.example.model

data class UserProfile(
    val id: String = "user_default_1",
    val fullName: String = "Alex Chen",
    val email: String = "alex.chen@university.edu",
    val educationLevel: String = "B.Sc Computer Science (AI & DS)",
    val degree: String = "Bachelor of Science",
    val department: String = "Artificial Intelligence & Data Science",
    val graduationYear: Int = 2026,
    val experienceLevel: String = "Final-Year Student / Entry-Level",
    val preferredRoles: List<String> = listOf("AI Engineer", "Data Scientist", "Machine Learning Engineer"),
    val preferredLocations: List<String> = listOf("Remote", "Bangalore", "Hyderabad", "Hybrid"),
    val technicalSkills: List<String> = listOf(
        "Python", "PyTorch", "TensorFlow", "SQL", "Pandas",
        "Scikit-Learn", "FastAPI", "Docker", "Git", "LangChain"
    ),
    val softSkills: List<String> = listOf(
        "Problem Solving", "Critical Thinking", "Technical Writing", "Team Collaboration"
    ),
    val projects: List<ProjectItem> = listOf(
        ProjectItem(
            id = "p1",
            title = "Multimodal Sentiment Analysis Engine",
            description = "Trained a BERT and ResNet fusion network on customer feedback with 91% F1 score.",
            techStack = listOf("Python", "PyTorch", "Hugging Face", "FastAPI"),
            link = "github.com/alexchen/multimodal-sentiment"
        ),
        ProjectItem(
            id = "p2",
            title = "Automated Document Q&A RAG Pipeline",
            description = "Built a Retrieval-Augmented Generation pipeline using LangChain, ChromaDB, and Gemini API.",
            techStack = listOf("LangChain", "Gemini API", "ChromaDB", "Python"),
            link = "github.com/alexchen/rag-doc-pilot"
        )
    ),
    val internships: List<ExperienceItem> = listOf(
        ExperienceItem(
            id = "e1",
            role = "AI/ML Intern",
            organization = "CognitiveTech Labs",
            duration = "May 2025 - Aug 2025 (4 mos)",
            highlights = "Optimized model inference latency by 35% through ONNX runtime quantization."
        )
    ),
    val bio: String = "Final-year B.Sc Computer Science (AI & DS) student passionate about LLMs, NLP, and scalable data intelligence."
)

data class ProjectItem(
    val id: String,
    val title: String,
    val description: String,
    val techStack: List<String>,
    val link: String
)

data class ExperienceItem(
    val id: String,
    val role: String,
    val organization: String,
    val duration: String,
    val highlights: String
)

data class Job(
    val id: String,
    val title: String,
    val company: String,
    val location: String,
    val workType: String, // "Remote", "Hybrid", "On-site"
    val experienceLevel: String, // "Entry-Level", "Mid-Level", "Senior", "Internship"
    val salaryRange: String,
    val department: String,
    val description: String,
    val requiredSkills: List<String>,
    val preferredSkills: List<String>,
    val responsibilities: List<String>,
    val postedDaysAgo: Int,
    val isDemo: Boolean = true,
    val isSaved: Boolean = false
)

data class JobMatchScore(
    val jobId: String,
    val percentage: Int,
    val matchedSkills: List<String>,
    val missingSkills: List<String>,
    val skillsScore: Int,
    val experienceScore: Int,
    val educationScore: Int,
    val explanation: String
)

data class ResumeAnalysis(
    val id: String,
    val fileName: String,
    val timestamp: Long,
    val candidateName: String,
    val overallScore: Int,
    val atsScore: Int,
    val summary: String,
    val extractedSkills: List<String>,
    val strengths: List<String>,
    val missingSkills: List<String>,
    val improvementSuggestions: List<String>,
    val recommendedCareers: List<String>
)

data class SkillGapAnalysis(
    val targetRole: String,
    val userSkills: List<String>,
    val requiredSkills: List<String>,
    val matchedSkills: List<String>,
    val needsImprovementSkills: List<String>,
    val missingSkills: List<String>,
    val matchScore: Int,
    val priorityActions: List<PriorityAction>,
    val recommendedResources: List<LearningResource>,
    val recommendedProjects: List<ProjectIdea>
)

data class PriorityAction(
    val skill: String,
    val priority: String, // "High", "Medium", "Low"
    val reason: String,
    val estimatedTimeToLearn: String
)

data class LearningResource(
    val title: String,
    val provider: String,
    val type: String, // "Documentation", "Interactive Tutorial", "Course", "Video Guide"
    val url: String,
    val isFree: Boolean = true
)

data class ProjectIdea(
    val title: String,
    val description: String,
    val keySkills: List<String>,
    val complexity: String // "Beginner", "Intermediate", "Advanced"
)

data class RoadmapModule(
    val id: String,
    val title: String,
    val duration: String,
    val topics: List<String>,
    val practicalExercise: String,
    val resourceName: String,
    val resourceUrl: String,
    val isCompleted: Boolean = false
)

data class RoadmapStage(
    val stageNumber: Int,
    val stageTitle: String,
    val stageSubtitle: String,
    val modules: List<RoadmapModule>
)

data class LearningRoadmap(
    val id: String,
    val role: String,
    val description: String,
    val stages: List<RoadmapStage>,
    val createdAt: Long = System.currentTimeMillis()
)

data class InterviewEvaluation(
    val technicalScore: Int, // 0-10
    val clarityScore: Int, // 0-10
    val relevanceScore: Int, // 0-10
    val overallScore: Int, // 0-100
    val feedback: String,
    val strengths: List<String>,
    val areasToImprove: List<String>,
    val idealAnswer: String
)

data class InterviewQuestion(
    val id: String,
    val question: String,
    val category: String,
    val difficulty: String, // "Entry-Level", "Mid-Level", "Senior"
    val sampleAnswerHints: List<String>,
    val userAnswer: String? = null,
    val evaluation: InterviewEvaluation? = null
)

data class InterviewSession(
    val id: String,
    val role: String,
    val difficulty: String,
    val timestamp: Long = System.currentTimeMillis(),
    val questions: List<InterviewQuestion>,
    val averageScore: Int = 0
)

data class CareerPathDetail(
    val id: String,
    val title: String,
    val category: String,
    val shortDescription: String,
    val averageSalary: String,
    val growthRate: String,
    val typicalResponsibilities: List<String>,
    val essentialSkills: List<String>,
    val portfolioProjects: List<String>,
    val recommendedCertifications: List<String>
)
