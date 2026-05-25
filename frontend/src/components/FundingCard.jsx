import { getDaysUntil, formatDeadline } from '../data/funding'

const barColor = {
  ready: 'bg-green-400',
  deadline: 'bg-orange-400',
  conditional: 'bg-yellow-400',
  matching: 'bg-accent-primary',
}

const badgeStyle = {
  ready: 'text-green-400 bg-green-400/10',
  deadline: 'text-orange-400 bg-orange-400/10',
  conditional: 'text-yellow-400 bg-yellow-400/10',
  matching: 'text-blue-400 bg-blue-400/10',
}

const statusLabel = {
  ready: 'Bereit',
  deadline: 'Frist',
  conditional: null,
  matching: 'Passend',
}

export default function FundingCard({ program }) {
  const days = getDaysUntil(program.deadline)
  const bar = barColor[program.status] || barColor.matching
  const badge = badgeStyle[program.status] || badgeStyle.matching
  const label = program.condition || statusLabel[program.status]

  return (
    <div className="bg-bg-card rounded-2xl p-4 flex items-center gap-3">
      <div className={`w-1.5 h-12 rounded-full flex-shrink-0 ${bar}`} />

      <div className="flex-1 min-w-0">
        <div className="mb-1">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge}`}>
            {label}
            {program.status === 'deadline' && days !== null && ` · ${days}d`}
          </span>
        </div>
        <p className="text-white font-semibold text-sm truncate">{program.name}</p>
        {program.deadline && (
          <p className="text-gray-500 text-xs mt-0.5">
            Frist: {formatDeadline(program.deadline)}
          </p>
        )}
      </div>

      <div className="text-right flex-shrink-0">
        <p className="text-white font-bold text-sm">
          {program.amountType === 'once'
            ? `${program.amount} €`
            : `bis ${program.amount} €`}
        </p>
        <p className="text-gray-500 text-xs">
          {program.amountType === 'monthly' ? '/Mo' : 'einmalig'}
        </p>
      </div>
    </div>
  )
}
