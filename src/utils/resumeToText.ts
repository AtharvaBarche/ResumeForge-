import type { ResumeData } from '../context/ResumeContext'

function line(...parts: string[]): string {
  return parts.filter(Boolean).join(' ')
}

export function resumeToPlainText(data: ResumeData): string {
  const { personalInfo, summary, education, experience, projects, skills, links } = data
  const sections: string[] = []

  sections.push(personalInfo.name || 'Name')
  const contact = [personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean)
  if (contact.length) sections.push(contact.join(' · '))
  sections.push('')

  if (summary.trim()) {
    sections.push('Summary')
    sections.push(summary.trim())
    sections.push('')
  }

  if (education.length > 0) {
    sections.push('Education')
    for (const e of education) {
      sections.push(line(e.school, e.start && e.end ? `(${e.start} – ${e.end})` : ''))
      if (e.degree || e.field) sections.push(line(e.degree, e.field))
    }
    sections.push('')
  }

  if (experience.length > 0) {
    sections.push('Experience')
    for (const e of experience) {
      sections.push(line(e.role, e.company, e.start && e.end ? `(${e.start} – ${e.end})` : ''))
      if (e.description.trim()) sections.push(e.description.trim())
    }
    sections.push('')
  }

  if (projects.length > 0) {
    sections.push('Projects')
    for (const p of projects) {
      sections.push(line(p.title, p.liveUrl || p.githubUrl || ''))
      if (p.description.trim()) sections.push(p.description.trim())
      if (p.techStack?.length) sections.push(p.techStack.join(', '))
    }
    sections.push('')
  }

  const allSkills = [
    ...(skills.technical || []),
    ...(skills.soft || []),
    ...(skills.tools || []),
  ].filter(Boolean)
  if (allSkills.length > 0) {
    sections.push('Skills')
    sections.push(allSkills.join(', '))
    sections.push('')
  }

  if (links.github || links.linkedin) {
    sections.push('Links')
    if (links.github) sections.push(`GitHub: ${links.github}`)
    if (links.linkedin) sections.push(`LinkedIn: ${links.linkedin}`)
  }

  return sections.join('\n').trimEnd()
}
