package com.example.ui

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.data.CareerPilotRepository
import com.example.data.SampleData
import com.example.model.*
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

enum class Screen {
    LANDING,
    DASHBOARD,
    PROFILE,
    RESUME_ANALYZER,
    JOB_MATCHING,
    SKILL_GAP,
    ROADMAP,
    MOCK_INTERVIEW,
    CAREER_EXPLORER,
    SETTINGS
}

class CareerPilotViewModel(application: Application) : AndroidViewModel(application) {

    private val repository = CareerPilotRepository(application)

    // Navigation State with history stack for proper back handling
    private val _currentScreen = MutableStateFlow(Screen.LANDING)
    val currentScreen: StateFlow<Screen> = _currentScreen.asStateFlow()

    private val screenHistory = mutableListOf(Screen.LANDING)

    fun navigateTo(screen: Screen) {
        if (_currentScreen.value != screen) {
            screenHistory.add(screen)
            _currentScreen.value = screen
        }
    }

    fun navigateBack(): Boolean {
        if (screenHistory.size > 1) {
            screenHistory.removeAt(screenHistory.lastIndex)
            _currentScreen.value = screenHistory.last()
            return true
        } else if (_currentScreen.value != Screen.DASHBOARD && _currentScreen.value != Screen.LANDING) {
            _currentScreen.value = Screen.DASHBOARD
            return true
        }
        return false
    }

    // User Profile
    val userProfile: StateFlow<UserProfile> = repository.userProfile

    fun updateProfile(profile: UserProfile) {
        viewModelScope.launch {
            repository.saveUserProfile(profile)
        }
    }

    // Authentication State
    private val _isLoggedIn = MutableStateFlow(true)
    val isLoggedIn: StateFlow<Boolean> = _isLoggedIn.asStateFlow()

    fun logOut() {
        _isLoggedIn.value = false
        navigateTo(Screen.LANDING)
    }

    fun logIn() {
        _isLoggedIn.value = true
        navigateTo(Screen.DASHBOARD)
    }

    // Jobs & Search Filtering
    val allJobs: StateFlow<List<Job>> = repository.jobs

    private val _jobSearchQuery = MutableStateFlow("")
    val jobSearchQuery: StateFlow<String> = _jobSearchQuery.asStateFlow()

    private val _selectedLocation = MutableStateFlow("All Locations")
    val selectedLocation: StateFlow<String> = _selectedLocation.asStateFlow()

    private val _selectedExperience = MutableStateFlow("All Levels")
    val selectedExperience: StateFlow<String> = _selectedExperience.asStateFlow()

    fun setJobSearchQuery(q: String) { _jobSearchQuery.value = q }
    fun setSelectedLocation(loc: String) { _selectedLocation.value = loc }
    fun setSelectedExperience(exp: String) { _selectedExperience.value = exp }

    val filteredJobsWithScores = combine(
        allJobs,
        userProfile,
        jobSearchQuery,
        selectedLocation,
        selectedExperience
    ) { jobs, profile, query, loc, exp ->
        jobs.filter { job ->
            val matchesQuery = query.isBlank() ||
                job.title.contains(query, ignoreCase = true) ||
                job.company.contains(query, ignoreCase = true) ||
                job.requiredSkills.any { it.contains(query, ignoreCase = true) }

            val matchesLoc = loc == "All Locations" ||
                (loc == "Remote" && job.workType.equals("Remote", ignoreCase = true)) ||
                (loc == "Hybrid" && job.workType.equals("Hybrid", ignoreCase = true)) ||
                job.location.contains(loc, ignoreCase = true)

            val matchesExp = exp == "All Levels" || job.experienceLevel.contains(exp, ignoreCase = true)

            matchesQuery && matchesLoc && matchesExp
        }.map { job ->
            val score = SampleData.calculateJobMatch(profile, job)
            Pair(job, score)
        }.sortedByDescending { it.second.percentage }
    }.stateIn(viewModelScope, SharingStarted.Lazily, emptyList())

