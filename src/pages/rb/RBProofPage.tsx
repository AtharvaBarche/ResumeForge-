import { useCallback, useState } from 'react'
import { useRB, RB_STEP_IDS } from '../../context/RBContext'
import type { RBStepId } from '../../context/RBContext'
import styles from './RBProofPage.module.css'

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

export function RBProofPage() {
  const { artifacts, proofLinks, setProofLink } = useRB()
  const [copied, setCopied] = useState(false)

  const buildFinalSubmission = useCallback(() => {
    const lines: string[] = [
      'ResumeForge — Build Track — Final Submission',
      '',
      'Step status:',
      ...RB_STEP_IDS.map((id) => {
        const a = artifacts[id]
        const status = a ? a.status : 'pending'
        return `  ${STEP_LABELS[id]}: ${status}`
      }),
      '',
      `Lovable: ${proofLinks.lovable || '(not set)'}`,
      `GitHub: ${proofLinks.github || '(not set)'}`,
      `Deploy: ${proofLinks.deploy || '(not set)'}`,
    ]
    return lines.join('\n')
  }, [artifacts, proofLinks])

  const handleCopyFinal = () => {
    navigator.clipboard.writeText(buildFinalSubmission())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Proof of completion</h2>
      <p className={styles.subtitle}>Project 3 — ResumeForge — Build Track</p>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Step status</h3>
        <ul className={styles.stepList}>
          {RB_STEP_IDS.map((id) => {
            const a = artifacts[id]
            const status = a ? a.status : 'pending'
            return (
              <li key={id} className={styles.stepItem}>
                <span className={styles.stepName}>{STEP_LABELS[id]}</span>
                <span className={status === 'worked' ? styles.status_worked : status === 'error' ? styles.status_error : status === 'screenshot' ? styles.status_screenshot : styles.status_pending}>{status}</span>
              </li>
            )
          })}
        </ul>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Links</h3>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Lovable link</label>
          <input
            type="url"
            className={styles.input}
            value={proofLinks.lovable}
            onChange={(e) => setProofLink('lovable', e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>GitHub link</label>
          <input
            type="url"
            className={styles.input}
            value={proofLinks.github}
            onChange={(e) => setProofLink('github', e.target.value)}
            placeholder="https://github.com/..."
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Deploy link</label>
          <input
            type="url"
            className={styles.input}
            value={proofLinks.deploy}
            onChange={(e) => setProofLink('deploy', e.target.value)}
            placeholder="https://..."
          />
        </div>
      </section>

      <div className={styles.actions}>
        <button type="button" className={styles.copyBtn} onClick={handleCopyFinal}>
          {copied ? 'Copied!' : 'Copy Final Submission'}
        </button>
      </div>
    </div>
  )
}
