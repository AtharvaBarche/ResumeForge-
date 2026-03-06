import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
  ReactNode,
} from 'react'

export const RB_STEP_IDS = [
  '01-problem',
  '02-market',
  '03-architecture',
  '04-hld',
  '05-lld',
  '06-build',
  '07-test',
  '08-ship',
] as const

export type RBStepId = (typeof RB_STEP_IDS)[number]

export type ArtifactStatus = 'pending' | 'worked' | 'error' | 'screenshot'

export interface StepArtifact {
  status: ArtifactStatus
  screenshotUrl?: string
}

function getStorageKey(stepId: RBStepId): string {
  const num = stepId.slice(0, 2)
  return `rb_step_${num}_artifact`
}

function loadArtifact(stepId: RBStepId): StepArtifact | null {
  try {
    const raw = localStorage.getItem(getStorageKey(stepId))
    if (!raw) return null
    return JSON.parse(raw) as StepArtifact
  } catch {
    return null
  }
}

function saveArtifact(stepId: RBStepId, data: StepArtifact): void {
  localStorage.setItem(getStorageKey(stepId), JSON.stringify(data))
}

interface RBState {
  artifacts: Record<RBStepId, StepArtifact | null>
  proofLinks: { lovable: string; github: string; deploy: string }
}

interface RBContextValue extends RBState {
  hasArtifact: (stepId: RBStepId) => boolean
  setArtifact: (stepId: RBStepId, data: StepArtifact) => void
  setProofLink: (key: 'lovable' | 'github' | 'deploy', value: string) => void
  canProceedToNext: (stepId: RBStepId) => boolean
  getStepNumber: (stepId: RBStepId) => number
}

const RBContext = createContext<RBContextValue | null>(null)

const PROOF_LINKS_KEY = 'rb_proof_links'

function loadProofLinks(): RBState['proofLinks'] {
  try {
    const raw = localStorage.getItem(PROOF_LINKS_KEY)
    if (!raw) return { lovable: '', github: '', deploy: '' }
    return JSON.parse(raw)
  } catch {
    return { lovable: '', github: '', deploy: '' }
  }
}

function saveProofLinks(links: RBState['proofLinks']): void {
  localStorage.setItem(PROOF_LINKS_KEY, JSON.stringify(links))
}

export function RBProvider({ children }: { children: ReactNode }) {
  const [artifacts, setArtifactsState] = useState<Record<RBStepId, StepArtifact | null>>(() => {
    const out = {} as Record<RBStepId, StepArtifact | null>
    RB_STEP_IDS.forEach((id) => {
      out[id] = loadArtifact(id)
    })
    return out
  })

  const [proofLinks, setProofLinksState] = useState<RBState['proofLinks']>(loadProofLinks)

  const setArtifact = useCallback((stepId: RBStepId, data: StepArtifact) => {
    saveArtifact(stepId, data)
    setArtifactsState((prev) => ({ ...prev, [stepId]: data }))
  }, [])

  const setProofLink = useCallback((key: 'lovable' | 'github' | 'deploy', value: string) => {
    setProofLinksState((prev) => {
      const next = { ...prev, [key]: value }
      saveProofLinks(next)
      return next
    })
  }, [])

  const hasArtifact = useCallback(
    (stepId: RBStepId) => artifacts[stepId] != null,
    [artifacts],
  )

  const canProceedToNext = useCallback(
    (stepId: RBStepId) => hasArtifact(stepId),
    [hasArtifact],
  )

  const getStepNumber = useCallback((stepId: RBStepId) => {
    const i = RB_STEP_IDS.indexOf(stepId)
    return i >= 0 ? i + 1 : 0
  }, [])

  const value = useMemo<RBContextValue>(
    () => ({
      artifacts,
      proofLinks,
      hasArtifact,
      setArtifact,
      setProofLink,
      canProceedToNext,
      getStepNumber,
    }),
    [
      artifacts,
      proofLinks,
      hasArtifact,
      setArtifact,
      setProofLink,
      canProceedToNext,
      getStepNumber,
    ],
  )

  return <RBContext.Provider value={value}>{children}</RBContext.Provider>
}

export function useRB() {
  const ctx = useContext(RBContext)
  if (!ctx) throw new Error('useRB must be used within RBProvider')
  return ctx
}
