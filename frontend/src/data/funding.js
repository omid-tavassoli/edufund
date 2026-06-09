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
    description:
      'BAföG ist Deutschlands wichtigstes staatliches Förderprogramm und unterstützt Studierende mit geringem Haushaltseinkommen bei den Lebenshaltungs- und Studienkosten. Der maximale monatliche Betrag beträgt aktuell 992 € (Stand 2024), wobei die tatsächliche Höhe vom eigenen Einkommen, dem Einkommen der Eltern sowie der Wohnsituation abhängt. Etwa die Hälfte wird als nicht rückzahlbarer Zuschuss gewährt, die andere Hälfte als zinsloses Darlehen – die Gesamtrückzahlung ist auf 10.010 € begrenzt. Die Beantragung erfolgt beim Studierendenwerk der jeweiligen Hochschule.',
    requirements: [
      'Formblatt 01 – Hauptantrag',
      'Immatrikulationsbescheinigung inkl. § 9 BAföG-Bescheinigung',
      'Formblatt 03 – Einkommenserklärung beider Elternteile',
      'Einkommensteuerbescheid der Eltern (vorletztes Kalenderjahr)',
      'Nachweise über eigenes Einkommen und Vermögen (aktuelle Kontoauszüge)',
      'Mietvertrag oder Untermietvertrag (bei eigenem Wohnsitz)',
      'Ab dem 5. Semester: Leistungsnachweis gem. § 48 BAföG (Formblatt 05)',
      'Personalausweis oder Reisepass',
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
    description:
      'Das Deutschlandstipendium ist ein leistungsbasiertes Stipendium über 300 €/Monat, das zur Hälfte vom Bund und zur Hälfte von privaten Förderern (Unternehmen, Stiftungen, Alumni) finanziert wird. Es steht deutschen und internationalen Studierenden an staatlich anerkannten Hochschulen offen, wird für ein Studienjahr vergeben und ist verlängerbar. Die Auswahl erfolgt anhand akademischer Leistungen, sozialem Engagement sowie besonderer Fähigkeiten und persönlicher Herausforderungen.',
    requirements: [
      'Online-Bewerbung über das Hochschulportal (Frist variiert je Hochschule)',
      'Aktueller Notenauszug mit Einzelnoten',
      'Abschlusszeugnis Bachelor (bei Master-Bewerbung)',
      'Motivationsschreiben (akademische Ziele, persönlicher Hintergrund, Engagement)',
      'Lebenslauf mit akademischen, beruflichen und ehrenamtlichen Tätigkeiten',
      'Nachweise über Ehrenamt, Auszeichnungen, Preise oder besondere Qualifikationen',
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
    description:
      'Wohngeld ist ein staatlicher Mietzuschuss für Haushalte mit niedrigem bis mittlerem Einkommen. Wichtig für Studierende: Wer dem Grunde nach BAföG-berechtigt ist, ist grundsätzlich vom Wohngeld ausgeschlossen – unabhängig davon, ob BAföG tatsächlich beantragt wurde. Ausnahmen gelten z. B. bei Zweitstudium, überschrittenem Förderhöchstalter, Beurlaubung oder bei Wohngemeinschaft mit nicht BAföG-berechtigten Haushaltsmitgliedern.',
    requirements: [
      'Offizieller Wohngeldantrag bei der zuständigen Wohngeldbehörde',
      'Personalausweis oder Reisepass',
      'Mietbescheinigung (vom Vermieter ausgefüllt, mit Wohnungsgröße und Baujahr)',
      'Aktueller Mietvertrag',
      'Einkommensnachweise aller Haushaltsmitglieder (Lohnabrechnungen, Kontoauszüge)',
      'BAföG-Ablehnungsbescheid als Nachweis der Nicht-Berechtigung',
      'Bei Ausnahmefällen: Nachweis des Ausnahmetatbestands (z. B. Überschreitung der Regelstudienzeit)',
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
    description:
      'Der DAAD (Deutscher Akademischer Austauschdienst) vergibt jährlich Jahresstipendien für Studienaufenthalte im Ausland an deutschen Hochschulen eingeschriebene Studierende. Das monatliche Stipendium beträgt 650 € zuzüglich Reisekostenpauschale und ggf. Krankenversicherungszuschlag. Die Vergabe ist hoch kompetitiv und bewertet akademische Leistungen, Qualität des Studienplans sowie Sprachkenntnisse. Bewerbungsfristen variieren je nach Zielregion (typischerweise September–Oktober für das folgende Jahr).',
    requirements: [
      'Online-Bewerbung über das DAAD-Portal (mydaad.de)',
      'Aktueller Notenauszug mit Einzelnoten',
      'Detaillierter Studienplan (max. 5 Seiten) mit geplanten Kursen an der Gasthochschule',
      'Motivationsschreiben (akademische und persönliche Gründe für den Auslandsaufenthalt)',
      'Lebenslauf (Europass-Format akzeptiert)',
      'Zwei akademische Empfehlungsschreiben von Hochschulprofessoren (versiegelt, DAAD-Formular)',
      'Sprachnachweis der Unterrichtssprache (max. 3 Jahre alt): IELTS, TOEFL iBT, TestDaF, Goethe-Zertifikat o. Ä.',
      'Zulassungsnachweis oder Korrespondenz mit der Gasthochschule (falls vorhanden)',
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
    description:
      'Das Studienabschluss-Stipendium der TU Darmstadt unterstützt internationale Studierende in der Abschlussphase ihres Studiums bei der Anfertigung ihrer Abschlussarbeit. Das Stipendium wird zweimal jährlich vergeben (Antragszeiträume ca. 1.–15. April und 1.–15. Oktober). Die Vergabe erfolgt leistungsbasiert unter Berücksichtigung der sozialen Situation; Studierende mit Kindern werden besonders berücksichtigt. Wer bereits leistungsabhängige Förderungen wie das Deutschlandstipendium erhält, ist von der Bewerbung ausgeschlossen.',
    requirements: [
      'Zulassungsvoraussetzung: internationaler Studierender an der TU Darmstadt in der Abschlussphase',
      'Online-Bewerbung über das TU-Darmstadt-Bewerbungsportal',
      'Ausgedrucktes und unterschriebenes Antragsformular',
      'Offizieller Notenübersicht (ausgestellt vom Studierendensekretariat der TU Darmstadt)',
      'Akademisches Gutachten eines TU-Darmstadt-Betreuers (offizielles DAAD/TU-Formular)',
      'Nachweis über Anmeldung der Abschlussarbeit oder Bestätigung der geplanten Anmeldung innerhalb von 6 Monaten',
      'Immatrikulationsbescheinigung der TU Darmstadt',
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
    month: 'long',
    year: 'numeric',
  })
}
