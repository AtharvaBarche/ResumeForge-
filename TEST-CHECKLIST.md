# AI Resume Builder — Test Checklist

Use this checklist to verify all features after running `npm run dev` and opening http://localhost:5173

---

## 1. All form sections save to localStorage

- [ ] Go to **/builder**
- [ ] Fill: Name, Email, Summary, add 1 Education, 1 Experience (with description), 1 Project, add 5+ skills in any category
- [ ] Open DevTools → Application → Local Storage → your origin
- [ ] Confirm key **resumeBuilderData** exists and contains your name, summary, education, experience, projects, skills (technical/soft/tools)
- [ ] Refresh the page — all fields should still be filled

---

## 2. Live preview updates in real-time

- [ ] On **/builder**, ensure the right panel shows the resume preview
- [ ] Type in Name — preview name updates as you type
- [ ] Add a skill with Enter — skill pill appears in preview Skills section
- [ ] Add a project title and description — project card appears in preview
- [ ] Change template (Classic / Modern / Minimal) — preview layout/typography changes immediately

---

## 3. Template switching preserves data

- [ ] On **/builder**, fill some fields (e.g. name, summary)
- [ ] Click **Modern** thumbnail — preview switches to modern layout; name and summary unchanged
- [ ] Click **Minimal** — preview switches to minimal; data still the same
- [ ] Click **Classic** — same data, classic layout

---

## 4. Color theme persists after refresh

- [ ] On **/builder**, click a color circle (e.g. Navy or Burgundy)
- [ ] Preview accents (e.g. links, link icons) use the new color
- [ ] Refresh the page — same color still selected and applied
- [ ] In Local Storage, confirm **resumeBuilderTheme** exists (e.g. "navy")

---

## 5. ATS score calculates correctly

- [ ] On **/builder**, start with empty form — ATS score should be **0**
- [ ] Add **name** only — score +10 (total 10)
- [ ] Add **email** — score +10 (total 20)
- [ ] Add **summary** with 50+ characters — score +10 (total 30)
- [ ] Add **1 experience** with at least one bullet in description — score +15 (total 45)
- [ ] Add **1 education** — score +10 (total 55)
- [ ] Add **5 skills** (any category) — score +10 (total 65)
- [ ] Add **1 project** — score +10 (total 75)
- [ ] Add **phone** — score +5 (total 80)
- [ ] Add **LinkedIn** URL — score +5 (total 85)
- [ ] Add **GitHub** URL — score +5 (total 90)
- [ ] Add an **action verb** in summary (e.g. "Built", "Led", "Designed") — score +10 (total 100)

---

## 6. Score updates live on edit

- [ ] On **/builder**, note current ATS score in the right panel
- [ ] Add or remove name — score updates immediately without saving or refreshing
- [ ] Add a skill so total skills ≥ 5 — score increases as soon as the skill is added
- [ ] On **/preview**, change something on **/builder** in another tab/window; return to **/preview** and refresh — circular score matches the new data

---

## 7. Export buttons work (copy / download)

- [ ] Go to **/preview**
- [ ] Click **Copy Resume as Text** — paste in Notepad; you should see Name, Contact, Summary, Education, Experience, Projects, Skills, Links
- [ ] Click **Download PDF** — toast appears: "PDF export ready! Check your downloads." (no file is actually generated)
- [ ] Click **Print / Save as PDF** — browser print dialog opens; print view shows only the resume (no nav/toolbar)

---

## 8. Empty states handled gracefully

- [ ] Clear all data (or open in incognito with no localStorage)
- [ ] **/builder** — preview shows "Resume preview will appear here." when everything is empty
- [ ] **/preview** — resume shows "Your Name", placeholders, and empty sections don’t break the page
- [ ] ATS score shows 0 and improvement list shows all missing items (name, email, summary, etc.)

---

## 9. Mobile responsive layout works

- [ ] Open DevTools → toggle device toolbar (e.g. iPhone or narrow width)
- [ ] **/** (home) — headline and CTA are readable and usable
- [ ] **/builder** — form and preview stack or scroll; no horizontal overflow; template/color controls usable
- [ ] **/preview** — toolbar and circular ATS score fit; resume is readable; export buttons accessible

---

## 10. No console errors on any page

- [ ] Open DevTools → Console; clear console
- [ ] Visit **/** → no red errors
- [ ] Visit **/builder** → no red errors (warnings are acceptable)
- [ ] Visit **/preview** → no red errors
- [ ] Visit **/proof** → no red errors
- [ ] Perform: add skill, add project, switch template, change color, copy text, print — no new errors in console

---

## ATS scoring rules (reference)

| Rule | Points |
|------|--------|
| Name provided | +10 |
| Email provided | +10 |
| Summary > 50 chars | +10 |
| ≥1 experience with bullets | +15 |
| ≥1 education entry | +10 |
| ≥5 skills | +10 |
| ≥1 project | +10 |
| Phone provided | +5 |
| LinkedIn provided | +5 |
| GitHub provided | +5 |
| Summary contains action verbs | +10 |
| **Max** | **100** |

**Score bands on /preview**

- **0–40:** Red — "Needs Work"
- **41–70:** Amber — "Getting There"
- **71–100:** Green — "Strong Resume"
