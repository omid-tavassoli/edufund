import { useState, useRef, useEffect } from 'react'

export default function SearchableSelect({ value, onChange, options, placeholder, className }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  const filtered = query
    ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase()))
    : options

  useEffect(() => {
    const onMouseDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [])

  const select = (option) => {
    onChange(option)
    setOpen(false)
    setQuery('')
  }

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        value={open ? query : value || ''}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setOpen(true)}
        placeholder={open ? 'Suchen...' : placeholder}
        className={className}
        autoComplete="off"
      />
      {open && (
        <div className="absolute z-50 right-0 mt-1 min-w-[240px] w-full bg-bg-card border border-white/10 rounded-2xl shadow-lg overflow-hidden max-h-56 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="px-4 py-3 text-sm text-gray-500">Keine Ergebnisse</p>
          ) : (
            filtered.map((option) => (
              <button
                key={option}
                type="button"
                onMouseDown={() => select(option)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  option === value
                    ? 'text-accent-primary bg-accent-primary/10'
                    : 'text-white hover:bg-white/5'
                }`}
              >
                {option}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
