import { getBulletGuidance } from '../utils/bulletGuidance'
import styles from './BulletGuidance.module.css'

interface BulletGuidanceProps {
  description: string
}

export function BulletGuidance({ description }: BulletGuidanceProps) {
  const { suggestActionVerb, suggestNumber } = getBulletGuidance(description)
  if (!suggestActionVerb && !suggestNumber) return null

  return (
    <div className={styles.wrapper}>
      {suggestActionVerb && (
        <span className={styles.hint}>Start with a strong action verb.</span>
      )}
      {suggestActionVerb && suggestNumber && <span className={styles.sep}> </span>}
      {suggestNumber && (
        <span className={styles.hint}>Add measurable impact (numbers).</span>
      )}
    </div>
  )
}
