import type { ResumeData } from '../context/ResumeContext'

/** MNC/Enterprise ATS scoring — criteria aligned with Workday, Taleo, Greenhouse-style parsing. */

const SUMMARY_MIN_CHARS = 50
const SUMMARY_MIN_WORDS = 50
const SUMMARY_MAX_WORDS = 120
const MIN_SKILLS = 5
const STRONG_SKILLS = 8
const ACTION_VERBS = /\b(built|led|designed|improved|developed|created|implemented|managed|delivered|achieved|increased|reduced|launched|established|optimized|automated|coordinated|drove)\b/i
const NUMBER_PATTERN = /\d|%|\b\d+k\b|\b\d+x\b/i

function wordCount(s: string): number {
  return s
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
}

function hasActionVerbsInSummary(summary: string): boolean {
  return summary.trim().length > 0 && ACTION_VERBS.test(summary)
}

function skillCount(data: ResumeData): number {
  return (data.skills.technical?.length ?? 0) + (data.skills.soft?.length ?? 0) + (data.skills.tools?.length ?? 0)
}

function getBulletLines(text: string): string[] {
  return text
    .split(/\n/)
    .map((s) => s.trim())
    .filter(Boolean)
}

function hasExperienceWithBullets(data: ResumeData): boolean {
  return data.experience.some((e) => (e.description || '').trim().length > 0)
}

function hasMetricInExperienceOrProjects(data: ResumeData): boolean {
  const checkDescription = (desc: string) =>
    getBulletLines(desc).some((line) => NUMBER_PATTERN.test(line))
  const inExp = data.experience.some((e) => checkDescription(e.description || ''))
  const inProj = data.projects.some((p) => checkDescription(p.description || ''))
  return inExp || inProj
}

function summaryWordCountInRange(summary: string): boolean {
  const w = wordCount(summary)
  return w >= SUMMARY_MIN_WORDS && w <= SUMMARY_MAX_WORDS
}

function hasCompleteEducation(data: ResumeData): boolean {
  return data.education.some(
    (e) => (e.school || '').trim().length > 0 && (e.degree || '').trim().length > 0
  )
}

export function computeAtsScore(data: ResumeData): number {
  let score = 0
  // Contact — MNCs require clear identification
  if ((data.personalInfo.name || '').trim().length > 0) score += 11
  if ((data.personalInfo.email || '').trim().length > 0) score += 8
  if ((data.personalInfo.phone || '').trim().length > 0) score += 4
  if ((data.personalInfo.location || '').trim().length > 0) score += 3
  // Summary — length and action-oriented (enterprise ATS parse this)
  if ((data.summary || '').trim().length > SUMMARY_MIN_CHARS) score += 6
  if (hasActionVerbsInSummary(data.summary)) score += 6
  if (summaryWordCountInRange(data.summary)) score += 4
  // Experience — primary signal for MNC screening
  if (hasExperienceWithBullets(data)) score += 12
  if (data.experience.length >= 2) score += 4
  if (hasMetricInExperienceOrProjects(data)) score += 8
  // Education — standard requirement
  if (data.education.length >= 1) score += 8
  if (hasCompleteEducation(data)) score += 4
  // Skills — keyword match and breadth
  if (skillCount(data) >= MIN_SKILLS) score += 6
  if (skillCount(data) >= STRONG_SKILLS) score += 4
  // Projects — proof of impact
  if (data.projects.length >= 1) score += 6
  if (data.projects.length >= 2) score += 4
  // Professional links — recruiter verification
  if ((data.links.linkedin || '').trim().length > 0) score += 5
  if ((data.links.github || '').trim().length > 0) score += 5
  return Math.min(100, score)
}

export interface AtsSuggestionItem {
  text: string
  points: number
}

/** Improvement suggestions — only missing items, aligned with MNC/enterprise ATS. */
export function getAtsImprovementSuggestions(data: ResumeData): AtsSuggestionItem[] {
  const list: AtsSuggestionItem[] = []
  if (!(data.personalInfo.name || '').trim()) list.push({ text: 'Add your full name', points: 11 })
  if (!(data.personalInfo.email || '').trim()) list.push({ text: 'Add your email', points: 8 })
  if (!(data.personalInfo.phone || '').trim()) list.push({ text: 'Add your phone number', points: 4 })
  if (!(data.personalInfo.location || '').trim()) list.push({ text: 'Add your location', points: 3 })
  if ((data.summary || '').trim().length <= SUMMARY_MIN_CHARS)
    list.push({ text: 'Add a professional summary (50+ characters)', points: 6 })
  if (!hasActionVerbsInSummary(data.summary) && (data.summary || '').trim().length > 0)
    list.push({ text: 'Use action verbs in your summary (e.g. built, led, designed)', points: 6 })
  if (!summaryWordCountInRange(data.summary) && (data.summary || '').trim().length > SUMMARY_MIN_CHARS)
    list.push({ text: 'Keep summary between 50–120 words for ATS', points: 4 })
  if (!hasExperienceWithBullets(data))
    list.push({ text: 'Add at least 1 experience entry with bullet points', points: 12 })
  if (data.experience.length < 2 && data.experience.length >= 1)
    list.push({ text: 'Add a second experience entry for stronger profile', points: 4 })
  if (!hasMetricInExperienceOrProjects(data) && (hasExperienceWithBullets(data) || data.projects.some((p) => (p.description || '').trim())))
    list.push({ text: 'Add measurable impact (numbers, %, time) in bullets', points: 8 })
  if (data.education.length < 1) list.push({ text: 'Add at least 1 education entry', points: 8 })
  if (data.education.length >= 1 && !hasCompleteEducation(data))
    list.push({ text: 'Complete education with degree and school name', points: 4 })
  if (skillCount(data) < MIN_SKILLS)
    list.push({ text: 'Add at least 5 skills', points: 6 })
  if (skillCount(data) >= MIN_SKILLS && skillCount(data) < STRONG_SKILLS)
    list.push({ text: 'Add 8+ skills for better ATS match', points: 4 })
  if (data.projects.length < 1) list.push({ text: 'Add at least 1 project', points: 6 })
  if (data.projects.length === 1) list.push({ text: 'Add a second project for stronger profile', points: 4 })
  if (!(data.links.linkedin || '').trim()) list.push({ text: 'Add your LinkedIn profile', points: 5 })
  if (!(data.links.github || '').trim()) list.push({ text: 'Add your GitHub profile', points: 5 })
  return list
}

/** Legacy: plain text suggestions for builder panel (max 3). */
export function getAtsSuggestions(data: ResumeData): string[] {
  return getAtsImprovementSuggestions(data)
    .slice(0, 3)
    .map((s) => `${s.text} (+${s.points} pts)`)
}

/** Top 3 improvements for builder panel. */
export function getTop3Improvements(data: ResumeData): string[] {
  return getAtsImprovementSuggestions(data)
    .slice(0, 3)
    .map((s) => `${s.text} (+${s.points} pts)`)
}

/** Label for score band (for preview circular display). */
export function getAtsScoreLabel(score: number): string {
  if (score <= 40) return 'Needs Work'
  if (score <= 70) return 'Getting There'
  return 'MNC-Ready'
}

/** CSS-friendly band: 'low' | 'mid' | 'high'. */
export function getAtsScoreBand(score: number): 'low' | 'mid' | 'high' {
  if (score <= 40) return 'low'
  if (score <= 70) return 'mid'
  return 'high'
}
