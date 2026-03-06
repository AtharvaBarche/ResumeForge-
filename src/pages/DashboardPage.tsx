import { useReadiness, READINESS_WEIGHTS } from '../context/ReadinessContext'
import styles from './DashboardPage.module.css'

const COMPONENT_LABELS: Record<keyof typeof READINESS_WEIGHTS, string> = {
  jobMatchQuality: 'Job Match Quality',
  jdSkillAlignment: 'JD Skill Alignment',
  resumeAtsScore: 'Enterprise ATS Score',
  applicationProgress: 'Application Progress',
  practiceCompletion: 'Practice Completion',
}

export function DashboardPage() {
  const { readinessScore, componentScores } = useReadiness()

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Dashboard</h1>

      <section className={styles.readinessSection}>
        <h2 className={styles.sectionTitle}>Readiness Score</h2>
        <div className={styles.overallScore}>{readinessScore}</div>
        <p className={styles.overallLabel}>out of 100</p>
      </section>

      <section className={styles.breakdown}>
        <h2 className={styles.sectionTitle}>Score breakdown</h2>
        <ul className={styles.scoreList}>
          <li className={styles.scoreItem}>
            <span className={styles.scoreLabel}>{COMPONENT_LABELS.jobMatchQuality}</span>
            <span className={styles.scoreWeight}>({READINESS_WEIGHTS.jobMatchQuality * 100}%)</span>
            <span className={styles.scoreValue}>{componentScores.jobMatchQuality}</span>
          </li>
          <li className={styles.scoreItem}>
            <span className={styles.scoreLabel}>{COMPONENT_LABELS.jdSkillAlignment}</span>
            <span className={styles.scoreWeight}>({READINESS_WEIGHTS.jdSkillAlignment * 100}%)</span>
            <span className={styles.scoreValue}>{componentScores.jdSkillAlignment}</span>
          </li>
          <li className={styles.scoreItem}>
            <span className={styles.scoreLabel}>{COMPONENT_LABELS.resumeAtsScore}</span>
            <span className={styles.scoreWeight}>({READINESS_WEIGHTS.resumeAtsScore * 100}%)</span>
            <span className={styles.scoreValue}>{componentScores.resumeAtsScore}</span>
          </li>
          <li className={styles.scoreItem}>
            <span className={styles.scoreLabel}>{COMPONENT_LABELS.applicationProgress}</span>
            <span className={styles.scoreWeight}>({READINESS_WEIGHTS.applicationProgress * 100}%)</span>
            <span className={styles.scoreValue}>{componentScores.applicationProgress}</span>
          </li>
          <li className={styles.scoreItem}>
            <span className={styles.scoreLabel}>{COMPONENT_LABELS.practiceCompletion}</span>
            <span className={styles.scoreWeight}>({READINESS_WEIGHTS.practiceCompletion * 100}%)</span>
            <span className={styles.scoreValue}>{componentScores.practiceCompletion}</span>
          </li>
        </ul>
      </section>
    </div>
  )
}
