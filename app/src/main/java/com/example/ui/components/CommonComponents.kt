package com.example.ui.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.Screen
import com.example.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CareerPilotTopBar(
    currentScreen: Screen,
    onNavigate: (Screen) -> Unit,
    onBack: () -> Unit,
    canGoBack: Boolean,
    isGeminiActive: Boolean
) {
    TopAppBar(
        title = {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Box(
                    modifier = Modifier
                        .size(34.dp)
                        .clip(RoundedCornerShape(8.dp))
                        .background(MaterialTheme.colorScheme.primary),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.Navigation,
                        contentDescription = "CareerPilot Logo",
                        tint = Color.White,
                        modifier = Modifier.size(20.dp)
                    )
                }
                Column {
                    Text(
                        text = "AI CareerPilot",
                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Text(
                        text = when (currentScreen) {
                            Screen.LANDING -> "Smart Job & Skill Platform"
                            Screen.DASHBOARD -> "Dashboard"
                            Screen.PROFILE -> "Profile & Skills"
                            Screen.RESUME_ANALYZER -> "AI Resume Analyzer"
                            Screen.JOB_MATCHING -> "Smart Job Matching"
                            Screen.SKILL_GAP -> "Skill Gap Analyzer"
                            Screen.ROADMAP -> "Personalized Roadmap"
                            Screen.MOCK_INTERVIEW -> "AI Mock Interview"
                            Screen.CAREER_EXPLORER -> "Career Explorer"
                            Screen.SETTINGS -> "Settings & Sync"
                        },
                        style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.primary
                    )
                }
            }
        },
        navigationIcon = {
            if (canGoBack && currentScreen != Screen.LANDING && currentScreen != Screen.DASHBOARD) {
                IconButton(
                    onClick = onBack,
                    modifier = Modifier.testTag("top_bar_back_button")
                ) {
                    Icon(
                        imageVector = Icons.Default.ArrowBack,
                        contentDescription = "Back"
                    )
                }
            }
        },
        actions = {
            // AI Engine status pill
            Surface(
                shape = RoundedCornerShape(12.dp),
                color = if (isGeminiActive) SuccessContainer else MaterialTheme.colorScheme.surfaceVariant,
                modifier = Modifier.padding(end = 6.dp)
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(7.dp)
                            .clip(CircleShape)
                            .background(if (isGeminiActive) SuccessGreen else WarningAmber)
                    )
                    Text(
                        text = if (isGeminiActive) "Gemini AI" else "Local AI",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = if (isGeminiActive) Color(0xFF065F46) else Color(0xFF92400E)
                    )
                }
            }

            IconButton(
                onClick = { onNavigate(Screen.SETTINGS) },
                modifier = Modifier.testTag("top_bar_settings_button")
            ) {
                Icon(
                    imageVector = Icons.Outlined.Settings,
                    contentDescription = "Settings"
                )
            }
        },
        colors = TopAppBarDefaults.topAppBarColors(
            containerColor = MaterialTheme.colorScheme.surface
        )
    )
}

