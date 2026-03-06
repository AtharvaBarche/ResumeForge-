import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
  ReactNode,
} from 'react'

export type ResumeTemplate = 'classic' | 'modern' | 'minimal' | 'executive' | 'compact' | 'bold'

export const THEME_COLORS: { id: string; name: string; hsl: string }[] = [
  { id: 'teal', name: 'Teal', hsl: 'hsl(168, 60%, 40%)' },
  { id: 'navy', name: 'Navy', hsl: 'hsl(220, 60%, 35%)' },
  { id: 'burgundy', name: 'Burgundy', hsl: 'hsl(345, 60%, 35%)' },
  { id: 'forest', name: 'Forest', hsl: 'hsl(150, 50%, 30%)' },
  { id: 'charcoal', name: 'Charcoal', hsl: 'hsl(0, 0%, 25%)' },
]

const STORAGE_KEY = 'resumeBuilderTemplate'
const THEME_STORAGE_KEY = 'resumeBuilderTheme'

const VALID_TEMPLATES: ResumeTemplate[] = ['classic', 'modern', 'minimal', 'executive', 'compact', 'bold']

function loadStored(): ResumeTemplate {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw && VALID_TEMPLATES.includes(raw as ResumeTemplate)) return raw as ResumeTemplate
  } catch {
    // ignore
  }
  return 'classic'
}

function loadTheme(): string {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY)
    const found = THEME_COLORS.find((c) => c.id === raw || c.hsl === raw)
    if (found) return found.hsl
  } catch {
    // ignore
  }
  return THEME_COLORS[0].hsl
}

interface TemplateContextValue {
  template: ResumeTemplate
  setTemplate: (t: ResumeTemplate) => void
  themeColor: string
  setThemeColor: (hsl: string) => void
}

const TemplateContext = createContext<TemplateContextValue | null>(null)

export function TemplateProvider({ children }: { children: ReactNode }) {
  const [template, setTemplateState] = useState<ResumeTemplate>(loadStored)
  const [themeColor, setThemeColorState] = useState<string>(loadTheme)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, template)
    } catch {
      // ignore
    }
  }, [template])

  useEffect(() => {
    try {
      const id = THEME_COLORS.find((c) => c.hsl === themeColor)?.id ?? themeColor
      localStorage.setItem(THEME_STORAGE_KEY, id)
    } catch {
      // ignore
    }
  }, [themeColor])

  const setTemplate = useCallback((t: ResumeTemplate) => {
    setTemplateState(t)
  }, [])

  const setThemeColor = useCallback((hsl: string) => {
    setThemeColorState(hsl)
  }, [])

  const value = useMemo(
    () => ({ template, setTemplate, themeColor, setThemeColor }),
    [template, setTemplate, themeColor, setThemeColor],
  )

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  )
}

export function useTemplate() {
  const ctx = useContext(TemplateContext)
  if (!ctx) throw new Error('useTemplate must be used within TemplateProvider')
  return ctx
}
