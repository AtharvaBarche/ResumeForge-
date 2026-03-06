import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from 'react'
import { useResume } from './ResumeContext'
import { computeAtsScore } from '../utils/atsScore'

/** Weights for overall readiness score (must sum to 1) */
export const READINESS_WEIGHTS = {
  jobMatchQuality: 0.30,   // 30%
  jdSkillAlignment: 0.25,  // 25%
  resumeAtsScore: 0.25,    // 25%
  applicationProgress: 0.10, // 10%
  practiceCompletion: 0.10, // 10%
} as const

export interface Preferences {
  targetRole?: string
  targetIndustry?: string
  notifyApplications?: boolean
}

export interface JobMatch {
  id: string
  title: string
  company: string
  matchScore: number // 0-100
  postedAt?: string
}

export interface Application {
  id: string
  jobId: string
  jobTitle: string
  company: string
  status: 'draft' | 'applied' | 'interviewing' | 'offered' | 'rejected'
  appliedAt?: string
}

export interface JDAnalysis {
  id: string
  jobId: string
  skillAlignmentScore: number // 0-100
  missingSkills: string[]
  matchedSkills: string[]
  analyzedAt: string
}

export interface LastActivity {
  type: 'resume_edit' | 'application' | 'jd_analysis' | 'practice'
  at: string // ISO date
  label?: string
}

export interface ReadinessState {
  preferences: Preferences
  jobMatches: JobMatch[]
  applications: Application[]
  jdAnalyses: JDAnalysis[]
  lastActivity: LastActivity | null
}

const defaultState: ReadinessState = {
  preferences: {},
  jobMatches: [],
  applications: [],
  jdAnalyses: [],
  lastActivity: null,
}

function getJobMatchQuality(jobMatches: JobMatch[]): number {
  if (jobMatches.length === 0) return 0
  const sum = jobMatches.reduce((a, j) => a + j.matchScore, 0)
  return Math.round(sum / jobMatches.length)
}

function getJDSkillAlignment(jdAnalyses: JDAnalysis[]): number {
  if (jdAnalyses.length === 0) return 0
  const sum = jdAnalyses.reduce((a, j) => a + j.skillAlignmentScore, 0)
  return Math.round(sum / jdAnalyses.length)
}

function getApplicationProgress(applications: Application[]): number {
  if (applications.length === 0) return 0
  const applied = applications.filter((a) => a.status !== 'draft').length
  return Math.round((applied / applications.length) * 100)
}

/** Practice completion: placeholder 0-100 (e.g. from completed drills) */
const PRACTICE_PLACEHOLDER = 0

interface ReadinessContextValue extends ReadinessState {
  readinessScore: number
  componentScores: {
    jobMatchQuality: number
    jdSkillAlignment: number
    resumeAtsScore: number
    applicationProgress: number
    practiceCompletion: number
  }
}

const ReadinessContext = createContext<ReadinessContextValue | null>(null)

export function ReadinessProvider({ children }: { children: ReactNode }) {
  const { data: resumeData } = useResume()
  const [state] = useState<ReadinessState>(defaultState)

  const atsScore = useMemo(() => computeAtsScore(resumeData), [resumeData])

  const componentScores = useMemo(() => ({
    jobMatchQuality: getJobMatchQuality(state.jobMatches),
    jdSkillAlignment: getJDSkillAlignment(state.jdAnalyses),
    resumeAtsScore: atsScore,
    applicationProgress: getApplicationProgress(state.applications),
    practiceCompletion: PRACTICE_PLACEHOLDER,
  }), [state.jobMatches, state.jdAnalyses, state.applications, atsScore])

  const readinessScore = useMemo(() => {
    const w = READINESS_WEIGHTS
    const { jobMatchQuality, jdSkillAlignment, resumeAtsScore, applicationProgress, practiceCompletion } = componentScores
    return Math.round(
      w.jobMatchQuality * jobMatchQuality +
      w.jdSkillAlignment * jdSkillAlignment +
      w.resumeAtsScore * resumeAtsScore +
      w.applicationProgress * applicationProgress +
      w.practiceCompletion * practiceCompletion
    )
  }, [componentScores])

  const value = useMemo<ReadinessContextValue>(
    () => ({
      ...state,
      readinessScore: Math.min(100, readinessScore),
      componentScores,
    }),
    [state, readinessScore, componentScores],
  )

  return (
    <ReadinessContext.Provider value={value}>
      {children}
    </ReadinessContext.Provider>
  )
}

export function useReadiness() {
  const ctx = useContext(ReadinessContext)
  if (!ctx) throw new Error('useReadiness must be used within ReadinessProvider')
  return ctx
}