@Composable
fun CareerPilotBottomNav(
    currentScreen: Screen,
    onNavigate: (Screen) -> Unit
) {
    NavigationBar(
        containerColor = MaterialTheme.colorScheme.surface,
        tonalElevation = 6.dp
    ) {
        val items = listOf(
            Triple(Screen.DASHBOARD, Icons.Filled.Dashboard, Icons.Outlined.Dashboard),
            Triple(Screen.JOB_MATCHING, Icons.Filled.Work, Icons.Outlined.WorkOutline),
            Triple(Screen.RESUME_ANALYZER, Icons.Filled.Description, Icons.Outlined.Description),
            Triple(Screen.ROADMAP, Icons.Filled.Map, Icons.Outlined.Map),
            Triple(Screen.MOCK_INTERVIEW, Icons.Filled.RecordVoiceOver, Icons.Outlined.RecordVoiceOver)
        )

        items.forEach { (screen, selectedIcon, unselectedIcon) ->
            val isSelected = currentScreen == screen
            val label = when (screen) {
                Screen.DASHBOARD -> "Dashboard"
                Screen.JOB_MATCHING -> "Jobs"
                Screen.RESUME_ANALYZER -> "Resume"
                Screen.ROADMAP -> "Roadmap"
                Screen.MOCK_INTERVIEW -> "Interview"
                else -> ""
            }

            NavigationBarItem(
                selected = isSelected,
                onClick = { onNavigate(screen) },
                icon = {
                    Icon(
                        imageVector = if (isSelected) selectedIcon else unselectedIcon,
                        contentDescription = label
                    )
                },
                label = { Text(label, fontSize = 11.sp) },
                colors = NavigationBarItemDefaults.colors(
                    selectedIconColor = MaterialTheme.colorScheme.primary,
                    selectedTextColor = MaterialTheme.colorScheme.primary,
                    indicatorColor = MaterialTheme.colorScheme.primaryContainer
                ),
                modifier = Modifier.testTag("nav_item_${screen.name.lowercase()}")
            )
        }
    }
}

@Composable
fun AiStatusNoticeCard(notice: String?) {
    if (notice.isNullOrBlank()) return

    Surface(
        shape = RoundedCornerShape(12.dp),
        color = MaterialTheme.colorScheme.surfaceVariant,
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 6.dp)
            .border(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.5f), RoundedCornerShape(12.dp))
    ) {
        Row(
            modifier = Modifier.padding(12.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            Icon(
                imageVector = Icons.Outlined.Info,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.primary,
                modifier = Modifier.size(20.dp)
            )
            Text(
                text = notice,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}

@Composable
fun MatchScoreBadge(score: Int, modifier: Modifier = Modifier) {
    val (bgColor, textColor) = when {
        score >= 80 -> Pair(SuccessContainer, Color(0xFF065F46))
        score >= 60 -> Pair(WarningContainer, Color(0xFF92400E))
        else -> Pair(ErrorContainer, Color(0xFF991B1B))
    }

    Surface(
        shape = RoundedCornerShape(16.dp),
        color = bgColor,
        modifier = modifier
    ) {
        Row(
            modifier = Modifier.padding(horizontal = 10.dp, vertical = 4.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            Icon(
                imageVector = Icons.Default.Bolt,
                contentDescription = null,
                tint = textColor,
                modifier = Modifier.size(14.dp)
            )
            Text(
                text = "$score% Match",
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold,
                color = textColor
            )
        }
    }
}

@Composable
fun SkillChip(
    skill: String,
    isMatched: Boolean? = null,
    onRemove: (() -> Unit)? = null
) {
    val containerColor = when (isMatched) {
        true -> SuccessContainer
        false -> MaterialTheme.colorScheme.surfaceVariant
        null -> MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.6f)
    }
    val contentColor = when (isMatched) {
        true -> Color(0xFF065F46)
        false -> MaterialTheme.colorScheme.onSurfaceVariant
        null -> MaterialTheme.colorScheme.primary
    }

    Surface(
        shape = RoundedCornerShape(8.dp),
        color = containerColor,
        border = BorderStroke(1.dp, contentColor.copy(alpha = 0.3f)),
        modifier = Modifier.padding(end = 6.dp, bottom = 6.dp)
    ) {
        Row(
            modifier = Modifier.padding(horizontal = 10.dp, vertical = 4.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            Text(
                text = skill,
                fontSize = 12.sp,
                fontWeight = FontWeight.Medium,
                color = contentColor
            )
            if (onRemove != null) {
                IconButton(
                    onClick = onRemove,
                    modifier = Modifier.size(16.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Close,
                        contentDescription = "Remove",
                        tint = contentColor,
                        modifier = Modifier.size(12.dp)
                    )
                }
            }
        }
    }
}
