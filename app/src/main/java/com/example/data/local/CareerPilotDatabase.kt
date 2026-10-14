package com.example.data.local

import android.content.Context
import androidx.room.*
import kotlinx.coroutines.flow.Flow

// --- Room Entities ---

@Entity(tableName = "user_profile")
data class UserProfileEntity(
    @PrimaryKey val id: String = "primary_user",
    val fullName: String,
    val email: String,
    val educationLevel: String,
    val degree: String,
    val department: String,
    val graduationYear: Int,
    val experienceLevel: String,
    val preferredRolesJson: String, // stored as comma/JSON
    val preferredLocationsJson: String,
    val technicalSkillsJson: String,
    val softSkillsJson: String,
    val bio: String
)

@Entity(tableName = "saved_jobs")
data class SavedJobEntity(
    @PrimaryKey val jobId: String,
    val savedAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "resume_analyses")
data class ResumeAnalysisEntity(
    @PrimaryKey val id: String,
    val fileName: String,
    val timestamp: Long,
    val candidateName: String,
    val overallScore: Int,
    val atsScore: Int,
    val summary: String,
    val extractedSkillsJson: String,
    val strengthsJson: String,
    val missingSkillsJson: String,
    val suggestionsJson: String,
    val careersJson: String
)

@Entity(tableName = "roadmap_progress")
data class RoadmapProgressEntity(
    @PrimaryKey val moduleId: String,
    val isCompleted: Boolean,
    val completedAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "interview_history")
data class InterviewSessionEntity(
    @PrimaryKey val id: String,
    val role: String,
    val difficulty: String,
    val timestamp: Long,
    val averageScore: Int,
    val questionsJson: String
)

// --- Type Converters ---
class Converters {
    @TypeConverter
    fun fromStringList(value: List<String>?): String = value?.joinToString(";;;") ?: ""

    @TypeConverter
    fun toStringList(value: String?): List<String> {
        if (value.isNullOrBlank()) return emptyList()
        return value.split(";;;").filter { it.isNotBlank() }
    }
}

// --- DAOs ---

@Dao
interface UserDao {
    @Query("SELECT * FROM user_profile WHERE id = 'primary_user' LIMIT 1")
    fun getUserProfile(): Flow<UserProfileEntity?>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun saveUserProfile(profile: UserProfileEntity)
}

@Dao
interface SavedJobDao {
    @Query("SELECT jobId FROM saved_jobs")
    fun getSavedJobIds(): Flow<List<String>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun saveJob(job: SavedJobEntity)

    @Query("DELETE FROM saved_jobs WHERE jobId = :jobId")
    suspend fun removeJob(jobId: String)
}

@Dao
interface ResumeDao {
    @Query("SELECT * FROM resume_analyses ORDER BY timestamp DESC")
    fun getAllAnalyses(): Flow<List<ResumeAnalysisEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAnalysis(analysis: ResumeAnalysisEntity)

    @Query("DELETE FROM resume_analyses WHERE id = :id")
    suspend fun deleteAnalysis(id: String)
}

@Dao
interface RoadmapDao {
    @Query("SELECT * FROM roadmap_progress")
    fun getProgress(): Flow<List<RoadmapProgressEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun setModuleCompleted(progress: RoadmapProgressEntity)
}

@Dao
interface InterviewDao {
    @Query("SELECT * FROM interview_history ORDER BY timestamp DESC")
    fun getAllSessions(): Flow<List<InterviewSessionEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertSession(session: InterviewSessionEntity)
}

// --- Room Database ---

@Database(
    entities = [
        UserProfileEntity::class,
        SavedJobEntity::class,
        ResumeAnalysisEntity::class,
        RoadmapProgressEntity::class,
        InterviewSessionEntity::class
    ],
    version = 1,
    exportSchema = false
)
abstract class CareerPilotDatabase : RoomDatabase() {
    abstract fun userDao(): UserDao
    abstract fun savedJobDao(): SavedJobDao
    abstract fun resumeDao(): ResumeDao
    abstract fun roadmapDao(): RoadmapDao
    abstract fun interviewDao(): InterviewDao

    companion object {
        @Volatile
        private var INSTANCE: CareerPilotDatabase? = null

        fun getDatabase(context: Context): CareerPilotDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    CareerPilotDatabase::class.java,
                    "career_pilot_database"
                ).fallbackToDestructiveMigration(true).build()
                INSTANCE = instance
                instance
            }
        }
    }
}
