package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
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
import com.example.model.ProjectItem
import com.example.model.UserProfile
import com.example.ui.components.SkillChip

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProfileScreen(
    currentProfile: UserProfile,
    onSaveProfile: (UserProfile) -> Unit
) {
    var fullName by remember(currentProfile) { mutableStateOf(currentProfile.fullName) }
    var email by remember(currentProfile) { mutableStateOf(currentProfile.email) }
    var educationLevel by remember(currentProfile) { mutableStateOf(currentProfile.educationLevel) }
    var department by remember(currentProfile) { mutableStateOf(currentProfile.department) }
    var graduationYear by remember(currentProfile) { mutableStateOf(currentProfile.graduationYear.toString()) }
    var experienceLevel by remember(currentProfile) { mutableStateOf(currentProfile.experienceLevel) }
    var bio by remember(currentProfile) { mutableStateOf(currentProfile.bio) }

    var technicalSkills by remember(currentProfile) { mutableStateOf(currentProfile.technicalSkills) }
    var softSkills by remember(currentProfile) { mutableStateOf(currentProfile.softSkills) }
    var preferredRoles by remember(currentProfile) { mutableStateOf(currentProfile.preferredRoles) }
    var newSkillInput by remember { mutableStateOf("") }
    var newRoleInput by remember { mutableStateOf("") }

    var saveSuccessMessage by remember { mutableStateOf(false) }

    val suggestedSkills = listOf("PyTorch", "LangChain", "Docker", "FastAPI", "React", "PostgreSQL", "ChromaDB", "Kubernetes", "TypeScript")

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        contentPadding = PaddingValues(vertical = 16.dp)
    ) {
        item {
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                modifier = Modifier
                    .fillMaxWidth()
                    .border(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.5f), RoundedCornerShape(20.dp))
            ) {
                Column(
                    modifier = Modifier.padding(20.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Box(
                        modifier = Modifier
                            .size(68.dp)
                            .clip(CircleShape)
                            .background(MaterialTheme.colorScheme.primaryContainer),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = fullName.take(2).uppercase(),
                            fontSize = 24.sp,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.primary
                        )
                    }
                    Spacer(modifier = Modifier.height(10.dp))
                    Text(
                        text = fullName,
                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Text(
                        text = "$educationLevel • Graduating $graduationYear",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }

        // Academic & Personal Details
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
                        text = "Academic & Personal Details",
                        style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onSurface
                    )

                    OutlinedTextField(
                        value = fullName,
                        onValueChange = { fullName = it },
                        label = { Text("Full Name") },
                        modifier = Modifier.fillMaxWidth().testTag("profile_full_name_input")
                    )

                    OutlinedTextField(
                        value = email,
                        onValueChange = { email = it },
                        label = { Text("Institutional Email") },
                        modifier = Modifier.fillMaxWidth().testTag("profile_email_input")
                    )

                    OutlinedTextField(
                        value = educationLevel,
                        onValueChange = { educationLevel = it },
                        label = { Text("Degree / Program (e.g. B.Sc Computer Science)") },
                        modifier = Modifier.fillMaxWidth().testTag("profile_degree_input")
                    )

                    OutlinedTextField(
                        value = department,
                        onValueChange = { department = it },
                        label = { Text("Department / Specialization") },
                        modifier = Modifier.fillMaxWidth().testTag("profile_department_input")
                    )

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        OutlinedTextField(
                            value = graduationYear,
                            onValueChange = { graduationYear = it },
                            label = { Text("Grad Year") },
                            modifier = Modifier.weight(1f).testTag("profile_grad_year_input")
                        )
                        OutlinedTextField(
                            value = experienceLevel,
                            onValueChange = { experienceLevel = it },
                            label = { Text("Experience Level") },
                            modifier = Modifier.weight(1.5f).testTag("profile_experience_input")
                        )
                    }

                    OutlinedTextField(
                        value = bio,
                        onValueChange = { bio = it },
                        label = { Text("Professional Bio") },
                        maxLines = 3,
                        modifier = Modifier.fillMaxWidth().testTag("profile_bio_input")
                    )
                }
            }
        }

        // Technical Skills
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
                        text = "Technical Competencies (${technicalSkills.size})",
                        style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onSurface
                    )

                    // Add skill input
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        OutlinedTextField(
                            value = newSkillInput,
                            onValueChange = { newSkillInput = it },
                            placeholder = { Text("Add skill (e.g., PyTorch, SQL)") },
                            modifier = Modifier.weight(1f).testTag("profile_add_skill_input"),
                            singleLine = true
                        )
                        Button(
                            onClick = {
                                if (newSkillInput.isNotBlank() && !technicalSkills.contains(newSkillInput.trim())) {
                                    technicalSkills = technicalSkills + newSkillInput.trim()
                                    newSkillInput = ""
                                }
                            },
                            modifier = Modifier.testTag("profile_add_skill_button"),
                            shape = RoundedCornerShape(10.dp)
                        ) {
                            Text("Add")
                        }
                    }

                    // Quick suggested skills
                    Text("Suggested for B.Sc CS (AI & DS):", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    Row(modifier = Modifier.fillMaxWidth()) {
                        Column {
                            val rows = suggestedSkills.filterNot { technicalSkills.contains(it) }.chunked(3)
                            rows.forEach { rowSkills ->
                                Row {
                                    rowSkills.forEach { skill ->
                                        SuggestionChip(
                                            onClick = { technicalSkills = technicalSkills + skill },
                                            label = { Text("+ $skill", fontSize = 11.sp) },
                                            modifier = Modifier.padding(end = 4.dp, bottom = 4.dp)
                                        )
                                    }
                                }
                            }
                        }
                    }

                    // Existing skills chips
                    Column {
                        val rows = technicalSkills.chunked(3)
                        rows.forEach { rowSkills ->
                            Row {
                                rowSkills.forEach { skill ->
                                    SkillChip(
                                        skill = skill,
                                        onRemove = { technicalSkills = technicalSkills - skill }
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }

        // Preferred Target Roles
        item {
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                modifier = Modifier
                    .fillMaxWidth()
                    .border(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.4f), RoundedCornerShape(16.dp))
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    Text(
                        text = "Preferred Job Roles",
                        style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onSurface
                    )

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        OutlinedTextField(
                            value = newRoleInput,
                            onValueChange = { newRoleInput = it },
                            placeholder = { Text("e.g. AI Engineer, Data Scientist") },
                            modifier = Modifier.weight(1f),
                            singleLine = true
                        )
                        Button(
                            onClick = {
                                if (newRoleInput.isNotBlank() && !preferredRoles.contains(newRoleInput.trim())) {
                                    preferredRoles = preferredRoles + newRoleInput.trim()
                                    newRoleInput = ""
                                }
                            },
                            shape = RoundedCornerShape(10.dp)
                        ) {
                            Text("Add")
                        }
                    }

                    Row {
                        Column {
                            preferredRoles.chunked(2).forEach { rowRoles ->
                                Row {
                                    rowRoles.forEach { role ->
                                        SkillChip(
                                            skill = role,
                                            onRemove = { preferredRoles = preferredRoles - role }
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        // Save Button & Toast
        item {
            Button(
                onClick = {
                    val updated = currentProfile.copy(
                        fullName = fullName,
                        email = email,
                        educationLevel = educationLevel,
                        department = department,
                        graduationYear = graduationYear.toIntOrNull() ?: 2026,
                        experienceLevel = experienceLevel,
                        bio = bio,
                        technicalSkills = technicalSkills,
                        softSkills = softSkills,
                        preferredRoles = preferredRoles
                    )
                    onSaveProfile(updated)
                    saveSuccessMessage = true
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(50.dp)
                    .testTag("profile_save_changes_button"),
                shape = RoundedCornerShape(12.dp)
            ) {
                Icon(Icons.Default.Save, contentDescription = null, modifier = Modifier.size(18.dp))
                Spacer(modifier = Modifier.width(8.dp))
                Text("Save Profile & Skills", fontWeight = FontWeight.Bold)
            }

            if (saveSuccessMessage) {
                Spacer(modifier = Modifier.height(8.dp))
                Surface(
                    shape = RoundedCornerShape(8.dp),
                    color = Color(0xFFD1FAE5),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text(
                        text = "✓ Profile successfully saved to Room local database!",
                        color = Color(0xFF065F46),
                        fontSize = 12.sp,
                        fontWeight = FontWeight.SemiBold,
                        modifier = Modifier.padding(10.dp)
                    )
                }
            }
        }
    }
}
