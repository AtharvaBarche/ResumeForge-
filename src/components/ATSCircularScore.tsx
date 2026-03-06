import { useResume } from '../context/ResumeContext'
import {
  computeAtsScore,
  getAtsImprovementSuggestions,
  getAtsScoreLabel,
  getAtsScoreBand,
} from '../utils/atsScore'
import styles from './ATSCircularScore.module.css'

const RADIUS = 44
const STROKE = 8
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function ATSCircularScore() {
  const { data } = useResume()
  const score = computeAtsScore(data)
  const label = getAtsScoreLabel(score)
  const band = getAtsScoreBand(score)
  const suggestions = getAtsImprovementSuggestions(data)
  const offset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Enterprise ATS Score</h3>
      <div className={styles.circleWrap}>
        <svg className={styles.svg} viewBox="0 0 100 100">
          <circle
            className={styles.track}
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE}
          />
          <circle
            className={`${styles.progress} ${styles[`progress_${band}`]}`}
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className={styles.center}>
          <span className={styles.scoreValue}>{score}</span>
          <span className={`${styles.label} ${styles[`label_${band}`]}`}>{label}</span>
        </div>
      </div>
      {suggestions.length > 0 && (
        <div className={styles.suggestions}>
          <h4 className={styles.suggestionsTitle}>Improve your score</h4>
          <ul className={styles.suggestionsList}>
            {suggestions.map((s, i) => (
              <li key={i} className={styles.suggestionItem}>
                {s.text} <span className={styles.points}>+{s.points} pts</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
