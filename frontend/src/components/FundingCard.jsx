import { formatDeadline } from '../data/funding'

export default function FundingCard({ program, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-bg-card rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:bg-white/5 transition-colors"
    >
      <div className="w-1.5 h-12 rounded-full flex-shrink-0 bg-accent-primary" />

      <div className="flex-1 min-w-0">
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
