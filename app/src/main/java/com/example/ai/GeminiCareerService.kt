package com.example.ai

import com.example.BuildConfig
import com.example.data.SampleData
import com.example.model.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONArray
import org.json.JSONObject
import java.util.concurrent.TimeUnit

class GeminiCareerService {

    private val client = OkHttpClient.Builder()
        .connectTimeout(60, TimeUnit.SECONDS)
        .readTimeout(60, TimeUnit.SECONDS)
        .writeTimeout(60, TimeUnit.SECONDS)
        .build()

    fun isGeminiKeyConfigured(): Boolean {
        val key = BuildConfig.GEMINI_API_KEY
        return !key.isNullOrBlank() && key != "MY_GEMINI_API_KEY" && key != "null"
    }

    private suspend fun callGeminiApi(prompt: String): Result<String> = withContext(Dispatchers.IO) {
        val apiKey = BuildConfig.GEMINI_API_KEY
        if (!isGeminiKeyConfigured()) {
            return@withContext Result.failure(
                IllegalStateException("Gemini API key is not configured. Add GEMINI_API_KEY to the AI Studio Secrets panel.")
            )
        }

        val url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=$apiKey"
        val requestJson = JSONObject().apply {
            val contentsArr = JSONArray().apply {
                val contentObj = JSONObject().apply {
                    val partsArr = JSONArray().apply {
                        put(JSONObject().apply { put("text", prompt) })
                    }
                    put("parts", partsArr)
                }
                put(contentObj)
            }
            put("contents", contentsArr)
            put("generationConfig", JSONObject().apply {
                put("temperature", 0.3)
                put("topP", 0.8)
            })
        }

        try {
            val body = requestJson.toString().toRequestBody("application/json".toMediaType())
            val request = Request.Builder().url(url).post(body).build()
            client.newCall(request).execute().use { response ->
                val responseBody = response.body?.string() ?: ""
                if (!response.isSuccessful) {
                    return@withContext Result.failure(Exception("Gemini API error (${response.code}): $responseBody"))
                }
                val json = JSONObject(responseBody)
                val candidates = json.optJSONArray("candidates")
                if (candidates != null && candidates.length() > 0) {
                    val first = candidates.getJSONObject(0)
                    val content = first.optJSONObject("content")
                    val parts = content?.optJSONArray("parts")
                    if (parts != null && parts.length() > 0) {
                        val text = parts.getJSONObject(0).optString("text")
                        return@withContext Result.success(text)
                    }
                }
                Result.failure(Exception("Empty candidate response from Gemini API."))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun analyzeResume(
        resumeText: String,
        targetRole: String = "AI Engineer"
    ): Pair<ResumeAnalysis, String?> {
        val hasKey = isGeminiKeyConfigured()
        var aiStatusMessage: String? = null

        if (hasKey) {
            val prompt = """
                You are a senior technical recruiter and AI talent screener.
                Analyze the following candidate resume for the target role: "$targetRole".
                
                Resume:
                \"\"\"$resumeText\"\"\"
                
                Provide your assessment in the following exact JSON format (and nothing else, no markdown codeblocks):
                {
                  "candidateName": "Candidate Name",
                  "overallScore": 88,
                  "atsScore": 85,
                  "summary": "2-sentence executive summary of technical qualifications and suitability.",
                  "extractedSkills": ["Skill1", "Skill2", "Skill3", "Skill4", "Skill5"],
                  "strengths": ["Strength 1 with metrics", "Strength 2 with specific stack"],
                  "missingSkills": ["Skill to add 1", "Skill to add 2"],
                  "improvementSuggestions": ["Actionable improvement 1", "Actionable improvement 2", "Actionable improvement 3"],
                  "recommendedCareers": ["Career 1", "Career 2", "Career 3"]
                }
            """.trimIndent()

            val result = callGeminiApi(prompt)
            if (result.isSuccess) {
                val rawText = result.getOrNull() ?: ""
                val cleanJson = rawText.replace("```json", "").replace("```", "").trim()
                try {
                    val obj = JSONObject(cleanJson)
                    val analysis = ResumeAnalysis(
                        id = "analysis_${System.currentTimeMillis()}",
                        fileName = "Uploaded_Resume.pdf",
                        timestamp = System.currentTimeMillis(),
                        candidateName = obj.optString("candidateName", "Candidate"),
                        overallScore = obj.optInt("overallScore", 85),
                        atsScore = obj.optInt("atsScore", 82),
                        summary = obj.optString("summary", "Resume evaluated for technical competencies and project depth."),
                        extractedSkills = jsonArrayToStringList(obj.optJSONArray("extractedSkills")),
                        strengths = jsonArrayToStringList(obj.optJSONArray("strengths")),
                        missingSkills = jsonArrayToStringList(obj.optJSONArray("missingSkills")),
                        improvementSuggestions = jsonArrayToStringList(obj.optJSONArray("improvementSuggestions")),
                        recommendedCareers = jsonArrayToStringList(obj.optJSONArray("recommendedCareers"))
                    )
                    return Pair(analysis, "Analyzed with Gemini 3.5 Flash")
                } catch (e: Exception) {
                    aiStatusMessage = "Gemini responded, but parsing failed (${e.message}). Falling back to local transparent engine."
                }
            } else {
                aiStatusMessage = "Gemini API unavailable: ${result.exceptionOrNull()?.message}. Using local transparent engine."
            }
        } else {
            aiStatusMessage = "Gemini API key is not configured in Secrets. Analysis computed via transparent local keyword & ATS scoring engine."
        }

        // Local Rule-Based Transparent Analysis Fallback
        val extractedSkills = extractSkillsLocally(resumeText)
        val score = calculateAtsScore(resumeText, extractedSkills)
        val missing = listOf("Kubernetes / Cloud Orchestration", "CI/CD Pipeline Automation", "Distributed Caching (Redis)")
        val strengths = listOf(
            "Concrete project portfolio with metrics and measurable impact.",
            "Strong core proficiency in foundational languages and frameworks (${extractedSkills.take(3).joinToString(", ")}).",
            "Clear education timeline in Computer Science & applied engineering."
        )
        val suggestions = listOf(
            "Add quantifiable business impact metrics to project descriptions (e.g. latency % drop, queries/sec).",
            "Include GitHub repositories or live deployment links for every major technical project.",
            "Incorporate cloud deployment keywords (Docker, AWS/GCP, Linux) to improve ATS filtering."
        )
        val careers = when {
            extractedSkills.any { it.contains("PyTorch") || it.contains("AI") || it.contains("LangChain") } ->
                listOf("AI Engineer", "Machine Learning Engineer", "Data Scientist")
            extractedSkills.any { it.contains("React") || it.contains("TypeScript") } ->
                listOf("Full-Stack Developer", "Frontend Developer", "Python Developer")
            else ->
                listOf("Software Engineer", "Data Analyst", "Cloud Specialist")
        }

        val fallbackAnalysis = ResumeAnalysis(
            id = "analysis_${System.currentTimeMillis()}",
            fileName = "Document_Scan.pdf",
            timestamp = System.currentTimeMillis(),
            candidateName = extractCandidateName(resumeText),
            overallScore = score,
            atsScore = (score - 4).coerceAtLeast(60),
            summary = "Technical profile with strong foundations in ${extractedSkills.take(4).joinToString(", ")}. Recommended for modern tech roles with minor ATS keyword expansion.",
            extractedSkills = extractedSkills,
            strengths = strengths,
            missingSkills = missing,
            improvementSuggestions = suggestions,
            recommendedCareers = careers
        )
        return Pair(fallbackAnalysis, aiStatusMessage)
    }

    suspend fun evaluateInterviewAnswer(
        role: String,
        difficulty: String,
        question: String,
        userAnswer: String
    ): Pair<InterviewEvaluation, String?> {
        val hasKey = isGeminiKeyConfigured()
        var statusMessage: String? = null

        if (hasKey) {
            val prompt = """
                You are a senior tech interviewer conducting a technical interview for a "$role" position (Level: $difficulty).
                Question: "$question"
                Candidate's Answer: "$userAnswer"
                
                Evaluate the candidate's answer and return strictly in JSON:
                {
                  "technicalScore": 8, // 0 to 10
                  "clarityScore": 8, // 0 to 10
                  "relevanceScore": 9, // 0 to 10
                  "overallScore": 84, // 0 to 100
                  "feedback": "Concise summary of their response quality.",
                  "strengths": ["Clear mention of X", "Good practical understanding of Y"],
                  "areasToImprove": ["Did not mention edge case Z", "Explain trade-offs of W"],
                  "idealAnswer": "A concise model answer explaining the optimal solution."
                }
            """.trimIndent()

            val result = callGeminiApi(prompt)
            if (result.isSuccess) {
                val raw = result.getOrNull()?.replace("```json", "")?.replace("```", "")?.trim() ?: ""
                try {
                    val obj = JSONObject(raw)
                    val eval = InterviewEvaluation(
                        technicalScore = obj.optInt("technicalScore", 8),
                        clarityScore = obj.optInt("clarityScore", 8),
                        relevanceScore = obj.optInt("relevanceScore", 8),
                        overallScore = obj.optInt("overallScore", 80),
                        feedback = obj.optString("feedback", "Good comprehensive explanation."),
                        strengths = jsonArrayToStringList(obj.optJSONArray("strengths")),
                        areasToImprove = jsonArrayToStringList(obj.optJSONArray("areasToImprove")),
                        idealAnswer = obj.optString("idealAnswer", "The optimal answer covers system trade-offs and concrete implementation details.")
                    )
                    return Pair(eval, "Evaluated with Gemini 3.5 Flash")
                } catch (e: Exception) {
                    statusMessage = "Gemini output parsing failed. Using local rubric evaluation."
                }
            } else {
                statusMessage = "Gemini API unavailable: ${result.exceptionOrNull()?.message}. Using local rubric evaluation."
            }
        } else {
            statusMessage = "Gemini API key is not configured in Secrets. Evaluated using transparent rubric matching."
        }

        // Local Rubric Evaluation
        val wordCount = userAnswer.trim().split("\\s+".toRegex()).size
        val techKeywords = listOf("latency", "complexity", "database", "model", "pipeline", "cache", "token", "vector", "state", "concurrency", "trade-off", "architecture")
        val matchedKeywords = techKeywords.filter { userAnswer.contains(it, ignoreCase = true) }

        val techScore = (5 + matchedKeywords.size).coerceIn(4, 9)
        val clarityScore = if (wordCount > 30) 8 else 6
        val relevanceScore = if (wordCount > 15) 8 else 5
        val overall = ((techScore * 3.5) + (clarityScore * 3.5) + (relevanceScore * 3.0)).toInt().coerceIn(45, 95)

        val eval = InterviewEvaluation(
            technicalScore = techScore,
            clarityScore = clarityScore,
            relevanceScore = relevanceScore,
            overallScore = overall,
            feedback = if (wordCount > 40)
                "Comprehensive answer touching on core mechanics (${matchedKeywords.joinToString(", ")}). Good depth for $role."
            else
                "Good baseline understanding, but elaborate more on production constraints, failure modes, and architectural trade-offs.",
            strengths = listOf(
                "Directly addressed the question's primary objective.",
                "Mentioned key terminology: ${matchedKeywords.ifEmpty { listOf("fundamental concepts") }.joinToString(", ")}."
            ),
            areasToImprove = listOf(
                "Discuss edge cases and real-world failure mitigation.",
                "Mention quantitative impact (e.g. O(n) complexity or benchmark metrics)."
            ),
            idealAnswer = "A strong answer should outline the core architecture, explain how data flows through the system, and explicitly discuss performance trade-offs."
        )
        return Pair(eval, statusMessage)
    }

    private fun extractSkillsLocally(text: String): List<String> {
        val catalog = listOf(
            "Python", "PyTorch", "TensorFlow", "FastAPI", "SQL", "PostgreSQL",
            "Pandas", "NumPy", "Scikit-Learn", "LangChain", "Docker", "Git",
            "Linux", "React", "TypeScript", "JavaScript", "HTML5", "CSS", "Tailwind CSS",
            "C++", "Java", "Kubernetes", "Redis", "ChromaDB", "AWS", "GCP", "Tableau",
            "Power BI", "REST APIs", "GraphQL", "Hugging Face"
        )
        val found = catalog.filter { skill ->
            val regex = "\\b${Regex.escape(skill)}\\b".toRegex(RegexOption.IGNORE_CASE)
            regex.containsMatchIn(text)
        }
        return if (found.isNotEmpty()) found else listOf("Python", "SQL", "Git", "Problem Solving")
    }

    private fun calculateAtsScore(text: String, skills: List<String>): Int {
        var score = 65
        if (skills.size >= 5) score += 10
        if (skills.size >= 8) score += 8
        if (text.contains("education", ignoreCase = true)) score += 5
        if (text.contains("project", ignoreCase = true)) score += 5
        if (text.contains("experience", ignoreCase = true) || text.contains("internship", ignoreCase = true)) score += 5
        return score.coerceIn(50, 96)
    }

    private fun extractCandidateName(text: String): String {
        val lines = text.lines().map { it.trim() }.filter { it.isNotBlank() }
        val firstLine = lines.firstOrNull() ?: "Candidate"
        return if (firstLine.length < 35 && !firstLine.contains("resume", ignoreCase = true) && !firstLine.contains("curriculum", ignoreCase = true)) {
            firstLine
        } else "Candidate Profile"
    }

    private fun jsonArrayToStringList(arr: JSONArray?): List<String> {
        if (arr == null) return emptyList()
        val list = mutableListOf<String>()
        for (i in 0 until arr.length()) {
            val item = arr.optString(i)
            if (item.isNotBlank()) list.add(item)
        }
        return list
    }
}
