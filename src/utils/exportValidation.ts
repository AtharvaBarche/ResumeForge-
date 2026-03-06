import type { ResumeData } from '../context/ResumeContext'

/**
 * True if resume may look incomplete for export:
 * - missing name, or
 * - no projects AND no experience
 */
export function isResumeIncomplete(data: ResumeData): boolean {
  const hasName = (data.personalInfo.name || '').trim().length > 0
  const hasProject = data.projects.length > 0
  const hasExperience = data.experience.length > 0
  if (!hasName) return true
  if (!hasProject && !hasExperience) return true
  return false
}
