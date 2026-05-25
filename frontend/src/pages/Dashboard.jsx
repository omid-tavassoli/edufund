import { useState, useMemo } from 'react'
import { matchFunding, getDaysUntil } from '../data/funding'
import FundingCard from '../components/FundingCard'

const FILTERS = ['Alle', 'Finanziell', 'Stipendien', 'Ausland']
const filterMap = { Alle: null, Finanziell: 'financial', Stipendien: 'scholarship', Ausland: 'abroad' }

export default function Dashboard() {
  const profile = useMemo(() => {
    const raw = localStorage.getItem('ff_profile')
    return raw ? JSON.parse(raw) : null
  }, [])

  const matched = useMemo(() => matchFunding(profile), [profile])
  const [activeFilter, setActiveFilter] = useState('Alle')

  const filtered =
    activeFilter === 'Alle'
      ? matched
      : matched.filter((p) => p.category === filterMap[activeFilter])

  const maxMonthly = matched
    .filter((p) => p.amountType === 'monthly' && p.status !== 'conditional')
    .reduce((sum, p) => sum + p.amount, 0)

  const deadlineSoon = matched.filter((p) => {
    const d = getDaysUntil(p.deadline)
    return d !== null && d <= 60 && d > 0
  }).length

  const readyCount = matched.filter((p) => p.status === 'ready').length
  const firstName = profile?.name?.split(' ')[0] || 'Student'

  return (
    <div className="h-full overflow-y-auto pb-16 md:pb-0">
      <div className="max-w-screen-lg mx-auto">
        <div className="px-5 md:px-8 pt-8 md:pt-10 pb-4 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Hallo, {firstName}!</p>
            <h1 className="text-xl md:text-2xl font-bold text-white">
              {matched.length} Förderungen passen zu dir
            </h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center">
            <span className="text-accent-primary font-bold">{firstName[0]}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-4 px-5 md:px-8 mb-5">
          <div className="bg-bg-card rounded-2xl p-3 md:p-5 text-center">
            <p className="text-lg md:text-2xl font-bold text-white">{maxMonthly} €</p>
            <p className="text-xs md:text-sm text-gray-500 mt-0.5">Max. pro Monat</p>
          </div>
          <div className="bg-bg-card rounded-2xl p-3 md:p-5 text-center">
            <p className="text-lg md:text-2xl font-bold text-accent-secondary">{deadlineSoon}</p>
            <p className="text-xs md:text-sm text-gray-500 mt-0.5">Fristen bald</p>
          </div>
          <div className="bg-bg-card rounded-2xl p-3 md:p-5 text-center">
            <p className="text-lg md:text-2xl font-bold text-green-400">{readyCount}</p>
            <p className="text-xs md:text-sm text-gray-500 mt-0.5">Bereit</p>
          </div>
        </div>

        <div className="flex gap-2 px-5 md:px-8 mb-4 overflow-x-auto pb-1">
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeFilter === f ? 'bg-accent-primary text-white' : 'bg-bg-card text-gray-400 hover:text-white'
              }`}>
              {f === 'Alle' ? `Alle (${matched.length})` : f}
            </button>
          ))}
        </div>

        <div className="px-5 md:px-8 grid gap-3 md:grid-cols-2 pb-4">
          {filtered.map((program) => (
            <FundingCard key={program.id} program={program} />
          ))}
        </div>
      </div>
    </div>
  )
}
