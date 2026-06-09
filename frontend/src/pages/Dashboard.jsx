import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { matchFunding, getDaysUntil, formatDeadline } from '../data/funding'
import FundingCard from '../components/FundingCard'
import FundingDetail from '../components/FundingDetail'

export default function Dashboard() {
  const profile = useMemo(() => {
    const raw = localStorage.getItem('ff_profile')
    return raw ? JSON.parse(raw) : null
  }, [])

  const matched = useMemo(() => matchFunding(profile), [profile])
  const firstName = profile?.name?.split(' ')[0] || 'Student'
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()

  const deadlines = useMemo(() =>
    matched
      .filter((p) => p.deadline && getDaysUntil(p.deadline) > 0)
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline)),
  [matched])

  return (
    <div className="h-full overflow-y-auto pb-16 md:pb-0">
      <div className="max-w-screen-lg mx-auto">
        <div className="px-5 md:px-8 pt-8 md:pt-10 pb-6 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Hallo, {firstName}!</p>
            <h1 className="text-xl md:text-2xl font-bold text-white">
              {matched.length} Förderungen passen zu dir
            </h1>
            <p className="text-gray-500 text-xs mt-1">Klicke auf eine Förderung für mehr Details</p>
          </div>
          <button
            onClick={() => navigate('/app/profil')}
            className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center hover:bg-accent-primary/30 transition-colors"
          >
            <span className="text-accent-primary font-bold">{firstName[0]}</span>
          </button>
        </div>

        <div className="px-5 md:px-8 flex flex-col gap-2 pb-6">
          {matched.map((program) => (
            <FundingCard key={program.id} program={program} onClick={() => setSelected(program)} />
          ))}
        </div>

        {deadlines.length > 0 && (
          <div className="px-5 md:px-8 pb-8">
            <h2 className="text-white font-semibold mb-3">Fristen</h2>
            <div className="flex flex-col gap-2">
              {deadlines.map((program) => {
                const days = getDaysUntil(program.deadline)
                const urgency =
                  days <= 7 ? 'text-red-400' : days <= 30 ? 'text-orange-400' : 'text-accent-secondary'
                return (
                  <div
                    key={program.id}
                    className="bg-bg-card rounded-2xl px-4 py-3 flex items-center gap-4"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-white text-sm font-semibold truncate">{program.name}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{formatDeadline(program.deadline)}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className={`text-2xl font-bold leading-none ${urgency}`}>{days}</p>
                      <p className="text-gray-500 text-xs mt-0.5">Tage</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {selected && (
        <FundingDetail program={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
