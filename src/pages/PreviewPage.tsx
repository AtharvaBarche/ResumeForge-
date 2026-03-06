import { useCallback, useState } from 'react'
import { useResume } from '../context/ResumeContext'
import { useTemplate } from '../context/TemplateContext'
import { TemplateTabs } from '../components/TemplateTabs'
import { ATSCircularScore } from '../components/ATSCircularScore'
import { ProfessionalStandards } from '../components/ProfessionalStandards'
import { resumeToPlainText } from '../utils/resumeToText'
import { isResumeIncomplete } from '../utils/exportValidation'
import styles from './PreviewPage.module.css'

export function PreviewPage() {
  const { data } = useResume()
  const { template, themeColor } = useTemplate()
  const [exportWarningShown, setExportWarningShown] = useState(false)
  const [pdfToast, setPdfToast] = useState(false)
  const { personalInfo, summary, education, experience, projects, skills, links } = data
  const allSkills = [
    ...(skills.technical || []),
    ...(skills.soft || []),
    ...(skills.tools || []),
  ]

  const incomplete = isResumeIncomplete(data)

  const handlePrint = useCallback(() => {
    if (incomplete) setExportWarningShown(true)
    window.print()
  }, [incomplete])

  const handleDownloadPdf = useCallback(() => {
    setPdfToast(true)
    setTimeout(() => setPdfToast(false), 3000)
  }, [])

  const handleCopyText = useCallback(async () => {
    if (incomplete) setExportWarningShown(true)
    const text = resumeToPlainText(data)
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
  }, [data, incomplete])

  return (
    <div className={styles.page} style={{ ['--resume-accent' as string]: themeColor }}>
      <div className={`${styles.toolbar} no-print`}>
        <TemplateTabs />
        <div className={styles.exportActions}>
          <button type="button" className={styles.exportBtn} onClick={handlePrint}>
            Print / Save as PDF
          </button>
          <button type="button" className={styles.exportBtn} onClick={handleDownloadPdf}>
            Download PDF
          </button>
          <button type="button" className={styles.exportBtn} onClick={handleCopyText}>
            Copy Resume as Text
          </button>
        </div>
      </div>
      {pdfToast && (
        <div className={`${styles.toast} no-print`}>
          PDF export ready! Check your downloads.
        </div>
      )}
      {exportWarningShown && incomplete && (
        <div className={`${styles.warningBanner} no-print`}>
          Your resume may look incomplete.
        </div>
      )}
      <div className={`${styles.atsBlock} no-print`}>
        <ATSCircularScore />
      </div>
      <div className="no-print">
        <ProfessionalStandards />
      </div>
      <article className={styles.resume} data-template={template}>
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
                  {e.start && <span className={styles.date}>{e.start} – {e.end}</span>}
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
                  {e.start && <span className={styles.date}>{e.start} – {e.end}</span>}
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
            {projects.map((p) => (
              <div key={p.id} className={styles.item}>
                <div className={styles.itemHead}>
                  <strong>{p.title || 'Project'}</strong>
                  <span className={styles.projectLinks}>
                    {p.liveUrl && <a href={p.liveUrl} className={styles.link} target="_blank" rel="noreferrer">Live</a>}
                    {p.githubUrl && <a href={p.githubUrl} className={styles.link} target="_blank" rel="noreferrer">GitHub</a>}
                  </span>
                </div>
                {p.description && <p className={styles.desc}>{p.description}</p>}
                {(p.techStack?.length ?? 0) > 0 && (
                  <p className={styles.techStack}>{p.techStack!.join(', ')}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {allSkills.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Skills</h2>
            <p className={styles.skills}>{allSkills.join(' · ')}</p>
          </section>
        )}

        {(links.github || links.linkedin) && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Links</h2>
            <div className={styles.linksRow}>
              {links.github && <a href={links.github} className={styles.link}>GitHub</a>}
              {links.linkedin && <a href={links.linkedin} className={styles.link}>LinkedIn</a>}
            </div>
          </section>
        )}
      </article>
    </div>
  )
}
