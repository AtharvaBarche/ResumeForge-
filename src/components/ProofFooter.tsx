import { Link } from 'react-router-dom'
import styles from './ProofFooter.module.css'

export function ProofFooter() {
  return (
    <footer className={styles.footer}>
      <Link to="/rb/proof" className={styles.link}>
        Proof
      </Link>
      <span className={styles.sep}>·</span>
      <span className={styles.label}>KodNest Premium Build System</span>
    </footer>
  )
}
