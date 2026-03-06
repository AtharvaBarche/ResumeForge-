import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.headline}>
            Helping you <span className={styles.highlight}>Land a Job</span> and Live your Dreams.
          </h1>
          <p className={styles.subtext}>
            Build MNC-standard, ATS-optimized resumes. Professional structure, enterprise-grade scoring, and recruiter-ready output—all in one place.
          </p>
          <p className={styles.ctaLine}>
            <Link to="/builder" className={styles.ctaLink}>Build your resume</Link> to get started.
          </p>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.visualCard}>
            <span className={styles.cardIcon}>📄</span>
            <span className={styles.cardTitle}>Upload Your CV</span>
            <span className={styles.cardSub}>It only takes a few seconds.</span>
          </div>
          <div className={styles.visualCard}>
            <span className={styles.cardIcon}>✉️</span>
            <span className={styles.cardTitle}>Enterprise ATS</span>
            <span className={styles.cardSub}>MNC-standard scoring, same criteria as enterprise ATS.</span>
          </div>
          <div className={styles.candidateBubble}>
            <span className={styles.bubbleAvatars}>A B C D E+</span>
            <span className={styles.bubbleText}>10K+ Candidates</span>
          </div>
        </div>
      </section>

      <section className={styles.trust}>
        <span className={styles.trustLabel}>People who trust us :</span>
        <div className={styles.trustLogos}>
          <span className={styles.trustItem}>Amazon</span>
          <span className={styles.trustItem}>Google</span>
          <span className={styles.trustItem}>Microsoft</span>
          <span className={styles.trustItem}>Meta</span>
          <span className={styles.trustItem}>Slack</span>
        </div>
      </section>
    </div>
  )
}
