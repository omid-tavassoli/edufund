import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppWordmark } from '../../components/Logo'
import { ProgressBar } from './Step1'

const inputClass =
  'w-full bg-bg-card border border-white/10 rounded-2xl px-4 py-4 text-white text-sm focus:outline-none focus:border-accent-primary transition-colors appearance-none'

const WOHNSITUATIONEN = ['Bei den Eltern', 'Eigene Wohnung', 'WG', 'Studentenwohnheim']

export default function Step2() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ wohnsituation: '', einkommen: '', elternEinkommen: '', hatFoerderung: null, vorhandeneFoerderung: '' })

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }))
  const isValid = form.wohnsituation

  const handleNext = () => {
    const prev = JSON.parse(localStorage.getItem('ff_onboarding') || '{}')
    localStorage.setItem('ff_onboarding', JSON.stringify({ ...prev, step2: form }))
    navigate('/onboarding/3')
  }

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col md:items-center md:justify-center py-10 px-6">
      <div className="w-full max-w-md">
        <AppWordmark className="text-lg mb-8" />

        <div className="md:bg-bg-card md:rounded-3xl md:p-8">
          <ProgressBar step={2} />
          <h2 className="text-xl font-bold text-white mb-6">Deine finanzielle Situation</h2>

          <div className="flex flex-col gap-3">
            <select value={form.wohnsituation} onChange={set('wohnsituation')} className={inputClass}>
              <option value="" disabled>Wohnsituation</option>
              {WOHNSITUATIONEN.map((w) => <option key={w} value={w}>{w}</option>)}
            </select>

            <div>
              <div className="relative">
                <input type="number" placeholder="Monatliches Nettoeinkommen (Nebenjob etc.)"
                  value={form.einkommen} onChange={set('einkommen')} className={`${inputClass} pr-8`} />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">€</span>
              </div>
              <p className="text-xs text-gray-500 mt-1.5 pl-4">Optional</p>
            </div>

            <div>
              <div className="relative">
                <input type="number" placeholder="Elterliches Einkommen (ungefähr)"
                  value={form.elternEinkommen} onChange={set('elternEinkommen')} className={`${inputClass} pr-8`} />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">€</span>
              </div>
              <p className="text-xs text-gray-500 mt-1.5 pl-4">Optional</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm mb-2">Erhältst du bereits eine Förderung?</p>
              <div className="flex gap-2">
                {[{ val: true, label: 'Ja' }, { val: false, label: 'Nein' }].map(({ val, label }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, hatFoerderung: val, vorhandeneFoerderung: val ? p.vorhandeneFoerderung : '' }))}
                    className={`flex-1 py-4 rounded-2xl text-sm font-medium border transition-colors ${
                      form.hatFoerderung === val
                        ? 'bg-accent-primary border-accent-primary text-white'
                        : 'bg-bg-card border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {form.hatFoerderung === true && (
                <input
                  type="text"
                  placeholder="Welche Förderung? (z. B. BAföG, Stipendium …)"
                  value={form.vorhandeneFoerderung}
                  onChange={set('vorhandeneFoerderung')}
                  className={`${inputClass} mt-2`}
                />
              )}
              <p className="text-xs text-gray-500 mt-1.5 pl-4">Optional</p>
            </div>
          </div>

          <button onClick={handleNext} disabled={!isValid}
            className="w-full py-4 rounded-2xl bg-accent-primary text-white font-semibold mt-6 disabled:opacity-30 transition-opacity">
            Weiter
          </button>
        </div>
      </div>
    </div>
  )
}
