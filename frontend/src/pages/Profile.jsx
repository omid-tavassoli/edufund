import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { matchFunding } from '../data/funding'
import SearchableSelect from '../components/SearchableSelect'

const inputClass =
  'bg-bg-primary border border-white/10 rounded-xl px-3 py-1.5 text-white text-sm focus:outline-none focus:border-accent-primary transition-colors w-40 text-right'

const searchableInputClass =
  'bg-bg-primary border border-white/10 rounded-xl px-3 py-1.5 text-white text-sm focus:outline-none focus:border-accent-primary transition-colors w-40'

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
const NATIONALITIES = [
  'Deutsch', 'Österreichisch', 'Schweizerisch', 'Türkisch', 'Polnisch',
  'Russisch', 'Arabisch', 'Persisch', 'Andere',
]

function Section({ title, fields, editing, draft, onChange }) {
  return (
    <div className="mb-5">
      <h2 className="text-white font-semibold mb-3">{title}</h2>
      <div className="bg-bg-card rounded-2xl divide-y divide-white/5">
        {fields.map(({ label, key, value, type, options, searchable, multiline }) => (
          <div key={label} className={`px-4 py-3 gap-2 overflow-hidden ${multiline ? 'flex flex-col' : 'flex justify-between items-center'}`}>
            <p className="text-gray-400 text-sm flex-shrink-0">{label}</p>
            {editing ? (
              options && searchable ? (
                <SearchableSelect
                  value={draft[key] ?? ''}
                  onChange={(val) => onChange(key, val)}
                  options={options}
                  placeholder="Suchen..."
                  className={searchableInputClass}
                />
              ) : options ? (
                <select
                  value={draft[key] ?? ''}
                  onChange={(e) => onChange(key, e.target.value)}
                  className={inputClass}
                >
                  <option value="">—</option>
                  {options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : multiline ? (
                <textarea
                  value={draft[key] ?? ''}
                  onChange={(e) => onChange(key, e.target.value)}
                  rows={3}
                  className="bg-bg-primary border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-primary transition-colors w-full resize-none"
                />
              ) : (
                <input
                  type={type || 'text'}
                  value={draft[key] ?? ''}
                  onChange={(e) => onChange(key, e.target.value)}
                  className={inputClass}
                />
              )
            ) : value ? (
              <p className={`text-white text-sm font-medium ${multiline ? 'whitespace-pre-wrap break-all' : ''}`}>
                {value}
              </p>
            ) : (
              <p className="text-red-400 text-sm font-medium">Fehlend</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Profile() {
  const navigate = useNavigate()

  const profile = useMemo(() => {
    const raw = localStorage.getItem('ff_profile')
    return raw ? JSON.parse(raw) : null
  }, [])

  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({})

  if (!profile) {
    navigate('/', { replace: true })
    return null
  }

  const handleEditStart = () => {
    setDraft({ ...profile })
    setEditing(true)
  }

  const handleSave = () => {
    const updated = { ...profile, ...draft }
    localStorage.setItem('ff_profile', JSON.stringify(updated))
    window.location.reload()
  }

  const handleCancel = () => {
    setDraft({})
    setEditing(false)
  }

  const onChange = (key, value) => setDraft((d) => ({ ...d, [key]: value }))

  const matched = matchFunding(profile)
  const firstName = profile.name?.split(' ')[0] || 'Student'

  const personalFields = [
    { label: 'Name', key: 'name', value: profile.name },
    { label: 'Nationalität', key: 'nationalitaet', value: profile.nationalitaet, options: NATIONALITIES },
    { label: 'Geburtsdatum', key: 'geburtsdatum', value: profile.geburtsdatum, type: 'date' },
    { label: 'Weitere Angaben', key: 'zusatzInfo', value: profile.zusatzInfo, multiline: true },
  ]

  const studyFields = [
    { label: 'Hochschule', key: 'hochschule', value: profile.hochschule, options: HOCHSCHULEN },
    { label: 'Studiengang', key: 'studiengang', value: profile.studiengang, options: STUDIENGAENGE, searchable: true },
    { label: 'Abschluss', key: 'abschluss', value: profile.abschluss, options: ['Bachelor', 'Master', 'PhD'] },
    { label: 'Semester', key: 'semester', value: profile.semester ? `${profile.semester}. Semester` : null },
    { label: 'Studienort', key: 'studienort', value: profile.studienort },
  ]

  const financeFields = [
    { label: 'Wohnsituation', key: 'wohnsituation', value: profile.wohnsituation },
    { label: 'Monatl. Einkommen', key: 'einkommen', value: profile.einkommen ? `${profile.einkommen} €` : null, type: 'number' },
    { label: 'Elterliches Einkommen', key: 'elternEinkommen', value: profile.elternEinkommen ? `${profile.elternEinkommen} €` : null, type: 'number' },
    { label: 'Bestehende Förderung', key: 'vorhandeneFoerderung', value: profile.vorhandeneFoerderung || (profile.hatFoerderung === false ? 'Keine' : null) },
  ]

  const allFields = [...personalFields, ...studyFields, ...financeFields]
  const pct = Math.round((allFields.filter((f) => f.value).length / allFields.length) * 100)

  const activeExtras = [
    profile.auslandsSemester && 'Auslandssemester',
    profile.behinderung && 'Behinderung',
    profile.kinder && 'Kind(er)',
    profile.migrationshintergrund && 'Migrationshintergrund',
    profile.ehrenamt && 'Ehrenamt',
  ].filter(Boolean)

  return (
    <div className="h-full overflow-y-auto pb-16 md:pb-0">
      <div className="max-w-screen-lg mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="pt-8 md:pt-10 pb-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-accent-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="text-accent-primary font-bold text-xl">{firstName[0]}</span>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">{firstName}</h1>
            <p className="text-gray-400 text-sm">
              {[profile.abschluss, profile.studiengang, profile.hochschule].filter(Boolean).join(' · ')}
            </p>
          </div>

        </div>

        {/* Desktop: two-column layout */}
        <div className="md:grid md:grid-cols-5 md:gap-8">
          {/* Left: stats */}
          <div className="md:col-span-2">
            <div className="flex gap-3 mb-3">
              <div className="bg-bg-card rounded-2xl p-4 flex-1 text-center">
                <p className="text-2xl font-bold text-white">{matched.length}</p>
                <p className="text-xs text-gray-500 mt-0.5">Förderungen</p>
              </div>
              <div className="bg-bg-card rounded-2xl p-4 flex-1">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs text-gray-500">Profil</p>
                  <p className="text-xs font-bold text-white">{pct}%</p>
                </div>
                <div className="h-1.5 bg-bg-primary rounded-full overflow-hidden">
                  <div className="h-full bg-accent-primary rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-xs text-gray-500 mt-1.5">vollständig</p>
              </div>
            </div>

            {editing ? (
              <div className="flex gap-2 mb-3">
                <button
                  onClick={handleCancel}
                  className="flex-1 py-3.5 rounded-2xl border border-white/15 text-gray-300 text-sm font-medium active:opacity-70 transition-opacity"
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-3.5 rounded-2xl bg-accent-primary text-white text-sm font-semibold active:opacity-80 transition-opacity"
                >
                  Speichern
                </button>
              </div>
            ) : (
              <button
                onClick={handleEditStart}
                className="w-full py-3.5 rounded-2xl bg-accent-primary text-white text-sm font-semibold active:opacity-80 transition-opacity mb-3"
              >
                Bearbeiten
              </button>
            )}

            {activeExtras.length > 0 && (
              <div className="mb-5">
                <h2 className="text-white font-semibold mb-3">Details</h2>
                <div className="flex flex-wrap gap-2">
                  {activeExtras.map((e) => (
                    <span key={e} className="px-3 py-1.5 rounded-full bg-accent-primary/15 text-accent-secondary text-xs font-medium">
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile.note && (
              <div className="bg-bg-card rounded-2xl px-4 py-3 flex justify-between mb-5">
                <p className="text-gray-400 text-sm">Notendurchschnitt</p>
                <p className="text-white text-sm font-medium">{profile.note}</p>
              </div>
            )}

            <button
              onClick={() => { localStorage.removeItem('ff_profile'); navigate('/', { replace: true }) }}
              className="w-full py-3.5 rounded-2xl border border-red-500/25 text-red-400 text-sm font-medium active:opacity-70 transition-opacity mb-3 md:mb-0"
            >
              Profil zurücksetzen
            </button>
          </div>

          {/* Right: personal + study + finance info */}
          <div className="md:col-span-3">
            <Section title="Persönliche Daten" fields={personalFields} editing={editing} draft={draft} onChange={onChange} />
            <Section title="Studium" fields={studyFields} editing={editing} draft={draft} onChange={onChange} />
            <Section title="Finanzen" fields={financeFields} editing={editing} draft={draft} onChange={onChange} />
          </div>
        </div>
      </div>
    </div>
  )
}
