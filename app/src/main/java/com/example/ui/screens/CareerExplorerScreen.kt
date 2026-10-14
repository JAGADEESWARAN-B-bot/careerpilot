package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.model.CareerPathDetail
import com.example.ui.Screen
import com.example.ui.components.SkillChip
import com.example.ui.theme.*

@Composable
fun CareerExplorerScreen(
    careerPaths: List<CareerPathDetail>,
    selectedCareer: CareerPathDetail?,
    onSelectCareer: (CareerPathDetail?) -> Unit,
    onSetAsTargetRole: (String) -> Unit,
    onNavigate: (Screen) -> Unit
) {
    var selectedCategory by remember { mutableStateOf("All Categories") }

    val categories = listOf("All Categories", "Artificial Intelligence", "Data & Analytics", "Software Engineering", "Infrastructure & DevOps")

    val filteredCareers = if (selectedCategory == "All Categories") {
        careerPaths
    } else {
        careerPaths.filter { it.category.contains(selectedCategory, ignoreCase = true) }
    }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp),
        contentPadding = PaddingValues(vertical = 16.dp)
    ) {
        // Header
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
                        text = "Technical Career Explorer",
                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Text(
                        text = "Verified technical role competencies, typical compensation ranges, and sample portfolio project benchmarks.",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )

                    // Categories
                    Row(modifier = Modifier.fillMaxWidth()) {
                        Column {
                            categories.chunked(2).forEach { rowCats ->
                                Row {
                                    rowCats.forEach { cat ->
                                        FilterChip(
                                            selected = selectedCategory == cat,
                                            onClick = { selectedCategory = cat },
                                            label = { Text(cat, fontSize = 11.sp) },
                                            modifier = Modifier.padding(end = 6.dp, bottom = 4.dp)
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        items(filteredCareers, key = { it.id }) { career ->
            CareerCard(
                career = career,
                onClick = { onSelectCareer(career) }
            )
        }
    }

    if (selectedCareer != null) {
        CareerDetailDialog(
            career = selectedCareer,
            onDismiss = { onSelectCareer(null) },
            onAnalyzeGap = {
                onSetAsTargetRole(selectedCareer.title)
                onSelectCareer(null)
                onNavigate(Screen.SKILL_GAP)
            }
        )
    }
}

@Composable
private fun CareerCard(
    career: CareerPathDetail,
    onClick: () -> Unit
) {
    Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() }
            .border(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.4f), RoundedCornerShape(16.dp))
            .testTag("career_card_${career.id}")
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = career.title,
                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Text(
                        text = career.category,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.primary
                    )
                }

                Surface(
                    shape = RoundedCornerShape(8.dp),
                    color = SuccessContainer
                ) {
                    Text(
                        text = career.growthRate,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF065F46),
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.height(8.dp))

            Text(
                text = career.shortDescription,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )

            Spacer(modifier = Modifier.height(10.dp))

            Surface(
                shape = RoundedCornerShape(8.dp),
                color = MaterialTheme.colorScheme.surfaceVariant
            ) {
                Text(
                    text = "Compensation Range: ${career.averageSalary}",
                    fontSize = 11.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                )
            }

            Spacer(modifier = Modifier.height(10.dp))

            Row(modifier = Modifier.fillMaxWidth()) {
                Column {
                    career.essentialSkills.take(4).chunked(4).forEach { rowSkills ->
                        Row {
                            rowSkills.forEach { skill ->
                                SkillChip(skill = skill)
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun CareerDetailDialog(
    career: CareerPathDetail,
    onDismiss: () -> Unit,
    onAnalyzeGap: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Column {
                Text(
                    text = career.title,
                    style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold)
                )
                Text(
                    text = "${career.category} • ${career.averageSalary}",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.primary
                )
            }
        },
        text = {
            LazyColumn(
                modifier = Modifier.fillMaxWidth(),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                item {
                    Text("Role Overview", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                    Text(career.shortDescription, fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }

                item {
                    Text("Key Responsibilities", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                    career.typicalResponsibilities.forEach { r ->
                        Text("• $r", fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                }

                item {
                    Text("Essential Skills Required", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                    Row(modifier = Modifier.fillMaxWidth()) {
                        Column {
                            career.essentialSkills.chunked(3).forEach { rowSkills ->
                                Row {
                                    rowSkills.forEach { skill ->
                                        SkillChip(skill = skill)
                                    }
                                }
                            }
                        }
                    }
                }

                item {
                    Text("Representative Portfolio Projects", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                    career.portfolioProjects.forEach { p ->
                        Text("• $p", fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                }

                item {
                    Text("Recommended Certifications", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                    career.recommendedCertifications.forEach { c ->
                        Text("• $c", fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                }
            }
        },
        confirmButton = {
            Button(onClick = onAnalyzeGap) {
                Text("Analyze Skill Gap vs This Role")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Close")
            }
        }
    )
}
