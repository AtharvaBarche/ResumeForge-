import { Routes, Route, Navigate } from 'react-router-dom'
import { RBProvider } from './context/RBContext'
import { ResumeProvider } from './context/ResumeContext'
import { TemplateProvider } from './context/TemplateContext'
import { ThemeProvider } from './context/ThemeContext'
import { ReadinessProvider } from './context/ReadinessContext'
import { PremiumLayout } from './layouts/PremiumLayout'
import { AppLayout } from './layouts/AppLayout'
import { HomePage } from './pages/HomePage'
import { BuilderPage } from './pages/BuilderPage'
import { PreviewPage } from './pages/PreviewPage'
import { ProofPage } from './pages/ProofPage'
import { JobsPage } from './pages/JobsPage'
import { AnalyzePage } from './pages/AnalyzePage'
import { ResumePage } from './pages/ResumePage'
import { ApplicationsPage } from './pages/ApplicationsPage'
import { DashboardPage } from './pages/DashboardPage'
import { SettingsPage } from './pages/SettingsPage'
import { RBProofPage } from './pages/rb/RBProofPage'
import { RBStepPage } from './pages/rb/RBStepPage'

const RB_STEP_ROUTES = [
  '01-problem',
  '02-market',
  '03-architecture',
  '04-hld',
  '05-lld',
  '06-build',
  '07-test',
  '08-ship',
] as const

function App() {
  return (
    <ResumeProvider>
      <TemplateProvider>
        <ThemeProvider>
          <ReadinessProvider>
            <RBProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="builder" element={<BuilderPage />} />
            <Route path="preview" element={<PreviewPage />} />
            <Route path="jobs" element={<JobsPage />} />
            <Route path="analyze" element={<AnalyzePage />} />
            <Route path="resume" element={<ResumePage />} />
            <Route path="applications" element={<ApplicationsPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="proof" element={<ProofPage />} />
          </Route>
          <Route path="/rb" element={<PremiumLayout />}>
            <Route index element={<Navigate to="/rb/01-problem" replace />} />
            <Route path="proof" element={<RBProofPage />} />
            {RB_STEP_ROUTES.map((step) => (
              <Route
                key={step}
                path={step}
                element={<RBStepPage stepId={step} />}
              />
            ))}
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
          </RBProvider>
          </ReadinessProvider>
        </ThemeProvider>
      </TemplateProvider>
    </ResumeProvider>
  )
}

export default App
