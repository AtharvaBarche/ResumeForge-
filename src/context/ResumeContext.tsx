import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
  ReactNode,
} from 'react'

export interface PersonalInfo {
  name: string
  email: string
  phone: string
  location: string
}

export interface EducationEntry {
  id: string
  school: string
  degree: string
  field: string
  start: string
  end: string
}

export interface ExperienceEntry {
  id: string
  company: string
  role: string
  start: string
  end: string
  description: string
}

export interface ProjectEntry {
  id: string
  title: string
  description: string
  techStack: string[]
  liveUrl: string
  githubUrl: string
}

export interface SkillsByCategory {
  technical: string[]
  soft: string[]
  tools: string[]
}

export interface Links {
  github: string
  linkedin: string
}

export interface ResumeData {
  personalInfo: PersonalInfo
  summary: string
  education: EducationEntry[]
  experience: ExperienceEntry[]
  projects: ProjectEntry[]
  skills: SkillsByCategory
  links: Links
}

const STORAGE_KEY = 'resumeBuilderData'

const defaultSkills: SkillsByCategory = {
  technical: [],
  soft: [],
  tools: [],
}

const defaultResume: ResumeData = {
  personalInfo: { name: '', email: '', phone: '', location: '' },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: defaultSkills,
  links: { github: '', linkedin: '' },
}

function ensureId<T extends { id?: string }>(entry: T, gen: () => string): T & { id: string } {
  return { ...entry, id: entry.id && entry.id.trim() ? entry.id : gen() }
}

function migrateProjects(projects: unknown[]): ProjectEntry[] {
  return (projects || []).map((p) => {
    const r = (p ?? {}) as Record<string, unknown>
    const id = ((r.id as string) || genId()).trim() || genId()
    if (r.title != null || (r.techStack != null && Array.isArray(r.techStack))) {
      return {
        id,
        title: (r.title as string) ?? '',
        description: (r.description as string) ?? '',
        techStack: Array.isArray(r.techStack) ? (r.techStack as string[]) : [],
        liveUrl: (r.liveUrl as string) ?? '',
        githubUrl: (r.githubUrl as string) ?? '',
      }
    }
    const name = (r.name as string) ?? ''
    const url = (r.url as string) ?? ''
    const desc = (r.description as string) ?? ''
    return {
      id,
      title: name,
      description: desc,
      techStack: [],
      liveUrl: url.includes('github') ? '' : url,
      githubUrl: url.includes('github') ? url : '',
    }
  })
}

function migrateSkills(skills: unknown): SkillsByCategory {
  if (skills && typeof skills === 'object' && !Array.isArray(skills)) {
    const s = skills as Record<string, unknown>
    return {
      technical: Array.isArray(s.technical) ? s.technical as string[] : [],
      soft: Array.isArray(s.soft) ? s.soft as string[] : [],
      tools: Array.isArray(s.tools) ? s.tools as string[] : [],
    }
  }
  if (typeof skills === 'string' && skills.trim()) {
    const list = skills.split(',').map((x) => x.trim()).filter(Boolean)
    return { ...defaultSkills, technical: list }
  }
  return { ...defaultSkills }
}

function loadStored(): ResumeData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultResume
    const parsed = JSON.parse(raw) as Record<string, unknown>
    const education = ((parsed.education as EducationEntry[]) || []).map((e) => ensureId(e, genId))
    const experience = ((parsed.experience as ExperienceEntry[]) || []).map((e) => ensureId(e, genId))
    const projects = migrateProjects((parsed.projects as unknown[]) || [])
    return {
      personalInfo: { ...defaultResume.personalInfo, ...(parsed.personalInfo as object) },
      summary: typeof parsed.summary === 'string' ? parsed.summary : '',
      education,
      experience,
      projects,
      skills: migrateSkills(parsed.skills),
      links: { ...defaultResume.links, ...(parsed.links as object) },
    }
  } catch {
    return defaultResume
  }
}

const sampleResume: ResumeData = {
  personalInfo: {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
  },
  summary:
    'Full-stack developer with 5+ years of experience building web applications. Passionate about clean code and user experience.',
  education: [
    {
      id: 'edu-1',
      school: 'State University',
      degree: 'B.S.',
      field: 'Computer Science',
      start: '2015',
      end: '2019',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'Tech Corp',
      role: 'Senior Software Engineer',
      start: '2021',
      end: 'Present',
      description: 'Lead development of customer-facing web apps. Mentor junior developers.',
    },
    {
      id: 'exp-2',
      company: 'Startup Inc',
      role: 'Software Engineer',
      start: '2019',
      end: '2021',
      description: 'Built APIs and frontend features. Collaborated with design and product.',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Portfolio Site',
      description: 'Personal portfolio built with React and TypeScript.',
      techStack: ['React', 'TypeScript'],
      liveUrl: '',
      githubUrl: 'https://github.com/jane/portfolio',
    },
  ],
  skills: {
    technical: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL'],
    soft: [],
    tools: [],
  },
  links: { github: 'https://github.com/janedoe', linkedin: 'https://linkedin.com/in/janedoe' },
}

