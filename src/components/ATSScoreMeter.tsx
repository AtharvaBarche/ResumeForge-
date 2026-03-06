import { useResume } from '../context/ResumeContext'
import { computeAtsScore, getAtsImprovementSuggestions } from '../utils/atsScore'
import styles from './ATSScoreMeter.module.css'

export function ATSScoreMeter() {
  const { data } = useResume()
  const score = computeAtsScore(data)
  const suggestions = getAtsImprovementSuggestions(data)

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.label}>Enterprise ATS Score</h3>
      <div className={styles.meterWrap}>
        <div className={styles.meterBg}>
          <div className={styles.meterFill} style={{ width: `${score}%` }} />
        </div>
        <span className={styles.scoreValue}>{score}</span>
      </div>
      {suggestions.length > 0 && (
        <>
          <h3 className={styles.improvementsTitle}>Improve your score</h3>
          <ul className={styles.improvements}>
            {suggestions.map((s, i) => (
              <li key={i} className={styles.improvementItem}>
                {s.text} <span className={styles.points}>+{s.points} pts</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
