import { useState, useRef, useEffect, useMemo } from 'react'
import { AppWordmark } from '../components/Logo'

const WELCOME = {
  role: 'assistant',
  content:
    'Hallo! Ich kann dir Fragen zu deinen Förderungen beantworten und beim Antrag helfen. Was möchtest du wissen?',
}

function SendIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  )
}

function Message({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
        isUser
          ? 'bg-accent-primary text-white rounded-br-sm'
          : 'bg-bg-card text-white rounded-bl-sm'
      }`}>
        {msg.content}
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <div className="flex justify-start">
      <div className="bg-bg-card rounded-2xl rounded-bl-sm px-4 py-3.5 flex gap-1.5">
        {[0, 150, 300].map((delay) => (
          <div key={delay} className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
            style={{ animationDelay: `${delay}ms` }} />
        ))}
      </div>
    </div>
  )
}

export default function Assistant() {
  const profile = useMemo(() => {
    const raw = localStorage.getItem('ff_profile')
    return raw ? JSON.parse(raw) : null
  }, [])

  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: messages, profile }),
      })
      if (!res.ok) throw new Error('API error')
      const { reply } = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Entschuldigung, es gab einen Fehler. Bitte versuche es erneut.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 border-b border-white/5">
        <div className="max-w-3xl mx-auto px-5 md:px-8 pt-8 pb-4">
          <h1 className="text-xl font-bold text-white">Assistent</h1>
          <p className="text-gray-500 text-xs mt-0.5">
            <AppWordmark className="text-xs" /> Assistent
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-4 flex flex-col gap-3">
          {messages.map((msg, i) => <Message key={i} msg={msg} />)}
          {loading && <TypingDots />}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="flex-shrink-0 border-t border-white/5 pb-16 md:pb-0">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-3">
          <div className="flex gap-2 bg-bg-card rounded-2xl px-4 py-2 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Frage stellen..."
              rows={1}
              className="flex-1 bg-transparent text-white text-sm resize-none focus:outline-none placeholder:text-gray-600 py-2 max-h-28"
            />
            <button onClick={send} disabled={!input.trim() || loading}
              className="w-8 h-8 rounded-xl bg-accent-primary flex items-center justify-center flex-shrink-0 mb-1 disabled:opacity-30 transition-opacity">
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
