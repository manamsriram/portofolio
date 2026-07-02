import { useEffect, useState } from 'react'

interface TypedTextProps {
  text?: string
  texts?: string[]
  speed?: number
  pause?: number
  className?: string
  cursor?: boolean
}

export function TypedText({ text, texts, speed = 55, pause = 2000, className = '', cursor = true }: TypedTextProps) {
  const phrases = texts ?? (text ? [text] : [])
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [shown, setShown] = useState('')

  useEffect(() => {
    const current = phrases[phraseIndex] ?? ''
    setShown('')
    let i = 0
    const id = setInterval(() => {
      i += 1
      setShown(current.slice(0, i))
      if (i >= current.length) {
        clearInterval(id)
        if (phrases.length > 1) {
          setTimeout(() => setPhraseIndex((p) => (p + 1) % phrases.length), pause)
        }
      }
    }, speed)
    return () => clearInterval(id)
  }, [phraseIndex, phrases, speed, pause])

  return (
    <span className={className}>
      {shown}
      {cursor && <span className="cursor-blink" />}
    </span>
  )
}
