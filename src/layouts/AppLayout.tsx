import { Link, Outlet, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import styles from './AppLayout.module.css'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/jobs', label: 'Find Jobs' },
  { path: '/applications', label: 'Saved' },
  { path: '/analyze', label: 'Analyze' },
  { path: '/settings', label: 'Settings' },
] as const

export function AppLayout() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={styles.layout}>
      <header className={`${styles.topNav} no-print`}>
        <Link to="/" className={styles.brand}>
          <span className={styles.logoIcon}>A</span>
          ResumeForge
        </Link>
        <nav className={styles.nav}>
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={location.pathname === path ? styles.navLinkActive : styles.navLink}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className={styles.headerRight}>
          <button
            type="button"
            className={styles.themeToggle}
            onClick={toggleTheme}
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <Link to="/builder" className={styles.ctaButton}>
            BUILD RESUME
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
