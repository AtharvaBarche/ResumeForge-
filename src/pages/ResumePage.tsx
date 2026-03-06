import { Link } from 'react-router-dom'
import styles from './PlaceholderPage.module.css'

export function ResumePage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Resume</h1>
      <p className={styles.placeholder}>
        Build and preview your resume: <Link to="/builder" className={styles.link}>Builder</Link> · <Link to="/preview" className={styles.link}>Preview</Link>
      </p>
    </div>
  )
}
