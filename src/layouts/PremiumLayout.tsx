import { Outlet, useLocation } from 'react-router-dom'
import { PremiumTopBar } from '../components/PremiumTopBar'
import { PremiumContextHeader } from '../components/PremiumContextHeader'
import { ProofFooter } from '../components/ProofFooter'
import styles from './PremiumLayout.module.css'

export function PremiumLayout() {
  const location = useLocation()
  const isProof = location.pathname === '/rb/proof'

  return (
    <div className={styles.layout}>
      <PremiumTopBar />
      <PremiumContextHeader />
      <main className={styles.main}>
        <Outlet context={{ isProof }} />
      </main>
      <ProofFooter />
    </div>
  )
}
