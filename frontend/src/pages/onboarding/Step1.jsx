import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLogo } from '../../components/Logo'
import SearchableSelect from '../../components/SearchableSelect'

const inputClass =
  'w-full bg-bg-card border border-white/10 rounded-2xl px-4 py-4 text-white text-sm focus:outline-none focus:border-accent-primary transition-colors appearance-none'

const STUDIENORTE = [
  'Bad Homburg vor der Höhe',
  'Bad Nauheim',
  'Bensheim',
  'Darmstadt',
  'Frankfurt am Main',
  'Friedberg (Hessen)',
  'Fulda',
  'Geisenheim',
  'Gießen',
  'Hanau',
  'Idstein',
  'Kassel',
  'Limburg an der Lahn',
  'Marburg',
  'Oberursel (Taunus)',
  'Offenbach am Main',
  'Rüsselsheim am Main',
  'Wetzlar',
  'Wiesbaden',
]

const HOCHSCHULEN = [
  // Staatliche Universitäten
  'Goethe-Universität Frankfurt am Main',
  'TU Darmstadt',
  'Justus-Liebig-Universität Gießen',
  'Philipps-Universität Marburg',
  'Universität Kassel',
  // Staatliche Hochschulen (HAW/FH)
  'Frankfurt University of Applied Sciences',
  'Hochschule Darmstadt',
  'Hochschule RheinMain',
  'Technische Hochschule Mittelhessen (THM)',
  'Hochschule Fulda',
  'Hochschule Geisenheim University',
  'Hochschule für Polizei und Verwaltung Hessen',
  // Kunst- und Musikhochschulen
  'Hochschule für Musik und Darstellende Kunst Frankfurt',
  'Hochschule für Gestaltung Offenbach',
  'Städelschule Frankfurt',
  // Private Hochschulen
  'Frankfurt School of Finance & Management',
  'EBS Universität für Wirtschaft und Recht',
  'Hochschule Fresenius',
  'Wilhelm Büchner Hochschule',
  'DIPLOMA Hochschule',
  'Provadis Hochschule',
  'Andere',
]

const STUDIENGAENGE = [
  // Ingenieurwissenschaften
  'Maschinenbau',
  'Elektrotechnik',
  'Bauingenieurwesen',
  'Wirtschaftsingenieurwesen',
  'Luft- und Raumfahrttechnik',
  'Fahrzeugtechnik',
  'Verfahrenstechnik',
  'Biomedizinische Technik',
  'Umweltingenieurwesen',
  'Mechatronik',
  // Informatik & Mathematik
  'Informatik',
  'Wirtschaftsinformatik',
  'Angewandte Informatik',
  'Medieninformatik',
  'Cybersecurity',
  'Data Science',
  'Mathematik',
  'Statistik',
  // Wirtschaft & Recht
  'BWL',
  'VWL',
  'Finance',
  'Accounting',
  'Marketing',
  'Wirtschaftsrecht',
  'Jura',
  'Steuerrecht',
  // Naturwissenschaften
  'Physik',
  'Chemie',
  'Biologie',
  'Biochemie',
  'Geowissenschaften',
  'Pharmazie',
  'Lebensmitteltechnologie',
  // Medizin & Gesundheit
  'Medizin',
  'Zahnmedizin',
  'Veterinärmedizin',
  'Pflege',
  'Physiotherapie',
  'Ernährungswissenschaften',
  'Public Health',
  // Sozial- & Geisteswissenschaften
  'Psychologie',
  'Soziale Arbeit',
  'Soziologie',
  'Politikwissenschaft',
  'Erziehungswissenschaft / Lehramt',
  'Philosophie',
  'Geschichte',
  'Kommunikationswissenschaft',
  'Sprachwissenschaft / Linguistik',
  'Germanistik',
  'Anglistik',
  // Architektur & Gestaltung
  'Architektur',
  'Stadtplanung',
  'Innenarchitektur',
  'Industriedesign',
  'Kommunikationsdesign',
  'Mediendesign',
  // Kunst, Musik & Medien
  'Kunst',
  'Musik',
  'Film und Fernsehen',
  'Journalismus',
  // Andere
  'Andere',
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
  const [form, setForm] = useState({ hochschule: '', studiengang: '', abschluss: '', semester: '', studienort: '' })

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }))
  const isValid = form.hochschule && form.studiengang && form.abschluss && form.semester && form.studienort

  const handleNext = () => {
    const prev = JSON.parse(localStorage.getItem('ff_onboarding') || '{}')
    localStorage.setItem('ff_onboarding', JSON.stringify({ ...prev, step1: form }))
    navigate('/onboarding/2')
  }

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col md:items-center md:justify-center py-10 px-6">
      <div className="w-full max-w-md">
        <AppLogo height={28} className="mb-4 ml-2" />

        <div className="md:bg-bg-card md:rounded-3xl md:p-8">
          <ProgressBar step={1} />
          <h2 className="text-xl font-bold text-white mb-6">Erzähl uns von deinem Studium</h2>

          <div className="flex flex-col gap-3">
            <SearchableSelect
              value={form.hochschule}
              onChange={(val) => setForm((p) => ({ ...p, hochschule: val }))}
              options={HOCHSCHULEN}
              placeholder="Hochschule"
              className={inputClass}
            />

            <SearchableSelect
              value={form.studiengang}
              onChange={(val) => setForm((p) => ({ ...p, studiengang: val }))}
              options={STUDIENGAENGE}
              placeholder="Studiengang"
              className={inputClass}
            />

            <div className="flex gap-2">
              {['Bachelor', 'Master', 'PhD'].map((deg) => (
                <button
                  key={deg}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, abschluss: deg }))}
                  className={`flex-1 py-4 rounded-2xl text-sm font-medium border transition-colors ${
                    form.abschluss === deg
                      ? 'bg-accent-primary border-accent-primary text-white'
                      : 'bg-bg-card border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  {deg}
                </button>
              ))}
            </div>

            <input type="number" min="1" max="20" placeholder="Aktuelles Semester"
              value={form.semester} onChange={set('semester')} className={inputClass} />

            <SearchableSelect
              value={form.studienort}
              onChange={(val) => setForm((p) => ({ ...p, studienort: val }))}
              options={STUDIENORTE}
              placeholder="Studienort"
              className={inputClass}
            />
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
