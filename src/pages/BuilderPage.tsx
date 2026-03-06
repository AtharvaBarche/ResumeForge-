import { useState, useCallback } from 'react'
import { useResume } from '../context/ResumeContext'
import { useTemplate } from '../context/TemplateContext'
import { LivePreview } from '../components/LivePreview'
import { ATSScoreMeter } from '../components/ATSScoreMeter'
import { ProfessionalStandards } from '../components/ProfessionalStandards'
import { TemplateThumbnails } from '../components/TemplateThumbnails'
import { ColorThemePicker } from '../components/ColorThemePicker'
import { BulletGuidance } from '../components/BulletGuidance'
import { SkillCategoryInput } from '../components/SkillCategoryInput'
import { ProjectAccordion } from '../components/ProjectAccordion'
import styles from './BuilderPage.module.css'

const SUGGESTED_SKILLS = {
  technical: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL'],
  soft: ['Team Leadership', 'Problem Solving'],
  tools: ['Git', 'Docker', 'AWS'],
}

export function BuilderPage() {
  const [suggestLoading, setSuggestLoading] = useState(false)
  const {
    data,
    setPersonalInfo,
    setSummary,
    addEducation,
    removeEducation,
    updateEducation,
    addExperience,
    removeExperience,
    updateExperience,
    addProject,
    removeProject,
    updateProject,
    setSkills,
    addSkill,
    removeSkill,
    setLinks,
    loadSampleData,
  } = useResume()
  const { themeColor } = useTemplate()

  const handleSuggestSkills = useCallback(() => {
    setSuggestLoading(true)
    setTimeout(() => {
      const merge = (existing: string[], suggested: string[]) => {
        const set = new Set(existing.map((s) => s.toLowerCase()))
        return [...existing, ...suggested.filter((s) => !set.has(s.toLowerCase()))]
      }
      setSkills({
        technical: merge(data.skills.technical || [], SUGGESTED_SKILLS.technical),
        soft: merge(data.skills.soft || [], SUGGESTED_SKILLS.soft),
        tools: merge(data.skills.tools || [], SUGGESTED_SKILLS.tools),
      })
      setSuggestLoading(false)
    }, 1000)
  }, [data.skills, setSkills])

  return (
    <div className={styles.twoCol}>
      <div className={styles.formCol}>
        <div className={styles.toolbar}>
          <button type="button" className={styles.sampleBtn} onClick={loadSampleData}>
            Load Sample Data
          </button>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Personal Info</h2>
          <div className={styles.fields}>
            <input
              type="text"
              placeholder="Name"
              value={data.personalInfo.name}
              onChange={(e) => setPersonalInfo({ ...data.personalInfo, name: e.target.value })}
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              value={data.personalInfo.email}
              onChange={(e) => setPersonalInfo({ ...data.personalInfo, email: e.target.value })}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Phone"
              value={data.personalInfo.phone}
              onChange={(e) => setPersonalInfo({ ...data.personalInfo, phone: e.target.value })}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Location"
              value={data.personalInfo.location}
              onChange={(e) => setPersonalInfo({ ...data.personalInfo, location: e.target.value })}
              className={styles.input}
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Summary</h2>
          <textarea
            placeholder="Professional summary..."
            value={data.summary}
            onChange={(e) => setSummary(e.target.value)}
            className={styles.textarea}
            rows={4}
          />
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Education</h2>
            <button type="button" className={styles.addBtn} onClick={addEducation}>
              Add
            </button>
          </div>
          {data.education.map((entry) => (
            <div key={entry.id} className={styles.entry}>
              <input
                type="text"
                placeholder="School"
                value={entry.school}
                onChange={(e) => updateEducation(entry.id, { school: e.target.value })}
                className={styles.input}
              />
              <div className={styles.row}>
                <input
                  type="text"
                  placeholder="Degree"
                  value={entry.degree}
                  onChange={(e) => updateEducation(entry.id, { degree: e.target.value })}
                  className={styles.input}
                />
                <input
                  type="text"
                  placeholder="Field"
                  value={entry.field}
                  onChange={(e) => updateEducation(entry.id, { field: e.target.value })}
                  className={styles.input}
                />
              </div>
              <div className={styles.row}>
                <input
                  type="text"
                  placeholder="Start"
                  value={entry.start}
                  onChange={(e) => updateEducation(entry.id, { start: e.target.value })}
                  className={styles.input}
                />
                <input
                  type="text"
                  placeholder="End"
                  value={entry.end}
                  onChange={(e) => updateEducation(entry.id, { end: e.target.value })}
                  className={styles.input}
                />
              </div>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeEducation(entry.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Experience</h2>
            <button type="button" className={styles.addBtn} onClick={addExperience}>
              Add
            </button>
          </div>
          {data.experience.map((entry) => (
            <div key={entry.id} className={styles.entry}>
              <input
                type="text"
                placeholder="Company"
                value={entry.company}
                onChange={(e) => updateExperience(entry.id, { company: e.target.value })}
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Role"
                value={entry.role}
                onChange={(e) => updateExperience(entry.id, { role: e.target.value })}
                className={styles.input}
              />
              <div className={styles.row}>
                <input
                  type="text"
                  placeholder="Start"
                  value={entry.start}
                  onChange={(e) => updateExperience(entry.id, { start: e.target.value })}
                  className={styles.input}
                />
                <input
                  type="text"
                  placeholder="End"
                  value={entry.end}
                  onChange={(e) => updateExperience(entry.id, { end: e.target.value })}
                  className={styles.input}
                />
              </div>
              <textarea
                placeholder="Description"
                value={entry.description}
                onChange={(e) => updateExperience(entry.id, { description: e.target.value })}
                className={styles.textarea}
                rows={3}
              />
              <BulletGuidance description={entry.description} />
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeExperience(entry.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </section>

        <ProjectAccordion
          projects={data.projects}
          onAdd={addProject}
          onRemove={removeProject}
          onUpdate={updateProject}
        />

        <SkillCategoryInput
          skills={data.skills}
          onAdd={addSkill}
          onRemove={removeSkill}
          onSuggest={handleSuggestSkills}
          suggestLoading={suggestLoading}
        />

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Links</h2>
          <input
            type="url"
            placeholder="GitHub"
            value={data.links.github}
            onChange={(e) => setLinks({ ...data.links, github: e.target.value })}
            className={styles.input}
          />
          <input
            type="url"
            placeholder="LinkedIn"
            value={data.links.linkedin}
            onChange={(e) => setLinks({ ...data.links, linkedin: e.target.value })}
            className={styles.input}
          />
        </section>
      </div>

      <aside className={styles.previewCol} style={{ ['--resume-accent' as string]: themeColor }}>
        <TemplateThumbnails />
        <ColorThemePicker />
        <ATSScoreMeter />
        <ProfessionalStandards />
        <LivePreview />
      </aside>
    </div>
  )
}
