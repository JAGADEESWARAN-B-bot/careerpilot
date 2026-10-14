package com.example.data

import android.content.Context
import com.example.ai.GeminiCareerService
import com.example.data.local.*
import com.example.model.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import org.json.JSONArray
import org.json.JSONObject

class CareerPilotRepository(context: Context) {

    private val db = CareerPilotDatabase.getDatabase(context)
    private val userDao = db.userDao()
    private val savedJobDao = db.savedJobDao()
    private val resumeDao = db.resumeDao()
    private val roadmapDao = db.roadmapDao()
    private val interviewDao = db.interviewDao()

    val aiService = GeminiCareerService()

    private val scope = CoroutineScope(Dispatchers.IO)

    // Current in-memory profile flow backed by Room
    val userProfile: StateFlow<UserProfile> = userDao.getUserProfile()
        .map { entity ->
            if (entity != null) {
                UserProfile(
                    id = entity.id,
                    fullName = entity.fullName,
                    email = entity.email,
                    educationLevel = entity.educationLevel,
                    degree = entity.degree,
                    department = entity.department,
                    graduationYear = entity.graduationYear,
                    experienceLevel = entity.experienceLevel,
                    preferredRoles = fromJsonList(entity.preferredRolesJson),
                    preferredLocations = fromJsonList(entity.preferredLocationsJson),
                    technicalSkills = fromJsonList(entity.technicalSkillsJson),
                    softSkills = fromJsonList(entity.softSkillsJson),
                    bio = entity.bio
                )
            } else {
                // Default Profile for final-year B.Sc Computer Science (AI & DS) student
                UserProfile()
            }
        }
        .stateIn(scope, SharingStarted.Eagerly, UserProfile())

    // Saved job IDs
    val savedJobIds: StateFlow<Set<String>> = savedJobDao.getSavedJobIds()
        .map { it.toSet() }
        .stateIn(scope, SharingStarted.Eagerly, emptySet())

    // All Jobs with dynamic saved status
    val jobs: StateFlow<List<Job>> = combine(
        flowOf(SampleData.sampleJobs),
        savedJobIds
    ) { jobsList, savedSet ->
        jobsList.map { job ->
            job.copy(isSaved = savedSet.contains(job.id))
        }
    }.stateIn(scope, SharingStarted.Eagerly, SampleData.sampleJobs)

    // Completed Module IDs for Roadmap
    val completedModuleIds: StateFlow<Set<String>> = roadmapDao.getProgress()
        .map { list -> list.filter { it.isCompleted }.map { it.moduleId }.toSet() }
        .stateIn(scope, SharingStarted.Eagerly, setOf("m1_1", "m1_2", "m1_3", "m2_1"))

    // Active Roadmap
    val currentRoadmap: StateFlow<LearningRoadmap> = completedModuleIds.map { completedSet ->
        val defaultRoadmap = SampleData.defaultRoadmapAI
        val updatedStages = defaultRoadmap.stages.map { stage ->
            val updatedModules = stage.modules.map { mod ->
                mod.copy(isCompleted = completedSet.contains(mod.id))
            }
            stage.copy(modules = updatedModules)
        }
        defaultRoadmap.copy(stages = updatedStages)
    }.stateIn(scope, SharingStarted.Eagerly, SampleData.defaultRoadmapAI)

    // Saved Resume Analyses
    val resumeAnalyses: StateFlow<List<ResumeAnalysis>> = resumeDao.getAllAnalyses()
        .map { entities ->
            entities.map { entity ->
                ResumeAnalysis(
                    id = entity.id,
                    fileName = entity.fileName,
                    timestamp = entity.timestamp,
                    candidateName = entity.candidateName,
                    overallScore = entity.overallScore,
                    atsScore = entity.atsScore,
                    summary = entity.summary,
                    extractedSkills = fromJsonList(entity.extractedSkillsJson),
                    strengths = fromJsonList(entity.strengthsJson),
                    missingSkills = fromJsonList(entity.missingSkillsJson),
                    improvementSuggestions = fromJsonList(entity.suggestionsJson),
                    recommendedCareers = fromJsonList(entity.careersJson)
                )
            }
        }.stateIn(scope, SharingStarted.Eagerly, emptyList())

    // Interview History
    val interviewHistory: StateFlow<List<InterviewSession>> = interviewDao.getAllSessions()
        .map { entities ->
            entities.map { entity ->
                InterviewSession(
                    id = entity.id,
                    role = entity.role,
                    difficulty = entity.difficulty,
                    timestamp = entity.timestamp,
                    averageScore = entity.averageScore,
                    questions = parseQuestionsJson(entity.questionsJson)
                )
            }
        }.stateIn(scope, SharingStarted.Eagerly, emptyList())

