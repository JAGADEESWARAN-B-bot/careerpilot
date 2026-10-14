package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.ui.CareerPilotViewModel
import com.example.ui.Screen
import com.example.ui.components.CareerPilotBottomNav
import com.example.ui.components.CareerPilotTopBar
import com.example.ui.screens.*
import com.example.ui.theme.CareerPilotTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            CareerPilotTheme {
                CareerPilotApp()
            }
        }
    }
}

@Composable
fun CareerPilotApp(
    viewModel: CareerPilotViewModel = viewModel()
) {
    val currentScreen by viewModel.currentScreen.collectAsStateWithLifecycle()
    val userProfile by viewModel.userProfile.collectAsStateWithLifecycle()
    val allJobs by viewModel.allJobs.collectAsStateWithLifecycle()
    val filteredJobsWithScores by viewModel.filteredJobsWithScores.collectAsStateWithLifecycle()
    val selectedJob by viewModel.selectedJob.collectAsStateWithLifecycle()
    val searchQuery by viewModel.jobSearchQuery.collectAsStateWithLifecycle()
    val selectedLocation by viewModel.selectedLocation.collectAsStateWithLifecycle()
    val selectedExperience by viewModel.selectedExperience.collectAsStateWithLifecycle()

    val activeResumeText by viewModel.activeResumeText.collectAsStateWithLifecycle()
    val isAnalyzingResume by viewModel.isAnalyzing.collectAsStateWithLifecycle()
    val currentAnalysis by viewModel.currentAnalysis.collectAsStateWithLifecycle()
    val resumeAnalyses by viewModel.resumeAnalyses.collectAsStateWithLifecycle()
    val aiServiceNotice by viewModel.aiServiceNotice.collectAsStateWithLifecycle()

    val selectedSkillGapRole by viewModel.selectedSkillGapRole.collectAsStateWithLifecycle()
    val skillGapResult by viewModel.skillGapResult.collectAsStateWithLifecycle()

    val currentRoadmap by viewModel.currentRoadmap.collectAsStateWithLifecycle()

    val interviewRole by viewModel.interviewRole.collectAsStateWithLifecycle()
    val interviewDifficulty by viewModel.interviewDifficulty.collectAsStateWithLifecycle()
    val interviewQuestions by viewModel.interviewQuestions.collectAsStateWithLifecycle()
    val currentQuestionIndex by viewModel.currentQuestionIndex.collectAsStateWithLifecycle()
    val userAnswerInput by viewModel.userAnswerInput.collectAsStateWithLifecycle()
    val isEvaluatingInterview by viewModel.isEvaluatingAnswer.collectAsStateWithLifecycle()
    val interviewNotice by viewModel.interviewNotice.collectAsStateWithLifecycle()
    val interviewHistory by viewModel.interviewHistory.collectAsStateWithLifecycle()

    val careerPaths = viewModel.careerPaths
    val selectedCareer by viewModel.selectedCareer.collectAsStateWithLifecycle()

    val isGeminiConfigured = BuildConfig.GEMINI_API_KEY.isNotBlank() &&
        BuildConfig.GEMINI_API_KEY != "MY_GEMINI_API_KEY" &&
        BuildConfig.GEMINI_API_KEY != "null"

    // Hardware/Gesture back handler
    BackHandler(enabled = currentScreen != Screen.LANDING) {
        viewModel.navigateBack()
    }

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        topBar = {
            CareerPilotTopBar(
                currentScreen = currentScreen,
                onNavigate = { viewModel.navigateTo(it) },
                onBack = { viewModel.navigateBack() },
                canGoBack = currentScreen != Screen.LANDING && currentScreen != Screen.DASHBOARD,
                isGeminiActive = isGeminiConfigured
            )
        },
        bottomBar = {
            if (currentScreen != Screen.LANDING) {
                CareerPilotBottomNav(
                    currentScreen = currentScreen,
                    onNavigate = { viewModel.navigateTo(it) }
                )
            }
        }
    ) { innerPadding ->
        androidx.compose.foundation.layout.Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            when (currentScreen) {
                Screen.LANDING -> {
                    LandingScreen(
                        onNavigate = { viewModel.navigateTo(it) }
                    )
                }
                Screen.DASHBOARD -> {
                    DashboardScreen(
                        userProfile = userProfile,
                        savedJobsCount = allJobs.count { it.isSaved },
                        resumeAnalyses = resumeAnalyses,
                        roadmap = currentRoadmap,
                        onNavigate = { viewModel.navigateTo(it) },
                        onSelectResumeAnalysis = { viewModel.selectSavedAnalysis(it) }
                    )
                }
                Screen.PROFILE -> {
                    ProfileScreen(
                        currentProfile = userProfile,
                        onSaveProfile = { viewModel.updateProfile(it) }
                    )
                }
                Screen.RESUME_ANALYZER -> {
                    ResumeAnalyzerScreen(
                        activeResumeText = activeResumeText,
                        onUpdateResumeText = { viewModel.setResumeText(it) },
                        isAnalyzing = isAnalyzingResume,
                        currentAnalysis = currentAnalysis,
                        aiNotice = aiServiceNotice,
                        pastAnalyses = resumeAnalyses,
                        onAnalyze = { role -> viewModel.analyzeActiveResume(role) },
                        onSelectPastAnalysis = { viewModel.selectSavedAnalysis(it) },
                        onDeleteAnalysis = { viewModel.deleteAnalysis(it) }
                    )
                }
                Screen.JOB_MATCHING -> {
                    JobMatchingScreen(
                        jobsWithScores = filteredJobsWithScores,
                        searchQuery = searchQuery,
                        onSearchChange = { viewModel.setJobSearchQuery(it) },
                        selectedLocation = selectedLocation,
                        onLocationChange = { viewModel.setSelectedLocation(it) },
                        selectedExperience = selectedExperience,
                        onExperienceChange = { viewModel.setSelectedExperience(it) },
                        selectedJob = selectedJob,
                        onSelectJob = { viewModel.selectJob(it) },
                        onToggleSaveJob = { viewModel.toggleSaveJob(it) }
                    )
                }
                Screen.SKILL_GAP -> {
                    SkillGapScreen(
                        skillGapResult = skillGapResult,
                        selectedRole = selectedSkillGapRole,
                        onRoleSelected = { viewModel.setSelectedSkillGapRole(it) },
                        onNavigate = { viewModel.navigateTo(it) }
                    )
                }
                Screen.ROADMAP -> {
                    RoadmapScreen(
                        roadmap = currentRoadmap,
                        onToggleModuleCompletion = { modId, comp ->
                            viewModel.toggleModuleCompletion(modId, comp)
                        }
                    )
                }
                Screen.MOCK_INTERVIEW -> {
                    MockInterviewScreen(
                        currentRole = interviewRole,
                        currentDifficulty = interviewDifficulty,
                        onRoleChange = { viewModel.setInterviewRole(it) },
                        onDifficultyChange = { viewModel.setInterviewDifficulty(it) },
                        questions = interviewQuestions,
                        currentIndex = currentQuestionIndex,
                        userAnswerInput = userAnswerInput,
                        onAnswerInputChange = { viewModel.setUserAnswerInput(it) },
                        isEvaluating = isEvaluatingInterview,
                        aiNotice = interviewNotice,
                        pastSessions = interviewHistory,
                        onSubmitAnswer = { viewModel.submitCurrentAnswer() },
                        onNextQuestion = { viewModel.nextQuestion() },
                        onPrevQuestion = { viewModel.prevQuestion() },
                        onRestart = { viewModel.restartInterview() }
                    )
                }
                Screen.CAREER_EXPLORER -> {
                    CareerExplorerScreen(
                        careerPaths = careerPaths,
                        selectedCareer = selectedCareer,
                        onSelectCareer = { viewModel.selectCareer(it) },
                        onSetAsTargetRole = { role ->
                            viewModel.setSelectedSkillGapRole(role)
                        },
                        onNavigate = { viewModel.navigateTo(it) }
                    )
                }
                Screen.SETTINGS -> {
                    SettingsScreen(
                        userProfile = userProfile,
                        isGeminiConfigured = isGeminiConfigured,
                        onNavigate = { viewModel.navigateTo(it) },
                        onLogOut = { viewModel.logOut() },
                        onResetData = { viewModel.resetData() }
                    )
                }
            }
        }
    }
}
