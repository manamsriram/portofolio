import { useEffect, useState } from 'react'

export function LiveClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      const t = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'America/Los_Angeles',
      }).format(new Date())
      setTime(`${t} PT`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="inline-block font-mono text-xs md:text-sm text-accent border border-terminal bg-terminal px-3 py-1.5 rounded">
      {time || '—— : —— PT'}
    </span>
  )
}
