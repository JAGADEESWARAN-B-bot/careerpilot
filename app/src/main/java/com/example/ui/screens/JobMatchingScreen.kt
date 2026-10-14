package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.model.Job
import com.example.model.JobMatchScore
import com.example.ui.components.MatchScoreBadge
import com.example.ui.components.SkillChip

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun JobMatchingScreen(
    jobsWithScores: List<Pair<Job, JobMatchScore>>,
    searchQuery: String,
    onSearchChange: (String) -> Unit,
    selectedLocation: String,
    onLocationChange: (String) -> Unit,
    selectedExperience: String,
    onExperienceChange: (String) -> Unit,
    selectedJob: Job?,
    onSelectJob: (Job?) -> Unit,
    onToggleSaveJob: (String) -> Unit
) {
    var showOnlySaved by remember { mutableStateOf(false) }

    val displayedJobs = if (showOnlySaved) {
        jobsWithScores.filter { it.first.isSaved }
    } else {
        jobsWithScores
    }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp),
        contentPadding = PaddingValues(vertical = 16.dp)
    ) {
        // Search & Filter Header
        item {
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                modifier = Modifier
                    .fillMaxWidth()
                    .border(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.4f), RoundedCornerShape(16.dp))
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Text(
                        text = "Smart Job & Skill Matching",
                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onSurface
                    )

                    OutlinedTextField(
                        value = searchQuery,
                        onValueChange = onSearchChange,
                        placeholder = { Text("Search by title, skill (Python, PyTorch, React)...") },
                        leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
                        trailingIcon = {
                            if (searchQuery.isNotEmpty()) {
                                IconButton(onClick = { onSearchChange("") }) {
                                    Icon(Icons.Default.Close, contentDescription = "Clear")
                                }
                            }
                        },
                        modifier = Modifier
                            .fillMaxWidth()
                            .testTag("job_search_input_field"),
                        singleLine = true
                    )

                    // Location filter chips
                    Text("Work Location:", fontSize = 11.sp, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(6.dp)
                    ) {
                        val locations = listOf("All Locations", "Remote", "Hybrid", "Bangalore")
                        locations.forEach { loc ->
                            FilterChip(
                                selected = selectedLocation == loc,
                                onClick = { onLocationChange(loc) },
                                label = { Text(loc, fontSize = 11.sp) }
                            )
                        }
                    }

                    // Saved jobs toggle
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(
                            text = "Filter: ${displayedJobs.size} matching opportunities",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        FilterChip(
                            selected = showOnlySaved,
                            onClick = { showOnlySaved = !showOnlySaved },
                            leadingIcon = {
                                Icon(
                                    imageVector = if (showOnlySaved) Icons.Filled.Bookmark else Icons.Outlined.BookmarkBorder,
                                    contentDescription = null,
                                    modifier = Modifier.size(16.dp)
                                )
                            },
                            label = { Text("Saved Only", fontSize = 11.sp) }
                        )
                    }
                }
            }
        }

        // Job Opportunities List
        if (displayedJobs.isEmpty()) {
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(32.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Icon(Icons.Outlined.SearchOff, contentDescription = null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(48.dp))
                        Spacer(modifier = Modifier.height(10.dp))
                        Text("No matching jobs found", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold))
                        Text("Try resetting search terms or location filters.", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                }
            }
        } else {
            items(displayedJobs, key = { it.first.id }) { (job, score) ->
                JobCard(
                    job = job,
                    score = score,
                    onSaveToggle = { onToggleSaveJob(job.id) },
                    onClick = { onSelectJob(job) }
                )
            }
        }
    }

    // Job Detail Dialog / Modal
    if (selectedJob != null) {
        val currentScore = jobsWithScores.find { it.first.id == selectedJob.id }?.second
        JobDetailDialog(
            job = selectedJob,
            score = currentScore,
            onDismiss = { onSelectJob(null) },
            onToggleSave = { onToggleSaveJob(selectedJob.id) }
        )
    }
}

