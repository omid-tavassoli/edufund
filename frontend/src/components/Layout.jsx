import { NavLink, Outlet } from 'react-router-dom'
import { AppLogo } from './Logo'

function HomeIcon({ active, className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2.5 : 1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
}

function BotIcon({ active, className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
      {/* Chat bubble */}
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M21 15a2 2 0 01-2 2H8l-4 4V5a2 2 0 012-2h13a2 2 0 012 2v10z" />
      {/* Gemini 4-pointed star */}
      <path
        d="M12 6.5 C12.8 8.2 14.5 9.5 16.5 10 C14.5 10.5 12.8 11.8 12 13.5 C11.2 11.8 9.5 10.5 7.5 10 C9.5 9.5 11.2 8.2 12 6.5 Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  )
}

function AutoIcon({ active, className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 16l2 2 4-4" />
    </svg>
  )
}

function UserIcon({ active, className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2.5 : 1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )
}

const navItems = [
  { path: '/app/foerderungen', label: 'Förderungen', Icon: HomeIcon },
  { path: '/app/assistent', label: 'KI Assistent', Icon: BotIcon },
  { path: '/app/fristen', label: 'Auto Bewerbung', Icon: AutoIcon },
  { path: '/app/profil', label: 'Profil', Icon: UserIcon },
]

export default function Layout() {
  return (
    <div className="flex h-screen">
      {/* Desktop left sidebar */}
      <nav className="hidden md:flex flex-col w-56 flex-shrink-0 bg-bg-secondary border-r border-white/5">
        <div className="px-5 py-6">
          <AppLogo height={28} />
        </div>

        <div className="flex flex-col gap-1 px-3 mt-2">
          {navItems.map(({ path, label, Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-accent-primary/10 text-accent-primary'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon active={isActive} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Content area */}
      <div className="flex flex-col flex-1 min-w-0">
        <main className="flex-1 min-h-0 overflow-hidden">
          <Outlet />
        </main>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg-secondary border-t border-white/5 flex">
          {navItems.map(({ path, label, Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center py-2 gap-0.5 text-xs transition-colors ${
                  isActive ? 'text-accent-primary' : 'text-gray-500'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon active={isActive} className="w-6 h-6" />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}