    private val _selectedJob = MutableStateFlow<Job?>(null)
    val selectedJob: StateFlow<Job?> = _selectedJob.asStateFlow()

    fun selectJob(job: Job?) {
        _selectedJob.value = job
    }

    fun toggleSaveJob(jobId: String) {
        viewModelScope.launch {
            repository.toggleSaveJob(jobId)
        }
    }

    // Resume Analyzer State
    val resumeAnalyses: StateFlow<List<ResumeAnalysis>> = repository.resumeAnalyses

    private val _activeResumeText = MutableStateFlow(SampleData.preloadedSampleResumes[0].second)
    val activeResumeText: StateFlow<String> = _activeResumeText.asStateFlow()

    private val _isAnalyzing = MutableStateFlow(false)
    val isAnalyzing: StateFlow<Boolean> = _isAnalyzing.asStateFlow()

    private val _currentAnalysis = MutableStateFlow<ResumeAnalysis?>(null)
    val currentAnalysis: StateFlow<ResumeAnalysis?> = _currentAnalysis.asStateFlow()

    private val _aiServiceNotice = MutableStateFlow<String?>(null)
    val aiServiceNotice: StateFlow<String?> = _aiServiceNotice.asStateFlow()

    fun setResumeText(text: String) {
        _activeResumeText.value = text
    }

    fun analyzeActiveResume(targetRole: String = "AI Engineer") {
        viewModelScope.launch {
            _isAnalyzing.value = true
            _aiServiceNotice.value = null
            try {
                val (analysis, notice) = repository.aiService.analyzeResume(_activeResumeText.value, targetRole)
                _currentAnalysis.value = analysis
                _aiServiceNotice.value = notice
                repository.saveResumeAnalysis(analysis)
            } finally {
                _isAnalyzing.value = false
            }
        }
    }

    fun selectSavedAnalysis(analysis: ResumeAnalysis) {
        _currentAnalysis.value = analysis
    }

    fun deleteAnalysis(id: String) {
        viewModelScope.launch {
            repository.deleteResumeAnalysis(id)
            if (_currentAnalysis.value?.id == id) {
                _currentAnalysis.value = null
            }
        }
    }

    // Skill Gap Analyzer State
    private val _selectedSkillGapRole = MutableStateFlow("AI Engineer")
    val selectedSkillGapRole: StateFlow<String> = _selectedSkillGapRole.asStateFlow()

    val skillGapResult: StateFlow<SkillGapAnalysis> = combine(
        userProfile,
        selectedSkillGapRole
    ) { profile, role ->
        SampleData.calculateSkillGap(profile.technicalSkills, role)
    }.stateIn(viewModelScope, SharingStarted.Lazily, SampleData.calculateSkillGap(userProfile.value.technicalSkills, "AI Engineer"))

    fun setSelectedSkillGapRole(role: String) {
        _selectedSkillGapRole.value = role
    }

    // Learning Roadmap State
    val currentRoadmap: StateFlow<LearningRoadmap> = repository.currentRoadmap

    fun toggleModuleCompletion(moduleId: String, isCompleted: Boolean) {
        viewModelScope.launch {
            repository.toggleModuleProgress(moduleId, !isCompleted)
        }
    }

    // Mock Interview State
    private val _interviewRole = MutableStateFlow("AI Engineer")
    val interviewRole: StateFlow<String> = _interviewRole.asStateFlow()

    private val _interviewDifficulty = MutableStateFlow("Entry-Level / Fresher")
    val interviewDifficulty: StateFlow<String> = _interviewDifficulty.asStateFlow()

    private val _interviewQuestions = MutableStateFlow<List<InterviewQuestion>>(
        SampleData.sampleInterviewQuestions["AI Engineer"] ?: emptyList()
    )
    val interviewQuestions: StateFlow<List<InterviewQuestion>> = _interviewQuestions.asStateFlow()

