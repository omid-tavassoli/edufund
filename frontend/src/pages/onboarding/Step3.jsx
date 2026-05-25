import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppWordmark } from '../../components/Logo'
import { ProgressBar } from './Step1'

const EXTRAS = [
  { key: 'auslandsSemester', label: 'Auslandssemester geplant' },
  { key: 'behinderung', label: 'Behinderung / chron. Erkrankung' },
  { key: 'kinder', label: 'Kind(er)' },
  { key: 'migrationshintergrund', label: 'Migrationshintergrund' },
  { key: 'ehrenamt', label: 'Ehrenamtlich aktiv' },
]

export default function Step3() {
  const navigate = useNavigate()
  const [extras, setExtras] = useState([])
  const [note, setNote] = useState('')

  const toggle = (key) =>
    setExtras((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))

  const handleFinish = () => {
    const onboarding = JSON.parse(localStorage.getItem('ff_onboarding') || '{}')
    const s1 = onboarding.step1 || {}
    const s2 = onboarding.step2 || {}

    const profile = {
      name: 'Student',
      hochschule: s1.hochschule || '',
      studiengang: s1.studiengang || '',
      semester: parseInt(s1.semester) || 1,
      studienort: s1.studienort || '',
      wohnsituation: s2.wohnsituation || '',
      einkommen: parseFloat(s2.einkommen) || 0,
      elternEinkommen: parseFloat(s2.elternEinkommen) || 0,
      auslandsSemester: extras.includes('auslandsSemester'),
      behinderung: extras.includes('behinderung'),
      kinder: extras.includes('kinder'),
      migrationshintergrund: extras.includes('migrationshintergrund'),
      ehrenamt: extras.includes('ehrenamt'),
      note: note ? parseFloat(note) : null,
    }

    localStorage.setItem('ff_profile', JSON.stringify(profile))
    localStorage.removeItem('ff_onboarding')
    navigate('/app/foerderungen', { replace: true })
  }

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col md:items-center md:justify-center py-10 px-6">
      <div className="w-full max-w-md">
        <AppWordmark className="text-lg mb-8" />

        <div className="md:bg-bg-card md:rounded-3xl md:p-8">
          <ProgressBar step={3} />
          <h2 className="text-xl font-bold text-white mb-1">Noch ein paar Details</h2>
          <p className="text-sm text-gray-400 mb-6">Trifft auf dich zu? (mehrere möglich)</p>

          <div className="flex flex-wrap gap-2 mb-5">
            {EXTRAS.map(({ key, label }) => (
              <button key={key} onClick={() => toggle(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  extras.includes(key)
                    ? 'bg-accent-primary border-accent-primary text-white'
                    : 'bg-transparent border-white/15 text-gray-400'
                }`}>
                {label}
              </button>
            ))}
          </div>

          <input type="number" step="0.1" min="1" max="5"
            placeholder="Notendurchschnitt (optional)"
            value={note} onChange={(e) => setNote(e.target.value)}
            className="w-full bg-bg-input border border-white/10 rounded-2xl px-4 py-4 text-white text-sm focus:outline-none focus:border-accent-primary transition-colors" />

          <button onClick={handleFinish}
            className="w-full py-4 rounded-2xl bg-accent-primary text-white font-semibold mt-6 active:opacity-80 transition-opacity">
            Weiter
          </button>
        </div>
      </div>
    </div>
  )
}
