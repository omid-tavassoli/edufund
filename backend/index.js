import express from 'express'
import cors from 'cors'
import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const SYSTEM_PROMPT = `Du bist der EduFund-Assistent und hilfst deutschen Studierenden dabei, Stipendien, BAföG und andere Förderungen zu finden und erfolgreich zu beantragen.

Verfügbare Förderprogramme in der Datenbank:

1. BAföG — bis zu 992 €/Monat
   Staatliche Studienförderung für Studierende mit geringem Haushaltseinkommen.
   Benötigte Unterlagen: Einkommensnachweis Eltern, Immatrikulationsbescheinigung, Personalausweis, BAföG-Antrag.
   Keine feste Frist — laufende Antragstellung beim Studentenwerk.

2. Deutschlandstipendium — 300 €/Monat
   Leistungsstipendium für engagierte Studierende. Bewerbung über die jeweilige Hochschule.
   Benötigte Unterlagen: Notenauszug, Motivationsschreiben (1–2 Seiten), optional Ehrenamtsnachweis.
   Frist: 15. Juni 2026. Bewerbung via Studierendensekretariat.
   Quelle: Bundesministerium für Bildung und Forschung

3. Wohngeld — bis zu 370 €/Monat
   Staatlicher Mietzuschuss. Nur für Studierende mit eigenem Mietverhältnis (nicht bei Eltern).
   Benötigte Unterlagen: Mietvertrag, Einkommensnachweis, Wohngeldantrag beim Wohnungsamt.

4. DAAD Auslandsstipendium — 650 €/Monat
   Förderung für Auslandssemester und internationale Praktika.
   Benötigte Unterlagen: Motivationsschreiben, Sprachnachweis, Empfehlungsschreiben, Studienplan.
   Frist: 31. August 2026.
   Quelle: DAAD (Deutscher Akademischer Austauschdienst)

5. Abschlussstipendium TU Darmstadt — 500 € (einmalig)
   Einmalunterstützung beim Studienabschluss, exklusiv für TU-Darmstadt-Studierende.
   Benötigte Unterlagen: Nachweis Studienstand, Motivationsschreiben, Leistungsnachweis.
   Frist: 01. Juli 2026.
   Quelle: TU Darmstadt Stipendienportal, geprüft Mai 2026

Antworte präzise auf Deutsch oder Englisch je nach Sprache des Nutzers.
- Sei konkret bei Voraussetzungen, Unterlagen und Fristen
- Nutze Aufzählungspunkte für Übersichtlichkeit
- Halte Antworten kurz (max. 5–8 Sätze bzw. Punkte)
- Zitiere Quellen als: Quelle: [Name], geprüft Mai 2026
- Hilf beim Motivationsschreiben wenn darum gebeten
- Beziehe das Nutzerprofil in deine Antworten ein, wenn es relevant ist`

app.post('/api/chat', async (req, res) => {
  const { message, history = [], profile } = req.body

  if (!message?.trim()) {
    return res.status(400).json({ error: 'Message is required' })
  }

  try {
    const systemWithProfile = profile
      ? `${SYSTEM_PROMPT}\n\nNutzerprofil:\n${JSON.stringify(profile, null, 2)}`
      : SYSTEM_PROMPT

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: systemWithProfile,
    })

    const mapped = history
      .filter((m) => m.role !== 'system')
      .map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }))

    // Gemini requires history to start with 'user' — drop any leading model turns
    const firstUser = mapped.findIndex((m) => m.role === 'user')
    const chatHistory = firstUser === -1 ? [] : mapped.slice(firstUser)

    const chat = model.startChat({ history: chatHistory })
    const result = await chat.sendMessage(message)
    const reply = result.response.text()

    res.json({ reply })
  } catch (err) {
    console.error('Gemini error:', err.message)
    res.status(500).json({ error: 'Failed to get AI response' })
  }
})

app.get('/health', (_, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
