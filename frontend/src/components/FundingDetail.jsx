import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDeadline, getDaysUntil } from '../data/funding'

export default function FundingDetail({ program, onClose }) {
  const navigate = useNavigate()

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const days = getDaysUntil(program.deadline)

  const handleAssistant = () => {
    const prompt =
      `Hilf mir bitte beim Beantragen des ${program.name}. ` +
      `Es handelt sich um ${program.amountType === 'monthly' ? `bis zu ${program.amount} €/Monat` : `${program.amount} € (einmalig)`}` +
      (program.deadline ? `, die Frist ist der ${formatDeadline(program.deadline)}` : '') +
      `. Was muss ich genau tun und welche Unterlagen brauche ich?`
    onClose()
    navigate('/app/assistent', { state: { prompt } })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Card */}
      <div className="relative bg-bg-card w-full md:max-w-lg md:mx-4 rounded-t-3xl md:rounded-3xl max-h-[88vh] overflow-y-auto">
        {/* Drag handle (mobile) */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        <div className="px-6 pt-4 pb-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <h2 className="text-xl font-bold text-white">{program.name}</h2>
              <p className="text-gray-400 text-sm mt-0.5">{program.institution}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 hover:bg-white/15 transition-colors mt-0.5"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Amount + deadline chips */}
          <div className="flex gap-3 mb-6">
            <div className="bg-accent-primary/10 rounded-2xl px-4 py-3 flex-1">
              <p className="text-xs text-gray-400 mb-0.5">Förderung</p>
              <p className="text-white font-bold">
                {program.amountType === 'once'
                  ? `${program.amount} €`
                  : `bis ${program.amount} €/Mo`}
              </p>
            </div>
            {program.deadline ? (
              <div className={`rounded-2xl px-4 py-3 flex-1 ${days !== null && days <= 30 ? 'bg-orange-400/10' : 'bg-white/5'}`}>
                <p className="text-xs text-gray-400 mb-0.5">Frist</p>
                <p className={`font-bold text-sm ${days !== null && days <= 30 ? 'text-orange-400' : 'text-white'}`}>
                  {formatDeadline(program.deadline)}
                  {days !== null && <span className="text-xs font-normal text-gray-400 ml-1">({days}d)</span>}
                </p>
              </div>
            ) : (
              <div className="bg-white/5 rounded-2xl px-4 py-3 flex-1">
                <p className="text-xs text-gray-400 mb-0.5">Frist</p>
                <p className="text-white font-bold text-sm">Laufend</p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-2">Über diese Förderung</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{program.description}</p>
          </div>

          {/* Requirements */}
          <div className="mb-8">
            <h3 className="text-white font-semibold mb-3">Benötigte Unterlagen</h3>
            <ul className="flex flex-col gap-2">
              {program.requirements.map((req, i) => (
                <li key={i} className="flex gap-2.5 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-primary flex-shrink-0 mt-1.5" />
                  <span className="text-gray-400 text-sm leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => { onClose(); navigate('/app/fristen', { state: { openId: program.id } }) }}
              className="w-full py-4 rounded-2xl bg-accent-primary text-white font-semibold text-sm active:opacity-80 transition-opacity"
            >
              Automatik Bewerben
            </button>
            <button
              onClick={handleAssistant}
              className="w-full py-4 rounded-2xl border border-accent-primary/40 text-accent-secondary font-semibold text-sm active:opacity-80 transition-opacity"
            >
              Mit KI Assistent beantragen
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
