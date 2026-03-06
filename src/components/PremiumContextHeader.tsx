import { useLocation } from 'react-router-dom'
import styles from './PremiumContextHeader.module.css'

const STEP_LABELS: Record<string, string> = {
  '01-problem': 'Problem',
  '02-market': 'Market',
  '03-architecture': 'Architecture',
  '04-hld': 'HLD',
  '05-lld': 'LLD',
  '06-build': 'Build',
  '07-test': 'Test',
  '08-ship': 'Ship',
}

function getContextTitle(pathname: string): string {
  if (pathname === '/rb/proof') return 'Proof of completion'
  const slug = pathname.replace('/rb/', '')
  return STEP_LABELS[slug] ?? 'Build Track'
}

export function PremiumContextHeader() {
  const location = useLocation()
  const title = getContextTitle(location.pathname)

  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
    </div>
  )
}
