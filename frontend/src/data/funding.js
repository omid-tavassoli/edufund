export const fundingPrograms = [
  {
    id: 'bafog',
    name: 'BAföG',
    amount: 992,
    amountType: 'monthly',
    category: 'financial',
    status: 'ready',
    institution: 'Studentenwerk',
    location: 'Deutschland',
    description: 'Staatliche Studienförderung für Studierende mit geringem Haushaltseinkommen.',
    requirements: [
      'Einkommensnachweis Eltern',
      'Immatrikulationsbescheinigung',
      'Personalausweis',
      'Ausgefüllter BAföG-Antrag',
    ],
    deadline: null,
    condition: null,
    eligibility: {},
  },
  {
    id: 'deutschlandstipendium',
    name: 'Deutschlandstipendium',
    amount: 300,
    amountType: 'monthly',
    category: 'scholarship',
    status: 'deadline',
    institution: 'Hochschule',
    location: null,
    description: 'Leistungsstipendium für besonders engagierte Studierende.',
    requirements: [
      'Notenauszug',
      'Motivationsschreiben (1–2 Seiten)',
      'Optional: Ehrenamtsnachweis',
    ],
    deadline: '2026-06-15',
    condition: null,
    eligibility: { maxGrade: 2.5 },
  },
  {
    id: 'wohngeld',
    name: 'Wohngeld',
    amount: 370,
    amountType: 'monthly',
    category: 'financial',
    status: 'conditional',
    institution: 'Wohngeldstelle',
    location: 'Deutschland',
    description: 'Staatlicher Zuschuss zu den Wohnkosten.',
    requirements: [
      'Mietvertrag',
      'Einkommensnachweis',
      'Ausgefüllter Wohngeldantrag',
    ],
    deadline: null,
    condition: 'Erst bei Auszug',
    eligibility: {},
  },
  {
    id: 'daad',
    name: 'DAAD Auslandsstipendium',
    amount: 650,
    amountType: 'monthly',
    category: 'abroad',
    status: 'matching',
    institution: 'DAAD',
    location: 'International',
    description: 'Förderung für Auslandssemester und -praktika weltweit.',
    requirements: [
      'Motivationsschreiben',
      'Sprachnachweis',
      'Empfehlungsschreiben (Hochschullehrer)',
      'Studienplan',
    ],
    deadline: '2026-08-31',
    condition: null,
    eligibility: { requiresAbroadPlan: true },
  },
  {
    id: 'abschluss-tu-da',
    name: 'Abschlussstipendium TU DA',
    amount: 500,
    amountType: 'once',
    category: 'scholarship',
    status: 'deadline',
    institution: 'TU Darmstadt',
    location: 'TU Darmstadt',
    description: 'Einmaliges Stipendium zur Unterstützung beim Studienabschluss.',
    requirements: [
      'Nachweis Studienstand',
      'Motivationsschreiben',
      'Leistungsnachweis',
    ],
    deadline: '2026-07-01',
    condition: null,
    eligibility: { hochschule: 'TU Darmstadt' },
  },
]

export function matchFunding(profile) {
  if (!profile) return fundingPrograms

  return fundingPrograms.filter((program) => {
    const e = program.eligibility
    if (!e) return true
    if (e.requiresAbroadPlan && !profile.auslandsSemester) return false
    if (e.hochschule && profile.hochschule !== e.hochschule) return false
    if (e.maxGrade && profile.note && profile.note > e.maxGrade) return false
    return true
  })
}

export function getDaysUntil(dateStr) {
  if (!dateStr) return null
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const deadline = new Date(dateStr)
  return Math.ceil((deadline - now) / (1000 * 60 * 60 * 24))
}

export function formatDeadline(dateStr) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'short',
  })
}
