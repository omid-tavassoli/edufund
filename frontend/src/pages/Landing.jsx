import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Stat({ value, label }) {
  return (
    <div className="text-center md:text-left">
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </div>
  )
}

export default function Landing() {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('ff_profile')) {
      navigate('/app/foerderungen', { replace: true })
    }
  }, [navigate])

  const buttons = (
    <div className="flex flex-col gap-3 w-full">
      <button
        onClick={() => navigate('/onboarding/1')}
        className="w-full py-4 rounded-2xl bg-accent-primary text-white font-semibold text-base active:opacity-80 transition-opacity"
      >
        Jetzt starten
      </button>
      <button
        onClick={() => navigate('/app/foerderungen')}
        className="w-full py-4 rounded-2xl border border-white/15 text-white font-semibold text-base active:opacity-80 transition-opacity"
      >
        Ich habe schon ein Konto
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col md:flex-row">
      {/* Left / mobile: branding */}
      <div className="flex-1 flex flex-col items-center md:items-start justify-center px-8 md:px-16 pt-16 pb-8 md:py-20 text-center md:text-left">
        <img src="/edufund_20.png" alt="EduFund" className="h-14 w-auto" />

        <div className="w-12 h-px bg-accent-primary my-8" />

        <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-4">
          Deine Förderungen,<br />auf einen Blick
        </h2>

        <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-sm">
          Wir zeigen dir welche Stipendien, BAföG und Unterstützungen
          dir wirklich zustehen — in 2 Minuten.
        </p>

        <div className="flex gap-10 mt-10">
          <Stat value="50+" label="Förderprogramme" />
          <Stat value="2 min" label="Profil erstellen" />
          <Stat value="kostenlos" label="Immer" />
        </div>

        <div className="md:hidden mt-10 w-full">{buttons}</div>
      </div>

      {/* Right panel: desktop only */}
      <div className="hidden md:flex items-center justify-center w-96 px-10 border-l border-white/5 bg-bg-secondary">
        <div className="w-full bg-bg-card rounded-3xl p-8">
          <img src="/edufund_20.png" alt="EduFund" className="h-9 w-auto" />
          <h3 className="text-white font-bold text-xl mt-4 mb-1">Jetzt beginnen</h3>
          <p className="text-gray-400 text-sm mb-6">Profil in 2 Minuten erstellen und passende Förderungen finden.</p>
          {buttons}
        </div>
      </div>
    </div>
  )
}
