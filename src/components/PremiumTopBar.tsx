import { useLocation } from 'react-router-dom'
import { useRB } from '../context/RBContext'
import { RB_STEP_IDS } from '../context/RBContext'
import styles from './PremiumTopBar.module.css'

function getStepFromPath(pathname: string): number {
  const match = pathname.match(/\/rb\/(\d{2})-/)
  if (match) return parseInt(match[1], 10)
  return 0
}

function getStatusBadge(pathname: string, stepId: string | null): string {
  if (pathname === '/rb/proof') return 'Proof'
  if (!stepId) return '—'
  return `Step ${getStepFromPath(pathname)} of 8`
}

export function PremiumTopBar() {
  const location = useLocation()
  const { getStepNumber } = useRB()
  const pathname = location.pathname
  const isProof = pathname === '/rb/proof'
  const stepSlug = RB_STEP_IDS.find((id) => pathname === `/rb/${id}`) ?? null
  const stepNum = stepSlug ? getStepNumber(stepSlug) : 0

  return (
    <header className={styles.topBar}>
      <div className={styles.left}>ResumeForge</div>
      <div className={styles.center}>
        {isProof ? 'Project 3 — Proof' : `Project 3 — Step ${stepNum} of 8`}
      </div>
      <div className={styles.right}>
        <span className={styles.badge}>{getStatusBadge(pathname, stepSlug)}</span>
      </div>
    </header>
  )
}