    suspend fun saveUserProfile(profile: UserProfile) {
        val entity = UserProfileEntity(
            id = "primary_user",
            fullName = profile.fullName,
            email = profile.email,
            educationLevel = profile.educationLevel,
            degree = profile.degree,
            department = profile.department,
            graduationYear = profile.graduationYear,
            experienceLevel = profile.experienceLevel,
            preferredRolesJson = toJsonList(profile.preferredRoles),
            preferredLocationsJson = toJsonList(profile.preferredLocations),
            technicalSkillsJson = toJsonList(profile.technicalSkills),
            softSkillsJson = toJsonList(profile.softSkills),
            bio = profile.bio
        )
        userDao.saveUserProfile(entity)
    }

    suspend fun toggleSaveJob(jobId: String) {
        if (savedJobIds.value.contains(jobId)) {
            savedJobDao.removeJob(jobId)
        } else {
            savedJobDao.saveJob(SavedJobEntity(jobId = jobId))
        }
    }

    suspend fun toggleModuleProgress(moduleId: String, completed: Boolean) {
        roadmapDao.setModuleCompleted(
            RoadmapProgressEntity(moduleId = moduleId, isCompleted = completed)
        )
    }

    suspend fun saveResumeAnalysis(analysis: ResumeAnalysis) {
        val entity = ResumeAnalysisEntity(
            id = analysis.id,
            fileName = analysis.fileName,
            timestamp = analysis.timestamp,
            candidateName = analysis.candidateName,
            overallScore = analysis.overallScore,
            atsScore = analysis.atsScore,
            summary = analysis.summary,
            extractedSkillsJson = toJsonList(analysis.extractedSkills),
            strengthsJson = toJsonList(analysis.strengths),
            missingSkillsJson = toJsonList(analysis.missingSkills),
            suggestionsJson = toJsonList(analysis.improvementSuggestions),
            careersJson = toJsonList(analysis.recommendedCareers)
        )
        resumeDao.insertAnalysis(entity)
    }

    suspend fun deleteResumeAnalysis(id: String) {
        resumeDao.deleteAnalysis(id)
    }

    suspend fun saveInterviewSession(session: InterviewSession) {
        val questionsJson = serializeQuestions(session.questions)
        val entity = InterviewSessionEntity(
            id = session.id,
            role = session.role,
            difficulty = session.difficulty,
            timestamp = session.timestamp,
            averageScore = session.averageScore,
            questionsJson = questionsJson
        )
        interviewDao.insertSession(entity)
    }

    suspend fun resetAllDataToDefault() {
        saveUserProfile(UserProfile())
    }

    private fun toJsonList(list: List<String>): String {
        val arr = JSONArray()
        list.forEach { arr.put(it) }
        return arr.toString()
    }

    private fun fromJsonList(jsonStr: String?): List<String> {
        if (jsonStr.isNullOrBlank()) return emptyList()
        val list = mutableListOf<String>()
        try {
            val arr = JSONArray(jsonStr)
            for (i in 0 until arr.length()) {
                list.add(arr.getString(i))
            }
        } catch (e: Exception) {
            // fallback for comma separated
            return jsonStr.split(",").map { it.trim() }.filter { it.isNotBlank() }
        }
        return list
    }

    private fun serializeQuestions(questions: List<InterviewQuestion>): String {
        val arr = JSONArray()
        for (q in questions) {
            val obj = JSONObject().apply {
                put("id", q.id)
                put("question", q.question)
                put("category", q.category)
                put("difficulty", q.difficulty)
                put("userAnswer", q.userAnswer ?: "")
                if (q.evaluation != null) {
                    val ev = JSONObject().apply {
                        put("technicalScore", q.evaluation.technicalScore)
                        put("clarityScore", q.evaluation.clarityScore)
                        put("relevanceScore", q.evaluation.relevanceScore)
                        put("overallScore", q.evaluation.overallScore)
                        put("feedback", q.evaluation.feedback)
                    }
                    put("evaluation", ev)
                }
            }
            arr.put(obj)
        }
        return arr.toString()
    }

    private fun parseQuestionsJson(json: String?): List<InterviewQuestion> {
        if (json.isNullOrBlank()) return emptyList()
        val list = mutableListOf<InterviewQuestion>()
        try {
            val arr = JSONArray(json)
            for (i in 0 until arr.length()) {
                val obj = arr.getJSONObject(i)
                var eval: InterviewEvaluation? = null
                if (obj.has("evaluation")) {
                    val ev = obj.getJSONObject("evaluation")
                    eval = InterviewEvaluation(
                        technicalScore = ev.optInt("technicalScore", 8),
                        clarityScore = ev.optInt("clarityScore", 8),
                        relevanceScore = ev.optInt("relevanceScore", 8),
                        overallScore = ev.optInt("overallScore", 80),
                        feedback = ev.optString("feedback", ""),
                        strengths = emptyList(),
                        areasToImprove = emptyList(),
                        idealAnswer = ""
                    )
                }
                list.add(
                    InterviewQuestion(
                        id = obj.optString("id"),
                        question = obj.optString("question"),
                        category = obj.optString("category"),
                        difficulty = obj.optString("difficulty"),
                        sampleAnswerHints = emptyList(),
                        userAnswer = obj.optString("userAnswer"),
                        evaluation = eval
                    )
                )
            }
        } catch (e: Exception) {
            // Ignore parse errors
        }
        return list
    }
}
