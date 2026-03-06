import { useResume } from '../context/ResumeContext'
import { useTemplate } from '../context/TemplateContext'
import styles from './LivePreview.module.css'

const SKILL_GROUPS: { key: keyof import('../context/ResumeContext').SkillsByCategory; label: string }[] = [
  { key: 'technical', label: 'Technical Skills' },
  { key: 'soft', label: 'Soft Skills' },
  { key: 'tools', label: 'Tools & Technologies' },
]

function hasAnySkills(skills: import('../context/ResumeContext').SkillsByCategory): boolean {
  return (skills.technical?.length ?? 0) + (skills.soft?.length ?? 0) + (skills.tools?.length ?? 0) > 0
}

export function LivePreview() {
  const { data } = useResume()
  const { template } = useTemplate()
  const { personalInfo, summary, education, experience, projects, skills, links } = data

  return (
    <div className={styles.preview} data-template={template}>
      <div className={styles.previewInner}>
        <header className={styles.header}>
          <h1 className={styles.name}>{personalInfo.name || 'Your Name'}</h1>
          <div className={styles.contact}>
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
        </header>

        {summary && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Summary</h2>
            <p className={styles.summary}>{summary}</p>
          </section>
        )}

        {education.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Education</h2>
            {education.map((e) => (
              <div key={e.id} className={styles.item}>
                <div className={styles.itemHead}>
                  <strong>{e.school || 'School'}</strong>
                  {e.start && <span>{e.start} – {e.end}</span>}
                </div>
                {(e.degree || e.field) && (
                  <div className={styles.itemSub}>{e.degree} {e.field}</div>
                )}
              </div>
            ))}
          </section>
        )}

        {experience.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Experience</h2>
            {experience.map((e) => (
              <div key={e.id} className={styles.item}>
                <div className={styles.itemHead}>
                  <strong>{e.role || 'Role'}</strong>
                  {e.start && <span>{e.start} – {e.end}</span>}
                </div>
                {e.company && <div className={styles.itemSub}>{e.company}</div>}
                {e.description && <p className={styles.desc}>{e.description}</p>}
              </div>
            ))}
          </section>
        )}

        {projects.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Projects</h2>
            <div className={styles.projectCards}>
              {projects.map((p) => (
                <div key={p.id} className={styles.projectCard}>
                  <div className={styles.projectCardHead}>
                    <strong>{p.title || 'Project'}</strong>
                    <div className={styles.projectLinks}>
                      {p.liveUrl && (
                        <a href={p.liveUrl} className={styles.linkIcon} target="_blank" rel="noreferrer" title="Live">🔗</a>
                      )}
                      {p.githubUrl && (
                        <a href={p.githubUrl} className={styles.linkIcon} target="_blank" rel="noreferrer" title="GitHub">⌘</a>
                      )}
                    </div>
                  </div>
                  {p.description && <p className={styles.desc}>{p.description}</p>}
                  {(p.techStack?.length ?? 0) > 0 && (
                    <div className={styles.techPills}>
                      {p.techStack.map((t, i) => (
                        <span key={i} className={styles.techPill}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {hasAnySkills(skills) && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Skills</h2>
            <div className={styles.skillGroups}>
              {SKILL_GROUPS.map(({ key, label }) => {
                const list = skills[key] || []
                if (list.length === 0) return null
                return (
                  <div key={key} className={styles.skillGroup}>
                    <span className={styles.skillGroupLabel}>{label}</span>
                    <div className={styles.skillPills}>
                      {list.map((s, i) => (
                        <span key={i} className={styles.skillPill}>{s}</span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {(links.github || links.linkedin) && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Links</h2>
            <div className={styles.linksRow}>
              {links.github && (
                <a href={links.github} className={styles.link} target="_blank" rel="noreferrer">GitHub</a>
              )}
              {links.linkedin && (
                <a href={links.linkedin} className={styles.link} target="_blank" rel="noreferrer">LinkedIn</a>
              )}
            </div>
          </section>
        )}

        {!personalInfo.name && !summary && education.length === 0 && experience.length === 0 && projects.length === 0 && !hasAnySkills(skills) && !links.github && !links.linkedin && (
          <p className={styles.placeholder}>Resume preview will appear here.</p>
        )}
      </div>
    </div>
  )
}
