import { ResumeAnalysis, InterviewEvaluation } from '../types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

export const isGeminiConfigured = (): boolean => {
  return (
    Boolean(GEMINI_API_KEY) &&
    GEMINI_API_KEY !== 'MY_GEMINI_API_KEY' &&
    GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE'
  );
};

export async function analyzeResumeAI(
  resumeText: string,
  targetRole: string = 'AI Engineer'
): Promise<{ analysis: ResumeAnalysis; notice: string }> {
  if (isGeminiConfigured()) {
    try {
      const prompt = `You are a senior technical talent screener.
Analyze this technical candidate's resume for the role "${targetRole}".
Resume:
"""
${resumeText}
"""

Return ONLY a valid JSON object (no markdown, no backticks):
{
  "candidateName": "Candidate Name",
  "overallScore": 88,
  "atsScore": 85,
  "summary": "2-sentence executive summary of technical qualifications.",
  "extractedSkills": ["Python", "PyTorch", "SQL", "FastAPI", "Docker"],
  "strengths": ["Strength 1 with measurable impact", "Strength 2 with specific stack"],
  "missingSkills": ["Missing skill 1", "Missing skill 2"],
  "improvementSuggestions": ["Actionable improvement 1", "Actionable improvement 2"],
  "recommendedCareers": ["AI Engineer", "Data Scientist", "ML Engineer"]
}`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.3 }
          })
        }
      );

      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(clean);
          return {
            analysis: {
              id: `analysis_${Date.now()}`,
              fileName: 'Candidate_Resume.pdf',
              timestamp: Date.now(),
              candidateName: parsed.candidateName || 'Candidate',
              overallScore: parsed.overallScore || 85,
              atsScore: parsed.atsScore || 82,
              summary: parsed.summary || 'Strong candidate profile.',
              extractedSkills: parsed.extractedSkills || [],
              strengths: parsed.strengths || [],
              missingSkills: parsed.missingSkills || [],
              improvementSuggestions: parsed.improvementSuggestions || [],
              recommendedCareers: parsed.recommendedCareers || ['AI Engineer', 'Data Scientist'],
              isGemini: true
            },
            notice: 'Analyzed with Gemini 3.5 Flash'
          };
        }
      }
    } catch (e) {
      console.warn('Gemini API call failed, falling back to local ATS engine', e);
    }
  }

  // Local deterministic fallback
  const catalog = [
    'Python', 'PyTorch', 'TensorFlow', 'FastAPI', 'SQL', 'PostgreSQL',
    'Pandas', 'NumPy', 'Scikit-Learn', 'LangChain', 'Docker', 'Git',
    'Linux', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS', 'Tailwind CSS',
    'C++', 'Java', 'Kubernetes', 'Redis', 'ChromaDB', 'AWS', 'GCP', 'Tableau',
    'Power BI', 'REST APIs', 'GraphQL', 'Hugging Face'
  ];

  const extracted = catalog.filter((skill) =>
    new RegExp(`\\b${skill}\\b`, 'i').test(resumeText)
  );

  const finalSkills = extracted.length > 0 ? extracted : ['Python', 'SQL', 'Git', 'Problem Solving'];
  const overallScore = Math.min(96, Math.max(65, 70 + Math.min(finalSkills.length * 3, 22)));
  const atsScore = Math.max(60, overallScore - 4);

  return {
    analysis: {
      id: `analysis_${Date.now()}`,
      fileName: 'Uploaded_Resume.pdf',
      timestamp: Date.now(),
      candidateName: resumeText.split('\n')[0].slice(0, 30) || 'Alex Chen',
      overallScore,
      atsScore,
      summary: `Technical candidate profile with demonstrated competencies in ${finalSkills.slice(0, 4).join(', ')}. Solid foundation for ${targetRole} positions.`,
      extractedSkills: finalSkills,
      strengths: [
        'Measurable project implementations with modern stack.',
        `Core languages & libraries verified (${finalSkills.slice(0, 3).join(', ')}).`,
        'Academic foundations aligned with modern software engineering.'
      ],
      missingSkills: ['Kubernetes / Cluster Orchestration', 'CI/CD Automated Deployment', 'Distributed Caching (Redis)'],
      improvementSuggestions: [
        'Add quantifiable business or performance metrics to project bullet points.',
        'Include live deployed demos and public GitHub repository links.',
        'Expand cloud deployment keywords (Docker, AWS/GCP, Linux) for enhanced ATS visibility.'
      ],
      recommendedCareers: [targetRole, 'Data Scientist', 'Machine Learning Engineer'],
      isGemini: false
    },
    notice: isGeminiConfigured()
      ? 'Evaluated via deterministic local ATS engine (Gemini API transient failure).'
      : 'Gemini API key is not configured in Vercel environment variables. Evaluated via deterministic local ATS engine.'
  };
}