@Composable
private fun JobCard(
    job: Job,
    score: JobMatchScore,
    onSaveToggle: () -> Unit,
    onClick: () -> Unit
) {
    Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() }
            .border(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.4f), RoundedCornerShape(16.dp))
            .testTag("job_card_${job.id}")
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.Top,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = job.title,
                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Text(
                        text = "${job.company} • ${job.location}",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }

                IconButton(
                    onClick = onSaveToggle,
                    modifier = Modifier.size(36.dp)
                ) {
                    Icon(
                        imageVector = if (job.isSaved) Icons.Filled.Bookmark else Icons.Outlined.BookmarkBorder,
                        contentDescription = "Save Job",
                        tint = if (job.isSaved) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }

            Spacer(modifier = Modifier.height(10.dp))

            // Badges row: Match score, Salary, Experience
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                MatchScoreBadge(score = score.percentage)
                Surface(
                    shape = RoundedCornerShape(8.dp),
                    color = MaterialTheme.colorScheme.surfaceVariant
                ) {
                    Text(
                        text = job.salaryRange,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                    )
                }
                Surface(
                    shape = RoundedCornerShape(8.dp),
                    color = MaterialTheme.colorScheme.surfaceVariant
                ) {
                    Text(
                        text = job.experienceLevel,
                        fontSize = 11.sp,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.height(12.dp))

            // Transparent Match Explanation
            Surface(
                shape = RoundedCornerShape(10.dp),
                color = MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.4f),
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(
                    text = score.explanation,
                    fontSize = 11.sp,
                    color = MaterialTheme.colorScheme.onSurface,
                    modifier = Modifier.padding(10.dp)
                )
            }

            Spacer(modifier = Modifier.height(10.dp))

            // Required Skills Preview
            Row(modifier = Modifier.fillMaxWidth()) {
                Column {
                    val rows = job.requiredSkills.take(4).chunked(4)
                    rows.forEach { rowSkills ->
                        Row {
                            rowSkills.forEach { skill ->
                                val isMatched = score.matchedSkills.contains(skill)
                                SkillChip(skill = skill, isMatched = isMatched)
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun JobDetailDialog(
    job: Job,
    score: JobMatchScore?,
    onDismiss: () -> Unit,
    onToggleSave: () -> Unit
) {
    var appliedSuccess by remember { mutableStateOf(false) }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Column {
                Text(
                    text = job.title,
                    style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold)
                )
                Text(
                    text = "${job.company} • ${job.location}",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        },
        text = {
            LazyColumn(
                modifier = Modifier.fillMaxWidth(),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                // Match score breakdown
                if (score != null) {
                    item {
                        Surface(
                            shape = RoundedCornerShape(12.dp),
                            color = MaterialTheme.colorScheme.surfaceVariant,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Column(modifier = Modifier.padding(12.dp)) {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Text("Transparent Match Breakdown", fontWeight = FontWeight.Bold, fontSize = 12.sp)
                                    MatchScoreBadge(score = score.percentage)
                                }
                                Spacer(modifier = Modifier.height(6.dp))
                                Text("• Technical Skills Match: ${score.skillsScore}% (60% weight)", fontSize = 11.sp)
                                Text("• Experience Alignment: ${score.experienceScore}% (20% weight)", fontSize = 11.sp)
                                Text("• Degree/Education Match: ${score.educationScore}% (20% weight)", fontSize = 11.sp)
                            }
                        }
                    }
                }

                item {
                    Text("Role Description", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                    Text(job.description, fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }

                item {
                    Text("Key Responsibilities", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                    job.responsibilities.forEach { resp ->
                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp), verticalAlignment = Alignment.Top) {
                            Text("•", fontWeight = FontWeight.Bold)
                            Text(resp, fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                    }
                }

                item {
                    Text("Required Competencies", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                    Row(modifier = Modifier.fillMaxWidth()) {
                        Column {
                            job.requiredSkills.chunked(3).forEach { rowSkills ->
                                Row {
                                    rowSkills.forEach { skill ->
                                        val isMatched = score?.matchedSkills?.contains(skill) ?: false
                                        SkillChip(skill = skill, isMatched = isMatched)
                                    }
                                }
                            }
                        }
                    }
                }

                if (appliedSuccess) {
                    item {
                        Surface(
                            shape = RoundedCornerShape(8.dp),
                            color = Color(0xFFD1FAE5),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text(
                                text = "✓ Application successfully submitted with matched candidate profile!",
                                color = Color(0xFF065F46),
                                fontSize = 12.sp,
                                fontWeight = FontWeight.SemiBold,
                                modifier = Modifier.padding(10.dp)
                            )
                        }
                    }
                }
            }
        },
        confirmButton = {
            Button(
                onClick = { appliedSuccess = true },
                enabled = !appliedSuccess
            ) {
                Text(if (appliedSuccess) "Applied ✓" else "Apply with Profile")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Close")
            }
        }
    )
}
