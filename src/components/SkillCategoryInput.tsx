import { useState, KeyboardEvent } from 'react'
import type { SkillsByCategory } from '../context/ResumeContext'
import styles from './SkillCategoryInput.module.css'

const CATEGORIES: { key: keyof SkillsByCategory; label: string }[] = [
  { key: 'technical', label: 'Technical Skills' },
  { key: 'soft', label: 'Soft Skills' },
  { key: 'tools', label: 'Tools & Technologies' },
]

interface SkillCategoryInputProps {
  skills: SkillsByCategory
  onAdd: (category: keyof SkillsByCategory, skill: string) => void
  onRemove: (category: keyof SkillsByCategory, index: number) => void
  onSuggest: () => void
  suggestLoading: boolean
}

export function SkillCategoryInput({
  skills,
  onAdd,
  onRemove,
  onSuggest,
  suggestLoading,
}: SkillCategoryInputProps) {
  const [inputValues, setInputValues] = useState<Record<string, string>>({})

  const handleKeyDown = (category: keyof SkillsByCategory, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const value = inputValues[category] ?? ''
      if (value.trim()) {
        onAdd(category, value.trim())
        setInputValues((prev) => ({ ...prev, [category]: '' }))
      }
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>Skills</h2>
        <button
          type="button"
          className={styles.suggestBtn}
          onClick={onSuggest}
          disabled={suggestLoading}
        >
          {suggestLoading ? '...' : '✨ Suggest Skills'}
        </button>
      </div>
      {CATEGORIES.map(({ key, label }) => {
        const list = skills[key] || []
        return (
          <div key={key} className={styles.category}>
            <h3 className={styles.categoryLabel}>
              {label} ({list.length})
            </h3>
            <div className={styles.pills}>
              {list.map((skill, i) => (
                <span key={`${key}-${i}`} className={styles.pill}>
                  {skill}
                  <button
                    type="button"
                    className={styles.pillRemove}
                    onClick={() => onRemove(key, i)}
                    aria-label={`Remove ${skill}`}
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                className={styles.tagInput}
                placeholder="Type and press Enter"
                value={inputValues[key] ?? ''}
                onChange={(e) => setInputValues((prev) => ({ ...prev, [key]: e.target.value }))}
                onKeyDown={(e) => handleKeyDown(key, e)}
              />
            </div>
          </div>
        )
      })}
    </section>
  )
}
