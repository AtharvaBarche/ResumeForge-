import { useTemplate } from '../context/TemplateContext'
import type { ResumeTemplate } from '../context/TemplateContext'
import styles from './TemplateTabs.module.css'

const OPTIONS: { value: ResumeTemplate; label: string }[] = [
  { value: 'classic', label: 'Classic' },
  { value: 'modern', label: 'Modern' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'executive', label: 'Executive' },
  { value: 'compact', label: 'Compact' },
  { value: 'bold', label: 'Bold' },
]

export function TemplateTabs() {
  const { template, setTemplate } = useTemplate()

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Template</span>
      <div className={styles.tabs}>
        {OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={template === value ? styles.tabActive : styles.tab}
            onClick={() => setTemplate(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
