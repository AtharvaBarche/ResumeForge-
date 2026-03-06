import { useTemplate } from '../context/TemplateContext'
import type { ResumeTemplate } from '../context/TemplateContext'
import styles from './TemplateThumbnails.module.css'

const TEMPLATES: { id: ResumeTemplate; label: string }[] = [
  { id: 'classic', label: 'Classic' },
  { id: 'modern', label: 'Modern' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'executive', label: 'Executive' },
  { id: 'compact', label: 'Compact' },
  { id: 'bold', label: 'Bold' },
]

export function TemplateThumbnails() {
  const { template, setTemplate } = useTemplate()

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Template</span>
      <div className={styles.thumbnails}>
        {TEMPLATES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`${styles.thumb} ${template === id ? styles.thumbActive : ''}`}
            onClick={() => setTemplate(id)}
            title={label}
          >
            <div className={styles.thumbSketch} data-template={id}>
              {id === 'classic' && (
                <>
                  <div className={styles.sketchLine} />
                  <div className={styles.sketchLine} />
                  <div className={styles.sketchLine} />
                </>
              )}
              {id === 'modern' && (
                <>
                  <div className={styles.sketchSidebar} />
                  <div className={styles.sketchMain}>
                    <div className={styles.sketchLine} />
                    <div className={styles.sketchLine} />
                  </div>
                </>
              )}
              {id === 'minimal' && (
                <>
                  <div className={styles.sketchLineMinimal} />
                  <div className={styles.sketchLineMinimal} />
                  <div className={styles.sketchLineMinimal} />
                </>
              )}
              {id === 'executive' && (
                <>
                  <div className={styles.sketchLine} />
                  <div className={styles.sketchLineAccent} />
                  <div className={styles.sketchLine} />
                  <div className={styles.sketchLine} />
                </>
              )}
              {id === 'compact' && (
                <>
                  <div className={styles.sketchLineCompact} />
                  <div className={styles.sketchLineCompact} />
                  <div className={styles.sketchLineCompact} />
                  <div className={styles.sketchLineCompact} />
                </>
              )}
              {id === 'bold' && (
                <>
                  <div className={styles.sketchBoldBar} />
                  <div className={styles.sketchLine} />
                  <div className={styles.sketchLine} />
                </>
              )}
            </div>
            <span className={styles.thumbLabel}>{label}</span>
            {template === id && <span className={styles.checkmark}>✓</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