    private val _currentQuestionIndex = MutableStateFlow(0)
    val currentQuestionIndex: StateFlow<Int> = _currentQuestionIndex.asStateFlow()

    private val _userAnswerInput = MutableStateFlow("")
    val userAnswerInput: StateFlow<String> = _userAnswerInput.asStateFlow()

    private val _isEvaluatingAnswer = MutableStateFlow(false)
    val isEvaluatingAnswer: StateFlow<Boolean> = _isEvaluatingAnswer.asStateFlow()

    private val _interviewNotice = MutableStateFlow<String?>(null)
    val interviewNotice: StateFlow<String?> = _interviewNotice.asStateFlow()

    val interviewHistory: StateFlow<List<InterviewSession>> = repository.interviewHistory

    fun setInterviewRole(role: String) {
        _interviewRole.value = role
        val questions = SampleData.sampleInterviewQuestions[role] ?: SampleData.sampleInterviewQuestions["AI Engineer"] ?: emptyList()
        _interviewQuestions.value = questions
        _currentQuestionIndex.value = 0
        _userAnswerInput.value = ""
        _interviewNotice.value = null
    }

    fun setInterviewDifficulty(diff: String) {
        _interviewDifficulty.value = diff
    }

    fun setUserAnswerInput(ans: String) {
        _userAnswerInput.value = ans
    }

    fun submitCurrentAnswer() {
        val qIndex = _currentQuestionIndex.value
        val questions = _interviewQuestions.value
        if (qIndex !in questions.indices) return

        val currentQ = questions[qIndex]
        val answer = _userAnswerInput.value

        if (answer.isBlank()) return

        viewModelScope.launch {
            _isEvaluatingAnswer.value = true
            _interviewNotice.value = null
            try {
                val (eval, notice) = repository.aiService.evaluateInterviewAnswer(
                    role = _interviewRole.value,
                    difficulty = _interviewDifficulty.value,
                    question = currentQ.question,
                    userAnswer = answer
                )
                val updatedQ = currentQ.copy(userAnswer = answer, evaluation = eval)
                val updatedList = questions.toMutableList()
                updatedList[qIndex] = updatedQ
                _interviewQuestions.value = updatedList
                _interviewNotice.value = notice

                // Save session if at last question
                if (qIndex == questions.lastIndex) {
                    val avg = updatedList.mapNotNull { it.evaluation?.overallScore }.average().toInt()
                    val session = InterviewSession(
                        id = "sess_${System.currentTimeMillis()}",
                        role = _interviewRole.value,
                        difficulty = _interviewDifficulty.value,
                        timestamp = System.currentTimeMillis(),
                        questions = updatedList,
                        averageScore = avg
                    )
                    repository.saveInterviewSession(session)
                }
            } finally {
                _isEvaluatingAnswer.value = false
            }
        }
    }

    fun nextQuestion() {
        if (_currentQuestionIndex.value < _interviewQuestions.value.lastIndex) {
            _currentQuestionIndex.value += 1
            val nextQ = _interviewQuestions.value[_currentQuestionIndex.value]
            _userAnswerInput.value = nextQ.userAnswer ?: ""
        }
    }

    fun prevQuestion() {
        if (_currentQuestionIndex.value > 0) {
            _currentQuestionIndex.value -= 1
            val prevQ = _interviewQuestions.value[_currentQuestionIndex.value]
            _userAnswerInput.value = prevQ.userAnswer ?: ""
        }
    }

    fun restartInterview() {
        setInterviewRole(_interviewRole.value)
    }

    // Career Explorer State
    val careerPaths: List<CareerPathDetail> = SampleData.careerPaths

    private val _selectedCareer = MutableStateFlow<CareerPathDetail?>(null)
    val selectedCareer: StateFlow<CareerPathDetail?> = _selectedCareer.asStateFlow()

    fun selectCareer(career: CareerPathDetail?) {
        _selectedCareer.value = career
    }

    fun resetData() {
        viewModelScope.launch {
            repository.resetAllDataToDefault()
        }
    }
}