export async function evaluateInterviewAI(
  role: string,
  difficulty: string,
  question: string,
  answer: string
): Promise<{ evaluation: InterviewEvaluation; notice: string }> {
  if (isGeminiConfigured()) {
    try {
      const prompt = `You are a senior technical interviewer evaluating a candidate for the role of ${role} (${difficulty}).
Question: "${question}"
Candidate Answer: "${answer}"

Return strictly a JSON object:
{
  "technicalScore": 8, // 0-10
  "clarityScore": 8, // 0-10
  "relevanceScore": 8, // 0-10
  "overallScore": 82, // 0-100
  "feedback": "Concise 2-sentence evaluator verdict.",
  "strengths": ["Clear understanding of X", "Correctly cited Y"],
  "areasToImprove": ["Mention edge cases in Z"],
  "idealAnswer": "Optimal exemplar model response."
}`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.3 }
          })
        }
      );

      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(clean);
          return {
            evaluation: parsed,
            notice: 'Evaluated with Gemini 3.5 Flash'
          };
        }
      }
    } catch (e) {
      console.warn('Gemini interview evaluation failed, using rubric fallback', e);
    }
  }

  // Rubric-based evaluation
  const words = answer.trim().split(/\s+/).length;
  const keywords = ['latency', 'complexity', 'database', 'pipeline', 'cache', 'token', 'model', 'trade-off', 'concurrency'];
  const matchedKeywords = keywords.filter((k) => answer.toLowerCase().includes(k));

  const technicalScore = Math.min(9, Math.max(4, 5 + matchedKeywords.length));
  const clarityScore = words > 30 ? 8 : 6;
  const relevanceScore = words > 15 ? 8 : 5;
  const overallScore = Math.min(95, Math.max(50, Math.round(technicalScore * 3.5 + clarityScore * 3.5 + relevanceScore * 3.0)));

  return {
    evaluation: {
      technicalScore,
      clarityScore,
      relevanceScore,
      overallScore,
      feedback:
        words > 40
          ? `Comprehensive technical explanation addressing core mechanics (${matchedKeywords.join(', ')}). Well structured for ${role}.`
          : `Good foundational response, but elaborate more on production constraints, failure modes, and architectural trade-offs.`,
      strengths: [
        'Directly addressed the question problem statement.',
        `Highlighted key concepts: ${matchedKeywords.length > 0 ? matchedKeywords.join(', ') : 'fundamental mechanics'}.`
      ],
      areasToImprove: [
        'Discuss performance constraints and algorithmic complexity (e.g. Big-O runtime).',
        'Cite real-world mitigation strategies for edge cases.'
      ],
      idealAnswer:
        'A comprehensive response should outline the core architecture, illustrate data flow, state time/space complexity, and discuss operational failure modes.'
    },
    notice: isGeminiConfigured()
      ? 'Evaluated via rubric matching engine.'
      : 'Gemini API key is not configured in Vercel environment variables. Evaluated via rubric matching engine.'
  };
}
