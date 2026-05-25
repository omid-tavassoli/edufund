export function AppIcon({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#3b82f6" />
      <polygon points="32,13 48,22 32,31 16,22" fill="white" />
      <line x1="48" y1="22" x2="48" y2="33" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="48" cy="36" r="3" fill="white" />
      <path d="M18 24 L18 33 C18 38 24 42 32 42 C40 42 46 38 46 33 L46 24"
        fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function AppWordmark({ className = 'text-xl' }) {
  return (
    <span className={`font-bold ${className}`}>
      <span className="text-white">edu</span>
      <span className="text-accent-primary">fund</span>
    </span>
  )
}

export function AppLogo({ iconSize = 40, textClass = 'text-2xl' }) {
  return (
    <div className="flex items-center gap-3">
      <AppIcon size={iconSize} />
      <AppWordmark className={textClass} />
    </div>
  )
}
