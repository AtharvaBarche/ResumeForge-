import { Link, Outlet, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import styles from './AppLayout.module.css'

const navItems = [
  { path: '/', label: 'Home' },
  { href: 'https://jobnotification-three.vercel.app', label: 'Find Jobs' },
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
          {navItems.map((item) => {
            if ('href' in item) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={styles.navLink}
                >
                  {item.label}
                </a>
              )
            }
            return (
              <Link
                key={item.path}
                to={item.path}
                className={location.pathname === item.path ? styles.navLinkActive : styles.navLink}
              >
                {item.label}
              </Link>
            )
          })}
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
