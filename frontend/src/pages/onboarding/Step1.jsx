import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppWordmark } from '../../components/Logo'

const inputClass =
  'w-full bg-bg-card border border-white/10 rounded-2xl px-4 py-4 text-white text-sm focus:outline-none focus:border-accent-primary transition-colors appearance-none'

const HOCHSCHULEN = [
  'TU Darmstadt', 'LMU München', 'TU München', 'Universität Hamburg',
  'FU Berlin', 'HU Berlin', 'RWTH Aachen', 'Andere',
]

const STUDIENGAENGE = [
  'Informatik', 'Wirtschaftsinformatik', 'Maschinenbau', 'Elektrotechnik',
  'BWL', 'VWL', 'Psychologie', 'Medizin', 'Jura', 'Andere',
]

export function ProgressBar({ step }) {
  return (
    <div className="mb-6">
      <p className="text-xs text-gray-500 mb-2">Schritt {step} von 3</p>
      <div className="flex gap-1.5">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`flex-1 h-1 rounded-full transition-colors ${s <= step ? 'bg-accent-primary' : 'bg-bg-card'}`} />
        ))}
      </div>
    </div>
  )
}

export default function Step1() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ hochschule: '', studiengang: '', semester: '', studienort: '' })

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }))
  const isValid = form.hochschule && form.studiengang && form.semester && form.studienort

  const handleNext = () => {
    const prev = JSON.parse(localStorage.getItem('ff_onboarding') || '{}')
    localStorage.setItem('ff_onboarding', JSON.stringify({ ...prev, step1: form }))
    navigate('/onboarding/2')
  }

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col md:items-center md:justify-center py-10 px-6">
      <div className="w-full max-w-md">
        <AppWordmark className="text-lg mb-8" />

        <div className="md:bg-bg-card md:rounded-3xl md:p-8">
          <ProgressBar step={1} />
          <h2 className="text-xl font-bold text-white mb-6">Erzähl uns von deinem Studium</h2>

          <div className="flex flex-col gap-3">
            <select value={form.hochschule} onChange={set('hochschule')} className={inputClass}>
              <option value="" disabled>Hochschule</option>
              {HOCHSCHULEN.map((h) => <option key={h} value={h}>{h}</option>)}
            </select>

            <select value={form.studiengang} onChange={set('studiengang')} className={inputClass}>
              <option value="" disabled>Studiengang</option>
              {STUDIENGAENGE.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>

            <input type="number" min="1" max="20" placeholder="Aktuelles Semester"
              value={form.semester} onChange={set('semester')} className={inputClass} />

            <input type="text" placeholder="Studienort"
              value={form.studienort} onChange={set('studienort')} className={inputClass} />
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
