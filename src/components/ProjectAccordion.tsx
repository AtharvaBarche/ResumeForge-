import { useState, KeyboardEvent } from 'react'
import type { ProjectEntry } from '../context/ResumeContext'
import { BulletGuidance } from './BulletGuidance'
import styles from './ProjectAccordion.module.css'

const DESCRIPTION_MAX = 200

interface ProjectAccordionProps {
  projects: ProjectEntry[]
  onAdd: () => void
  onRemove: (id: string) => void
  onUpdate: (id: string, patch: Partial<ProjectEntry>) => void
}

export function ProjectAccordion({
  projects,
  onAdd,
  onRemove,
  onUpdate,
}: ProjectAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(projects[0]?.id ?? null)

  const addTech = (projectId: string, value: string) => {
    const trimmed = value.trim()
    if (!trimmed) return
    const p = projects.find((x) => x.id === projectId)
    if (!p) return
    onUpdate(projectId, { techStack: [...(p.techStack || []), trimmed] })
  }

  const removeTech = (projectId: string, index: number) => {
    const p = projects.find((x) => x.id === projectId)
    if (!p) return
    onUpdate(projectId, { techStack: p.techStack.filter((_, i) => i !== index) })
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>Projects</h2>
        <button type="button" className={styles.addBtn} onClick={onAdd}>
          Add Project
        </button>
      </div>
      {projects.map((entry) => {
        const isOpen = openId === entry.id
        const descLen = (entry.description || '').length
        return (
          <div key={entry.id} className={styles.accordionItem}>
            <button
              type="button"
              className={styles.accordionHeader}
              onClick={() => setOpenId(isOpen ? null : entry.id)}
            >
              <span className={styles.accordionTitle}>
                {entry.title.trim() || 'Untitled Project'}
              </span>
              <span className={styles.accordionChevron}>{isOpen ? '▼' : '▶'}</span>
            </button>
            {isOpen && (
              <div className={styles.accordionBody}>
                <input
                  type="text"
                  placeholder="Project Title"
                  value={entry.title}
                  onChange={(e) => onUpdate(entry.id, { title: e.target.value })}
                  className={styles.input}
                />
                <label className={styles.label}>
                  Description (max {DESCRIPTION_MAX} chars)
                </label>
                <textarea
                  placeholder="Brief description..."
                  value={entry.description}
                  onChange={(e) =>
                    onUpdate(entry.id, {
                      description: e.target.value.slice(0, DESCRIPTION_MAX),
                    })
                  }
                  className={styles.textarea}
                  rows={3}
                />
                <span className={styles.charCount}>
                  {descLen}/{DESCRIPTION_MAX}
                </span>
                <BulletGuidance description={entry.description} />
                <label className={styles.label}>Tech Stack (type + Enter)</label>
                <div className={styles.techRow}>
                  {(entry.techStack || []).map((tech, i) => (
                    <span key={i} className={styles.pill}>
                      {tech}
                      <button
                        type="button"
                        className={styles.pillRemove}
                        onClick={() => removeTech(entry.id, i)}
                        aria-label={`Remove ${tech}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    className={styles.tagInput}
                    placeholder="Tech"
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addTech(entry.id, (e.currentTarget as HTMLInputElement).value)
                        ;(e.currentTarget as HTMLInputElement).value = ''
                      }
                    }}
                  />
                </div>
                <input
                  type="url"
                  placeholder="Live URL (optional)"
                  value={entry.liveUrl}
                  onChange={(e) => onUpdate(entry.id, { liveUrl: e.target.value })}
                  className={styles.input}
                />
                <input
                  type="url"
                  placeholder="GitHub URL (optional)"
                  value={entry.githubUrl}
                  onChange={(e) => onUpdate(entry.id, { githubUrl: e.target.value })}
                  className={styles.input}
                />
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => onRemove(entry.id)}
                >
                  Delete project
                </button>
              </div>
            )}
          </div>
        )
      })}
    </section>
  )
}
