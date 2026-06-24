import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLogo } from '../../components/Logo'
import { ProgressBar } from './Step1'

export default function Step3() {
  const navigate = useNavigate()
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [note, setNote] = useState('')

  const handleFinish = () => {
    const onboarding = JSON.parse(localStorage.getItem('ff_onboarding') || '{}')
    const s1 = onboarding.step1 || {}
    const s2 = onboarding.step2 || {}

    const profile = {
      name: 'Student',
      hochschule: s1.hochschule || '',
      studiengang: s1.studiengang || '',
      abschluss: s1.abschluss || '',
      semester: parseInt(s1.semester) || 1,
      studienort: s1.studienort || '',
      wohnsituation: s2.wohnsituation || '',
      einkommen: parseFloat(s2.einkommen) || 0,
      elternEinkommen: parseFloat(s2.elternEinkommen) || 0,
      hatFoerderung: s2.hatFoerderung ?? null,
      vorhandeneFoerderung: s2.vorhandeneFoerderung || '',
      zusatzInfo: additionalInfo.trim(),
      note: note ? parseFloat(note) : null,
    }

    localStorage.setItem('ff_profile', JSON.stringify(profile))
    localStorage.removeItem('ff_onboarding')
    navigate('/app/foerderungen', { replace: true })
  }

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col md:items-center md:justify-center py-10 px-6">
      <div className="w-full max-w-md">
        <AppLogo height={28} className="mb-4 ml-2" />

        <div className="md:bg-bg-card md:rounded-3xl md:p-8">
          <ProgressBar step={3} />
          <h2 className="text-xl font-bold text-white mb-1">Erzähl uns mehr über dich</h2>
          <p className="text-sm text-gray-400 mb-6">
            Gibt es etwas, das uns helfen könnte, bessere Förderungen für dich zu finden?
            Z.&nbsp;B. Ehrenamt, Auslandspläne, besondere Umstände …
          </p>

          <div>
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Hier kannst du weitere Angaben machen…"
              rows={4}
              className="w-full bg-bg-input border border-white/10 rounded-2xl px-4 py-4 text-white text-sm focus:outline-none focus:border-accent-primary transition-colors resize-none placeholder:text-gray-600"
            />
            <p className="text-xs text-gray-500 mt-1.5 pl-4">Optional</p>
          </div>

          <div className="mt-4">
            <input
              type="number"
              step="0.1"
              min="1"
              max="5"
              placeholder="Notendurchschnitt"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-bg-input border border-white/10 rounded-2xl px-4 py-4 text-white text-sm focus:outline-none focus:border-accent-primary transition-colors"
            />
            <p className="text-xs text-gray-500 mt-1.5 pl-4">Optional</p>
          </div>

          <button
            onClick={handleFinish}
            className="w-full py-4 rounded-2xl bg-accent-primary text-white font-semibold mt-6 active:opacity-80 transition-opacity"
          >
            Weiter
          </button>
        </div>
      </div>
    </div>
  )
}
