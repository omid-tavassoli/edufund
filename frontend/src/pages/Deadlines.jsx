import { useMemo } from 'react'
import { matchFunding, getDaysUntil } from '../data/funding'

export default function Deadlines() {
  const profile = useMemo(() => {
    const raw = localStorage.getItem('ff_profile')
    return raw ? JSON.parse(raw) : null
  }, [])

  const programs = useMemo(() => {
    return matchFunding(profile)
      .filter((p) => p.deadline && getDaysUntil(p.deadline) > 0)
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
  }, [profile])

  return (
    <div className="h-full overflow-y-auto pb-16 md:pb-0">
      <div className="max-w-screen-lg mx-auto px-5 md:px-8">
        <div className="pt-8 md:pt-10 pb-6">
          <h1 className="text-2xl font-bold text-white">Meine Fristen</h1>
          <p className="text-gray-400 text-sm mt-1">
            {programs.length} Frist{programs.length !== 1 ? 'en' : ''} in den nächsten Wochen
          </p>
        </div>

        {programs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">Keine bevorstehenden Fristen</p>
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {programs.map((program) => {
              const days = getDaysUntil(program.deadline)
              const deadlineStr = new Date(program.deadline).toLocaleDateString('de-DE', {
                day: 'numeric', month: 'long', year: 'numeric',
              })
              const urgencyColor =
                days <= 7 ? 'text-red-400' : days <= 30 ? 'text-orange-400' : 'text-accent-secondary'

              return (
                <div key={program.id} className="bg-bg-card rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold truncate">{program.name}</h3>
                      <p className="text-gray-500 text-xs mt-0.5">
                        {program.location || program.institution} ·{' '}
                        {program.amountType === 'once'
                          ? `${program.amount} € (einmalig)`
                          : `${program.amount} €/Mo`}
                      </p>
                      <p className="text-gray-400 text-sm mt-3">Frist: {deadlineStr}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className={`text-4xl font-bold ${urgencyColor}`}>{days}</p>
                      <p className="text-gray-500 text-xs mt-0.5">Tage</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
