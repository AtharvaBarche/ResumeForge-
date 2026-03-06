import { useRef } from 'react'
import { useRB } from '../context/RBContext'
import type { RBStepId } from '../context/RBContext'
import type { ArtifactStatus } from '../context/RBContext'
import styles from './BuildPanel.module.css'

const LOVABLE_URL = 'https://lovable.dev'

interface BuildPanelProps {
  stepId: RBStepId
  copyIntoLovableText: string
}

export function BuildPanel({ stepId, copyIntoLovableText }: BuildPanelProps) {
  const { artifacts, setArtifact } = useRB()
  const status: ArtifactStatus = artifacts[stepId]?.status ?? 'pending'
  const screenshotInputRef = useRef<HTMLInputElement>(null)

  const handleCopy = () => {
    navigator.clipboard.writeText(copyIntoLovableText)
  }

  const handleOpenLovable = () => {
    window.open(LOVABLE_URL, '_blank')
  }

  const handleWorked = () => {
    setArtifact(stepId, { status: 'worked' })
  }

  const handleError = () => {
    setArtifact(stepId, { status: 'error' })
  }

  const handleScreenshot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setArtifact(stepId, { status: 'screenshot', screenshotUrl: url })
    e.target.value = ''
  }

  return (
    <div className={styles.panel}>
      <h3 className={styles.panelTitle}>Build panel</h3>
      <label className={styles.label}>Copy this into Lovable</label>
      <textarea
        className={styles.textarea}
        readOnly
        value={copyIntoLovableText}
        rows={6}
      />
      <div className={styles.actions}>
        <button type="button" className={styles.btn} onClick={handleCopy}>
          Copy
        </button>
        <button type="button" className={styles.btnPrimary} onClick={handleOpenLovable}>
          Build in Lovable
        </button>
      </div>
      <div className={styles.statusGroup}>
        <button
          type="button"
          className={status === 'worked' ? styles.btnWorked : styles.btn}
          onClick={handleWorked}
        >
          It Worked
        </button>
        <button
          type="button"
          className={status === 'error' ? styles.btnError : styles.btn}
          onClick={handleError}
        >
          Error
        </button>
        <button
          type="button"
          className={styles.btn}
          onClick={() => screenshotInputRef.current?.click()}
        >
          Add Screenshot
        </button>
        <input
          ref={screenshotInputRef}
          type="file"
          accept="image/*"
          className={styles.hidden}
          onChange={handleScreenshot}
        />
      </div>
    </div>
  )
}
