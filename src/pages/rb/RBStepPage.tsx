import { Link, useNavigate } from 'react-router-dom'
import { useRB, RB_STEP_IDS } from '../../context/RBContext'
import type { RBStepId } from '../../context/RBContext'
import { BuildPanel } from '../../components/BuildPanel'
import styles from './RBStepPage.module.css'

const STEP_LABELS: Record<RBStepId, string> = {
  '01-problem': 'Problem',
  '02-market': 'Market',
  '03-architecture': 'Architecture',
  '04-hld': 'HLD',
  '05-lld': 'LLD',
  '06-build': 'Build',
  '07-test': 'Test',
  '08-ship': 'Ship',
}

const PLACEHOLDER_COPY: Record<RBStepId, string> = {
  '01-problem': 'Step 1: Problem — Paste problem statement / brief here for Lovable.',
  '02-market': 'Step 2: Market — Paste market research / user needs here for Lovable.',
  '03-architecture': 'Step 3: Architecture — Paste architecture notes here for Lovable.',
  '04-hld': 'Step 4: HLD — Paste high-level design here for Lovable.',
  '05-lld': 'Step 5: LLD — Paste low-level design here for Lovable.',
  '06-build': 'Step 6: Build — Paste build instructions here for Lovable.',
  '07-test': 'Step 7: Test — Paste test plan / cases here for Lovable.',
  '08-ship': 'Step 8: Ship — Paste deployment / ship checklist here for Lovable.',
}

interface RBStepPageProps {
  stepId: RBStepId
}

export function RBStepPage({ stepId }: RBStepPageProps) {
  const { hasArtifact, canProceedToNext, getStepNumber } = useRB()
  const navigate = useNavigate()
  const index = RB_STEP_IDS.indexOf(stepId)
  const stepNum = getStepNumber(stepId)
  const prevStep = index > 0 ? RB_STEP_IDS[index - 1] : null
  const nextStep = index < RB_STEP_IDS.length - 1 ? RB_STEP_IDS[index + 1] : null
  const canProceed = canProceedToNext(stepId)
  const prevComplete = !prevStep || hasArtifact(prevStep)

  if (!prevComplete) {
    const firstIncomplete = RB_STEP_IDS.find((id) => !hasArtifact(id))
    if (firstIncomplete) {
      navigate(`/rb/${firstIncomplete}`, { replace: true })
      return null
    }
  }

  return (
    <div className={styles.stepLayout}>
      <div className={styles.workspace}>
        <h2 className={styles.stepTitle}>{STEP_LABELS[stepId]}</h2>
        <p className={styles.placeholder}>
          Step {stepNum} of 8. Complete the build panel on the right and upload proof to continue.
        </p>
        <div className={styles.nav}>
          {prevStep ? (
            <Link to={`/rb/${prevStep}`} className={styles.navLink}>
              ← Previous
            </Link>
          ) : (
            <span />
          )}
          {nextStep ? (
            <Link
              to={canProceed ? `/rb/${nextStep}` : '#'}
              className={canProceed ? styles.navLink : styles.navLinkDisabled}
              onClick={(e) => !canProceed && e.preventDefault()}
              aria-disabled={!canProceed}
            >
              Next →
            </Link>
          ) : (
            <Link
              to={canProceed ? '/rb/proof' : '#'}
              className={canProceed ? styles.navLink : styles.navLinkDisabled}
              onClick={(e) => !canProceed && e.preventDefault()}
              aria-disabled={!canProceed}
            >
              Go to Proof
            </Link>
          )}
        </div>
      </div>
      <aside className={styles.buildPanel}>
        <BuildPanel stepId={stepId} copyIntoLovableText={PLACEHOLDER_COPY[stepId]} />
      </aside>
    </div>
  )
}
