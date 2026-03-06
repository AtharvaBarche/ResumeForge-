import { useState } from 'react'
import styles from './ProfessionalStandards.module.css'

const STANDARDS = [
  {
    title: 'Section order',
    detail: 'Summary → Experience → Education → Skills → Projects. MNC ATS parses in this order.',
  },
  {
    title: 'Bullet format',
    detail: 'Start with an action verb, state the result, add a number (%, time, scale). Example: "Led migration that cut latency by 40%."',
  },
  {
    title: 'Summary',
    detail: '50–120 words. Include role focus and 2–3 key strengths. Use action verbs (built, led, designed).',
  },
  {
    title: 'Experience',
    detail: '2+ entries with 2–4 bullets each. Every bullet should have at least one metric or quantifiable outcome.',
  },
  {
    title: 'Skills & projects',
    detail: '8+ skills across categories. At least 2 projects with clear description and tech stack for technical roles.',
  },
  {
    title: 'Contact & links',
    detail: 'Full name, email, phone, location. LinkedIn and GitHub (or portfolio) for recruiter verification.',
  },
]

export function ProfessionalStandards() {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className={styles.triggerIcon}>{open ? '▼' : '▶'}</span>
        <span className={styles.triggerText}>MNC resume standards</span>
      </button>
      {open && (
        <ul className={styles.list}>
          {STANDARDS.map((s, i) => (
            <li key={i} className={styles.item}>
              <strong className={styles.itemTitle}>{s.title}</strong>
              <span className={styles.itemDetail}>{s.detail}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
