import { useMemo, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { matchFunding, getDaysUntil, formatDeadline } from '../data/funding'

const roadmaps = {
  bafog: [
    {
      title: 'Berechtigung prüfen',
      desc: 'Nutze den BAföG-Rechner auf bafoeg-rechner.de. Entscheidend sind Elterneinkommen, eigenes Einkommen/Vermögen und Wohnsituation.',
    },
    {
      title: 'Studentenwerk finden',
      desc: 'Dein zuständiges Studentenwerk richtet sich nach dem Hochschulort. Suche es unter studentenwerke.de.',
    },
    {
      title: 'Unterlagen sammeln',
      desc: 'Formblatt 01–03, Immatrikulationsbescheinigung (§ 9-Bescheinigung), Einkommensteuerbescheid der Eltern (vorletztes Jahr), eigene Kontoauszüge, Mietvertrag.',
    },
    {
      title: 'Antrag ausfüllen',
      desc: 'Formulare auf mein-bafoeg.de ausfüllen. Ab dem 5. Semester zusätzlich Formblatt 05 (Leistungsnachweis nach § 48 BAföG) erforderlich.',
    },
    {
      title: 'Antrag einreichen',
      desc: 'Alle Unterlagen vollständig beim Studentenwerk einreichen – persönlich, per Post oder digital. Kopien aller Dokumente behalten.',
    },
    {
      title: 'Bearbeitung abwarten',
      desc: 'Bearbeitungszeit ca. 3–6 Monate. Das Studentenwerk kann Rückfragen stellen. BAföG wird rückwirkend ab dem Antragsmonat ausgezahlt.',
    },
    {
      title: 'Bescheid erhalten',
      desc: 'Bewilligungs- oder Ablehnungsbescheid. Bei Ablehnung: innerhalb eines Monats Widerspruch möglich.',
    },
  ],
  deutschlandstipendium: [
    {
      title: 'Hochschulfrist prüfen',
      desc: 'Jede Hochschule hat eine eigene Frist. Prüfe auf deutschlandstipendium.de deine Hochschule – typisch März–Mai oder Oktober–November.',
    },
    {
      title: 'Motivationsschreiben verfassen',
      desc: 'Schreibe 1–2 Seiten: akademische Ziele, persönlicher Hintergrund, soziales Engagement. Konkret und authentisch formulieren.',
    },
    {
      title: 'Lebenslauf erstellen',
      desc: 'Vollständiger CV mit Noten, Praktika, Ehrenamt, Auszeichnungen und besonderen Qualifikationen.',
    },
    {
      title: 'Unterlagen zusammenstellen',
      desc: 'Notenauszug mit Einzelnoten, Motivationsschreiben, Lebenslauf, Nachweise für Engagement/Preise.',
    },
    {
      title: 'Bewerbung über Hochschulportal einreichen',
      desc: 'Bewerbung digital über das Bewerbungsportal der eigenen Hochschule einreichen.',
    },
    {
      title: 'Auswahlverfahren',
      desc: 'Manche Hochschulen führen Auswahlgespräche durch, andere entscheiden rein auf Basis der Unterlagen. Entscheidung nach 4–8 Wochen.',
    },
    {
      title: 'Stipendium erhalten',
      desc: '300 €/Monat für zunächst ein Jahr, verlängerbar. Auszahlung monatlich.',
    },
  ],
  wohngeld: [
    {
      title: 'Berechtigung prüfen',
      desc: 'Eigenes Mietverhältnis vorhanden? BAföG-Ablehnungsbescheid vorhanden? Oder Ausnahmefall: Zweitstudium, Förderhöchstalter überschritten, Beurlaubung?',
    },
    {
      title: 'Mietbescheinigung vom Vermieter',
      desc: 'Bitte deinen Vermieter, eine Mietbescheinigung auszufüllen (Wohnungsgröße, Baujahr, monatliche Miete). Formular gibt es beim Wohnungsamt.',
    },
    {
      title: 'Unterlagen sammeln',
      desc: 'Personalausweis, Mietvertrag, Mietbescheinigung, Einkommensnachweise aller Haushaltsmitglieder, BAföG-Ablehnungsbescheid.',
    },
    {
      title: 'Zuständige Wohngeldbehörde finden',
      desc: 'Beim Wohnungsamt, Sozialamt oder der Stadtverwaltung deines Wohnorts. Online suchen nach „Wohngeldbehörde [Stadt]".',
    },
    {
      title: 'Antrag stellen',
      desc: 'Persönlich, per Post oder in manchen Städten online einreichen. Antrag ist kostenlos.',
    },
    {
      title: 'Bearbeitungszeit',
      desc: 'Ca. 1–2 Monate. Wohngeld wird rückwirkend ab Antragsmonat gewährt.',
    },
    {
      title: 'Regelmäßig verlängern',
      desc: 'Wohngeld wird für 12–24 Monate bewilligt. Verlängerungsantrag rechtzeitig vor Ablauf stellen.',
    },
  ],
  daad: [
    {
      title: 'Gasthochschule auswählen',
      desc: 'Wähle eine Gasthochschule im Ausland. Nutze den DAAD-Hochschulkompass oder die Partnerliste deiner Hochschule.',
    },
    {
      title: 'Sprachnachweis sichern',
      desc: 'Buche frühzeitig einen Sprachtest (max. 3 Jahre alt). Englisch: IELTS ≥6.0 oder TOEFL iBT ≥80. Deutsch: TestDaF ≥4×4 oder DSH-2.',
    },
    {
      title: 'Empfehlungsschreiben besorgen',
      desc: 'Bitte zwei Hochschulprofessoren um Empfehlungsschreiben auf dem offiziellen DAAD-Formular. Plane 4–6 Wochen Vorlaufzeit.',
    },
    {
      title: 'Studienplan erstellen',
      desc: 'Detaillierter Plan (max. 5 Seiten): geplante Kurse an der Gasthochschule, Begründung der Hochschulwahl, Einbettung ins Studium.',
    },
    {
      title: 'Motivationsschreiben verfassen',
      desc: 'Präzises, faktenbasiertes Schreiben mit akademischen und persönlichen Gründen für den Auslandsaufenthalt.',
    },
    {
      title: 'Online-Bewerbung auf mydaad.de',
      desc: 'Frist je nach Zielregion, i.d.R. September–Oktober. Alle Dokumente digital hochladen.',
    },
    {
      title: 'Nominierung durch Hochschule',
      desc: 'Einige Programme erfordern eine Vorauswahl durch das International Office deiner Hochschule. Vorab informieren.',
    },
    {
      title: 'DAAD-Entscheidung abwarten',
      desc: 'Auswahlverfahren dauert ca. 3–4 Monate. Bei Auswahl formelles Zusageschreiben.',
    },
    {
      title: 'Vorbereitung & Abreise',
      desc: 'Visum beantragen, Unterkunft organisieren, Gasthochschule kontaktieren, Auslandskrankenversicherung abschließen.',
    },
  ],
  'abschluss-tu-da': [
    {
      title: 'Berechtigung prüfen',
      desc: 'Nur für internationale Studierende der TU Darmstadt in der Abschlussphase. Bewerbungsfenster: 1.–15. April und 1.–15. Oktober.',
    },
    {
      title: 'Abschlussarbeit anmelden',
      desc: 'Melde deine Abschlussarbeit an – oder plane die Anmeldung innerhalb der nächsten 6 Monate. Absprache mit Betreuer erforderlich.',
    },
    {
      title: 'Gutachten vom Betreuer',
      desc: 'Bitte deinen TU-Betreuer, ein akademisches Gutachten auf dem offiziellen TU/DAAD-Formular auszufüllen. Vorlaufzeit: 2–3 Wochen.',
    },
    {
      title: 'Offizielle Notenübersicht',
      desc: 'Hole eine offizielle Notenübersicht beim Studierendensekretariat der TU Darmstadt (kein TUCaN-Ausdruck).',
    },
    {
      title: 'Online-Antrag ausfüllen',
      desc: 'Antrag im TU-Bewerbungsportal ausfüllen, ausdrucken und unterschreiben.',
    },
    {
      title: 'Unterlagen einreichen',
      desc: 'Unterschriebener Antrag, Notenübersicht, Gutachten und Immatrikulationsbescheinigung im Dezernat VIII der TU Darmstadt abgeben.',
    },
    {
      title: 'Entscheidung erhalten',
      desc: 'Entscheidung ca. 2–4 Wochen nach Ende des Antragsfensters. Bei Zusage beginnt Förderung im darauffolgenden Monat.',
    },
  ],
}

function RoadmapModal({ program, onClose }) {
  const steps = roadmaps[program.id] || []
  const days = getDaysUntil(program.deadline)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-bg-card w-full md:max-w-lg md:mx-4 rounded-t-3xl md:rounded-3xl max-h-[88vh] overflow-y-auto">
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        <div className="px-6 pt-4 pb-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h2 className="text-xl font-bold text-white">{program.name}</h2>
              {program.deadline && (
                <p className={`text-sm mt-0.5 font-medium ${days !== null && days <= 30 ? 'text-orange-400' : 'text-accent-secondary'}`}>
                  Frist: {formatDeadline(program.deadline)}
                  {days !== null && <span className="text-gray-500 font-normal ml-1">({days} Tage)</span>}
                </p>
              )}
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

          <p className="text-gray-500 text-xs mb-6">{steps.length} Schritte bis zur erfolgreichen Bewerbung</p>

          {/* Roadmap */}
          <div className="flex flex-col">
            {steps.map((step, i) => {
              const isLast = i === steps.length - 1
              return (
                <div key={i} className="flex gap-4">
                  {/* Step indicator + line */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-accent-primary/20 border-2 border-accent-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-accent-primary text-xs font-bold">{i + 1}</span>
                    </div>
                    {!isLast && <div className="w-0.5 bg-white/10 flex-1 my-1 min-h-[20px]" />}
                  </div>

                  {/* Content */}
                  <div className={`pb-6 min-w-0 flex-1 ${isLast ? '' : ''}`}>
                    <p className="text-white font-semibold text-sm leading-tight">{step.title}</p>
                    <p className="text-gray-400 text-xs leading-relaxed mt-1">{step.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AutoBewerbung() {
  const profile = useMemo(() => {
    const raw = localStorage.getItem('ff_profile')
    return raw ? JSON.parse(raw) : null
  }, [])

  const programs = useMemo(() => {
    const matched = matchFunding(profile)
    const withDeadline = matched
      .filter((p) => p.deadline && getDaysUntil(p.deadline) > 0)
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    const withoutDeadline = matched.filter((p) => !p.deadline || getDaysUntil(p.deadline) <= 0)
    return [...withDeadline, ...withoutDeadline]
  }, [profile])

  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const openId = location.state?.openId
    if (openId) {
      const program = programs.find((p) => p.id === openId)
      if (program) setSelected(program)
    }
  }, [location.state, programs])

  return (
    <div className="h-full overflow-y-auto pb-16 md:pb-0">
      <div className="max-w-screen-lg mx-auto px-5 md:px-8">
        <div className="pt-8 md:pt-10 pb-6">
          <h1 className="text-xl md:text-2xl font-bold text-white">Automatik Bewerbung</h1>
          <p className="text-gray-500 text-sm mt-1">
            Klicke auf eine Förderung, um den Bewerbungsprozess als Roadmap zu sehen
          </p>
        </div>

        {programs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-sm">Keine bevorstehenden Fristen</p>
            <button
              onClick={() => navigate('/app/foerderungen')}
              className="mt-4 px-4 py-2 rounded-xl bg-accent-primary/10 text-accent-secondary text-sm"
            >
              Zu den Förderungen
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {programs.map((program) => {
              const days = getDaysUntil(program.deadline)
              const hasDeadline = days !== null && days > 0
              const urgency =
                days <= 7 ? 'text-red-400' : days <= 30 ? 'text-orange-400' : 'text-accent-secondary'
              const steps = roadmaps[program.id]?.length ?? 0
              return (
                <div
                  key={program.id}
                  onClick={() => setSelected(program)}
                  className="bg-bg-card rounded-2xl px-4 py-4 flex items-center gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div className="w-1.5 h-12 rounded-full bg-accent-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{program.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {hasDeadline ? formatDeadline(program.deadline) : 'Laufend'} · {steps} Schritte
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {hasDeadline ? (
                      <>
                        <p className={`text-2xl font-bold leading-none ${urgency}`}>{days}</p>
                        <p className="text-gray-500 text-xs mt-0.5">Tage</p>
                      </>
                    ) : (
                      <p className="text-gray-500 text-xs font-medium">Keine Frist</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {selected && (
        <RoadmapModal program={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
