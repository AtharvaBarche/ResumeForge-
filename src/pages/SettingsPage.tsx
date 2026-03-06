import { useState, useCallback } from 'react'
import { useTemplate, THEME_COLORS } from '../context/TemplateContext'
import type { ResumeTemplate } from '../context/TemplateContext'
import { useTheme } from '../context/ThemeContext'
import { useResume } from '../context/ResumeContext'
import styles from './SettingsPage.module.css'

const TEMPLATE_OPTIONS: { value: ResumeTemplate; label: string }[] = [
  { value: 'classic', label: 'Classic' },
  { value: 'modern', label: 'Modern' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'executive', label: 'Executive' },
  { value: 'compact', label: 'Compact' },
  { value: 'bold', label: 'Bold' },
]

export function SettingsPage() {
  const { template, setTemplate, themeColor, setThemeColor } = useTemplate()
  const { theme, setTheme } = useTheme()
  const { data, clearResumeData } = useResume()
  const [confirmClear, setConfirmClear] = useState(false)
  const [exportDone, setExportDone] = useState(false)

  const handleExportData = useCallback(() => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `resumeforge-data-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    setExportDone(true)
    setTimeout(() => setExportDone(false), 2000)
  }, [data])

  const handleClearData = useCallback(() => {
    if (!confirmClear) {
      setConfirmClear(true)
      return
    }
    clearResumeData()
    setConfirmClear(false)
  }, [confirmClear, clearResumeData])

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Settings</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Appearance</h2>
        <div className={styles.field}>
          <span className={styles.label}>Theme</span>
          <div className={styles.radioRow}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="theme"
                checked={theme === 'light'}
                onChange={() => setTheme('light')}
                className={styles.radio}
              />
              Light
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="theme"
                checked={theme === 'dark'}
                onChange={() => setTheme('dark')}
                className={styles.radio}
              />
              Dark
            </label>
          </div>
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="settings-template">
            Default resume template
          </label>
          <select
            id="settings-template"
            className={styles.select}
            value={template}
            onChange={(e) => setTemplate(e.target.value as ResumeTemplate)}
          >
            {TEMPLATE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Accent color</span>
          <div className={styles.colorRow}>
            {THEME_COLORS.map((c) => (
              <button
                key={c.id}
                type="button"
                className={styles.colorBtn}
                style={{ background: c.hsl }}
                title={c.name}
                onClick={() => setThemeColor(c.hsl)}
                aria-label={c.name}
              >
                {themeColor === c.hsl && <span className={styles.colorCheck}>✓</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Data & privacy</h2>
        <p className={styles.sectionDesc}>
          Your resume data is stored only in this browser. It is not sent to any server.
        </p>
        <div className={styles.buttonRow}>
          <button type="button" className={styles.btnSecondary} onClick={handleExportData}>
            {exportDone ? 'Downloaded' : 'Export my resume data'}
          </button>
          <div className={styles.clearBlock}>
            <button
              type="button"
              className={confirmClear ? styles.btnDanger : styles.btnSecondary}
              onClick={handleClearData}
            >
              {confirmClear ? 'Click again to clear everything' : 'Clear all resume data'}
            </button>
            {confirmClear && (
              <button
                type="button"
                className={styles.btnCancel}
                onClick={() => setConfirmClear(false)}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>About</h2>
        <p className={styles.aboutText}>
          <strong>ResumeForge</strong> — Build MNC-standard, ATS-optimized resumes. Professional
          structure and enterprise-grade scoring.
        </p>
      </section>
    </div>
  )
}
