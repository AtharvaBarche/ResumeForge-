import { useTemplate, THEME_COLORS } from '../context/TemplateContext'
import styles from './ColorThemePicker.module.css'

export function ColorThemePicker() {
  const { themeColor, setThemeColor } = useTemplate()

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Color</span>
      <div className={styles.circles}>
        {THEME_COLORS.map((c) => (
          <button
            key={c.id}
            type="button"
            className={styles.circle}
            style={{ background: c.hsl }}
            title={c.name}
            onClick={() => setThemeColor(c.hsl)}
            aria-label={c.name}
          >
            {themeColor === c.hsl && <span className={styles.check}>✓</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
