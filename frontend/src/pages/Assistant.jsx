import { useState, useRef, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
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

const mdComponents = {
  h1: ({ children }) => <h1 className="text-white font-bold text-base mt-3 mb-1.5 first:mt-0">{children}</h1>,
  h2: ({ children }) => <h2 className="text-white font-semibold text-sm mt-3 mb-1.5 first:mt-0">{children}</h2>,
  h3: ({ children }) => <h3 className="text-white font-semibold text-sm mt-2 mb-1 first:mt-0">{children}</h3>,
  p: ({ children }) => <p className="text-sm leading-relaxed mb-2 last:mb-0">{children}</p>,
  ul: ({ children }) => <ul className="space-y-1 mb-2 pl-1">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-2">{children}</ol>,
  li: ({ children }) => (
    <li className="flex gap-2 text-sm leading-relaxed">
      <span className="text-accent-secondary mt-1.5 flex-shrink-0">•</span>
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
  em: ({ children }) => <em className="italic text-gray-300">{children}</em>,
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="text-accent-secondary underline underline-offset-2 hover:text-white transition-colors break-all">
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-2 rounded-xl border border-white/10">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-white/5">{children}</thead>,
  th: ({ children }) => <th className="text-left px-3 py-2 text-white font-semibold text-xs border-b border-white/10">{children}</th>,
  td: ({ children }) => <td className="px-3 py-2 text-xs border-b border-white/5 last:border-0">{children}</td>,
  pre: ({ children }) => (
    <pre className="bg-white/5 rounded-xl p-3 overflow-x-auto text-xs font-mono mb-2 mt-1 text-gray-300">{children}</pre>
  ),
  code: ({ children, className }) => {
    if (className) return <code className={`${className} text-xs font-mono`}>{children}</code>
    return <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-gray-200">{children}</code>
  },
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-accent-primary pl-3 italic text-gray-400 mb-2">{children}</blockquote>
  ),
  hr: () => <hr className="border-white/10 my-3" />,
}

function Message({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
        isUser
          ? 'bg-accent-primary text-white rounded-br-sm whitespace-pre-wrap'
          : 'bg-bg-card text-gray-300 rounded-bl-sm'
      }`}>
        {isUser ? msg.content : (
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
            {msg.content}
          </ReactMarkdown>
        )}
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
  const location = useLocation()
  const profile = useMemo(() => {
    const raw = localStorage.getItem('ff_profile')
    return raw ? JSON.parse(raw) : null
  }, [])

  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const didAutoSend = useRef(false)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    const prompt = location.state?.prompt
    if (prompt && !didAutoSend.current) {
      didAutoSend.current = true
      autoSend(prompt)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const autoSend = async (text) => {
    const userMsg = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: [WELCOME], profile }),
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