interface ResumeContextValue {
  data: ResumeData
  setPersonalInfo: (v: PersonalInfo) => void
  setSummary: (v: string) => void
  setEducation: (v: EducationEntry[]) => void
  addEducation: () => void
  removeEducation: (id: string) => void
  updateEducation: (id: string, patch: Partial<EducationEntry>) => void
  setExperience: (v: ExperienceEntry[]) => void
  addExperience: () => void
  removeExperience: (id: string) => void
  updateExperience: (id: string, patch: Partial<ExperienceEntry>) => void
  setProjects: (v: ProjectEntry[]) => void
  addProject: () => void
  removeProject: (id: string) => void
  updateProject: (id: string, patch: Partial<ProjectEntry>) => void
  setSkills: (v: SkillsByCategory) => void
  addSkill: (category: keyof SkillsByCategory, skill: string) => void
  removeSkill: (category: keyof SkillsByCategory, index: number) => void
  setLinks: (v: Links) => void
  loadSampleData: () => void
  clearResumeData: () => void
}

const ResumeContext = createContext<ResumeContextValue | null>(null)

function genId(): string {
  return Math.random().toString(36).slice(2, 11)
}

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ResumeData>(loadStored)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      // ignore quota or serialization errors
    }
  }, [data])

  const setPersonalInfo = useCallback((v: PersonalInfo) => {
    setData((prev) => ({ ...prev, personalInfo: v }))
  }, [])

  const setSummary = useCallback((v: string) => {
    setData((prev) => ({ ...prev, summary: v }))
  }, [])

  const setEducation = useCallback((v: EducationEntry[]) => {
    setData((prev) => ({ ...prev, education: v }))
  }, [])

  const addEducation = useCallback(() => {
    setData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { id: genId(), school: '', degree: '', field: '', start: '', end: '' },
      ],
    }))
  }, [])

  const removeEducation = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }))
  }, [])

  const updateEducation = useCallback((id: string, patch: Partial<EducationEntry>) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }))
  }, [])

  const setExperience = useCallback((v: ExperienceEntry[]) => {
    setData((prev) => ({ ...prev, experience: v }))
  }, [])

  const addExperience = useCallback(() => {
    setData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { id: genId(), company: '', role: '', start: '', end: '', description: '' },
      ],
    }))
  }, [])

  const removeExperience = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }))
  }, [])

  const updateExperience = useCallback((id: string, patch: Partial<ExperienceEntry>) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }))
  }, [])

  const setProjects = useCallback((v: ProjectEntry[]) => {
    setData((prev) => ({ ...prev, projects: v }))
  }, [])

  const addProject = useCallback(() => {
    setData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { id: genId(), title: '', description: '', techStack: [], liveUrl: '', githubUrl: '' },
      ],
    }))
  }, [])

  const removeProject = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }))
  }, [])

  const updateProject = useCallback((id: string, patch: Partial<ProjectEntry>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }))
  }, [])

  const setSkills = useCallback((v: SkillsByCategory) => {
    setData((prev) => ({ ...prev, skills: v }))
  }, [])

  const addSkill = useCallback((category: keyof SkillsByCategory, skill: string) => {
    const trimmed = skill.trim()
    if (!trimmed) return
    setData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: [...(prev.skills[category] || []), trimmed],
      },
    }))
  }, [])

  const removeSkill = useCallback((category: keyof SkillsByCategory, index: number) => {
    setData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((_, i) => i !== index),
      },
    }))
  }, [])

  const setLinks = useCallback((v: Links) => {
    setData((prev) => ({ ...prev, links: v }))
  }, [])

  const loadSampleData = useCallback(() => {
    setData(JSON.parse(JSON.stringify(sampleResume)))
  }, [])

  const clearResumeData = useCallback(() => {
    setData(JSON.parse(JSON.stringify(defaultResume)))
  }, [])

  const value = useMemo<ResumeContextValue>(
    () => ({
      data,
      setPersonalInfo,
      setSummary,
      setEducation,
      addEducation,
      removeEducation,
      updateEducation,
      setExperience,
      addExperience,
      removeExperience,
      updateExperience,
      setProjects,
      addProject,
      removeProject,
      updateProject,
      setSkills,
      addSkill,
      removeSkill,
      setLinks,
      loadSampleData,
      clearResumeData,
    }),
    [
      data,
      setPersonalInfo,
      setSummary,
      setEducation,
      addEducation,
      removeEducation,
      updateEducation,
      setExperience,
      addExperience,
      removeExperience,
      updateExperience,
      setProjects,
      addProject,
      removeProject,
      updateProject,
      setSkills,
      addSkill,
      removeSkill,
      setLinks,
      loadSampleData,
      clearResumeData,
    ],
  )

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
}

export function useResume() {
  const ctx = useContext(ResumeContext)
  if (!ctx) throw new Error('useResume must be used within ResumeProvider')
  return ctx
}
